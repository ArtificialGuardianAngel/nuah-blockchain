package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgCreateRequestBook = "create_request_book"

var _ sdk.Msg = &MsgCreateRequestBook{}

func NewMsgCreateRequestBook(creator string, to string, amount string, denom string) *MsgCreateRequestBook {
	return &MsgCreateRequestBook{
		Creator: creator,
		To:      to,
	}
}

func (msg *MsgCreateRequestBook) Route() string {
	return RouterKey
}

func (msg *MsgCreateRequestBook) Type() string {
	return TypeMsgCreateRequestBook
}

func (msg *MsgCreateRequestBook) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateRequestBook) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateRequestBook) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
