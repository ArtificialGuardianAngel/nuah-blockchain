package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgAcceptRequest = "accept_request"

var _ sdk.Msg = &MsgAcceptRequest{}

func NewMsgAcceptRequest(creator string, id int32) *MsgAcceptRequest {
	return &MsgAcceptRequest{
		Creator: creator,
		Id:      id,
	}
}

func (msg *MsgAcceptRequest) Route() string {
	return RouterKey
}

func (msg *MsgAcceptRequest) Type() string {
	return TypeMsgAcceptRequest
}

func (msg *MsgAcceptRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAcceptRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAcceptRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
