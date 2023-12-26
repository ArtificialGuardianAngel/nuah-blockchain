package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	ibctransfertypes "github.com/cosmos/ibc-go/v7/modules/apps/transfer/types"

	"nuah/x/exchange/types"
)

func VoucherDenom(denom string) string {
	// since SendPacket did not prefix the denomination, we must prefix denomination here
	// sourcePrefix := ibctransfertypes.GetDenomPrefix(port, channel)

	// NOTE: sourcePrefix contains the trailing "/"
	prefixedDenom := denom

	// construct the denomination trace from the full raw denomination
	denomTrace := ibctransfertypes.ParseDenomTrace(prefixedDenom)
	voucher := denomTrace.IBCDenom()
	return voucher[:16]
}

func (k Keeper) SaveVoucherDenom(ctx sdk.Context, denom string) {
	voucher := VoucherDenom(denom)

	// Store the origin denom
	_, saved := k.GetDenomTrace(ctx, voucher)
	if !saved {
		k.SetDenomTrace(ctx, types.DenomTrace{
			Index:  voucher,
			Origin: denom,
		})
	}
}

func (k Keeper) OriginalDenom(ctx sdk.Context, voucher string) (string, bool) {
	trace, exist := k.GetDenomTrace(ctx, voucher)
	if exist {
		// Check if original port and channel
		return trace.Origin, true
	}

	// Not the original chain
	return "", false
}
