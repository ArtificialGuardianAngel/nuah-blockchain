package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"nuah/x/loan/types"
)

func (k Keeper) RequestBookAll(goCtx context.Context, req *types.QueryAllRequestBookRequest) (*types.QueryAllRequestBookResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var requestBooks []types.RequestBook
	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	requestBookStore := prefix.NewStore(store, types.KeyPrefix(types.RequestBookKeyPrefix))

	pageRes, err := query.Paginate(requestBookStore, req.Pagination, func(key []byte, value []byte) error {
		var requestBook types.RequestBook
		if err := k.cdc.Unmarshal(value, &requestBook); err != nil {
			return err
		}

		requestBooks = append(requestBooks, requestBook)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllRequestBookResponse{RequestBook: requestBooks, Pagination: pageRes}, nil
}

func (k Keeper) RequestBook(goCtx context.Context, req *types.QueryGetRequestBookRequest) (*types.QueryGetRequestBookResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	val, found := k.GetRequestBook(
		ctx,
		req.Index,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetRequestBookResponse{RequestBook: val}, nil
}
