package keeper

import (
	"context"
	"errors"
	"fmt"
	"strconv"

	"nuah/x/exchange/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	// clienttypes "github.com/cosmos/ibc-go/v7/modules/core/02-client/types"
)

func (k msgServer) SendSellOrder(goCtx context.Context, msg *types.MsgSendSellOrder) (*types.MsgSendSellOrderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	pairIndex := types.OrderBookIndex(msg.AmountDenom, msg.PriceDenom)
	_, found := k.GetSellOrderBook(ctx, pairIndex)
	if !found {
		return &types.MsgSendSellOrderResponse{Info: strconv.FormatBool(found)}, errors.New("the pair doesn't exist")
	}

	// Get sender's address
	sender, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return &types.MsgSendSellOrderResponse{}, err
	}

	// Use SafeBurn to ensure no new native tokens are minted
	if err := k.SafeBurn(ctx, sender, msg.AmountDenom, msg.Amount); err != nil {
		return &types.MsgSendSellOrderResponse{}, err
	}

	// Save the voucher received on the other chain, to have the ability to resolve it into the original denom
	k.SaveVoucherDenom(ctx, msg.AmountDenom)

	book, found := k.GetBuyOrderBook(ctx, pairIndex)

	fmt.Println(found)
	if !found {
		return nil, errors.New("the pair doesn't exist")
	}

	remaining, liquidated, gain, _ := book.FillSellOrder(types.Order{
		Amount: msg.Amount,
		Price:  msg.Price,
	})

	finalAmountDenom, saved := k.OriginalDenom(ctx, msg.AmountDenom)
	if !saved {
		// If it was not from this chain we use voucher as denom
		finalAmountDenom = VoucherDenom(msg.AmountDenom)
	}
	// _, saved := k.OriginalDenom(ctx, data.AmountDenom)
	for _, liquidation := range liquidated {
		liquidation := liquidation
		addr, err := sdk.AccAddressFromBech32(liquidation.Creator)
		if err != nil {
			return nil, err
		}

		if err := k.SafeMint(ctx, addr, finalAmountDenom, liquidation.Amount); err != nil {
			return nil, err
		}
	}

	// Save the new order book
	k.SetBuyOrderBook(ctx, book)

	sellBook, found := k.GetSellOrderBook(ctx, pairIndex)
	if !found {
		panic("sell order book must exist")
	}

	// Append the remaining amount of the order
	if remaining.Amount > 0 {
		_, err := book.AppendOrder(msg.Creator, remaining.Amount, msg.Price)
		if err != nil {
			return nil, err
		}

		// Save the new order book
		k.SetSellOrderBook(ctx, sellBook)
	}

	// Mint the gains
	if gain > 0 {
		receiver, err := sdk.AccAddressFromBech32(msg.Creator)
		if err != nil {
			return nil, err
		}

		finalPriceDenom, saved := k.OriginalDenom(ctx, msg.PriceDenom)
		if !saved {
			// If it was not from this chain we use voucher as denom
			finalPriceDenom = VoucherDenom(msg.PriceDenom)
		}

		if err := k.SafeMint(ctx, receiver, finalPriceDenom, gain); err != nil {
			return nil, err
		}
	}
	// var packet types.SellOrderPacketData
	// packet.Seller = msg.Creator
	// packet.AmountDenom = msg.AmountDenom
	// packet.Amount = msg.Amount
	// packet.PriceDenom = msg.PriceDenom
	// packet.Price = msg.Price

	// // Transmit the packet
	// _, err = k.TransmitSellOrderPacket(ctx, packet, msg.Port, msg.ChannelID, clienttypes.ZeroHeight(), msg.TimeoutTimestamp)
	// if err != nil {
	// 	return nil, err
	// }

	return &types.MsgSendSellOrderResponse{}, nil
}
