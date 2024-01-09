package keeper

import (
	"context"
	"sort"

	"nuah/x/loan/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) GetMadenRequests(goCtx context.Context, req *types.QueryGetMadenRequestsRequest) (*types.QueryGetMadenRequestsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)
	requestBooks := k.GetAllRequestBook(ctx)
	var madenRequests []types.RequestBook

	for _, book := range requestBooks {
		madenBook := types.NewRequestBook()
		madenBook.Index = book.Index
		for _, request := range book.Book.Requests {
			if request.Creator == req.From {
				var newRequest types.Request
				newRequest.Id = madenBook.Book.GetNextOrderID()
				newRequest.Creator = request.Creator
				newRequest.Amount = request.Amount
				newRequest.Denom = request.Denom
				newRequest.Accepted = request.Accepted

				// Increment ID tracker
				madenBook.Book.IncrementNextOrderID()

				if len(madenBook.Book.Requests) > 0 {
					// get the index of the new order depending on the provided ordering

					i := sort.Search(len(madenBook.Book.Requests), func(i int) bool { return madenBook.Book.Requests[i].Amount < request.Amount })

					// insert order
					orders := append(madenBook.Book.Requests, &newRequest)
					copy(orders[i+1:], orders[i:])
					orders[i] = &newRequest
					madenBook.Book.Requests = orders
				} else {
					madenBook.Book.Requests = append(madenBook.Book.Requests, &newRequest)
				}
			}
		}
		if len(madenBook.Book.Requests) > 0 {
			madenRequests = append(madenRequests, madenBook)
		}
	}

	return &types.QueryGetMadenRequestsResponse{Requests: madenRequests}, nil
}
