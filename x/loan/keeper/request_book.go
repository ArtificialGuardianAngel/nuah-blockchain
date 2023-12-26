package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"nuah/x/loan/types"
)

// SetRequestBook set a specific requestBook in the store from its index
func (k Keeper) SetRequestBook(ctx sdk.Context, requestBook types.RequestBook) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RequestBookKeyPrefix))
	b := k.cdc.MustMarshal(&requestBook)
	store.Set(types.RequestBookKey(
		requestBook.Index,
	), b)
}

// GetRequestBook returns a requestBook from its index
func (k Keeper) GetRequestBook(
	ctx sdk.Context,
	index string,

) (val types.RequestBook, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RequestBookKeyPrefix))

	b := store.Get(types.RequestBookKey(
		index,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveRequestBook removes a requestBook from the store
func (k Keeper) RemoveRequestBook(
	ctx sdk.Context,
	index string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RequestBookKeyPrefix))
	store.Delete(types.RequestBookKey(
		index,
	))
}

// GetAllRequestBook returns all requestBook
func (k Keeper) GetAllRequestBook(ctx sdk.Context) (list []types.RequestBook) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RequestBookKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.RequestBook
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
