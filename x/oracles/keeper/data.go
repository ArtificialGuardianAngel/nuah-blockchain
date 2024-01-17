package keeper

import (
	"nuah/x/oracles/types"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// SetData set a specific data in the store from its index
func (k Keeper) SetData(ctx sdk.Context, data types.Data) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DataKeyPrefix))
	b := k.cdc.MustMarshal(&data)
	store.Set(types.DataKey(
		data.Index,
	), b)
}

// GetData returns a data from its index
func (k Keeper) GetData(
	ctx sdk.Context,
	index string,
) (val types.Data, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DataKeyPrefix))

	b := store.Get(types.DataKey(
		index,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveData removes a data from the store
func (k Keeper) RemoveData(
	ctx sdk.Context,
	index string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DataKeyPrefix))
	store.Delete(types.DataKey(
		index,
	))
}

// GetAllData returns all data
func (k Keeper) GetAllData(ctx sdk.Context) (list []types.Data) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DataKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Data
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
