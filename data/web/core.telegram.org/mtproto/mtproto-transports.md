# MTProto transports


Here's a list of MTProto transport protocols ([see the ISO/OSI recap for a full explanation](/mtproto.md#recap)):

* [Abridged](#abridged)
* [Intermediate](#intermediate)
* [Padded intermediate](#padded-intermediate)
* [Full](#full)

The server recognizes these different protocols (and distinguishes them from HTTP, too) by the header.
Additionally, the following transport features can be used: 

* [Quick ack](#quick-ack)
* [Transport errors](#transport-errors)
* [Transport obfuscation](#transport-obfuscation)

Example implementations for these protocols can be seen in [tdlib](https://github.com/tdlib/td/blob/master/td/mtproto/TcpTransport.cpp) and [MadelineProto](https://github.com/danog/MadelineProto/tree/v8/src/Stream/MTProtoTransport).

### Abridged

The lightest protocol available.

* Overhead: Very small 
* Minimum envelope length: 1 byte
* Maximum envelope length: 4 bytes

Payload structure:
```
+-+----...----+
|l|  payload  |
+-+----...----+
OR

+-+---+----...----+
|h|len|  payload  +
+-+---+----...----+
```

Before sending *anything* into the underlying socket (see [transports](transports)), the client must first send `0xef` as the first byte (the server **will not** send `0xef` as the first byte in the first reply).  
Then, payloads are wrapped in the following envelope:

If the packet length divided by four is smaller than 127:

* Length: payload length, divided by four, and encoded as a single byte
* Payload: the MTProto payload

If the packet length divided by four is bigger than or equal to 127, the following envelope must be used, instead:

* Header: A single byte of value `0x7f` (127)
* Length: payload length, divided by four, and encoded as 3 length bytes (little endian)
* Payload: the MTProto payload

[Quick ACK&nbsp;&raquo;](#quick-ack) may be enabled for this transport.  

To request a quick ACK from the server for an encrypted MTProto payload, use the following envelope for *outgoing* messages, instead of the one specified above.

If the packet length divided by four is smaller than 127:

* Length: payload length, divided by four, plus 128, and encoded as a single byte (`(length/4)+128` or `(length >> 2) | (1 << 7)`); i.e. the most significant bit must be set.
* Payload: the MTProto payload

If the packet length divided by four is bigger than or equal to 127, the following envelope must be used, instead:

* Header: A single byte of value `0xff` (255)
* Length: payload length, divided by four, and encoded as 3 length bytes (little endian); same as for a normal abridged envelope.
* Payload: the MTProto payload

The server will send quick ACK tokens by bswapping them (i.e. inverting the order of the 4 bytes of the ACK token) and sending them as a standalone 4-byte packet without a length header.  

```
+----+
|dcba|
+----+
```

These quick ACK packets can be easily distinguished from normal abridged packets because the first byte will always have the most-significant bit set (because quick ACK tokens have the most-significant bit of the last byte set, and since they are bswapped the last byte will come first), and the length/header of normal payload packets coming from the server is always less than or equal to 127 (thus the most-significant bit is not set for normal payloads).  

### Intermediate

In case 4-byte data alignment is needed, an *intermediate* version of the original protocol may be used.

* Overhead: small
* Minimum envelope length: 4 bytes
* Maximum envelope length: 4 bytes

Payload structure: 
```
+----+----...----+
+len.+  payload  +
+----+----...----+
```

Before sending *anything* into the underlying socket (see [transports](transports)), the client must first send `0xeeeeeeee` as the first int (four bytes, the server **will not** send `0xeeeeeeee` as the first int in the first reply).  
Then, payloads are wrapped in the following envelope:

* Length: payload length encoded as 4 length bytes (little endian)
* Payload: the MTProto payload

[Quick ACK&nbsp;&raquo;](#quick-ack) may be enabled for this transport.  

To request a quick ACK from the server for an encrypted MTProto payload, add `0x80000000` to the `len` field before encoding it (equivalent to doing `len = len | (1 << 31)`, i.e. set the most-significant bit of the length).  

The server will send quick ACK tokens as a standalone 4-byte packet without a length header.

```
+----+
|abcd|
+----+
```

These quick ACK packets can be easily distinguished from normal intermediate packets because quick ACK tokens always have the most-significant bit of the last byte set, and trying to decode an ACK token as a little-endian 32-bit integer will always yield a value bigger than or equal to `0x80000000`, which can never be a valid packet length.  

### Padded intermediate

Padded version of the [intermediate protocol](#intermediate), to use with [obfuscation enabled](#transport-obfuscation) to **bypass ISP blocks**.

* Overhead: small-medium
* Minimum envelope length: random
* Maximum envelope length: random

Before sending *anything* into the underlying socket (see [transports](transports)), the client must first send `0xdddddddd` as the first int (four bytes, the server **will not** send `0xdddddddd` as the first int in the first reply).  
Then, payloads are wrapped in the following envelope:
```
+----+----...----+----...----+
|tlen|  payload  |  padding  |
+----+----...----+----...----+
```

Envelope description:

* Total length: payload+padding length encoded as 4 length bytes (little endian)
* Payload: the MTProto payload
* Padding: A random padding string of length `0-15`

[Quick ACK&nbsp;&raquo;](#quick-ack) may be enabled for this transport.  

To request a quick ACK from the server for an encrypted MTProto payload, add `0x80000000` to the `len` field before encoding it (equivalent to doing `len = len | (1 << 31)`, i.e. set the most-significant bit of the length).  

The server will send quick ACK tokens as a standalone 8 to 16-byte packet (excluding the length of the packet itself, encoded as usual), containing a 4-byte header with all bits set, followed by the ACK token (`abcd`), followed by 0 to 8 random padding bytes.

```
+----+----+----+----...----+
|tlen|FFFF|abcd|  padding  |
+----+----+----+----...----+
```

These quick ACK packets can be easily distinguished from normal intermediate padded packets because their length will be always smaller than or equal to 16, smaller than any MTProto packet.  
They can be distinguished from transport errors because the first 4 bytes of the payload are equal to `0xFFFFFFFF`, not a valid transport error.  

### Full

The basic MTProto transport protocol

* Overhead: medium
* Minimum envelope length: 12 bytes (length+seqno+crc)
* Maximum envelope length: 12 bytes (length+seqno+crc)

Payload structure:  
```
+----+----+----...----+----+
|len.|seq.|  payload  |crc.|
+----+----+----...----+----+
```

Envelope description:

* Length: length+seqno+payload+crc length encoded as 4 length bytes (little endian, the length of the length field must be included, too)
* Seqno: the TCP sequence number for this TCP connection (different from the [MTProto sequence number](/mtproto/description.md#message-sequence-number-msg-seqno)): the first packet sent is numbered 0, the next one 1, etc.
* payload: MTProto payload
* crc: 4 CRC32 bytes computed using length, sequence number, and payload together.

### Transport features

Additionally, the following transport features can be used: 

#### Quick ack

Some of the TCP transports listed above support quick ACKs: quick ACKs are a way for clients to get quick receipt acknowledgements for packets.  

To request a quick ack for a specific outgoing payload, clients must set the MSB of an appropriate field in the transport envelope (as described in the documentation for each transport protocol above).  

Also, clients must generate and store a quick ACK token, associating it with the outgoing MTProto payload, by:

* Taking the first 32 bits of the SHA256 of the encrypted portion of the payload prepended by 32 bytes from the authorization key (the same hash generated when computing the [message key](/mtproto/description.md#message-key-msg-key), except that instead of taking the middle 128 bits, the first 32 bits are taken instead).  
* Setting the MSB of the last byte to 1: in other words, treat the 32 bits generated above as a little-endian integer, then add `0x80000000` to it (i.e. `ack_token = msg_key_long[0:4] | (1 << 31)` on a little-endian system).  

Once the payload is successfully received, decrypted and accepted for processing by the server, the server will send back the same quick ACK token we generated above, using the encoding described in the documentation for each transport protocol.  

Note that reception of a quick ACK **does not** indicate that any of the RPC queries contained in the message have succeeded, failed or finished execution at all, it simply indicates that they have been received, decrypted and accepted for processing by the server.  

The server will still send `msgs_ack` constructors for content-related constructors and methods contained in payloads which were quick ACKed, as well as replies/errors for methods and constructors, as usual.  

#### Transport errors

In the event of a transport error (missing auth key, transport flood, etc.), the server may send a packet (framed as an MTProto payload by the chosen MTProto transport) with a signed little-endian number of 4 bytes, whose **absolute value** contains the error code (the error itself is actually negative).  

For example, error Code 403 corresponds to situations where the corresponding HTTP error would have been returned by the HTTP protocol.  

Error 404 (auth key not found) is returned when the specified auth key ID cannot be found by the DC, during the initial MTProto handshake if any of the specified queries is incorrect, or during normal operation for example if some MTProto fields are incorrect (i.e. the MTProto packet length is bigger than the transport-specified packet length, and so on).  

Error 429 (transport flood) is returned when too many transport connections are established to the same IP in a too short lapse of time, or if any of the [container](/mtproto/service_messages.md#simple-container)/[service message limits](/mtproto/service_messages_about_messages.md#acknowledgment-of-receipt) are reached.  

Error 444 (invalid DC) is returned while [creating an auth key](/mtproto/auth_key.md#presenting-proof-of-work-server-authentication), [connecting to an MTProxy](#transport-obfuscation) or in other contexts if an invalid DC ID is specified.  

When using the [HTTP](/mtproto/transports.md#http)/[HTTPS](/mtproto/transports.md#https) transports, transport errors are not transmitted as specified above, instead they are simply returned as normal HTTP status codes (and the HTTP payload must be ignored).  

#### Transport obfuscation

Transport obfuscation is required to use the [WebSocket transports](transports#websocket).

Transport obfuscation to **prevent ISP blocks** is implemented using the following protocol, situated under the MTProto transport in the ISO/OSI stack, see the [recap](/mtproto.md#recap); this means that the payload is first wrapped in the [MTProto transport envelope](/mtproto/mtproto-transports.md) (all transports are supported), and then obfuscated: 

Prior to establishing the connection (and eventually sending the protocol header of a specific [MTProto transport](/mtproto/mtproto-transports.md)), a 64-byte (512-bit) **random** initialization payload is generated.
During the generation process, special care must be taken in order to avoid a situation where that the first int (first four bytes) of the random string are equal to one of the known protocol identifiers (see above).  
In particular, the first four bytes must not be equal to `0xdddddddd` (padded intermediate), `0xeeeeeeee` (intermediate), `POST`, `GET `, `HEAD `, or any of the HTTP methods that are accepted by the MTProto servers.  
The first byte must also not be equal to `0xef` (abridged).
Bytes `4-8` must also not be equal to `0x00000000`, since that would indicate use of the full transport with the initial TCP sequence number (0).

The protocol identifier, if present, must be inserted in the initialization payload at byte offset `56`: if its length is less than 4, it must be padded using the protocol identifier itself, to make its length 4 (`0xef` => `0xefefefef`): the standalone protocol identifier must be not be sent aftwerwards.

This protocol is also (but not exclusively) used when connecting to MTProxies: **only in this case**, the DC ID in a specially encoded form must also be inserted in the initialization payload at offset `60`.
The encoding simply consists of the DC ID in two-byte signed little-endian form; `10000` has to be added to the DC ID to connect to the test servers; it has to be made negative if the DC we're connecting to is a media (not CDN) DC.  

Next, a secondary initialization payload is generated by reversing the primary initialization payload.  

Two keys are extracted from both initialization payloads, using bytes at offsets `8-40`: the key extracted from the primary payload is used as encryption key, the key extracted from the secondary payload is used as decryption key.

Two IVs are extracted from both initialization payloads, using bytes at offsets `40-56`: the IV extracted from the primary payload is used as encryption IV, the IV extracted from the secondary payload is used as decryption IV.

**Only if using MTProxy**, the secret is used to provide connection with the MTProxy server.
The secret is a 16-byte string, usually distributed in its hexadecimal form along with the MTProxy host and port in [proxy deep links&nbsp;&raquo;](/api/links.md#mtproxy-links).

Often, a 17-byte version of the secret can be found: this simply indicates that the client should use a specific MTProto transport (based on the first byte, usually it's `0xdd`, to indicate that the padded intermediate protocol should be used `0xdddddddd`; however, clients should default to the padded intermediate transport whenever an additional byte in the secret is encountered).

The extracted encryption and decryption keys must be concatenated with the secret (the first byte of which should be ignored if it's the 17-byte version), and the SHA256 hash of such string should be used as encryption/decryption key.

The obtained encryption and decryption key/IV pairs must then be used with **AES-256-CTR** to encrypt and decrypt all outgoing and incoming payloads.  
The final value of the encryption/decryption counter after handling an MTProto payload must be used as IV for the next payload, until the TCP/WS connection is closed.  
In other words, reuse the two encryption and decryption **AES-256-CTR** OpenSSL instances until the connection is closed.  

The first thing that must be encrypted using the encryption key is the initialization payload itself.
Then bytes `56-64` of the encrypted initialization payload are substituted in the original initialization payload: this is the part that contains the constant MTProto transport protocol identifier and the DC ID (**only for MTProxies**).

The final initialization payload must then be sent in the socket as **first 64 bytes** after the TCP handshake.

Example pseudocode for the generation of an MTProxy connection payload (media DC 4) using the obfuscated [padded intermediate](#padded-intermediate) transport.  
**Warning**: do not use the specified proxy secret in any MTProxy exposed on the internet.

```
protocol := 0xdddddddd
dc := 0xfcff

while True:
    init := (56 random bytes) + protocol + dc + (2 random bytes)
    
    if init[0] == 0xef:
      continue

	first_int := substr(init, 0, 4)
	if first_int == 0x44414548 || first_int == 0x54534f50 || first_int == 0x20544547 || first_int == 0x4954504f || first_int == 0x02010316 || first_int == 0xdddddddd || first_int == 0xeeeeeeee:
      continue
      
	second_int := substr(init, 4, 4)
    if second_int == 0x00000000:
      continue
      
	break

initRev := strrev(init)

encryptKey := substr(init, 8, 32)
encryptIV := substr(init, 40, 16)

decryptKey := substr(initRev, 8, 32)
decryptIV := substr(initRev, 40, 16)

secret := substr(0xdd99999999999999999999999999999999, 1, 16)

encryptKey = SHA256(encryptKey + secret)
decryptKey = SHA256(decryptKey + secret)

encryptedInit := CTR(encryptKey, encryptIV, init)

finalInit := substr(init, 0, 56) + substr(encryptedInit, 56, 8)

write(finalInit)
```
