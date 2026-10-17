# End-to-End Encrypted Voice Calls

>This document describes encryption in **voice calls** as implemented in Telegram apps with versions **< 7.0**. See [this document](/api/end-to-end/video-calls.md) for details on encryption used in **voice and video calls** in app versions released on **August 14, 2020** and later.

##### Related articles



## Establishing voice calls

Before a voice call is ready, some preliminary actions have to be performed. The calling party needs to contact the party to be called and check whether it is ready to accept the call. Besides that, the parties have to negotiate the protocols to be used, learn the IP addresses of each other or of the Telegram relay servers to be used (so-called *reflectors*), and generate a one-time encryption key for this voice call with the aid of *Diffie--Hellman key exchange*. All of this is accomplished in parallel with the aid of several Telegram API methods and related notifications. This document details the generation of the encryption key. Other negotiations will be eventually documented elsewhere.

## Key Generation

The Diffie-Hellman key exchange, as well as the whole protocol used to create a new voice call, is quite similar to the one used for [Secret Chats](/api/end-to-end.md#key-generation). We recommend studying the linked article before proceeding.

However, we have introduced some important changes to facilitate the [key verification process](#key-verification). Below is the entire exchange between the two communicating parties, the Caller (A) and the Callee (B), through the Telegram servers (S).

* *A* executes [messages.getDhConfig](/method/messages.getDhConfig.md) to find out the 2048-bit Diffie-Hellman prime *p* and generator *g*. The client is expected to check whether *p* is a safe prime and perform all the [security checks](/api/end-to-end.md#sending-a-request) necessary for secret chats.
* *A* chooses a random value of *a*, 1 < a < p-1, and computes *g_a:=power(g,a) mod p* (a 256-byte number) and *g_a_hash:=SHA256(g_a)* (32 bytes long).
* *A* invokes (sends to server *S*) [phone.requestCall](/method/phone.requestCall.md), which has the field `g_a_hash:bytes`, among others. For this call, this field is to be filled with *g_a_hash*, **not** *g_a* itself.
* The Server *S* performs privacy checks and sends an [updatePhoneCall](/constructor/updatePhoneCall.md) update with a [phoneCallRequested](/constructor/phoneCallRequested.md) constructor to all of *B*'s active devices. This update, apart from the identity of *A* and other relevant parameters, contains the *g_a_hash* field, filled with the value obtained from *A*.
* *B* accepts the call on one of their devices, stores the received value of *g_a_hash* for this instance of the voice call creation protocol, chooses a random value of *b*, 1 < b < p-1, computes *g_b:=power(g,b) mod p*, performs all the required security checks, and invokes the [phone.acceptCall](/method/phone.acceptCall.md) method, which has a *g_b:bytes* field (among others), to be filled with the value of *g_b* itself (not its hash).
* The Server *S* sends an [updatePhoneCall](/constructor/updatePhoneCall.md) with the [phoneCallDiscarded](/constructor/phoneCallDiscarded.md) constructor to all other devices *B* has authorized, to prevent accepting the same call on any of the other devices. From this point on, the server *S* works only with that of *B*'s devices which has invoked [phone.acceptCall](/method/phone.acceptCall.md) first.
* The Server *S* sends to *A* an [updatePhoneCall](/constructor/updatePhoneCall.md) update with [phoneCallAccepted](/constructor/phoneCallAccepted.md) constructor, containing the value of *g_b* received from *B*.
* *A* performs all the usual security checks on *g_b* and *a*, computes the Diffie--Hellman key *key:=power(g_b,a) mod p* and its fingerprint *key_fingerprint:long*, equal to the lower 64 bits of *SHA1(key)*, the same as with secret chats. Then *A* invokes the [phone.confirmCall](/method/phone.confirmCall.md) method, containing `g_a:bytes` and `key_fingerprint:long`.
* The Server *S* sends to *B* an [updatePhoneCall](/constructor/updatePhoneCall.md) update with the [phoneCall](/constructor/phoneCall.md) constructor, containing the value of *g_a* in *g_a_or_b:bytes* field, and *key_fingerprint:long*
* At this point *B* receives the value of *g_a*. It checks that *SHA256(g_a)* is indeed equal to the previously received value of *g_a_hash*, performs all the [usual Diffie-Hellman security checks](/mtproto/security_guidelines.md), and computes the key *key:=power(g_a,b) mod p* and its fingerprint, equal to the lower 64 bits of *SHA1(key)*. Then it checks that this fingerprint equals the value of `key_fingerprint:long` received from the other side, as an implementation sanity check.

At this point, the Diffie--Hellman key exchange is complete, and both parties have a 256-byte shared secret key *key* which is used to encrypt all further exchanges between *A* and *B*.

It is of paramount importance to accept each update only once for each instance of the key generation protocol, discarding any duplicates or alternative versions of already received and processed messages (updates).

## Encryption of voice data

Both parties *A* (the Caller) and *B* (the Callee) transform the voice information into a sequence of small *chunks* or *packets*, not more than 1 kilobyte each. This information is to be encrypted using the shared key *key* generated during the initial exchange, and sent to the other party, either directly (P2P) or through Telegram's relay servers (so-called *reflectors*). This document describes only the encryption process for each chunk, leaving out voice encoding and the network-dependent parts.

### Encapsulation of low-level voice data

The low-level data chunk `raw_data:string`, obtained from voice encoder, is first encapsulated into one of the two constructors for the [DecryptedDataBlock](/type/DecryptedDataBlock.md) type, similar to [DecryptedMessage](/type/DecryptedMessage.md) used in secret chats:

	decryptedDataBlock#dbf948c1 random_id:long random_bytes:string flags:# voice_call_id:flags.2?int128 in_seq_no:flags.4?int out_seq_no:flags.4?int recent_received_mask:flags.5?int proto:flags.3?int extra:flags.1?string raw_data:flags.0?string = DecryptedDataBlock;
    simpleDataBlock#cc0d0e76 random_id:long random_bytes:string raw_data:string = DecryptedDataBlock;
    
Here `out_seq_no` is the chunk's sequence number among all sent by this party (starting from one), `in_seq_no` -- the highest known out_seq_no from the received packets. The parameter `recent_received_mask` is a 32-bit mask, used to track delivery of the last 32 packets sent by the other party. The bit *i* is set if a packet with `out_seq_no` equal to `in_seq_no`-*i* has been received.

The higher 8 bits in `flags` are reserved for use by the lower-level protocol (the one which generates and interprets `raw_data`), and will never be used for future extensions of `decryptedDataBlock`.

The parameters `voice_call_id` and `proto` are mandatory until the other side confirms reception of at least one packet by sending a packet with a non-zero `in_seq_no`. After that, they become optional, and the `simpleDataBlock` constructor can be used if the lower level protocol wants to.

The parameter `voice_call_id` is computed from the key `key` and equals the lower 128 bits of its SHA-256.

The `random_bytes` string should contain at least 7 bytes of random data. The field `random_id` also contains 8 random bytes, which can be used as a unique packet identifier if necessary.

### MTProto encryption

Once the data is encapsulated in `DecryptedDataBlock`, it is [TL-serialized](/mtproto/TL.md) and encrypted with [MTProto](/mtproto/description.md#defining-aes-key-and-initialization-vector), using `key` instead of `auth_key`; the parameter *x* is to be set to *0* for messages from *A* to *B*, and to *8* for messages in the opposite direction. Encrypted data are prepended by the 128-bit `msg_key` (usual for MTProto); before that, either the 128-bit `voice_call_id` (if P2P is used) or the `peer_tag` (if reflectors are used) is prepended. The resulting data packet is sent by UDP either directly to the other party (if P2P is possible) or to the Telegram relay servers (reflectors).

## Key Verification

To verify the key, both parties concatenate the secret key *key* with the value *g_a* of the Caller ( *A* ), compute SHA256 and use it to generate a sequence of emoticons. More precisely, the SHA256 hash is split into four 64-bit integers; each of them is divided by the total number of emoticons used (currently 333), and the remainder is used to select specific emoticons. The specifics of the protocol guarantee that comparing four emoticons out of a set of 333 is sufficient to prevent eavesdropping (MiTM attack on DH) with a probability of **0.9999999999**.

This is because instead of the standard Diffie-Hellman key exchange which requires only two messages between the parties:

* A->B : (generates a and) sends g_a := g^a
* B->A : (generates b and true key (g_a)^b, then) sends g_b := g^b
* A : computes key (g_b)^a

we use a **three-message modification** thereof that works well when both parties are online (which also happens to be a requirement for voice calls):

* A->B : (generates a and) sends g_a_hash := hash(g^a)
* B->A : (stores g_a_hash, generates b and) sends g_b := g^b
* A->B : (computes key (g_b)^a, then) sends g_a := g^a
* B : checks hash(g_a) == g_a_hash, then computes key (g_a)^b

The idea here is that *A* commits to a specific value of *a* (and of *g_a*) without disclosing it to *B*. *B* has to choose its value of *b* and *g_b* without knowing the true value of *g_a*, so that it cannot try different values of *b* to force the final key *(g_a)^b* to have any specific properties (such as fixed lower 32 bits of SHA256(key)). At this point, *B* commits to a specific value of *g_b* without knowing *g_a*. Then *A* has to send its value *g_a*; it cannot change it even though it knows *g_b* now, because the other party *B* would accept only a value of *g_a* that has a hash specified in the very first message of the exchange.

If some impostor is pretending to be either *A* or *B* and tries to perform a Man-in-the-Middle Attack on this Diffie--Hellman key exchange, the above still holds. Party *A* will generate a shared key with *B* -- or whoever pretends to be *B* -- without having a second chance to change its exponent *a* depending on the value *g_b* received from the other side; and the impostor will not have a chance to adapt his value of *b* depending on *g_a*, because it has to commit to a value of *g_b* before learning *g_a*. The same is valid for the key generation between the impostor and the party *B*.

The use of hash commitment in the DH exchange constrains the attacker to only **one guess** to generate the correct visualization in their attack, which means that using just over 33 bits of entropy represented by four emoji in the visualization is enough to make a successful attack highly improbable.

>For a slightly more user-friendly explanation of the above see: [How are calls authenticated?](/techfaq.md#q-how-are-voice-calls-authenticated)

