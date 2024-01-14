package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgCreatePair{}, "exchange/CreatePair", nil)
	cdc.RegisterConcrete(&MsgSendBuyOrder{}, "exchange/SendBuyOrder", nil)
	cdc.RegisterConcrete(&MsgSendSellOrder{}, "exchange/SendSellOrder", nil)
	// this line is used by starport scaffolding # 2
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreatePair{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgSendBuyOrder{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgSendSellOrder{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
