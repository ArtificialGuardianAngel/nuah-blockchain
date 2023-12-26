package types

import (
	"fmt"
	host "github.com/cosmos/ibc-go/v7/modules/core/24-host"
)

// DefaultIndex is the default global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		PortId:            PortID,
		SellOrderBookList: []SellOrderBook{},
		BuyOrderBookList:  []BuyOrderBook{},
		DenomTraceList:    []DenomTrace{},
		StableSupplyList:  []StableSupply{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	if err := host.PortIdentifierValidator(gs.PortId); err != nil {
		return err
	}
	// Check for duplicated index in sellOrderBook
	sellOrderBookIndexMap := make(map[string]struct{})

	for _, elem := range gs.SellOrderBookList {
		index := string(SellOrderBookKey(elem.Index))
		if _, ok := sellOrderBookIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for sellOrderBook")
		}
		sellOrderBookIndexMap[index] = struct{}{}
	}
	// Check for duplicated index in buyOrderBook
	buyOrderBookIndexMap := make(map[string]struct{})

	for _, elem := range gs.BuyOrderBookList {
		index := string(BuyOrderBookKey(elem.Index))
		if _, ok := buyOrderBookIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for buyOrderBook")
		}
		buyOrderBookIndexMap[index] = struct{}{}
	}
	// Check for duplicated index in denomTrace
	denomTraceIndexMap := make(map[string]struct{})

	for _, elem := range gs.DenomTraceList {
		index := string(DenomTraceKey(elem.Index))
		if _, ok := denomTraceIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for denomTrace")
		}
		denomTraceIndexMap[index] = struct{}{}
	}
	// Check for duplicated ID in stableSupply
	stableSupplyIdMap := make(map[uint64]bool)
	stableSupplyCount := gs.GetStableSupplyCount()
	for _, elem := range gs.StableSupplyList {
		if _, ok := stableSupplyIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for stableSupply")
		}
		if elem.Id >= stableSupplyCount {
			return fmt.Errorf("stableSupply id should be lower or equal than the last id")
		}
		stableSupplyIdMap[elem.Id] = true
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
