package keeper

import (
	"context"
	"errors"

	"nuah/x/exchange/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) SendBuyOrder(goCtx context.Context, msg *types.MsgSendBuyOrder) (*types.MsgSendBuyOrderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

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

	// i.e on recv

	sellBook, found := k.GetSellOrderBook(ctx, pairIndex)
	if !found {
		return &types.MsgSendBuyOrderResponse{}, errors.New("the pair doesn't exist")
	}

	// Fill buy order
	remaining, liquidated, purchase, _ := sellBook.FillBuyOrder(types.Order{
		Amount: msg.Amount,
		Price:  msg.Price,
	})

	for _, liquidation := range liquidated {
		liquidation := liquidation
		addr, err := sdk.AccAddressFromBech32(liquidation.Creator)
		if err != nil {
			return &types.MsgSendBuyOrderResponse{}, err
		}

		if err := k.SafeMint(
			ctx,
			addr,
			msg.PriceDenom,
			liquidation.Amount*liquidation.Price,
		); err != nil {
			return &types.MsgSendBuyOrderResponse{}, err
		}
	}

	// i.e on ack
	buyBook, found := k.GetBuyOrderBook(ctx, pairIndex)
	if !found {
		panic("buy order book must exist")
	}

	// Append the remaining amount of the order
	if remaining.Amount > 0 {
		_, err := buyBook.AppendOrder(
			msg.Creator,
			remaining.Amount,
			msg.Price,
		)
		if err != nil {
			return &types.MsgSendBuyOrderResponse{}, err
		}

		// Save the new order book
		k.SetBuyOrderBook(ctx, buyBook)
	}

	// Mint the purchase
	if purchase > 0 {
		receiver, err := sdk.AccAddressFromBech32(msg.Creator)
		if err != nil {
			return &types.MsgSendBuyOrderResponse{}, err
		}

		if err := k.SafeMint(
			ctx,
			receiver,
			msg.AmountDenom,
			purchase,
		); err != nil {
			return &types.MsgSendBuyOrderResponse{}, err
		}
	}

	return &types.MsgSendBuyOrderResponse{}, nil
}
