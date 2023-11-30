package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgCheckName = "check_name"

var _ sdk.Msg = &MsgCheckName{}

func NewMsgCheckName(creator string, name string) *MsgCheckName {
	return &MsgCheckName{
		Creator: creator,
		Name:    name,
	}
}

func (msg *MsgCheckName) Route() string {
	return RouterKey
}

func (msg *MsgCheckName) Type() string {
	return TypeMsgCheckName
}

func (msg *MsgCheckName) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCheckName) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCheckName) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
