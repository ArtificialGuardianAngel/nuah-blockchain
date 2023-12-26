package keeper

import (
	"context"
	"errors"

	"nuah/x/exchange/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	// clienttypes "github.com/cosmos/ibc-go/v7/modules/core/02-client/types"
)

func (k msgServer) SendBuyOrder(goCtx context.Context, msg *types.MsgSendBuyOrder) (*types.MsgSendBuyOrderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Cannot send a order if the pair doesn't exist
	pairIndex := types.OrderBookIndex(msg.AmountDenom, msg.PriceDenom)
	_, found := k.GetBuyOrderBook(ctx, pairIndex)
	if !found {
		return &types.MsgSendBuyOrderResponse{}, errors.New("the pair doesn't exist")
	}

	// Lock the token to send
	sender, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return &types.MsgSendBuyOrderResponse{}, err
	}

	// Use SafeBurn to ensure no new native tokens are minted
	if err := k.SafeBurn(ctx, sender, msg.PriceDenom, msg.Amount*msg.Price); err != nil {
		return &types.MsgSendBuyOrderResponse{}, err
	}

	// Save the voucher received on the other chain, to have the ability to resolve it into the original denom
	k.SaveVoucherDenom(ctx, msg.PriceDenom)

	book, found := k.GetSellOrderBook(ctx, pairIndex)
	if !found {
		return nil, errors.New("the pair doesn't exist")
	}

	// Fill buy order
	remaining, liquidated, purchase, _ := book.FillBuyOrder(types.Order{
		Amount: msg.Amount,
		Price:  msg.Price,
	})

	// Return remaining amount and gains

	// Before distributing gains, we resolve the denom
	// First we check if the denom received comes from this chain originally
	finalPriceDenom, saved := k.OriginalDenom(ctx, msg.PriceDenom)
	if !saved {
		// If it was not from this chain we use voucher as denom
		finalPriceDenom = VoucherDenom(msg.PriceDenom)
	}

	// Dispatch liquidated buy order
	for _, liquidation := range liquidated {
		liquidation := liquidation
		addr, err := sdk.AccAddressFromBech32(liquidation.Creator)
		if err != nil {
			return nil, err
		}

		if err := k.SafeMint(
			ctx,
			addr,
			finalPriceDenom,
			liquidation.Amount*liquidation.Price,
		); err != nil {
			return nil, err
		}
	}

	// Save the new order book
	k.SetSellOrderBook(ctx, book)

	buyBook, found := k.GetBuyOrderBook(ctx, pairIndex)
	if !found {
		panic("buy order book must exist")
	}

	// Append the remaining amount of the order
	if remaining.Amount > 0 {
		_, err := book.AppendOrder(
			msg.Creator,
			remaining.Amount,
			msg.Price,
		)
		if err != nil {
			return nil, err
		}

		// Save the new order book
		k.SetBuyOrderBook(ctx, buyBook)
	}

	// Mint the purchase
	if purchase > 0 {
		receiver, err := sdk.AccAddressFromBech32(msg.Creator)
		if err != nil {
			return nil, err
		}

		finalAmountDenom, saved := k.OriginalDenom(ctx, msg.AmountDenom)
		if !saved {
			// If it was not from this chain we use voucher as denom
			finalAmountDenom = VoucherDenom(msg.AmountDenom)
		}

		if err := k.SafeMint(
			ctx,
			receiver,
			finalAmountDenom,
			purchase,
		); err != nil {
			return nil, err
		}
	}
	// Construct the packet
	// var packet types.BuyOrderPacketData

	// packet.Buyer = msg.Creator
	// packet.AmountDenom = msg.AmountDenom
	// packet.Amount = msg.Amount
	// packet.PriceDenom = msg.PriceDenom
	// packet.Price = msg.Price

	// Transmit the packet
	// _, err = k.TransmitBuyOrderPacket(
	// 	ctx,
	// 	packet,
	// 	clienttypes.ZeroHeight(),
	// 	msg.TimeoutTimestamp,
	// )
	// if err != nil {
	// 	return nil, err
	// }

	// Transmit an IBC packet...
	return &types.MsgSendBuyOrderResponse{}, nil
}
