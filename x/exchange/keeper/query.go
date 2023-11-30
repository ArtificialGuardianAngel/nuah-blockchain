package keeper

import (
	"nuah/x/exchange/types"
)

var _ types.QueryServer = Keeper{}
