# Secret chats, end-to-end encryption (v. 1.0, DEPRECATED)

>This document describes end-to-end encrypted Secret Chats in MTProto 1.0, its status is **DEPRECATED**.
For information on end-to-end encryption used in up-to-date Telegram clients, kindly see [this document](/api/end-to-end.md).

##### Related articles


_______________________

Secret Chats are one-on-one chats wherein messages are encrypted with a key held only by the chat's participants. Please note that the [schema](/schema/end-to-end.md) for end-to-end encrypted Secret Chats is different from what is used for [cloud chats](/mtproto.md):

<div>
	<a href="/file/811140845/3/3aEkph1_NYU/cf861ae5ea85912769" target="_blank"><img src="/file/811140845/3/3aEkph1_NYU/cf861ae5ea85912769" title="End-to-end encryption in MTProto (Secret Chats)"  class="dev_page_image" /></a>
</div>

### Key Generation

The Diffie-Hellman protocol is used for key generation. For more information, see [Wikipedia](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange).

Let us consider the following scenario: User **A** would like to initiate encrypted communication with User **B**.

#### Sending a Request

User **A** executes [messages.getDhConfig](/method/messages.getDhConfig.md) to obtain the Diffie-Hellman parameters: a prime **p**, and a high order element **g**.

Executing this method before each new key generation procedure is of vital importance. It makes sense to cache the values of the parameters together with the version in order to avoid having to receive all of the values every time. If the version stored on the client is still up-to-date, the server will return the constructor [messages.dhConfigNotModified](/constructor/messages.dhConfigNotModified.md).

Client is expected to check whether **p** is a safe 2048-bit prime (meaning that both **p** and **(p-1)/2** are prime, and that 2^2047 < p < 2^2048), and that **g** generates a cyclic subgroup of prime order **(p-1)/2**, i.e. is a quadratic residue **mod p**. Since **g** is always equal to 2, 3, 4, 5, 6 or 7, this is easily done using quadratic reciprocity law, yielding a simple condition on **p mod 4g** -- namely, **p mod 8 = 7** for **g = 2**; **p mod 3 = 2** for **g = 3**; no extra condition for **g = 4**; **p mod 5 = 1 or 4** for **g = 5**; **p mod 24 = 19 or 23** for **g = 6**; and **p mod 7 = 3, 5 or 6** for **g = 7**. After **g** and **p** have been checked by the client, it makes sense to cache the result, so as to avoid repeating lengthy computations in future. This cache might be shared with one used for [Authorization Key generation](/mtproto/auth_key.md).

If the client has an inadequate random number generator, it makes sense to pass the **random_length** parameter (random_length> 0) so the server generates its own random sequence **random** of the appropriate length.
**Important**: using the server's random sequence in its raw form may be unsafe. It must be combined with a client sequence, for example, by generating a client random number of the same length (**client_random**) and using `final_random := random XOR client_random`.

