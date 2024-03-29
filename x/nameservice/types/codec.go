package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgSetName{}, "nameservice/SetName", nil)
	cdc.RegisterConcrete(&MsgTransferName{}, "nameservice/TransferName", nil)
	cdc.RegisterConcrete(&MsgDeleteName{}, "nameservice/DeleteName", nil)
	cdc.RegisterConcrete(&MsgCheckName{}, "nameservice/CheckName", nil)
	// this line is used by starport scaffolding # 2
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgSetName{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgTransferName{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgDeleteName{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCheckName{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
