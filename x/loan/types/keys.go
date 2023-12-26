package types

import "fmt"

const (
	// ModuleName defines the module name
	ModuleName = "loan"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey defines the module's message routing key
	RouterKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_loan"
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}

// ...
func RequestBookIndex(to string) string {
	return fmt.Sprintf("%s", to)
}
