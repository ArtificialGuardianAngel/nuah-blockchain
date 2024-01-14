package keeper

import (
	"nuah/x/dex/types"
)

var _ types.QueryServer = Keeper{}
