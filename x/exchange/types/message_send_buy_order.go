package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgSendBuyOrder = "send_buy_order"

var _ sdk.Msg = &MsgSendBuyOrder{}

func NewMsgSendBuyOrder(creator string, amountDenom string, amount int32, priceDenom string, price int32) *MsgSendBuyOrder {
	return &MsgSendBuyOrder{
		Creator:     creator,
		AmountDenom: amountDenom,
		Amount:      amount,
		PriceDenom:  priceDenom,
		Price:       price,
	}
}

func (msg *MsgSendBuyOrder) Route() string {
	return RouterKey
}

func (msg *MsgSendBuyOrder) Type() string {
	return TypeMsgSendBuyOrder
}

func (msg *MsgSendBuyOrder) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSendBuyOrder) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSendBuyOrder) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
