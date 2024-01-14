package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"nuah/x/exchange/types"
)

func (k msgServer) CreatePair(goCtx context.Context, msg *types.MsgCreatePair) (*types.MsgCreatePairResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgCreatePairResponse{}, nil
}
