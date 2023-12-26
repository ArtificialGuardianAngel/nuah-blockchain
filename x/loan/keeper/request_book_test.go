package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	keepertest "nuah/testutil/keeper"
	"nuah/testutil/nullify"
	"nuah/x/loan/keeper"
	"nuah/x/loan/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNRequestBook(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.RequestBook {
	items := make([]types.RequestBook, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)

		keeper.SetRequestBook(ctx, items[i])
	}
	return items
}

func TestRequestBookGet(t *testing.T) {
	keeper, ctx := keepertest.LoanKeeper(t)
	items := createNRequestBook(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetRequestBook(ctx,
			item.Index,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestRequestBookRemove(t *testing.T) {
	keeper, ctx := keepertest.LoanKeeper(t)
	items := createNRequestBook(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveRequestBook(ctx,
			item.Index,
		)
		_, found := keeper.GetRequestBook(ctx,
			item.Index,
		)
		require.False(t, found)
	}
}

func TestRequestBookGetAll(t *testing.T) {
	keeper, ctx := keepertest.LoanKeeper(t)
	items := createNRequestBook(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllRequestBook(ctx)),
	)
}
