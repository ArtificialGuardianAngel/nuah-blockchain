package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"nuah/x/nameservice/types"
)

func (k msgServer) TransferName(goCtx context.Context, msg *types.MsgTransferName) (*types.MsgTransferNameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgTransferNameResponse{}, nil
}
