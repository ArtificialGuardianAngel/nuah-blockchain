package exchange

import (
	"nuah/x/exchange/keeper"
	"nuah/x/exchange/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// defaultStableSupply

// InitGenesis initializes the module's state from a provided genesis state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the sellOrderBook
	for _, elem := range genState.SellOrderBookList {
		k.SetSellOrderBook(ctx, elem)
	}
	// Set all the buyOrderBook
	for _, elem := range genState.BuyOrderBookList {
		k.SetBuyOrderBook(ctx, elem)
	}
	// Set all the denomTrace
	for _, elem := range genState.DenomTraceList {
		k.SetDenomTrace(ctx, elem)
	}
	// Set all the stableSupply
	for _, elem := range genState.StableSupplyList {
		k.SetStableSupply(ctx, elem)
	}
	if len(genState.StableSupplyList) == 0 {
		for _, elem := range k.NewStableSupply() {
			k.SetStableSupply(ctx, elem)
			// k.CreatePair(ctx, &types.MsgSendCreatePair{SourceDenom: elem.Denom, TargetDenom: "USDn", Creator: "system", TimeoutTimestamp: 999999999999999})
		}
	}

	// Set stableSupply count
	k.SetStableSupplyCount(ctx, genState.StableSupplyCount)
	// this line is used by starport scaffolding # genesis/module/init
	k.SetPort(ctx, genState.PortId)
	// Only try to bind to port if it is not already bound, since we may already own
	// port capability from capability InitGenesis
	if !k.IsBound(ctx, genState.PortId) {
		// module binds to the port on InitChain
		// and claims the returned capability
		err := k.BindPort(ctx, genState.PortId)
		if err != nil {
			panic("could not claim port capability: " + err.Error())
		}
	}
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the module's exported genesis
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	genesis.PortId = k.GetPort(ctx)
	genesis.SellOrderBookList = k.GetAllSellOrderBook(ctx)
	genesis.BuyOrderBookList = k.GetAllBuyOrderBook(ctx)
	genesis.DenomTraceList = k.GetAllDenomTrace(ctx)
	genesis.StableSupplyList = k.GetAllStableSupply(ctx)
	genesis.StableSupplyCount = k.GetStableSupplyCount(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
