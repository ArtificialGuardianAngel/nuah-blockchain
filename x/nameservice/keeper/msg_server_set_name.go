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

	if len(msg.Name) < 3 {
		return nil, errors.Wrap(sdkerrors.ErrConflict, "Name is too short")
	}
	// TODO: Handling the message
	whois, isFound := k.GetWhois(ctx, msg.Name)
	oldWhois, isOldFound := k.GetWhoisByValue(ctx, msg.Creator)

	if isFound {

		if msg.Creator != whois.Owner {
			return nil, errors.Wrap(sdkerrors.ErrConflict, "This name is busy")
		}

		newWhois := types.Whois{
			Index: msg.Name,
			Name:  msg.Name,
			Value: msg.Value,
			Owner: whois.Owner,
		}
		newWhoisByValue := types.WhoisByValue{
			Index:      msg.Creator,
			WhoisIndex: msg.Name,
		}

		k.SetWhois(ctx, newWhois)
		k.SetWhoisByValue(ctx, newWhoisByValue)

		if isOldFound {
			k.RemoveWhois(ctx, oldWhois.WhoisIndex)
		}
		return &types.MsgSetNameResponse{}, nil
	}

	newWhois := types.Whois{
		Index: msg.Name,
		Name:  msg.Name,
		Value: msg.Value,
		Owner: msg.Creator,
	}

	newWhoisByValue := types.WhoisByValue{
		Index:      msg.Creator,
		WhoisIndex: msg.Name,
	}

	// Write whois information to the store
	k.SetWhois(ctx, newWhois)
	k.SetWhoisByValue(ctx, newWhoisByValue)

	return &types.MsgSetNameResponse{}, nil
}
