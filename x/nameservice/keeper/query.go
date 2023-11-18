package keeper

import (
	"nuah/x/nameservice/types"
)

var _ types.QueryServer = Keeper{}
