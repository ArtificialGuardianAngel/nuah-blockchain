package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"nuah/x/exchange/types"
)

func (k Keeper) TokenInfoAll(goCtx context.Context, req *types.QueryAllTokenInfoRequest) (*types.QueryAllTokenInfoResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var tokenInfos []types.TokenInfo
	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	tokenInfoStore := prefix.NewStore(store, types.KeyPrefix(types.TokenInfoKeyPrefix))

	pageRes, err := query.Paginate(tokenInfoStore, req.Pagination, func(key []byte, value []byte) error {
		var tokenInfo types.TokenInfo
		if err := k.cdc.Unmarshal(value, &tokenInfo); err != nil {
			return err
		}

		tokenInfos = append(tokenInfos, tokenInfo)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllTokenInfoResponse{TokenInfo: tokenInfos, Pagination: pageRes}, nil
}

func (k Keeper) TokenInfo(goCtx context.Context, req *types.QueryGetTokenInfoRequest) (*types.QueryGetTokenInfoResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	val, found := k.GetTokenInfo(
		ctx,
		req.Index,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetTokenInfoResponse{TokenInfo: val}, nil
}
