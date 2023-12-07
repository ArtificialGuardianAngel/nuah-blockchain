package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgSendCreatePair{}, "exchange/SendCreatePair", nil)
	cdc.RegisterConcrete(&MsgSendSellOrder{}, "exchange/SendSellOrder", nil)
	cdc.RegisterConcrete(&MsgSendBuyOrder{}, "exchange/SendBuyOrder", nil)
	cdc.RegisterConcrete(&MsgCancelSellOrder{}, "exchange/CancelSellOrder", nil)
	cdc.RegisterConcrete(&MsgCancelBuyOrder{}, "exchange/CancelBuyOrder", nil)
	// this line is used by starport scaffolding # 2
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgSendCreatePair{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgSendSellOrder{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgSendBuyOrder{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCancelSellOrder{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCancelBuyOrder{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
