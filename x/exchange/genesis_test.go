package exchange_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "nuah/testutil/keeper"
	"nuah/testutil/nullify"
	"nuah/x/exchange"
	"nuah/x/exchange/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),
		PortId: types.PortID,
		SellOrderBookList: []types.SellOrderBook{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		BuyOrderBookList: []types.BuyOrderBook{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		DenomTraceList: []types.DenomTrace{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		StableSupplyList: []types.StableSupply{
			{
				Id: 0,
			},
			{
				Id: 1,
			},
		},
		StableSupplyCount: 2,
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.ExchangeKeeper(t)
	exchange.InitGenesis(ctx, *k, genesisState)
	got := exchange.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.Equal(t, genesisState.PortId, got.PortId)

	require.ElementsMatch(t, genesisState.SellOrderBookList, got.SellOrderBookList)
	require.ElementsMatch(t, genesisState.BuyOrderBookList, got.BuyOrderBookList)
	require.ElementsMatch(t, genesisState.DenomTraceList, got.DenomTraceList)
	require.ElementsMatch(t, genesisState.StableSupplyList, got.StableSupplyList)
	require.Equal(t, genesisState.StableSupplyCount, got.StableSupplyCount)
	// this line is used by starport scaffolding # genesis/test/assert
}
