package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgSendSellOrder = "send_sell_order"

var _ sdk.Msg = &MsgSendSellOrder{}

func NewMsgSendSellOrder(creator string, amountDenom string, amount uint64, priceDenom string, price uint64) *MsgSendSellOrder {
	return &MsgSendSellOrder{
		Creator:     creator,
		AmountDenom: amountDenom,
		Amount:      amount,
		PriceDenom:  priceDenom,
		Price:       price,
	}
}

func (msg *MsgSendSellOrder) Route() string {
	return RouterKey
}

func (msg *MsgSendSellOrder) Type() string {
	return TypeMsgSendSellOrder
}

func (msg *MsgSendSellOrder) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSendSellOrder) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSendSellOrder) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
