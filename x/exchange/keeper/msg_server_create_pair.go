package keeper

import (
	"context"
	"errors"

	"nuah/x/exchange/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) CreatePair(goCtx context.Context, msg *types.MsgCreatePair) (*types.MsgCreatePairResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	pairIndex := types.OrderBookIndex(msg.SourceDenom, msg.TargetDenom)

	_, found := k.GetSellOrderBook(ctx, pairIndex)
	if found {
		return &types.MsgCreatePairResponse{}, errors.New("the pair already exist")
	}
	buyBook := types.NewBuyOrderBook(msg.SourceDenom, msg.TargetDenom)
	// Assign order book index
	buyBook.Index = pairIndex
	// Save the order book to the store
	k.SetBuyOrderBook(ctx, buyBook)

	sellBook := types.NewSellOrderBook(msg.SourceDenom, msg.TargetDenom)
	sellBook.Index = pairIndex
	k.SetSellOrderBook(ctx, sellBook)

	return &types.MsgCreatePairResponse{}, nil
}
