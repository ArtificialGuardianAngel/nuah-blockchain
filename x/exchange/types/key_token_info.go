package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// TokenInfoKeyPrefix is the prefix to retrieve all TokenInfo
	TokenInfoKeyPrefix = "TokenInfo/value/"
)

// TokenInfoKey returns the store key to retrieve a TokenInfo from the index fields
func TokenInfoKey(
	index string,
) []byte {
	var key []byte

	indexBytes := []byte(index)
	key = append(key, indexBytes...)
	key = append(key, []byte("/")...)

	return key
}
