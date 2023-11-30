package nameservice

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"nuah/testutil/sample"
	nameservicesimulation "nuah/x/nameservice/simulation"
	"nuah/x/nameservice/types"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = nameservicesimulation.FindAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
	_ = rand.Rand{}
)

const (
	opWeightMsgSetName = "op_weight_msg_set_name"
	// TODO: Determine the simulation weight value
	defaultWeightMsgSetName int = 100

	opWeightMsgTransferName = "op_weight_msg_transfer_name"
	// TODO: Determine the simulation weight value
	defaultWeightMsgTransferName int = 100

	opWeightMsgDeleteName = "op_weight_msg_delete_name"
	// TODO: Determine the simulation weight value
	defaultWeightMsgDeleteName int = 100

	opWeightMsgCheckName = "op_weight_msg_check_name"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCheckName int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module.
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	nameserviceGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&nameserviceGenesis)
}

// RegisterStoreDecoder registers a decoder.
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// ProposalContents doesn't return any content functions for governance proposals.
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgSetName int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgSetName, &weightMsgSetName, nil,
		func(_ *rand.Rand) {
			weightMsgSetName = defaultWeightMsgSetName
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgSetName,
		nameservicesimulation.SimulateMsgSetName(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgTransferName int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgTransferName, &weightMsgTransferName, nil,
		func(_ *rand.Rand) {
			weightMsgTransferName = defaultWeightMsgTransferName
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgTransferName,
		nameservicesimulation.SimulateMsgTransferName(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgDeleteName int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgDeleteName, &weightMsgDeleteName, nil,
		func(_ *rand.Rand) {
			weightMsgDeleteName = defaultWeightMsgDeleteName
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgDeleteName,
		nameservicesimulation.SimulateMsgDeleteName(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgCheckName int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCheckName, &weightMsgCheckName, nil,
		func(_ *rand.Rand) {
			weightMsgCheckName = defaultWeightMsgCheckName
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCheckName,
		nameservicesimulation.SimulateMsgCheckName(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}

// ProposalMsgs returns msgs used for governance proposals for simulations.
func (am AppModule) ProposalMsgs(simState module.SimulationState) []simtypes.WeightedProposalMsg {
	return []simtypes.WeightedProposalMsg{
		simulation.NewWeightedProposalMsg(
			opWeightMsgSetName,
			defaultWeightMsgSetName,
			func(r *rand.Rand, ctx sdk.Context, accs []simtypes.Account) sdk.Msg {
				nameservicesimulation.SimulateMsgSetName(am.accountKeeper, am.bankKeeper, am.keeper)
				return nil
			},
		),
		simulation.NewWeightedProposalMsg(
			opWeightMsgTransferName,
			defaultWeightMsgTransferName,
			func(r *rand.Rand, ctx sdk.Context, accs []simtypes.Account) sdk.Msg {
				nameservicesimulation.SimulateMsgTransferName(am.accountKeeper, am.bankKeeper, am.keeper)
				return nil
			},
		),
		simulation.NewWeightedProposalMsg(
			opWeightMsgDeleteName,
			defaultWeightMsgDeleteName,
			func(r *rand.Rand, ctx sdk.Context, accs []simtypes.Account) sdk.Msg {
				nameservicesimulation.SimulateMsgDeleteName(am.accountKeeper, am.bankKeeper, am.keeper)
				return nil
			},
		),
		simulation.NewWeightedProposalMsg(
			opWeightMsgCheckName,
			defaultWeightMsgCheckName,
			func(r *rand.Rand, ctx sdk.Context, accs []simtypes.Account) sdk.Msg {
				nameservicesimulation.SimulateMsgCheckName(am.accountKeeper, am.bankKeeper, am.keeper)
				return nil
			},
		),
		// this line is used by starport scaffolding # simapp/module/OpMsg
	}
}
