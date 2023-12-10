package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	keepertest "nuah/testutil/keeper"
	"nuah/testutil/nullify"
	"nuah/x/oracles/keeper"
	"nuah/x/oracles/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNData(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Data {
	items := make([]types.Data, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)

		keeper.SetData(ctx, items[i])
	}
	return items
}

func TestDataGet(t *testing.T) {
	keeper, ctx := keepertest.OraclesKeeper(t)
	items := createNData(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetData(ctx,
			item.Index,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestDataRemove(t *testing.T) {
	keeper, ctx := keepertest.OraclesKeeper(t)
	items := createNData(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveData(ctx,
			item.Index,
		)
		_, found := keeper.GetData(ctx,
			item.Index,
		)
		require.False(t, found)
	}
}

func TestDataGetAll(t *testing.T) {
	keeper, ctx := keepertest.OraclesKeeper(t)
	items := createNData(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllData(ctx)),
	)
}
