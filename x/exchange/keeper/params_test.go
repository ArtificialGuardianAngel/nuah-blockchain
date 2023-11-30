package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "nuah/testutil/keeper"
	"nuah/x/exchange/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.ExchangeKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
