package keeper

import (
	"nuah/x/oracles/types"
)

var _ types.QueryServer = Keeper{}
