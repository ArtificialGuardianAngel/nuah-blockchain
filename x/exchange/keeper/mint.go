package keeper

import (
	"fmt"
	"strings"

	sdkmath "cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"

	// ibctransfertypes "github.com/cosmos/ibc-go/v7/modules/apps/transfer/types"

	"nuah/x/exchange/types"
)

func (k Keeper) LockTokens(ctx sdk.Context, sender sdk.AccAddress, tokens sdk.Coin) error {
	// create the escrow address for the tokens
	// escrowAddress := ibctransfertypes.GetEscrowAddress(sourcePort, sourceChannel)

	// escrow source tokens. It fails if balance insufficient
	if err := k.bankKeeper.SendCoinsFromAccountToModule(
		ctx, sender, types.ModuleName, sdk.NewCoins(tokens),
	); err != nil {
		return err
	}

	return nil
}

// isIBCToken checks if the token came from the IBC module
// Each IBC token starts with an ibc/ denom, the check is rather simple

func (k Keeper) BurnTokens(ctx sdk.Context, sender sdk.AccAddress, tokens sdk.Coin) error {
	// transfer the coins to the module account and burn them
	if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, sender, types.ModuleName, sdk.NewCoins(tokens)); err != nil {
		return err
	}

	if err := k.bankKeeper.BurnCoins(
		ctx, types.ModuleName, sdk.NewCoins(tokens),
	); err != nil {
		// NOTE: should not happen as the module account was
		// retrieved on the step above and it has enough balance
		// to burn.
		panic(fmt.Sprintf("cannot burn coins after a successful send to a module account: %v", err))
	}

	return nil
}

func isIBCToken(denom string) bool {
	return strings.HasPrefix(denom, "ibc/")
}

func (k Keeper) SafeBurn(ctx sdk.Context, sender sdk.AccAddress, denom string, amount int32) error {

	// Lock the tokens
	if err := k.LockTokens(ctx, sender, sdk.NewCoin(denom, sdkmath.NewInt(int64(amount)))); err != nil {
		return err
	}

	return nil
}

func (k Keeper) SafeMint(ctx sdk.Context, receiver sdk.AccAddress, denom string, amount int32) error {

	// Unlock native tokens
	if err := k.UnlockTokens(
		ctx,
		receiver,
		sdk.NewCoin(denom, sdkmath.NewInt(int64(amount))),
	); err != nil {
		return err
	}

	return nil
}

func (k Keeper) MintTokens(ctx sdk.Context, receiver sdk.AccAddress, tokens sdk.Coin) error {
	// mint new tokens if the source of the transfer is the same chain
	if err := k.bankKeeper.MintCoins(
		ctx, types.ModuleName, sdk.NewCoins(tokens),
	); err != nil {
		return err
	}

	// send to receiver
	if err := k.bankKeeper.SendCoinsFromModuleToAccount(
		ctx, types.ModuleName, receiver, sdk.NewCoins(tokens),
	); err != nil {
		panic(fmt.Sprintf("unable to send coins from module to account despite previously minting coins to module account: %v", err))
	}

	return nil
}

func (k Keeper) UnlockTokens(ctx sdk.Context, receiver sdk.AccAddress, tokens sdk.Coin) error {
	// create the escrow address for the tokens
	// escrowAddress := ibctransfertypes.GetEscrowAddress(sourcePort, sourceChannel)

	// escrow source tokens. It fails if balance insufficient
	if err := k.bankKeeper.SendCoinsFromModuleToAccount(
		ctx, types.ModuleName, receiver, sdk.NewCoins(tokens),
	); err != nil {
		return err
	}

	return nil
}
