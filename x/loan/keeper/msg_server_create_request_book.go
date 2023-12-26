package keeper

import (
	"context"

	"errors"
	"nuah/x/loan/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) CreateRequestBook(goCtx context.Context, msg *types.MsgCreateRequestBook) (*types.MsgCreateRequestBookResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	index := types.RequestBookIndex(msg.To)

	_, found := k.GetRequestBook(ctx, index)

	if found {
		return &types.MsgCreateRequestBookResponse{}, errors.New("address already has request book")
	}

	book := types.NewRequestBook()
	book.Index = index
	k.SetRequestBook(ctx, book)

	return &types.MsgCreateRequestBookResponse{}, nil
}
