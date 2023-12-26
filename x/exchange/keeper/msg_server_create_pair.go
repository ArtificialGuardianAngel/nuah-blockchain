package keeper

import (
	"context"

	"errors"
	"nuah/x/exchange/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	// clienttypes "github.com/cosmos/ibc-go/v7/modules/core/02-client/types"
)

func (k msgServer) SendCreatePair(goCtx context.Context, msg *types.MsgSendCreatePair) (*types.MsgSendCreatePairResponse, error) {

	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get an order book index
	pairIndex := types.OrderBookIndex(msg.SourceDenom, msg.TargetDenom)

	// If an order book is found, return an error
	_, found := k.GetSellOrderBook(ctx, pairIndex)
	if found {
		return &types.MsgSendCreatePairResponse{}, errors.New("the pair already exist")
	}

	// Construct the packet
	book := types.NewBuyOrderBook(msg.SourceDenom, msg.TargetDenom)

	// Assign order book index
	book.Index = pairIndex

	// Save the order book to the store
	k.SetBuyOrderBook(ctx, book)

	// Transmit the packet
	// _, err := k.TransmitCreatePairPacket(
	// 	ctx,
	// 	packet,
	// 	clienttypes.ZeroHeight(),
	// 	msg.TimeoutTimestamp,
	// )
	// if err != nil {
	// 	return nil, err
	// }

	return &types.MsgSendCreatePairResponse{}, nil
}
