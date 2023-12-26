package keeper

import (
	"context"

	"nuah/x/exchange/types"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) StableSupplyAll(goCtx context.Context, req *types.QueryAllStableSupplyRequest) (*types.QueryAllStableSupplyResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var stableSupplys []types.StableSupply
	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	stableSupplyStore := prefix.NewStore(store, types.KeyPrefix(types.StableSupplyKey))

	pageRes, err := query.Paginate(stableSupplyStore, req.Pagination, func(key []byte, value []byte) error {
		var stableSupply types.StableSupply
		if err := k.cdc.Unmarshal(value, &stableSupply); err != nil {
			return err
		}

		stableSupplys = append(stableSupplys, stableSupply)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllStableSupplyResponse{StableSupply: stableSupplys, Pagination: pageRes}, nil
}

func (k Keeper) StableSupply(goCtx context.Context, req *types.QueryGetStableSupplyRequest) (*types.QueryGetStableSupplyResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)
	stableSupply, found := k.GetStableSupply(ctx, req.Id)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetStableSupplyResponse{StableSupply: stableSupply}, nil
}
