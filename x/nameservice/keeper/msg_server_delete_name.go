package keeper

import (
	"context"

	"nuah/x/nameservice/types"

	errors "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) DeleteName(goCtx context.Context, msg *types.MsgDeleteName) (*types.MsgDeleteNameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	whois, isFound := k.GetWhois(ctx, msg.Name)

	// If a name is not found, throw an error
	if !isFound {
		return nil, errors.Wrap(sdkerrors.ErrInvalidRequest, "Name doesn't exist")
	}

	// If the message sender address doesn't match the name owner, throw an error
	if !(whois.Owner == msg.Creator) {
		return nil, errors.Wrap(sdkerrors.ErrUnauthorized, "Incorrect Owner")
	}

	// Otherwise, remove the name information from the store
	k.RemoveWhois(ctx, msg.Name)
	return &types.MsgDeleteNameResponse{}, nil
}
