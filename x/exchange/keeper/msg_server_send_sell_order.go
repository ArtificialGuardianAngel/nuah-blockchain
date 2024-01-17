package keeper

import (
	"context"
	"errors"
	"fmt"
	gomath "math"

	"nuah/x/exchange/types"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) SendSellOrder(goCtx context.Context, msg *types.MsgSendSellOrder) (*types.MsgSendSellOrderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	pairIndex := types.OrderBookIndex(msg.AmountDenom, msg.PriceDenom)
	sellBook, found := k.GetSellOrderBook(ctx, pairIndex)
	if !found {
		return &types.MsgSendSellOrderResponse{}, errors.New("the pair doesn't exist")
	}

	// Get sender's address
	sender, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return &types.MsgSendSellOrderResponse{}, err
	}

	// Use SafeBurn to ensure no new native tokens are minted
	if err := k.SafeBurn(ctx, sender, msg.AmountDenom, msg.Amount); err != nil {
		return &types.MsgSendSellOrderResponse{}, err
	}
	// append system order (tmp solution)
	minted := false
	tokenInfo, found := k.GetTokenInfo(ctx, msg.PriceDenom)

	coin := sdk.Coin{Denom: msg.PriceDenom, Amount: math.NewInt(int64(msg.Amount * msg.Price / (uint64(gomath.Pow10(6)))))}
	coins := sdk.NewCoins(coin)
	k.Logger(ctx).Error(fmt.Sprintf("Is allowed to mint: %+v", float32(tokenInfo.Used/tokenInfo.Supply) <= 0.2))
	if found && float32(tokenInfo.Used/tokenInfo.Supply) <= 0.2 {
		book, found := k.GetBuyOrderBook(ctx, pairIndex)
		if found {
			err := k.bankKeeper.MintCoins(ctx, types.ModuleName, coins)
			if err == nil {
				k.Logger(ctx).Info(fmt.Sprintf("Price: %+v", msg.Price))
				k.Logger(ctx).Info(fmt.Sprintf("Minted coins %+v", coins[0]))
			}
			tokenInfo.Used += coin.Amount.Int64()
			k.SetTokenInfo(ctx, tokenInfo)
			if err == nil {
				book.AppendOrder(types.ModuleName, msg.Amount, msg.Price)
				k.Logger(ctx).Error("System order appended")
				minted = true
				k.SetBuyOrderBook(ctx, book)
			}
		}
	}

	// i.e on recv

	buyBook, found := k.GetBuyOrderBook(ctx, pairIndex)
	k.Logger(ctx).Error(fmt.Sprintf("inital book=%+v", buyBook))
	if !found {
		return &types.MsgSendSellOrderResponse{}, errors.New("the pair doesn't exist")
	}

	remaining, liquidated, gain, _ := buyBook.FillSellOrder(types.Order{
		Amount: msg.Amount,
		Price:  msg.Price,
	})

	k.Logger(ctx).Error(fmt.Sprintf("remain=%+v", remaining))
	k.Logger(ctx).Error(fmt.Sprintf("liquidated=%+v", liquidated))
	k.Logger(ctx).Error(fmt.Sprintf("gain=%+v", gain))

	for _, liquidation := range liquidated {
		if minted && liquidation.Creator == types.ModuleName {
			k.Logger(ctx).Debug("Slipping liqudation due to creator is module")
			continue
		}
		addr, err := sdk.AccAddressFromBech32(liquidation.Creator)
		if err != nil {
			return &types.MsgSendSellOrderResponse{}, err
		}

		if err := k.SafeMint(ctx, addr, msg.AmountDenom, liquidation.Amount); err != nil {
			return &types.MsgSendSellOrderResponse{}, err
		}
	}

	k.Logger(ctx).Error(fmt.Sprintf("new book=%+v", buyBook))
	k.SetBuyOrderBook(ctx, buyBook)

	// i.e on ack
	if remaining.Amount > 0 {
		_, err = sellBook.AppendOrder(msg.Creator, remaining.Amount, msg.Price)
		if err != nil {
			return &types.MsgSendSellOrderResponse{}, err
		}
		// Save the new sell order book
		k.SetSellOrderBook(ctx, sellBook)
	}

	if gain > 0 {
		receiver, err := sdk.AccAddressFromBech32(msg.Creator)
		if err != nil {
			k.Logger(ctx).Error(fmt.Sprintf("%s is bad address", msg.Creator))
			return &types.MsgSendSellOrderResponse{}, err
		}
		k.Logger(ctx).Info("Sending tokens")

		if err := k.SafeMint(ctx, receiver, msg.PriceDenom, gain); err != nil {
			return &types.MsgSendSellOrderResponse{}, err
		}
	}

	return &types.MsgSendSellOrderResponse{}, nil
}
