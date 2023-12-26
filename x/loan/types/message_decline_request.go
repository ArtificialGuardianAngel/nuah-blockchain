package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgDeclineRequest = "decline_request"

var _ sdk.Msg = &MsgDeclineRequest{}

func NewMsgDeclineRequest(creator string, id int32) *MsgDeclineRequest {
	return &MsgDeclineRequest{
		Creator: creator,
		Id:      id,
	}
}

func (msg *MsgDeclineRequest) Route() string {
	return RouterKey
}

func (msg *MsgDeclineRequest) Type() string {
	return TypeMsgDeclineRequest
}

func (msg *MsgDeclineRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeclineRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeclineRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
