package exchange

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"nuah/testutil/sample"
	exchangesimulation "nuah/x/exchange/simulation"
	"nuah/x/exchange/types"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = exchangesimulation.FindAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
	_ = rand.Rand{}
)

const (
	opWeightMsgCreatePair = "op_weight_msg_create_pair"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreatePair int = 100

	opWeightMsgSendBuyOrder = "op_weight_msg_send_buy_order"
	// TODO: Determine the simulation weight value
	defaultWeightMsgSendBuyOrder int = 100

	opWeightMsgSendSellOrder = "op_weight_msg_send_sell_order"
	// TODO: Determine the simulation weight value
	defaultWeightMsgSendSellOrder int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module.
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	exchangeGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&exchangeGenesis)
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

	var weightMsgCreatePair int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreatePair, &weightMsgCreatePair, nil,
		func(_ *rand.Rand) {
			weightMsgCreatePair = defaultWeightMsgCreatePair
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreatePair,
		exchangesimulation.SimulateMsgCreatePair(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgSendBuyOrder int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgSendBuyOrder, &weightMsgSendBuyOrder, nil,
		func(_ *rand.Rand) {
			weightMsgSendBuyOrder = defaultWeightMsgSendBuyOrder
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgSendBuyOrder,
		exchangesimulation.SimulateMsgSendBuyOrder(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgSendSellOrder int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgSendSellOrder, &weightMsgSendSellOrder, nil,
		func(_ *rand.Rand) {
			weightMsgSendSellOrder = defaultWeightMsgSendSellOrder
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgSendSellOrder,
		exchangesimulation.SimulateMsgSendSellOrder(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}

// ProposalMsgs returns msgs used for governance proposals for simulations.
func (am AppModule) ProposalMsgs(simState module.SimulationState) []simtypes.WeightedProposalMsg {
	return []simtypes.WeightedProposalMsg{
		simulation.NewWeightedProposalMsg(
			opWeightMsgCreatePair,
			defaultWeightMsgCreatePair,
			func(r *rand.Rand, ctx sdk.Context, accs []simtypes.Account) sdk.Msg {
				exchangesimulation.SimulateMsgCreatePair(am.accountKeeper, am.bankKeeper, am.keeper)
				return nil
			},
		),
		simulation.NewWeightedProposalMsg(
			opWeightMsgSendBuyOrder,
			defaultWeightMsgSendBuyOrder,
			func(r *rand.Rand, ctx sdk.Context, accs []simtypes.Account) sdk.Msg {
				exchangesimulation.SimulateMsgSendBuyOrder(am.accountKeeper, am.bankKeeper, am.keeper)
				return nil
			},
		),
		simulation.NewWeightedProposalMsg(
			opWeightMsgSendSellOrder,
			defaultWeightMsgSendSellOrder,
			func(r *rand.Rand, ctx sdk.Context, accs []simtypes.Account) sdk.Msg {
				exchangesimulation.SimulateMsgSendSellOrder(am.accountKeeper, am.bankKeeper, am.keeper)
				return nil
			},
		),
		// this line is used by starport scaffolding # simapp/module/OpMsg
	}
}
