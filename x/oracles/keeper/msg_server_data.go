package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"nuah/x/oracles/types"
)

func (k msgServer) CreateData(goCtx context.Context, msg *types.MsgCreateData) (*types.MsgCreateDataResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if the value already exists
	_, isFound := k.GetData(
		ctx,
		msg.Index,
	)
	if isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "index already set")
	}

	var data = types.Data{
		Creator: msg.Creator,
		Index:   msg.Index,
		Key:     msg.Key,
		Value:   msg.Value,
	}

	k.SetData(
		ctx,
		data,
	)
	return &types.MsgCreateDataResponse{}, nil
}

func (k msgServer) UpdateData(goCtx context.Context, msg *types.MsgUpdateData) (*types.MsgUpdateDataResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if the value exists
	valFound, isFound := k.GetData(
		ctx,
		msg.Index,
	)
	if !isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, "index not set")
	}

	// Checks if the the msg creator is the same as the current owner
	if msg.Creator != valFound.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var data = types.Data{
		Creator: msg.Creator,
		Index:   msg.Index,
		Key:     msg.Key,
		Value:   msg.Value,
	}

	k.SetData(ctx, data)

	return &types.MsgUpdateDataResponse{}, nil
}

func (k msgServer) DeleteData(goCtx context.Context, msg *types.MsgDeleteData) (*types.MsgDeleteDataResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if the value exists
	valFound, isFound := k.GetData(
		ctx,
		msg.Index,
	)
	if !isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, "index not set")
	}

	// Checks if the the msg creator is the same as the current owner
	if msg.Creator != valFound.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveData(
		ctx,
		msg.Index,
	)

	return &types.MsgDeleteDataResponse{}, nil
}
