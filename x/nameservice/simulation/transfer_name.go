package simulation

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"nuah/x/nameservice/keeper"
	"nuah/x/nameservice/types"
)

func SimulateMsgTransferName(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgTransferName{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the TransferName simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "TransferName simulation not implemented"), nil, nil
	}
}
