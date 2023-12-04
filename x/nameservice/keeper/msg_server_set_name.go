package keeper

import (
	"context"

	"nuah/x/nameservice/types"

	errors "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) SetName(goCtx context.Context, msg *types.MsgSetName) (*types.MsgSetNameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message

	_, isFound := k.GetWhois(ctx, msg.Name)

	if isFound {
		return nil, errors.Wrap(sdkerrors.ErrConflict, "This name is busy")
	}

	newWhois := types.Whois{
		Index: msg.Name,
		Name:  msg.Name,
		Value: msg.Value,
		Owner: msg.Creator,
	}

	// Write whois information to the store
	k.SetWhois(ctx, newWhois)

	return &types.MsgSetNameResponse{}, nil
}
