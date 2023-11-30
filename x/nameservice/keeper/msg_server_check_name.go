package keeper

import (
	"context"

	"nuah/x/nameservice/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) CheckName(goCtx context.Context, msg *types.MsgCheckName) (*types.MsgCheckNameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	// _, isFound = k.Whois
	_ = ctx

	return &types.MsgCheckNameResponse{}, nil
}
