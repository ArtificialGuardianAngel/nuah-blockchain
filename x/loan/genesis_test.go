package loan_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "nuah/testutil/keeper"
	"nuah/testutil/nullify"
	"nuah/x/loan"
	"nuah/x/loan/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		RequestBookList: []types.RequestBook{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.LoanKeeper(t)
	loan.InitGenesis(ctx, *k, genesisState)
	got := loan.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.RequestBookList, got.RequestBookList)
	// this line is used by starport scaffolding # genesis/test/assert
}
