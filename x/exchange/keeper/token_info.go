package keeper

import (
	"nuah/x/exchange/types"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// SetTokenInfo set a specific tokenInfo in the store from its index
func (k Keeper) SetTokenInfo(ctx sdk.Context, tokenInfo types.TokenInfo) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.TokenInfoKeyPrefix))
	b := k.cdc.MustMarshal(&tokenInfo)
	store.Set(types.TokenInfoKey(
		tokenInfo.Index,
	), b)
}

// GetTokenInfo returns a tokenInfo from its index
func (k Keeper) GetTokenInfo(
	ctx sdk.Context,
	index string,

) (val types.TokenInfo, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.TokenInfoKeyPrefix))

	b := store.Get(types.TokenInfoKey(
		index,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveTokenInfo removes a tokenInfo from the store
func (k Keeper) RemoveTokenInfo(
	ctx sdk.Context,
	index string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.TokenInfoKeyPrefix))
	store.Delete(types.TokenInfoKey(
		index,
	))
}

// GetAllTokenInfo returns all tokenInfo
func (k Keeper) GetAllTokenInfo(ctx sdk.Context) (list []types.TokenInfo) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.TokenInfoKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.TokenInfo
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

func (k Keeper) SetDefaultTokenInfo(ctx sdk.Context) {
	var defaultTokensInfo = []types.TokenInfo{
		{Index: "nuah", Name: "NUAH", Supply: 10000000000000, Decimals: 6, Used: 0},
		{Index: "nuahp", Name: "NUAH+", Supply: 10000000000000, Decimals: 6, Used: 0},
		{Index: "aga", Name: "AGA", Supply: 10000000000000, Decimals: 6, Used: 0},
		{Index: "usd", Name: "USDn", Supply: 10000000000000, Decimals: 6, Used: 0},
		{Index: "eur", Name: "EURn", Supply: 10000000000000, Decimals: 6, Used: 0},
		{Index: "chf", Name: "CHFn", Supply: 10000000000000, Decimals: 6, Used: 0},
		{Index: "gbp", Name: "GBPn", Supply: 10000000000000, Decimals: 6, Used: 0},
		{Index: "aud", Name: "AUDn", Supply: 10000000000000, Decimals: 6, Used: 0},
		{Index: "nzd", Name: "NZDn", Supply: 10000000000000, Decimals: 6, Used: 0},
		{Index: "cad", Name: "CADn", Supply: 10000000000000, Decimals: 6, Used: 0},
		{Index: "jpy", Name: "JPYn", Supply: 10000000000000, Decimals: 6, Used: 0},
		{Index: "hkd", Name: "HKDn", Supply: 10000000000000, Decimals: 6, Used: 0},
		{Index: "sgd", Name: "SGDn", Supply: 10000000000000, Decimals: 6, Used: 0},
		{Index: "inr", Name: "INRn", Supply: 10000000000000, Decimals: 6, Used: 0},
		{Index: "brl", Name: "BRLn", Supply: 10000000000000, Decimals: 6, Used: 0},
		{Index: "cny", Name: "CNYn", Supply: 10000000000000, Decimals: 6, Used: 0},
		{Index: "zar", Name: "ZARn", Supply: 10000000000000, Decimals: 6, Used: 0},
	}

	for _, elem := range defaultTokensInfo {
		k.SetTokenInfo(ctx, elem)
	}
}

