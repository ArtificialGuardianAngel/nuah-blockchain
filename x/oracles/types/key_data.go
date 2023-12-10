package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// DataKeyPrefix is the prefix to retrieve all Data
	DataKeyPrefix = "Data/value/"
)

// DataKey returns the store key to retrieve a Data from the index fields
func DataKey(
	index string,
) []byte {
	var key []byte

	indexBytes := []byte(index)
	key = append(key, indexBytes...)
	key = append(key, []byte("/")...)

	return key
}
