package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	keepertest "nuah/testutil/keeper"
	"nuah/testutil/nullify"
	"nuah/x/exchange/keeper"
	"nuah/x/exchange/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNTokenInfo(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.TokenInfo {
	items := make([]types.TokenInfo, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)

		keeper.SetTokenInfo(ctx, items[i])
	}
	return items
}

func TestTokenInfoGet(t *testing.T) {
	keeper, ctx := keepertest.ExchangeKeeper(t)
	items := createNTokenInfo(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetTokenInfo(ctx,
			item.Index,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestTokenInfoRemove(t *testing.T) {
	keeper, ctx := keepertest.ExchangeKeeper(t)
	items := createNTokenInfo(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveTokenInfo(ctx,
			item.Index,
		)
		_, found := keeper.GetTokenInfo(ctx,
			item.Index,
		)
		require.False(t, found)
	}
}

func TestTokenInfoGetAll(t *testing.T) {
	keeper, ctx := keepertest.ExchangeKeeper(t)
	items := createNTokenInfo(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllTokenInfo(ctx)),
	)
}
