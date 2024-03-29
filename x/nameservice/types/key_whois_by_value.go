package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// WhoisByValueKeyPrefix is the prefix to retrieve all WhoisByValue
	WhoisByValueKeyPrefix = "WhoisByValue/value/"
)

// WhoisByValueKey returns the store key to retrieve a WhoisByValue from the index fields
func WhoisByValueKey(
	index string,
) []byte {
	var key []byte

	indexBytes := []byte(index)
	key = append(key, indexBytes...)
	key = append(key, []byte("/")...)

	return key
}
