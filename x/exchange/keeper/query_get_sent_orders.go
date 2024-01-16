package keeper

import (
	"context"
	"errors"

	"nuah/x/exchange/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) GetSentOrders(goCtx context.Context, req *types.QueryGetSentOrdersRequest) (*types.QueryGetSentOrdersResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	sender := req.From
	pairIndex := types.OrderBookIndex(req.AmountDenom, req.PriceDenom)

	sellBook, found := k.GetSellOrderBook(ctx, pairIndex)
	if !found {
		return &types.QueryGetSentOrdersResponse{}, errors.New("the pair doesn't exist")
	}
	buyBook, found := k.GetBuyOrderBook(ctx, pairIndex)
	if !found {
		return &types.QueryGetSentOrdersResponse{}, errors.New("the pair doesn't exist")
	}

	sentBuyBook := types.NewBuyOrderBook(req.AmountDenom, req.PriceDenom)
	sentSellBook := types.NewSellOrderBook(req.AmountDenom, req.PriceDenom)

	for _, order := range buyBook.Book.Orders {
		if order.Creator == sender {
			sentBuyBook.AppendOrder(order.Creator, order.Amount, order.Price)
		}
	}
	for _, order := range sellBook.Book.Orders {
		if order.Creator == sender {
			sentSellBook.AppendOrder(order.Creator, order.Amount, order.Price)
		}
	}

	return &types.QueryGetSentOrdersResponse{
		BuyOrderBook:  &sentBuyBook,
		SellOrderBook: &sentSellBook,
	}, nil
}
