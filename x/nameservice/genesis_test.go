package nameservice_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "nuah/testutil/keeper"
	"nuah/testutil/nullify"
	"nuah/x/nameservice"
	"nuah/x/nameservice/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		WhoisList: []types.Whois{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		WhoisByValueList: []types.WhoisByValue{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.NameserviceKeeper(t)
	nameservice.InitGenesis(ctx, *k, genesisState)
	got := nameservice.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.WhoisList, got.WhoisList)
	require.ElementsMatch(t, genesisState.WhoisByValueList, got.WhoisByValueList)
	// this line is used by starport scaffolding # genesis/test/assert
}
