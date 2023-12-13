package keeper

import (
	"context"

	"nuah/x/oracles/types"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/redis/go-redis/v9"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) DataAll(goCtx context.Context, req *types.QueryAllDataRequest) (*types.QueryAllDataResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var datas []types.Data
	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	dataStore := prefix.NewStore(store, types.KeyPrefix(types.DataKeyPrefix))

	pageRes, err := query.Paginate(dataStore, req.Pagination, func(key []byte, value []byte) error {
		var data types.Data
		if err := k.cdc.Unmarshal(value, &data); err != nil {
			return err
		}

		datas = append(datas, data)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllDataResponse{Data: datas, Pagination: pageRes}, nil
}

func (k Keeper) Data(goCtx context.Context, req *types.QueryGetDataRequest) (*types.QueryGetDataResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})
	redisVal, err := client.Get(goCtx, "daily:"+req.Index).Result()
	println(redisVal)
	if err == nil {
		data := types.Data{
			Creator: "noone",
			Index:   req.Index,
			Key:     req.Index,
			Value:   redisVal,
		}
		k.SetData(ctx, data)
	}

	val, found := k.GetData(
		ctx,
		req.Index,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetDataResponse{Data: val}, nil
}
