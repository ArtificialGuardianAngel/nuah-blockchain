package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"nuah/x/exchange/types"
)

func (k msgServer) SendSellOrder(goCtx context.Context, msg *types.MsgSendSellOrder) (*types.MsgSendSellOrderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgSendSellOrderResponse{}, nil
}
