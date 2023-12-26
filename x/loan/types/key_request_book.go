package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// RequestBookKeyPrefix is the prefix to retrieve all RequestBook
	RequestBookKeyPrefix = "RequestBook/value/"
)

// RequestBookKey returns the store key to retrieve a RequestBook from the index fields
func RequestBookKey(
	index string,
) []byte {
	var key []byte

	indexBytes := []byte(index)
	key = append(key, indexBytes...)
	key = append(key, []byte("/")...)

	return key
}
