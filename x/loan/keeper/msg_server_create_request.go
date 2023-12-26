package keeper

import (
	"context"
	"errors"

	"nuah/x/loan/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) CreateRequest(goCtx context.Context, msg *types.MsgCreateRequest) (*types.MsgCreateRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	book, isFound := k.GetRequestBook(ctx, msg.To)
	if !isFound {
		return &types.MsgCreateRequestResponse{}, errors.New("address doesn't have an request book")
	}

	_, err := book.AppendRequest(msg.Creator, msg.Amount, msg.Denom)
	if err != nil {
		return &types.MsgCreateRequestResponse{}, err
	}
	k.SetRequestBook(ctx, book)
	// _ = ctx

	return &types.MsgCreateRequestResponse{}, nil
}
