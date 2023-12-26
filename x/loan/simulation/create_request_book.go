package simulation

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"nuah/x/loan/keeper"
	"nuah/x/loan/types"
)

func SimulateMsgCreateRequestBook(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgCreateRequestBook{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the CreateRequestBook simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "CreateRequestBook simulation not implemented"), nil, nil
	}
}
