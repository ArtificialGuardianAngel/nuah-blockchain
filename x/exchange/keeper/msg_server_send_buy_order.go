package keeper

import (
	"context"
	"errors"
	"fmt"

	"nuah/x/exchange/types"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	// address "github.com/cosmos/cosmos-sdk/types/address"
)

func (k msgServer) SendBuyOrder(goCtx context.Context, msg *types.MsgSendBuyOrder) (*types.MsgSendBuyOrderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	pairIndex := types.OrderBookIndex(msg.AmountDenom, msg.PriceDenom)
	buyBook, found := k.GetBuyOrderBook(ctx, pairIndex)
	if !found {
		return &types.MsgSendBuyOrderResponse{}, errors.New("the pair doesn't exist")
	}

	// Lock the token to send
	sender, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return &types.MsgSendBuyOrderResponse{}, err
	}

	// Use SafeBurn to ensure no new native tokens are minted
	if err := k.SafeBurn(ctx, sender, msg.PriceDenom, msg.Amount/msg.Price*1e6); err != nil {
		return &types.MsgSendBuyOrderResponse{}, err
	}
	minted := false
	coin := sdk.Coin{Denom: msg.AmountDenom, Amount: math.NewInt(int64(msg.Amount))}
	coins := sdk.NewCoins(coin)
	tokenInfo, found := k.GetTokenInfo(ctx, msg.AmountDenom)
	if found && float32(tokenInfo.Used/tokenInfo.Supply) <= 0.2 {
		book, found := k.GetSellOrderBook(ctx, pairIndex)
		if found {
			err := k.bankKeeper.MintCoins(ctx, types.ModuleName, coins)
			if err == nil {
				k.Logger(ctx).Info(fmt.Sprintf("Minted coins %+v", coins[0]))
			}
			tokenInfo.Used += coin.Amount.Int64()
			k.SetTokenInfo(ctx, tokenInfo)
			if err == nil {
				book.AppendOrder(types.ModuleName, msg.Amount, msg.Price)
				k.Logger(ctx).Error("System order appended")
				minted = true
				k.SetSellOrderBook(ctx, book)
			}
		}
	}

	// i.e on recv
	sellBook, found := k.GetSellOrderBook(ctx, pairIndex)
	k.Logger(ctx).Error(fmt.Sprintf("sellBook=%+v", sellBook))

	if !found {
		return &types.MsgSendBuyOrderResponse{}, errors.New("the pair doesn't exist")
	}

	// Fill buy order
	remaining, liquidated, purchase, _ := sellBook.FillBuyOrder(types.Order{
		Amount: msg.Amount,
		Price:  msg.Price,
	})

	k.Logger(ctx).Error(fmt.Sprintf("remain=%+v", remaining))
	k.Logger(ctx).Error(fmt.Sprintf("liqidated=%+v", liquidated))
	k.Logger(ctx).Error(fmt.Sprintf("purchase=%d", purchase))

	for _, liquidation := range liquidated {
		liquidation := liquidation

		if minted && liquidation.Creator == types.ModuleName {
			k.Logger(ctx).Debug("Slipping liqudation due to creator is module")
			continue
		}
		addr, err := sdk.AccAddressFromBech32(liquidation.Creator)
		if err != nil {
			return &types.MsgSendBuyOrderResponse{}, err
		}

		if err := k.SafeMint(
			ctx,
			addr,
			msg.PriceDenom,
			liquidation.Amount*liquidation.Price,
		); err != nil {
			return &types.MsgSendBuyOrderResponse{}, err
		}
	}
	k.Logger(ctx).Error(fmt.Sprintf("sellBook=%+v", sellBook))
	k.SetSellOrderBook(ctx, sellBook)

	// ie on ack
	if remaining.Amount > 0 {
		_, err := buyBook.AppendOrder(
			msg.Creator,
			remaining.Amount,
			msg.Price,
		)
		if err != nil {
			return &types.MsgSendBuyOrderResponse{}, err
		}

		// Save the new order book
		k.SetBuyOrderBook(ctx, buyBook)
	}

	// Mint the purchase
	if purchase > 0 {
		receiver, err := sdk.AccAddressFromBech32(msg.Creator)
		if err != nil {
			return &types.MsgSendBuyOrderResponse{}, err
		}

		if err := k.SafeMint(
			ctx,
			receiver,
			msg.AmountDenom, //msg.AmountDenom,
			purchase,
		); err != nil {
			return &types.MsgSendBuyOrderResponse{}, err
		}
	}

	return &types.MsgSendBuyOrderResponse{}, nil
}