Client **A** computes a 2048-bit number **a** (using sufficient entropy or the server's **random**; see above) and executes [messages.requestEncryption](/method/messages.requestEncryption.md) after passing in `g_a := pow(g, a) mod dh_prime`.

User **B** receives the update [updateEncryption](/constructor/updateEncryption.md) for all associated authorization keys (all authorized devices) with the chat constructor [encryptedChatRequested](/constructor/encryptedChatRequested.md). The user must be shown basic information about User **A** and must be prompted to accept or reject the request.

Both clients are to check that **g**, **g_a** and **g_b** are greater than one and smaller than **p-1**. We recommend checking that **g_a** and **g_b** are between **2^{2048-64}** and **p - 2^{2048-64}** as well.

#### Accepting a Request

After User **B** confirms the creation of a secret chat with **A** in the client interface, Client **B** also receives up-to-date configuration parameters for the Diffie-Hellman method. Thereafter, it generates a random 2048-bit number, **b**, using rules similar to those for **a**. 

Having received **g_a** from the update with [encryptedChatRequested](/constructor/encryptedChatRequested.md), it can immediately generate the final shared key: `key = (pow(g_a, b) mod dh_prime)`. If key length < 256 bytes, add several leading zero bytes as padding — so that the key is exactly 256 bytes long. Its fingerprint, **key_fingerprint**, is equal to the 64 last bits of SHA1 (key).

**Note:** this fingerprint is used as a sanity check for the key exchange procedure to detect bugs while developing client software — it is not connected to the key visualization used on the clients as means of external authentication in secret chats. [Key visualizations](/api/end-to-end/pfs.md#key-visualization) on the clients are generated using the first 128 bits of SHA1(initial key) followed by the first 160 bits of SHA256(key used when secret chat was updated to layer 46).

Client **B** executes [messages.acceptEncryption](/method/messages.acceptEncryption.md) after passing it `g_b := pow(g, b) mod dh_prime` and **key_fingerprint**.

For all of Client **B's** authorized devices, except the current one, [updateEncryption](/constructor/updateEncryption.md) updates are sent with the constructor [encryptedChatDiscarded](/constructor/encryptedChatDiscarded.md). Thereafter, the only device that will be able to access the secret chat is Device **B**, which made the call to [messages.acceptEncryption](/method/messages.acceptEncryption.md).

User **A** will be sent an [updateEncryption](/constructor/updateEncryption.md) update with the constructor [encryptedChat](/constructor/encryptedChat.md), for the authorization key that initiated the chat.

With **g_b** from the update, Client **A** can also receive the shared key `key = (pow(g_b, a) mod dh_prime)`. If key length < 256 bytes, add several leading zero bytes as padding — so that the key is exactly 256 bytes long. If the fingerprint for the received key is identical to the one that was passed to [encryptedChat](/constructor/encryptedChat.md), incoming messages can be sent and processed. Otherwise, [messages.discardEncryption](/method/messages.discardEncryption.md) must be executed and the user notified.

#### Perfect Forward Secrecy

In order to keep past communications safe, official Telegram clients will initiate re-keying once a key has been used to decrypt and encrypt more than 100 messages, or has been in use for more than one week, provided the key has been used to encrypt at least one message. Old keys are then securely discarded and cannot be reconstructed, even with access to the new keys currently in use.

>The re-keying protocol is further described in this article: [Perfect Forward Secrecy in Secret Chats](/api/end-to-end/pfs.md).

Please note that your client must support Forward Secrecy in Secret Chats to be compatible with official Telegram clients. 

### Sending and Receiving Messages in a Secret Chat

#### Serialization and Encryption of Outgoing Messages

A TL object of type [DecryptedMessage](/type/DecryptedMessage.md) is created and contains the message in plain text. For backward compatibility, the object must be wrapped in the constructor [decryptedMessageLayer](/constructor/decryptedMessageLayer.md) with an indication of the supported layer (starting with 8).
The TL-Schema for end-to-end encrypted messages contents is represented [here »](/schema/end-to-end.md).

The resulting construct is serialized as an array of bytes using generic TL rules. The resulting array is padded at the top with 4 bytes of the array length not counting these 4 bytes.
A message key, **msg_key**, is computed as the 128 low-order bits of the SHA1 of the data obtained in the previous step.
The byte array is padded with random data until its length is divisible by 16 bytes.
An AES key and an initialization vector are computed ( **key** is the shared key obtained during [Key Generation](#key-generation); in MTProto 1.0, **x** = 0 ):

* msg_key =  substr (SHA1 (plaintext), 4, 16);
* sha1_a = SHA1 (msg_key + substr (key, x, 32));
* sha1_b = SHA1 (substr (key, 32+x, 16) + msg_key + substr (key, 48+x, 16));
* sha1_c = SHA1 (substr (key, 64+x, 32) + msg_key);
* sha1_d = SHA1 (msg_key + substr (key, 96+x, 32));
* aes_key = substr (sha1_a, 0, 8) + substr (sha1_b, 8, 12) + substr (sha1_c, 4, 12);
* aes_iv = substr (sha1_a, 8, 12) + substr (sha1_b, 0, 8) + substr (sha1_c, 16, 4) + substr (sha1_d, 0, 8);

Data is encrypted with a 256-bit key, **aes_key**, and a 256-bit initialization vector, **aes-iv**, using AES-256 encryption with infinite garble extension (IGE). Encryption key fingerprint **key_fingerprint** and the message key **msg_key** are added at the top of the resulting byte array.

Encrypted data is embedded into a [messages.sendEncrypted](/method/messages.sendEncrypted.md) API call and passed to Telegram server for delivery to the other party of the Secret Chat.

#### Decrypting an Incoming Message

The steps above are performed in reverse order. 
When an encrypted message is received, you **must** check that msg_key is **in fact** equal to the 128 low-order bits of the SHA1 hash of the decrypted message.
If the message layer is greater than the one supported by the client, the user must be notified that the client version is out of date and prompted to update.

#### Sequence numbers

It is necessary to interpret all messages in their original order to protect against possible manipulations. Secret chats support a special mechanism for handling seq_no counters independently from the server.

>Proper handling of these counters is further described in this article: [Sequence numbers in Secret Chats](/api/end-to-end/seq_no.md).

Please note that your client must support sequence numbers in Secret Chats to be compatible with official Telegram clients. 

#### Sending Encrypted Files

All files sent to secret chats are encrypted with one-time keys that are in no way related to the chat's shared key. Before an encrypted file is sent, it is assumed that the encrypted file's address will be attached to the outside of an encrypted message using the **file** parameter of the [messages.sendEncryptedFile](/method/messages.sendEncryptedFile.md) method and that the key for direct decryption will be sent in the body of the message (the **key** parameter in the constructors  [decryptedMessageMediaPhoto](/constructor/decryptedMessageMediaPhoto.md), [decryptedMessageMediaVideo](/constructor/decryptedMessageMediaPhoto.md) and [decryptedMessageMediaFile](/constructor/decryptedMessageMediaPhoto.md).

Prior to a file being sent to a secret chat, 2 random 256-bit numbers are computed which will serve as the AES key and initialization vector used to encrypt the file. AES-256 encryption with infinite garble extension (IGE) is used in like manner.

The key fingerprint is computed as follows:

* digest = md5(key + iv)
* fingerprint = substr(digest, 0, 4) XOR substr(digest, 4, 4)

The encrypted contents of a file are stored on the server in much the same way as those of a [file in cloud chats](/api/files.md): piece by piece using calls to [upload.saveFilePart](/method/upload.saveFilePart.md).
A subsequent call to [messages.sendEncryptedFile](/method/messages.sendEncryptedFile.md) will assign an identifier to the stored file and send the address together with the message. The recipient will receive an update with  [encryptedMessage](/constructor/encryptedMessage.md), and the **file** parameter will contain file information.

Incoming and outgoing encrypted files can be forwarded to other secret chats using the constructor [inputEncryptedFile](/constructor/inputEncryptedFile.md) to avoid saving the same content on the server twice.

#### Working with an Update Box

Secret chats are associated with specific devices (or rather with [authorization keys](/mtproto/description_v1.md#authorization-key)), not users. A conventional message box, which uses **pts** to describe the client's status, is not suitable, because it is designed for long-term message storage and message access from different devices.

An additional temporary message queue is introduced as a solution to this problem. When an update regarding a message from a secret chat is sent, a new value of **qts** is sent, which helps reconstruct the difference if there has been a long break in the connection or in case of loss of an update.

As the number of events increases, the value of **qts** increases monotonically (not always by 1). The initial value may not (and will not) be equal to 0.

The fact that events from the temporary queue have been received and stored by the client is acknowledged explicitly by a call to the [messages.receivedQueue](/method/messages.receivedQueue.md) method or implicitly by a call to [updates.getDifference](/method/updates.getDifference.md) (the value of **qts** passed, not the final state). All messages acknowledged as delivered by the client, as well as any messages older than 7 days, may (and will) be deleted from the server.

Upon de-authorization, the event queue of the corresponding device will be forcibly cleared, and the value of **qts** will become irrelevant.

## Updating to new layers

Your client should always store the maximal layer that is known to be supported by the client on the other side of a secret chat. When the secret chat is first created, this value should be initialized to 8, the first layer where Secret Chats became available. This remote layer value must always be updated immediately after receiving *any* packet containing information of an upper layer, i.e.:

- any secret chat message containing *layer_no* in its `decryptedMessageLayer` with *layer*>=17, or
- a [decryptedMessageActionNotifyLayer](/constructor/decryptedMessageActionNotifyLayer.md) service message, wrapped as if it were the [decryptedMessageService](/constructor/decryptedMessageService.md) constructor of the obsolete layer 8 (constructor `decryptedMessageService#aa48327d`).

#### Notifying the remote client about your local layer

In order to notify the remote client of your local layer, your client must send a message of the `decryptedMessageActionNotifyLayer` type. This notification must be wrapped in a constructor of an appropriate layer. For instance, if the remote layer for the chat in question is deemed to be lower than 17, the notification must be wrapped as if it were the `decryptedMessageService` constructor of the obsolete layer 8 (constructor `decryptedMessageService#aa48327d`), despite the fact that the `decryptedMessageActionNotifyLayer` constructor is actually not present in Layer 8.

There are three cases when your client must notify the remote client about its local layer:

1. As soon as a new secret chat has been created, immediately after the secret key has been successfully exchanged.
2. Immediately after the remote layer value is updated to layer 17 or higher. An exception to this case is when the secret chat in question has been created less than 15 seconds ago. In this case the notification was already sent (see 1).
3. Immediately after the local client has been updated to support a new secret chat layer. In this case notifications must be sent to **all** currently existing secret chats. Note that this is only necessary when updating to new layers that contain changes in the secret chats implementation (e.g. you don't need to do this when your client is updated from Layer 17 to Layer 18).

>  Note that all pending obsolete layer messages must be sent prior to the layer update notification (more on this in [Handling Sequence numbers](/api/end-to-end/seq_no.md#preventing-gaps)).
