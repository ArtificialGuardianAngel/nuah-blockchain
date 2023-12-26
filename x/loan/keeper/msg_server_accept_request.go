package keeper

import (
	"context"
	"errors"

	"nuah/x/loan/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) AcceptRequest(goCtx context.Context, msg *types.MsgAcceptRequest) (*types.MsgAcceptRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	book, isFound := k.GetRequestBook(ctx, msg.Creator)
	if !isFound {
		return &types.MsgAcceptRequestResponse{}, errors.New("request book is not found")
	}

	_, err := book.UpdateAcceptedRequest(msg.Id, 1)

	if err != nil {
		return &types.MsgAcceptRequestResponse{}, err
	}

	// var coin sdk.Coin = sdk.NewInt64Coin(book.Book.Requests[index].Denom, int64(book.Book.Requests[index].Amount))

	// // coins.Add(sdk.Coin{Amount: int(book.Book.Requests[index].Amount), Denom: book.Book.Requests[index].Denom})
	// var coins = sdk.Coins{coin}
	// k.bankKeeper.SendCoinsFromAccountToModule(ctx, sdk.AccAddress(msg.Creator), types.ModuleName, coins)

	k.SetRequestBook(ctx, book)

	return &types.MsgAcceptRequestResponse{}, nil
}
