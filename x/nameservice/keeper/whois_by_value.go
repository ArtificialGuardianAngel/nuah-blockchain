package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"nuah/x/nameservice/types"
)

// SetWhoisByValue set a specific whoisByValue in the store from its index
func (k Keeper) SetWhoisByValue(ctx sdk.Context, whoisByValue types.WhoisByValue) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WhoisByValueKeyPrefix))
	b := k.cdc.MustMarshal(&whoisByValue)
	store.Set(types.WhoisByValueKey(
		whoisByValue.Index,
	), b)
}

// GetWhoisByValue returns a whoisByValue from its index
func (k Keeper) GetWhoisByValue(
	ctx sdk.Context,
	index string,

) (val types.WhoisByValue, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WhoisByValueKeyPrefix))

	b := store.Get(types.WhoisByValueKey(
		index,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveWhoisByValue removes a whoisByValue from the store
func (k Keeper) RemoveWhoisByValue(
	ctx sdk.Context,
	index string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WhoisByValueKeyPrefix))
	store.Delete(types.WhoisByValueKey(
		index,
	))
}

// GetAllWhoisByValue returns all whoisByValue
func (k Keeper) GetAllWhoisByValue(ctx sdk.Context) (list []types.WhoisByValue) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WhoisByValueKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.WhoisByValue
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
