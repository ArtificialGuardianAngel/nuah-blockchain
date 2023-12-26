package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"nuah/x/nameservice/types"
)

func (k Keeper) WhoisByValueAll(goCtx context.Context, req *types.QueryAllWhoisByValueRequest) (*types.QueryAllWhoisByValueResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var whoisByValues []types.WhoisByValue
	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	whoisByValueStore := prefix.NewStore(store, types.KeyPrefix(types.WhoisByValueKeyPrefix))

	pageRes, err := query.Paginate(whoisByValueStore, req.Pagination, func(key []byte, value []byte) error {
		var whoisByValue types.WhoisByValue
		if err := k.cdc.Unmarshal(value, &whoisByValue); err != nil {
			return err
		}

		whoisByValues = append(whoisByValues, whoisByValue)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllWhoisByValueResponse{WhoisByValue: whoisByValues, Pagination: pageRes}, nil
}

func (k Keeper) WhoisByValue(goCtx context.Context, req *types.QueryGetWhoisByValueRequest) (*types.QueryGetWhoisByValueResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	val, found := k.GetWhoisByValue(
		ctx,
		req.Index,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetWhoisByValueResponse{WhoisByValue: val}, nil
}
