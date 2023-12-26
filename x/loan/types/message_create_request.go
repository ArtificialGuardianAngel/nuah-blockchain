package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgCreateRequest = "create_request"

var _ sdk.Msg = &MsgCreateRequest{}

func NewMsgCreateRequest(creator string, to string, amount int32, denom string) *MsgCreateRequest {
	return &MsgCreateRequest{
		Creator: creator,
		To:      to,
		Amount:  amount,
		Denom:   denom,
	}
}

func (msg *MsgCreateRequest) Route() string {
	return RouterKey
}

func (msg *MsgCreateRequest) Type() string {
	return TypeMsgCreateRequest
}

func (msg *MsgCreateRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
