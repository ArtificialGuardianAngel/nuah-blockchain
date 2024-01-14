package exchange

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"nuah/x/exchange/keeper"
	"nuah/x/exchange/types"
)

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
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the module's exported genesis
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	genesis.SellOrderBookList = k.GetAllSellOrderBook(ctx)
	genesis.BuyOrderBookList = k.GetAllBuyOrderBook(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
