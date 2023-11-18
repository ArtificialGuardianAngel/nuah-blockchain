package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgTransferName = "transfer_name"

var _ sdk.Msg = &MsgTransferName{}

func NewMsgTransferName(creator string, name string, value string) *MsgTransferName {
	return &MsgTransferName{
		Creator: creator,
		Name:    name,
		Value:   value,
	}
}

func (msg *MsgTransferName) Route() string {
	return RouterKey
}

func (msg *MsgTransferName) Type() string {
	return TypeMsgTransferName
}

func (msg *MsgTransferName) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgTransferName) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgTransferName) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
