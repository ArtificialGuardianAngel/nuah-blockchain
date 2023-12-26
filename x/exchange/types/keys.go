package types

import "fmt"

const (
	// ModuleName defines the module name
	ModuleName = "exchange"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey defines the module's message routing key
	RouterKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_exchange"

	// Version defines the current version the IBC module supports
	Version = "exchange-1"

	// PortID is the default port id that module binds to
	PortID = "exchange"
)

var (
	// PortKey defines the key to store the port ID in store
	PortKey = KeyPrefix("exchange-port-")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
func OrderBookIndex(sourceDenom string, targetDenom string) string {
	return fmt.Sprintf("%s-%s", sourceDenom, targetDenom)
}

const (
	StableSupplyKey      = "StableSupply/value/"
	StableSupplyCountKey = "StableSupply/count/"
)
