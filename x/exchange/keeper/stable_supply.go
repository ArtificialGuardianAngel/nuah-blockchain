package keeper

import (
	"encoding/binary"
	"errors"

	"nuah/x/exchange/types"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) NewStableSupply() []types.StableSupply {
	return []types.StableSupply{
		{
			Id:     0,
			Denom:  "USDn",
			Supply: 25_456_730_000_000,
		},
		{
			Id:     1,
			Denom:  "EURn",
			Supply: 15_906_450_000_000,
		},
		{
			Id:     2,
			Denom:  "CHFn",
			Supply: 818_470_000_000,
		},
		{
			Id:     3,
			Denom:  "GBPn",
			Supply: 3081_870_000_000,
		},
		{
			Id:     4,
			Denom:  "AUDn",
			Supply: 1_702_550_000_000,
		},
		{
			Id:     5,
			Denom:  "NZDn",
			Supply: 249_900_000_000,
		},
		{
			Id:     6,
			Denom:  "CADn",
			Supply: 2_137_940_000_000,
		},
		{
			Id:     7,
			Denom:  "JPYn",
			Supply: 4_237_530_000_000,
		},
		{
			Id:     8,
			Denom:  "HKDn",
			Supply: 369_200_000_000,
		},
		{
			Id:     9,
			Denom:  "SGDn",
			Supply: 397_000_000_000,
		},
		{
			Id:     10,
			Denom:  "INRn",
			Supply: 3_389_690_000_000,
		},
		{
			Id:     11,
			Denom:  "BRLn",
			Supply: 1_920_020_000_000,
		},
		{
			Id:     12,
			Denom:  "CNYn",
			Supply: 17_886_330_000_000,
		},
		{
			Id:     13,
			Denom:  "ZARn",
			Supply: 202_610_000_000,
		},
	}
}

func (k Keeper) SetInUseStableSupplyByDenom(ctx sdk.Context, denom string, amount uint64) (int64, error) {
	supply := k.GetAllStableSupply(ctx)

	var index uint64
	isFound := false

	for _, el := range supply {
		if el.Denom == denom {
			index = el.Id
			isFound = true
		}
	}
	if !isFound {
		return -1, errors.New("Denom with provided index is not found")
	}
	denomSupply, _ := k.GetStableSupply(ctx, index)

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StableSupplyKey))

	if denomSupply.InUse+amount > denomSupply.Supply {
		usedSupply := int64(denomSupply.Supply - denomSupply.InUse)
		denomSupply.InUse = denomSupply.Supply

		newValue := k.cdc.MustMarshal(&denomSupply)
		store.Set(GetStableSupplyIDBytes(denomSupply.Id), newValue)
		return usedSupply, nil
	}

	denomSupply.InUse += amount

	newValue := k.cdc.MustMarshal(&denomSupply)
	store.Set(GetStableSupplyIDBytes(denomSupply.Id), newValue)

	return int64(amount), nil
}

// GetStableSupplyCount get the total number of stableSupply
func (k Keeper) GetStableSupplyCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.StableSupplyCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetStableSupplyCount set the total number of stableSupply
func (k Keeper) SetStableSupplyCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.StableSupplyCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendStableSupply appends a stableSupply in the store with a new id and update the count
func (k Keeper) AppendStableSupply(
	ctx sdk.Context,
	stableSupply types.StableSupply,
) uint64 {
	// Create the stableSupply
	count := k.GetStableSupplyCount(ctx)

	// Set the ID of the appended value
	stableSupply.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StableSupplyKey))
	appendedValue := k.cdc.MustMarshal(&stableSupply)
	store.Set(GetStableSupplyIDBytes(stableSupply.Id), appendedValue)

	// Update stableSupply count
	k.SetStableSupplyCount(ctx, count+1)

	return count
}

// SetStableSupply set a specific stableSupply in the store
func (k Keeper) SetStableSupply(ctx sdk.Context, stableSupply types.StableSupply) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StableSupplyKey))
	b := k.cdc.MustMarshal(&stableSupply)
	store.Set(GetStableSupplyIDBytes(stableSupply.Id), b)
}

// GetStableSupply returns a stableSupply from its id
func (k Keeper) GetStableSupply(ctx sdk.Context, id uint64) (val types.StableSupply, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StableSupplyKey))
	b := store.Get(GetStableSupplyIDBytes(id))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveStableSupply removes a stableSupply from the store
func (k Keeper) RemoveStableSupply(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StableSupplyKey))
	store.Delete(GetStableSupplyIDBytes(id))
}

// GetAllStableSupply returns all stableSupply
func (k Keeper) GetAllStableSupply(ctx sdk.Context) (list []types.StableSupply) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StableSupplyKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.StableSupply
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetStableSupplyIDBytes returns the byte representation of the ID
func GetStableSupplyIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetStableSupplyIDFromBytes returns ID in uint64 format from a byte array
func GetStableSupplyIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
