package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "nuah/testutil/keeper"
	"nuah/x/oracles/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.OraclesKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
