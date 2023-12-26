package keeper

import (
	"context"
	"errors"

	"nuah/x/loan/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) DeclineRequest(goCtx context.Context, msg *types.MsgDeclineRequest) (*types.MsgDeclineRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	book, isFound := k.GetRequestBook(ctx, msg.Creator)
	if !isFound {
		return &types.MsgDeclineRequestResponse{}, errors.New("request book is not found")
	}

	_, err := book.UpdateAcceptedRequest(msg.Id, 0)

	if err != nil {
		return &types.MsgDeclineRequestResponse{}, err
	}

	k.SetRequestBook(ctx, book)

	return &types.MsgDeclineRequestResponse{}, nil
}
