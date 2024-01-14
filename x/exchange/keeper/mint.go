package keeper

import (
	sdkmath "cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"nuah/x/exchange/types"
)

// ...

func (k Keeper) SafeBurn(ctx sdk.Context, sender sdk.AccAddress, denom string, amount int32) error {
	// Lock the tokens
	if err := k.LockTokens(ctx, sender, sdk.NewCoin(denom, sdkmath.NewInt(int64(amount)))); err != nil {
		return err
	}

	return nil
}

func (k Keeper) SafeMint(ctx sdk.Context, receiver sdk.AccAddress, denom string, amount int32) error {
	if err := k.UnlockTokens(
		ctx,
		receiver,
		sdk.NewCoin(denom, sdkmath.NewInt(int64(amount))),
	); err != nil {
		return err
	}

	return nil
}

func (k Keeper) LockTokens(ctx sdk.Context, sender sdk.AccAddress, tokens sdk.Coin) error {
	// create the escrow address for the tokens
	// escrow source tokens. It fails if balance insufficient
	if err := k.bankKeeper.SendCoinsFromAccountToModule(
		ctx, sender, types.ModuleName, sdk.NewCoins(tokens),
	); err != nil {
		return err
	}

	return nil
}

func (k Keeper) UnlockTokens(ctx sdk.Context, receiver sdk.AccAddress, tokens sdk.Coin) error {
	// create the escrow address for the tokens

	// escrow source tokens. It fails if balance insufficient
	if err := k.bankKeeper.SendCoinsFromModuleToAccount(
		ctx, types.ModuleName, receiver, sdk.NewCoins(tokens),
	); err != nil {
		return err
	}

	return nil
}
