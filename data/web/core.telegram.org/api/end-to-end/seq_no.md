# Sequence numbers in Secret Chats

It is necessary to interpret **all** messages in their original order to protect against reordering, reflection, replay, omission and other manipulations ([decryptedMessageActionResend](/constructor/decryptedMessageActionResend.md) messages are the only exception to this rule, see [avoiding concurrent gaps](#avoiding-concurrent-gaps)). Secret chats support a special mechanism for handling **seq_no** counters independently from the server. Note that any *service messages* in secret chats must also increment the **seq_no**.

All Secret Chats messages in clients using Layer 17 or higher are wrapped in [decryptedMessageLayer](/constructor/decryptedMessageLayer.md) and have **seq_no** (sequence number) counters attached to them. The **seq_no** counters in their raw form are initialized with **(out_seq_no, in_seq_no) := (0,0)**, and incremented strictly by 1 after any message (service or not) is sent/received and processed. They must be protected from mirroring before being sent to the remote client by transformation according to formula **2\*raw_seq_no+x**, where **x** is 0 or 1, determined by the following rule:

| &nbsp; | **in_seq_no** | **out_seq_no** |
| --- | ------- | ------- |
| secret chat initiated by sender | 0 | 1 |
| secret chat initiated by recipient | 1 | 0 |

In this way the least significant bit of each **seq_no** field included in the message is different for incoming and outgoing messages. This is done to prevent a possible attacker from mirroring the messages. If any of the received **in_seq_no** or **out_seq_no** are not consistent in terms of parity (see table above), the client is required to immediately abort the secret chat.

>E.g., the first message the local client sends to any secret chat will have **out_seq_no** of **0+x_out**, the second one will have **out_seq_no** of **2\*1+x_out**, and so on, where **x_out** is 0 if the chat was initiated by the remote client, 1 otherwise; similarly for the received messages, but there **x_in** is used instead of **x_out** and is equal to 0 if the chat was initiated by the local client, 1 otherwise. 

Raw sequence numbers will be used in the remaining part of this text, unless otherwise specified.

#### Preventing gaps
Your client must ensure that all outgoing secret chat messages are queued on the server in the correct order. This is achieved by correctly placing them into the [invokeAfterMsgs](/method/invokeAfterMsgs.md) chain. Failure to do this may result in gaps on the remote client, which may in turn lead to aborted secret chats. The local client must maintain the correct sequence of **in_seq_no** for the remote client. To achieve this, assign **in_seq_no** and **out_seq_no** to each message at the *exact* moment when the message is created, and never change them in the future.

## Security checks

#### Checking out_seq_no

Your client must check that it has received *each* message with the sequence number **out_seq_no** starting from 0 to some current point **C**. It should then expect the next message to have the sequence number **out_seq_no=C+1**. If the **out_seq_no** in the received message does not match this, the following needs to be done:

- If the received **out_seq_no<=C**, the local client must drop the message (repeated message). The client should not check the contents of the message because the original message could have been deleted (see [Deleting unacknowledged messages](#deleting-unacknowledged-messages)).
- If the received **out_seq_no>C+1**, it most likely means that the server left out some messages due to a technical failure or due to the messages becoming obsolete. A temporary solution to this is to simply abort the secret chat. But since this may cause some existing older secret chats to be aborted, it is strongly recommended for the client to properly handle such **seq_no** gaps. Note that **in_seq_no** is not increased upon receipt of such a message; it is advanced only after all preceding gaps are filled.

#### Proper handling of gaps

In order to correctly handle incoming messages after a hole has been identified (when received **out_seq_no>C+1**), it is necessary to put received messages with the wrong **seq_no** into a "waiting queue" on the local client, and to re-request the missing messages using the special constructor [decryptedMessageActionResend](/constructor/decryptedMessageActionResend.md). The sequence numbers used in this constructor must be ready for interpretation by the remote client and therefore *cannot* be in their raw form: you can easily get the necessary **start_seq_no** by adding 2 to the **out_seq_no** of the last message before the hole and the **end_seq_no** by subtracting 2 from the **out_seq_no** of the received message with the wrong sequence number.

Each hole normally requires only one request to resend messages — if the remote client keeps sending out of sync messages, they should be put into the queue without sending a new request. Having received the missing messages, the local client must first interpret these messages in the right order by their **seq_no**. Once this is done, the client can proceed to interpret messages from the queue (again, in the right **seq_no** order).

Special cases:

- Note that having *two* gaps simultaneously is very rare (provided that the remote client and server are operating normally) and it is acceptable to abort the secret chat in this situation.
- If a local client receives [decryptedMessageActionResend](/constructor/decryptedMessageActionResend.md) but is unable to satisfy the request, it must abort the secret chat.

#### Avoiding concurrent gaps
In order to avoid getting stuck with concurrent gaps on both sides, [decryptedMessageActionResend](/constructor/decryptedMessageActionResend.md) must always be interpreted *immediately upon receipt* in all cases, even if its **out_seq_no>=C+1**. Note that each [decryptedMessageActionResend](/constructor/decryptedMessageActionResend.md) must only be handled once, it must not be interpreted again when we interpret messages in the queue.

#### Checking and handling in_seq_no
**in_seq_no** of all received messages must be *valid*. To ensure this, perform the following checks:

- **in_seq_no** must form a non-decreasing sequence of non-negative integer numbers.
- **in_seq_no** must be valid at the moment of receiving the message, that is, if **D** is the **out_seq_no** of last message we sent, the received **in_seq_no** should not be greater than **D + 1**. This also allows us to insert the received message into its correct place in the secret chat. For example, imagine that the local client has sent 5 secret chat messages, and then receives a secret chat message with the text "Yes" and **in_seq_no=2**. In this situation the local client *must* place that message after the second message it sent. This makes manipulations with delayed messages impossible.

If `in_seq_no` contradicts these criteria, the local client is required to immediately abort the secret chat. This could happen only in case of malicious or buggy behaviour on either server or remote client side.

#### Deleting unacknowledged messages
In case the user on the local client has deleted a message *before* the server (or the remote client, if [decryptedMessageActionResend](/constructor/decryptedMessageActionResend.md) is handled correctly) could acknowledge the message, for security reasons, you must:

- securely destroy the contents of the message (as in case of any other deleted Secret Chat message);
- change the local copy of the original message to `decryptedMessageActionDeleteMessages` with **random_id** equal to its own **random_id**;
- create a new outgoing message deleting the original message.

This must be done because your client doesn't know whether the remote client really received the message or not. In the case the message was already received, it will be deleted by the second message; otherwise it must arrive as a "self-delete" message to maintain the correct sequence of seq_no.
