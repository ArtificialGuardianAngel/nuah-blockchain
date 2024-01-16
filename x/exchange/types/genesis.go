package types

import (
	"fmt"
)

// DefaultIndex is the default global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		SellOrderBookList: []SellOrderBook{},
		BuyOrderBookList:  []BuyOrderBook{},
		TokenInfoList:     []TokenInfo{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
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
	// Check for duplicated index in tokenInfo
	tokenInfoIndexMap := make(map[string]struct{})

	for _, elem := range gs.TokenInfoList {
		index := string(TokenInfoKey(elem.Index))
		if _, ok := tokenInfoIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for tokenInfo")
		}
		tokenInfoIndexMap[index] = struct{}{}
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
