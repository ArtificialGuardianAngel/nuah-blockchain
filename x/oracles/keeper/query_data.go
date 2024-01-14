package keeper

import (
	"context"
	"encoding/json"
	"nuah/x/oracles/types"
	"strconv"

	"strings"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/redis/go-redis/v9"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type StoredValue struct {
	Open     map[string]int32 `json:"Open"`
	AdjClose map[string]int32 `json:"Adj Close"`
}

func (k Keeper) DataAll(goCtx context.Context, req *types.QueryAllDataRequest) (*types.QueryAllDataResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})
	keys, _, err := client.Scan(goCtx, 0, "daily:*", 30).Result()

	var datas []types.Data

	if err == nil {
		for _, v := range keys {
			redisVal, err := client.Get(goCtx, v).Result()
			if err == nil {
				data := types.Data{
					Creator: "system",
					Index:   strings.Replace(v, "daily:", "", 1),
					Key:     strings.Replace(v, "daily:", "", 1),
					Value:   redisVal,
				}
				k.SetData(ctx, data)
				datas = append(datas, data)
			}
		}
	}

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
	// println(redisVal)
	if err == nil {
		data := types.Data{
			Creator: "system",
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

	var data StoredValue

	err = json.Unmarshal([]byte(val.Value), &data)
	if err == nil {
		index := 0
		for i := range data.AdjClose {
			value, err := strconv.Atoi(i)
			if err != nil {
				continue
			}
			index = max(value, index)
		}

		// value := data.AdjClose[strconv.Itoa(index)]

		// k.exchangeKeeper.SwarmSellOrders(ctx, strings.Replace(req.Index, "USD=X", "", 1), "USDn", int(value))
	}

	return &types.QueryGetDataResponse{Data: val}, nil
}
