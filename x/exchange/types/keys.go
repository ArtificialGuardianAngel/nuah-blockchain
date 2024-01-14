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
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}

func OrderBookIndex(sourceDenom string, targetDenom string) string {
	return fmt.Sprintf("%s-%s-%s-%s", "nuah", "0", sourceDenom, targetDenom)
}
