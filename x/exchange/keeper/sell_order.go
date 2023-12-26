package keeper

import (
	"errors"

	"nuah/x/exchange/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	clienttypes "github.com/cosmos/ibc-go/v7/modules/core/02-client/types"
	channeltypes "github.com/cosmos/ibc-go/v7/modules/core/04-channel/types"
	// host "github.com/cosmos/ibc-go/v7/modules/core/24-host"
)

// TransmitSellOrderPacket transmits the packet over IBC with the specified source port and source channel
func (k Keeper) TransmitSellOrderPacket(
	ctx sdk.Context,
	packetData types.SellOrderPacketData,
	timeoutHeight clienttypes.Height,
	timeoutTimestamp uint64,
) (uint64, error) {
	// channelCap, ok := k.scopedKeeper.GetCapability(ctx, host.ChannelCapabilityPath(sourcePort, sourceChannel))
	// if !ok {
	// 	return 0, sdkerrors.Wrap(channeltypes.ErrChannelCapabilityNotFound, "module does not own channel capability")
	// }
	return 0, sdkerrors.Wrap(channeltypes.ErrChannelCapabilityNotFound, "module does not own channel capability")

	// packetBytes, err := packetData.GetBytes()
	// if err != nil {
	// 	return 0, sdkerrors.Wrapf(sdkerrors.ErrJSONMarshal, "cannot marshal the packet: %w", err)
	// }

	// return k.channelKeeper.SendPacket(ctx, channelCap, sourcePort, sourceChannel, timeoutHeight, timeoutTimestamp, packetBytes)
}

// OnRecvSellOrderPacket processes packet reception
func (k Keeper) OnRecvSellOrderPacket(ctx sdk.Context, packet channeltypes.Packet, data types.SellOrderPacketData) (packetAck types.SellOrderPacketAck, err error) {
	// if err := data.ValidateBasic(); err != nil {
	// 	return packetAck, err
	// }

	// book, found := k.GetBuyOrderBook(ctx, pairIndex)
	// pairIndex := types.OrderBookIndex(packet.SourcePort, packet.SourceChannel, data.AmountDenom, data.PriceDenom)
	// if !found {
	// 	return packetAck, errors.New("the pair doesn't exist")
	// }

	// // Fill sell order
	// remaining, liquidated, gain, _ := book.FillSellOrder(types.Order{
	// 	Amount: data.Amount,
	// 	Price:  data.Price,
	// })

	// // Return remaining amount and gains
	// packetAck.RemainingAmount = remaining.Amount
	// packetAck.Gain = gain

	// // Before distributing sales, we resolve the denom
	// // First we check if the denom received comes from this chain originally
	// finalAmountDenom, saved := k.OriginalDenom(ctx, packet.DestinationPort, packet.DestinationChannel, data.AmountDenom)
	// if !saved {
	// 	// If it was not from this chain we use voucher as denom
	// 	finalAmountDenom = VoucherDenom(packet.SourcePort, packet.SourceChannel, data.AmountDenom)
	// }

	// // Dispatch liquidated buy orders
	// for _, liquidation := range liquidated {
	// 	liquidation := liquidation
	// 	addr, err := sdk.AccAddressFromBech32(liquidation.Creator)
	// 	if err != nil {
	// 		return packetAck, err
	// 	}

	// 	if err := k.SafeMint(ctx, packet.DestinationPort, packet.DestinationChannel, addr, finalAmountDenom, liquidation.Amount); err != nil {
	// 		return packetAck, err
	// 	}
	// }

	// // Save the new order book
	// k.SetBuyOrderBook(ctx, book)

	return packetAck, nil
}

