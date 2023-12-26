package loan

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"nuah/x/loan/keeper"
	"nuah/x/loan/types"
)

// InitGenesis initializes the module's state from a provided genesis state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the requestBook
	for _, elem := range genState.RequestBookList {
		k.SetRequestBook(ctx, elem)
	}
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the module's exported genesis
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	genesis.RequestBookList = k.GetAllRequestBook(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
