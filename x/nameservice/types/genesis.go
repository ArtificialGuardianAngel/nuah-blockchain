package types

import (
	"fmt"
)

// DefaultIndex is the default global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		WhoisList:        []Whois{},
		WhoisByValueList: []WhoisByValue{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated index in whois
	whoisIndexMap := make(map[string]struct{})

	for _, elem := range gs.WhoisList {
		index := string(WhoisKey(elem.Index))
		if _, ok := whoisIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for whois")
		}
		whoisIndexMap[index] = struct{}{}
	}
	// Check for duplicated index in whoisByValue
	whoisByValueIndexMap := make(map[string]struct{})

	for _, elem := range gs.WhoisByValueList {
		index := string(WhoisByValueKey(elem.Index))
		if _, ok := whoisByValueIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for whoisByValue")
		}
		whoisByValueIndexMap[index] = struct{}{}
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
