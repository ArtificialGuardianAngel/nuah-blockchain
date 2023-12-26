package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	keepertest "nuah/testutil/keeper"
	"nuah/testutil/nullify"
	"nuah/x/nameservice/keeper"
	"nuah/x/nameservice/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNWhoisByValue(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.WhoisByValue {
	items := make([]types.WhoisByValue, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)

		keeper.SetWhoisByValue(ctx, items[i])
	}
	return items
}

func TestWhoisByValueGet(t *testing.T) {
	keeper, ctx := keepertest.NameserviceKeeper(t)
	items := createNWhoisByValue(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetWhoisByValue(ctx,
			item.Index,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestWhoisByValueRemove(t *testing.T) {
	keeper, ctx := keepertest.NameserviceKeeper(t)
	items := createNWhoisByValue(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveWhoisByValue(ctx,
			item.Index,
		)
		_, found := keeper.GetWhoisByValue(ctx,
			item.Index,
		)
		require.False(t, found)
	}
}

func TestWhoisByValueGetAll(t *testing.T) {
	keeper, ctx := keepertest.NameserviceKeeper(t)
	items := createNWhoisByValue(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllWhoisByValue(ctx)),
	)
}
