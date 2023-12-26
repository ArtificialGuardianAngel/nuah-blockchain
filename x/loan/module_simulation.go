package loan

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"nuah/testutil/sample"
	loansimulation "nuah/x/loan/simulation"
	"nuah/x/loan/types"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = loansimulation.FindAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
	_ = rand.Rand{}
)

const (
	opWeightMsgCreateRequest = "op_weight_msg_create_request"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateRequest int = 100

	opWeightMsgCreateRequestBook = "op_weight_msg_create_request_book"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateRequestBook int = 100

	opWeightMsgAcceptRequest = "op_weight_msg_accept_request"
	// TODO: Determine the simulation weight value
	defaultWeightMsgAcceptRequest int = 100

	opWeightMsgDeclineRequest = "op_weight_msg_decline_request"
	// TODO: Determine the simulation weight value
	defaultWeightMsgDeclineRequest int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module.
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	loanGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&loanGenesis)
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

	var weightMsgCreateRequest int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreateRequest, &weightMsgCreateRequest, nil,
		func(_ *rand.Rand) {
			weightMsgCreateRequest = defaultWeightMsgCreateRequest
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateRequest,
		loansimulation.SimulateMsgCreateRequest(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgCreateRequestBook int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreateRequestBook, &weightMsgCreateRequestBook, nil,
		func(_ *rand.Rand) {
			weightMsgCreateRequestBook = defaultWeightMsgCreateRequestBook
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateRequestBook,
		loansimulation.SimulateMsgCreateRequestBook(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgAcceptRequest int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgAcceptRequest, &weightMsgAcceptRequest, nil,
		func(_ *rand.Rand) {
			weightMsgAcceptRequest = defaultWeightMsgAcceptRequest
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgAcceptRequest,
		loansimulation.SimulateMsgAcceptRequest(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgDeclineRequest int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgDeclineRequest, &weightMsgDeclineRequest, nil,
		func(_ *rand.Rand) {
			weightMsgDeclineRequest = defaultWeightMsgDeclineRequest
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgDeclineRequest,
		loansimulation.SimulateMsgDeclineRequest(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}

// ProposalMsgs returns msgs used for governance proposals for simulations.
func (am AppModule) ProposalMsgs(simState module.SimulationState) []simtypes.WeightedProposalMsg {
	return []simtypes.WeightedProposalMsg{
		simulation.NewWeightedProposalMsg(
			opWeightMsgCreateRequest,
			defaultWeightMsgCreateRequest,
			func(r *rand.Rand, ctx sdk.Context, accs []simtypes.Account) sdk.Msg {
				loansimulation.SimulateMsgCreateRequest(am.accountKeeper, am.bankKeeper, am.keeper)
				return nil
			},
		),
		simulation.NewWeightedProposalMsg(
			opWeightMsgCreateRequestBook,
			defaultWeightMsgCreateRequestBook,
			func(r *rand.Rand, ctx sdk.Context, accs []simtypes.Account) sdk.Msg {
				loansimulation.SimulateMsgCreateRequestBook(am.accountKeeper, am.bankKeeper, am.keeper)
				return nil
			},
		),
		simulation.NewWeightedProposalMsg(
			opWeightMsgAcceptRequest,
			defaultWeightMsgAcceptRequest,
			func(r *rand.Rand, ctx sdk.Context, accs []simtypes.Account) sdk.Msg {
				loansimulation.SimulateMsgAcceptRequest(am.accountKeeper, am.bankKeeper, am.keeper)
				return nil
			},
		),
		simulation.NewWeightedProposalMsg(
			opWeightMsgDeclineRequest,
			defaultWeightMsgDeclineRequest,
			func(r *rand.Rand, ctx sdk.Context, accs []simtypes.Account) sdk.Msg {
				loansimulation.SimulateMsgDeclineRequest(am.accountKeeper, am.bankKeeper, am.keeper)
				return nil
			},
		),
		// this line is used by starport scaffolding # simapp/module/OpMsg
	}
}
