package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"nuah/x/exchange/types"
)

func (k msgServer) SendBuyOrder(goCtx context.Context, msg *types.MsgSendBuyOrder) (*types.MsgSendBuyOrderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgSendBuyOrderResponse{}, nil
}
