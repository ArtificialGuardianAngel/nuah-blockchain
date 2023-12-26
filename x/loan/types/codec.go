package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgCreateRequest{}, "loan/CreateRequest", nil)
	cdc.RegisterConcrete(&MsgCreateRequestBook{}, "loan/CreateRequestBook", nil)
	cdc.RegisterConcrete(&MsgAcceptRequest{}, "loan/AcceptRequest", nil)
	cdc.RegisterConcrete(&MsgDeclineRequest{}, "loan/DeclineRequest", nil)
	// this line is used by starport scaffolding # 2
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateRequest{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateRequestBook{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgAcceptRequest{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgDeclineRequest{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
