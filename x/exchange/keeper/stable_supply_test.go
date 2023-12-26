package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	keepertest "nuah/testutil/keeper"
	"nuah/testutil/nullify"
	"nuah/x/exchange/keeper"
	"nuah/x/exchange/types"
)

func createNStableSupply(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.StableSupply {
	items := make([]types.StableSupply, n)
	for i := range items {
		items[i].Id = keeper.AppendStableSupply(ctx, items[i])
	}
	return items
}

func TestStableSupplyGet(t *testing.T) {
	keeper, ctx := keepertest.ExchangeKeeper(t)
	items := createNStableSupply(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetStableSupply(ctx, item.Id)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&got),
		)
	}
}

func TestStableSupplyRemove(t *testing.T) {
	keeper, ctx := keepertest.ExchangeKeeper(t)
	items := createNStableSupply(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveStableSupply(ctx, item.Id)
		_, found := keeper.GetStableSupply(ctx, item.Id)
		require.False(t, found)
	}
}

func TestStableSupplyGetAll(t *testing.T) {
	keeper, ctx := keepertest.ExchangeKeeper(t)
	items := createNStableSupply(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllStableSupply(ctx)),
	)
}

func TestStableSupplyCount(t *testing.T) {
	keeper, ctx := keepertest.ExchangeKeeper(t)
	items := createNStableSupply(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetStableSupplyCount(ctx))
}