// OnAcknowledgementSellOrderPacket responds to the the success or failure of a packet
// acknowledgement written on the receiving chain.
func (k Keeper) OnAcknowledgementSellOrderPacket(ctx sdk.Context, packet channeltypes.Packet, data types.SellOrderPacketData, ack channeltypes.Acknowledgement) error {
	switch dispatchedAck := ack.Response.(type) {
	case *channeltypes.Acknowledgement_Error:
		// In case of error we mint back the native token
		receiver, err := sdk.AccAddressFromBech32(data.Seller)
		if err != nil {
			return err
		}

		if err := k.SafeMint(ctx, receiver, data.AmountDenom, data.Amount); err != nil {
			return err
		}

		return nil
	case *channeltypes.Acknowledgement_Result:
		// Decode the packet acknowledgment
		var packetAck types.SellOrderPacketAck
		if err := types.ModuleCdc.UnmarshalJSON(dispatchedAck.Result, &packetAck); err != nil {
			// The counter-party module doesn't implement the correct acknowledgment format
			return errors.New("cannot unmarshal acknowledgment")
		}

		// Get the sell order book
		pairIndex := types.OrderBookIndex(data.AmountDenom, data.PriceDenom)
		book, found := k.GetSellOrderBook(ctx, pairIndex)
		if !found {
			panic("sell order book must exist")
		}

		// Append the remaining amount of the order
		if packetAck.RemainingAmount > 0 {
			_, err := book.AppendOrder(data.Seller, packetAck.RemainingAmount, data.Price)
			if err != nil {
				return err
			}

			// Save the new order book
			k.SetSellOrderBook(ctx, book)
		}

		// Mint the gains
		if packetAck.Gain > 0 {
			receiver, err := sdk.AccAddressFromBech32(data.Seller)
			if err != nil {
				return err
			}

			finalPriceDenom, saved := k.OriginalDenom(ctx, data.PriceDenom)
			if !saved {
				// If it was not from this chain we use voucher as denom
				finalPriceDenom = VoucherDenom(data.PriceDenom)
			}

			if err := k.SafeMint(ctx, receiver, finalPriceDenom, packetAck.Gain); err != nil {
				return err
			}
		}

		return nil
	default:
		// The counter-party module doesn't implement the correct acknowledgment format
		return errors.New("invalid acknowledgment format")
	}
}

func (k Keeper) OnTimeoutSellOrderPacket(ctx sdk.Context, packet channeltypes.Packet, data types.SellOrderPacketData) error {
	// In case of error we mint back the native token
	receiver, err := sdk.AccAddressFromBech32(data.Seller)
	if err != nil {
		return err
	}

	if err := k.SafeMint(ctx, receiver, data.AmountDenom, data.Amount); err != nil {
		return err
	}

	return nil
}

func (k Keeper) SwarmSellOrders(ctx sdk.Context, denom string, priceDenom string, midValue int) {
	var sellOrderValues = [5]int{midValue + 1, midValue + 5, midValue + 6, midValue + 7, midValue + 8}
	var sellOrderVolumes = [5]int{2, 4, 4, 3, 2}

	k.CreatePair(ctx, &types.MsgSendCreatePair{
		SourceDenom: denom,
		TargetDenom: priceDenom,
		Creator:     "system",
		// Port:             "channel-0",
		// ChannelID:        "system",
		TimeoutTimestamp: 99999999999,
	})

	for i, v := range sellOrderVolumes {
		k.CreateSellOrder(ctx, &types.MsgSendSellOrder{
			Amount:      int32(v),
			Price:       int32(sellOrderValues[i]),
			AmountDenom: denom,
			PriceDenom:  priceDenom,
			Creator:     "system",
			// Port:             "channel-0",
			// ChannelID:        "system",
			TimeoutTimestamp: 99999999999,
		})
	}

	// k.Sell
}

func (k Keeper) CreateSellOrder(ctx sdk.Context, msg *types.MsgSendSellOrder) error {
	pairIndex := types.OrderBookIndex(msg.AmountDenom, msg.PriceDenom)
	_, found := k.GetSellOrderBook(ctx, pairIndex)
	if !found {
		return errors.New("the pair doesn't exist")
	}

	// Get sender's address
	sender, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return err
	}

	// Use SafeBurn to ensure no new native tokens are minted
	if err := k.SafeBurn(ctx, sender, msg.AmountDenom, msg.Amount); err != nil {
		return err
	}

	// Save the voucher received on the other chain, to have the ability to resolve it into the original denom
	k.SaveVoucherDenom(ctx, msg.AmountDenom)

	var packet types.SellOrderPacketData
	packet.Seller = msg.Creator
	packet.AmountDenom = msg.AmountDenom
	packet.Amount = msg.Amount
	packet.PriceDenom = msg.PriceDenom
	packet.Price = msg.Price

	// Transmit the packet
	_, err = k.TransmitSellOrderPacket(ctx, packet, clienttypes.ZeroHeight(), msg.TimeoutTimestamp)
	if err != nil {
		return err
	}

	return nil
}

func (k Keeper) CreatePair(ctx sdk.Context, msg *types.MsgSendCreatePair) error {
	pairIndex := types.OrderBookIndex(msg.SourceDenom, msg.TargetDenom)

	// If an order book is found, return an error
	_, found := k.GetSellOrderBook(ctx, pairIndex)
	if found {
		return errors.New("the pair already exist")
	}

	// Construct the packet
	var packet types.CreatePairPacketData

	packet.SourceDenom = msg.SourceDenom
	packet.TargetDenom = msg.TargetDenom

	// Transmit the packet
	// _, err := k.TransmitCreatePairPacket(
	// 	ctx,
	// 	packet,
	// 	clienttypes.ZeroHeight(),
	// 	msg.TimeoutTimestamp,
	// )
	// if err != nil {
	// 	return err
	// }

	return nil
}
