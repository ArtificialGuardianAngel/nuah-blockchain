package keeper

import (
	"context"

	"nuah/x/exchange/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) GetAllSentOrders(goCtx context.Context, req *types.QueryGetAllSentOrdersRequest) (*types.QueryGetAllSentOrdersResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	sender := req.From

	buyBooks := k.GetAllBuyOrderBook(ctx)
	sellBooks := k.GetAllSellOrderBook(ctx)

	var senderBuyBooks []types.BuyOrderBook
	var senderSellBooks []types.SellOrderBook

	for _, book := range buyBooks {
		sentBook := types.NewBuyOrderBook(book.AmountDenom, book.PriceDenom)
		sentBook.Index = book.Index

		for _, order := range book.Book.Orders {
			if order.Creator == sender {
				sentBook.AppendOrder(order.Creator, order.Amount, order.Price)
			}
		}
		if len(sentBook.Book.Orders) > 0 {
			senderBuyBooks = append(senderBuyBooks, sentBook)
		}
	}
	for _, book := range sellBooks {
		sentBook := types.NewSellOrderBook(book.AmountDenom, book.PriceDenom)
		sentBook.Index = book.Index

		for _, order := range book.Book.Orders {
			if order.Creator == sender {
				sentBook.AppendOrder(order.Creator, order.Amount, order.Price)
			}
		}
		if len(sentBook.Book.Orders) > 0 {
			senderSellBooks = append(senderSellBooks, sentBook)
		}
	}

	return &types.QueryGetAllSentOrdersResponse{
		BuyOrderBook:  buyBooks,
		SellOrderBook: sellBooks,
	}, nil
}
