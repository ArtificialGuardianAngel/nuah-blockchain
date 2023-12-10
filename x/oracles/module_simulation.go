package oracles

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"nuah/testutil/sample"
	oraclessimulation "nuah/x/oracles/simulation"
	"nuah/x/oracles/types"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = oraclessimulation.FindAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
	_ = rand.Rand{}
)

const (
	opWeightMsgCreateData = "op_weight_msg_data"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateData int = 100

	opWeightMsgUpdateData = "op_weight_msg_data"
	// TODO: Determine the simulation weight value
	defaultWeightMsgUpdateData int = 100

	opWeightMsgDeleteData = "op_weight_msg_data"
	// TODO: Determine the simulation weight value
	defaultWeightMsgDeleteData int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module.
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	oraclesGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		PortId: types.PortID,
		DataList: []types.Data{
			{
				Creator: sample.AccAddress(),
				Index:   "0",
			},
			{
				Creator: sample.AccAddress(),
				Index:   "1",
			},
		},
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&oraclesGenesis)
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

	var weightMsgCreateData int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreateData, &weightMsgCreateData, nil,
		func(_ *rand.Rand) {
			weightMsgCreateData = defaultWeightMsgCreateData
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateData,
		oraclessimulation.SimulateMsgCreateData(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgUpdateData int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgUpdateData, &weightMsgUpdateData, nil,
		func(_ *rand.Rand) {
			weightMsgUpdateData = defaultWeightMsgUpdateData
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgUpdateData,
		oraclessimulation.SimulateMsgUpdateData(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgDeleteData int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgDeleteData, &weightMsgDeleteData, nil,
		func(_ *rand.Rand) {
			weightMsgDeleteData = defaultWeightMsgDeleteData
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgDeleteData,
		oraclessimulation.SimulateMsgDeleteData(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}

// ProposalMsgs returns msgs used for governance proposals for simulations.
func (am AppModule) ProposalMsgs(simState module.SimulationState) []simtypes.WeightedProposalMsg {
	return []simtypes.WeightedProposalMsg{
		simulation.NewWeightedProposalMsg(
			opWeightMsgCreateData,
			defaultWeightMsgCreateData,
			func(r *rand.Rand, ctx sdk.Context, accs []simtypes.Account) sdk.Msg {
				oraclessimulation.SimulateMsgCreateData(am.accountKeeper, am.bankKeeper, am.keeper)
				return nil
			},
		),
		simulation.NewWeightedProposalMsg(
			opWeightMsgUpdateData,
			defaultWeightMsgUpdateData,
			func(r *rand.Rand, ctx sdk.Context, accs []simtypes.Account) sdk.Msg {
				oraclessimulation.SimulateMsgUpdateData(am.accountKeeper, am.bankKeeper, am.keeper)
				return nil
			},
		),
		simulation.NewWeightedProposalMsg(
			opWeightMsgDeleteData,
			defaultWeightMsgDeleteData,
			func(r *rand.Rand, ctx sdk.Context, accs []simtypes.Account) sdk.Msg {
				oraclessimulation.SimulateMsgDeleteData(am.accountKeeper, am.bankKeeper, am.keeper)
				return nil
			},
		),
		// this line is used by starport scaffolding # simapp/module/OpMsg
	}
}
