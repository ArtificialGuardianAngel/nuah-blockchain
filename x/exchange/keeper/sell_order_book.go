package keeper

import (
	// "errors"
	"fmt"
	"nuah/x/exchange/types"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// SetSellOrderBook set a specific sellOrderBook in the store from its index
func (k Keeper) SetSellOrderBook(ctx sdk.Context, sellOrderBook types.SellOrderBook) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SellOrderBookKeyPrefix))
	b := k.cdc.MustMarshal(&sellOrderBook)
	store.Set(types.SellOrderBookKey(
		sellOrderBook.Index,
	), b)
}

// GetSellOrderBook returns a sellOrderBook from its index
func (k Keeper) GetSellOrderBook(
	ctx sdk.Context,
	index string,
) (val types.SellOrderBook, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SellOrderBookKeyPrefix))

	b := store.Get(types.SellOrderBookKey(
		index,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveSellOrderBook removes a sellOrderBook from the store
func (k Keeper) RemoveSellOrderBook(
	ctx sdk.Context,
	index string,
) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SellOrderBookKeyPrefix))
	store.Delete(types.SellOrderBookKey(
		index,
	))
}

// GetAllSellOrderBook returns all sellOrderBook
func (k Keeper) GetAllSellOrderBook(ctx sdk.Context) (list []types.SellOrderBook) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SellOrderBookKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.SellOrderBook
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

func (k Keeper) InitiateSystemSellOrders(ctx sdk.Context) {

	pairs := k.GetTokenPairs()

	for _, pair := range pairs {
		pairIndex := types.OrderBookIndex(pair[0], pair[1])

		_, sellBookFound := k.GetSellOrderBook(ctx, pairIndex)
		_, buyBookFound := k.GetBuyOrderBook(ctx, pairIndex)
		k.Logger(ctx).Error(fmt.Sprintf("[%s]\tsell:%+v\tbuy:%+v", pairIndex, sellBookFound, buyBookFound))
		if buyBookFound && sellBookFound {
			continue
		}
		if buyBookFound {
			book := types.NewSellOrderBook(pair[0], pair[1])
			book.Index = pairIndex
			k.SetSellOrderBook(ctx, book)
		}
		if sellBookFound {
			book := types.NewBuyOrderBook(pair[0], pair[1])
			book.Index = pairIndex
			k.SetBuyOrderBook(ctx, book)
		}

	}
}
