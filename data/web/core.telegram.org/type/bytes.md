# bytes

Basic bare type. It is an alias of the **[string](/type/string.md)** type, with the difference that the value may contain arbitrary byte sequences, including invalid UTF-8 sequences.

When computing crc32 for a constructor or method it is necessary to replace all byte types with string types.

### Related pages

#### [string](/type/string.md)
A basic bare type. Values of type `string` look differently depending on the length `L` of the string being serialized:

- If `L <= 253`, the serialization contains one byte with the value of `L`, then `L` bytes of the string followed by 0 to 3 characters containing 0, such that the overall length of the value be divisible by 4, whereupon all of this is interpreted as a sequence of `int(L/4)+1` 32-bit little-endian integers.
- If `L >= 254`, the serialization contains byte 254, followed by 3 bytes with the string length `L` in little-endian order, followed by `L` bytes of the string, further followed by 0 to 3 null padding bytes.

All strings passed to the API must be encoded in UTF-8. When arbitrary byte sequences have to be serialized, [bytes](/type/bytes.md) alias is to be used.

[Further details on basic types»](/mtproto/serialize.md)