# End-to-End Encrypted Voice and Video Calls

This article describes the end-to-end encryption used for Telegram **voice** and **video calls**.

##### Related Articles



-----

## Establishing Calls

Before a call is ready, some preliminary actions have to be performed. The calling party needs to contact the party to be called and check whether it is ready to accept the call. Besides that, the parties have to negotiate the protocols to be used, learn the IP addresses of each other or of the Telegram relay servers to be used (so-called *reflectors*), and generate a one-time encryption key for this voice call with the aid of *Diffie--Hellman key exchange*. All of this is accomplished in parallel with the aid of several Telegram API methods and related notifications. This document covers details related to key generation, encryption and security.

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

## Encryption

>This document describes encryption in **voice and video calls** as implemented in Telegram apps with versions **7.0** and above. See [this document](/api/end-to-end/voice-calls.md) for details on encryption used in **voice calls** in app versions released before **August 14, 2020**.

The [Telegram Voice and Video Call Library](https://github.com/TelegramMessenger/tgcalls) uses an optimized version of [MTProto 2.0](/) to send and receive **packets**, consisting of one or more end-to-end encrypted **messages** of various types ([*ice*](https://webrtcglossary.com/ice/) *candidates list, video formats, remote video status, audio stream data, video stream data, message ack* or *empty*).

This document describes only the encryption process, leaving out encoding and network-dependent parts.

The library starts working with:

- An [encryption key](#key-generation) `key` shared between the parties, as generated above.
- Information whether the call is **outgoing** or **incoming**.
- Two data transfer channels: **signaling**, offered by the Telegram API, and **transport** based on WebRTC.

Both data transfer channels are unreliable (messages may get lost), but **signaling** is slower and more reliable.

### Encrypting Call Data

The body of a packet (`decrypted_body`) consists of several messages and their respective `seq` numbers concatenated together.

- decrypted_body = message_seq1 + message_body1 + message_seq2 + message_body2

Each `decrypted_body` is unique because no two `seq` numbers of the first message can be the same. If only old messages need to be re-sent, an *empty* message with new unique `seq` is added to the packet first.

The [encryption key](#key-generation) `key` is used to compute a 128-bit `msg_key` and then a 256-bit `aes_key` and a 128-bit `aes_iv`:

- msg_key_large = SHA256 (substr(key, 88+x, 32) + decrypted_body);
- msg_key = substr (msg_key_large, 8, 16);
- sha256_a = SHA256 (msg_key + substr (key, x, 36));
- sha256_b = SHA256 (substr (key, 40+x, 36) + msg_key);
- aes_key = substr (sha256_a, 0, 8) + substr (sha256_b, 8, 16) + substr (sha256_a, 24, 8);
- aes_iv = substr (sha256_b, 0, 4) + substr (sha256_a, 8, 8) + substr (sha256_b, 24, 4);

`x` depends on whether the call is **outgoing** or **incoming** and on the connection type:

- x = 0 for **outgoing** + **transport**
- x = 8 for **incoming** + **transport**
- x = 128 for **outgoing** + **signaling**
- x = 136 for **incoming** + **signaling**

This allows apps to decide which packet types will be sent to which connections and work in these connections independently (with each having its own `seq` counter).

The resulting `aes_key` and `aes_iv` are used to encrypt `decrypted_body`:

- encrypted_body = AES_CTR (decrypted_body, aes_key, aes_iv)

The packet that gets sent consists of `msg_key` and `encrypted_body`:

- packet_bytes = msg_key + encrypted_body

When received, the packet gets decrypted using `key` and `msg_key`, after which `msg_key` is checked against the relevant `SHA256` substring. If the check fails, the packet **must** be discarded.

### Protecting Against Replay Attacks

Each of the peers maintains its own 32-bit monotonically increasing counter for outgoing messages, `seq`, starting with `1`. This `seq` counter is prepended to each sent message and increased by `1` for each new message. No two `seq` numbers of the first message in a packet can be the same. If only old messages need to be re-sent, an *empty* message with a new unique `seq` is added to the packet first. When the `seq` counter reaches `2^30`, the call must be aborted. Each peer stores `seq` values of all the messages it has received (and processed) which are larger than `max_received_seq - 64`, where `max_received_seq` is the largest `seq` number received so far.

If a packet is received, the first message of which has a `seq` that is smaller or equal to `max_received_seq - 64` or its `seq` had already been received, the message is discarded. Otherwise, the `seq` values of all incoming messages are memorized and `max_received_seq` is adjusted. This guarantees that no two packets will be processed twice.

## Key Verification

To verify the key, and ensure that no MITM attack is taking place, both parties concatenate the secret key *key* with the value *g_a* of the Caller (*A*) and compute `fingerprint_hash = SHA256(key || g_a)`. This 32-byte hash is converted into four emojis using the same [emoji fingerprint generation algorithm used by end-to-end encrypted group calls &raquo;](/api/end-to-end/group-calls.md#emoji-fingerprint-generation). The specifics of the protocol guarantee that comparing four emoticons out of the fingerprint emoji table (which contains 333 emojis) is sufficient to prevent eavesdropping (MiTM attack on DH) with a probability of **0.9999999999**.

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