func (k Keeper) GetTokenPairs() [][2]string {
	return [][2]string{
		{"nuah", "nuahp"},
		{"nuah", "aga"},
		{"nuah", "eur"},
		{"nuah", "chf"},
		{"nuah", "gbp"},
		{"nuah", "aud"},
		{"nuah", "nzd"},
		{"nuah", "cad"},
		{"nuah", "jpy"},
		{"nuah", "hkd"},
		{"nuah", "sgd"},
		{"nuah", "inr"},
		{"nuah", "brl"},
		{"nuah", "cny"},
		{"nuah", "zar"},
		{"nuahp", "aga"},
		{"nuahp", "eur"},
		{"nuahp", "chf"},
		{"nuahp", "gbp"},
		{"nuahp", "aud"},
		{"nuahp", "nzd"},
		{"nuahp", "cad"},
		{"nuahp", "jpy"},
		{"nuahp", "hkd"},
		{"nuahp", "sgd"},
		{"nuahp", "inr"},
		{"nuahp", "brl"},
		{"nuahp", "cny"},
		{"nuahp", "zar"},
		{"aga", "eur"},
		{"aga", "chf"},
		{"aga", "gbp"},
		{"aga", "aud"},
		{"aga", "nzd"},
		{"aga", "cad"},
		{"aga", "jpy"},
		{"aga", "hkd"},
		{"aga", "sgd"},
		{"aga", "inr"},
		{"aga", "brl"},
		{"aga", "cny"},
		{"aga", "zar"},
		{"eur", "chf"},
		{"eur", "gbp"},
		{"eur", "aud"},
		{"eur", "nzd"},
		{"eur", "cad"},
		{"eur", "jpy"},
		{"eur", "hkd"},
		{"eur", "sgd"},
		{"eur", "inr"},
		{"eur", "brl"},
		{"eur", "cny"},
		{"eur", "zar"},
		{"chf", "gbp"},
		{"chf", "aud"},
		{"chf", "nzd"},
		{"chf", "cad"},
		{"chf", "jpy"},
		{"chf", "hkd"},
		{"chf", "sgd"},
		{"chf", "inr"},
		{"chf", "brl"},
		{"chf", "cny"},
		{"chf", "zar"},
		{"gbp", "aud"},
		{"gbp", "nzd"},
		{"gbp", "cad"},
		{"gbp", "jpy"},
		{"gbp", "hkd"},
		{"gbp", "sgd"},
		{"gbp", "inr"},
		{"gbp", "brl"},
		{"gbp", "cny"},
		{"gbp", "zar"},
		{"aud", "nzd"},
		{"aud", "cad"},
		{"aud", "jpy"},
		{"aud", "hkd"},
		{"aud", "sgd"},
		{"aud", "inr"},
		{"aud", "brl"},
		{"aud", "cny"},
		{"aud", "zar"},
		{"nzd", "cad"},
		{"nzd", "jpy"},
		{"nzd", "hkd"},
		{"nzd", "sgd"},
		{"nzd", "inr"},
		{"nzd", "brl"},
		{"nzd", "cny"},
		{"nzd", "zar"},
		{"cad", "jpy"},
		{"cad", "hkd"},
		{"cad", "sgd"},
		{"cad", "inr"},
		{"cad", "brl"},
		{"cad", "cny"},
		{"cad", "zar"},
		{"jpy", "hkd"},
		{"jpy", "sgd"},
		{"jpy", "inr"},
		{"jpy", "brl"},
		{"jpy", "cny"},
		{"jpy", "zar"},
		{"hkd", "sgd"},
		{"hkd", "inr"},
		{"hkd", "brl"},
		{"hkd", "cny"},
		{"hkd", "zar"},
		{"sgd", "inr"},
		{"sgd", "brl"},
		{"sgd", "cny"},
		{"sgd", "zar"},
		{"inr", "brl"},
		{"inr", "cny"},
		{"inr", "zar"},
		{"brl", "cny"},
		{"brl", "zar"},
		{"cny", "zar"},
		{"nuah", "usd"},
		{"nuahp", "usd"},
		{"aga", "usd"},
		{"eur", "usd"},
		{"chf", "usd"},
		{"gbp", "usd"},
		{"aud", "usd"},
		{"nzd", "usd"},
		{"cad", "usd"},
		{"jpy", "usd"},
		{"hkd", "usd"},
		{"sgd", "usd"},
		{"inr", "usd"},
		{"brl", "usd"},
		{"cny", "usd"},
		{"zar", "usd"},
	}
}
