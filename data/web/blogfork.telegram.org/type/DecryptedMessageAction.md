# DecryptedMessageAction

Object describes the action to which a service message is linked.

```tl
===8===
decryptedMessageActionSetMessageTTL#a1733aec ttl_seconds:int = DecryptedMessageAction;
decryptedMessageActionReadMessages#c4f40be random_ids:Vector<long> = DecryptedMessageAction;
decryptedMessageActionDeleteMessages#65614304 random_ids:Vector<long> = DecryptedMessageAction;
decryptedMessageActionScreenshotMessages#8ac1f475 random_ids:Vector<long> = DecryptedMessageAction;
decryptedMessageActionFlushHistory#6719e45c = DecryptedMessageAction;

===17===
decryptedMessageActionResend#511110b0 start_seq_no:int end_seq_no:int = DecryptedMessageAction;
decryptedMessageActionNotifyLayer#f3048883 layer:int = DecryptedMessageAction;
decryptedMessageActionTyping#ccb27641 action:SendMessageAction = DecryptedMessageAction;

===20===
decryptedMessageActionRequestKey#f3c9611b exchange_id:long g_a:bytes = DecryptedMessageAction;
decryptedMessageActionAcceptKey#6fe1735b exchange_id:long g_b:bytes key_fingerprint:long = DecryptedMessageAction;
decryptedMessageActionAbortKey#dd05ec6b exchange_id:long = DecryptedMessageAction;
decryptedMessageActionCommitKey#ec2e0b9b exchange_id:long key_fingerprint:long = DecryptedMessageAction;
decryptedMessageActionNoop#a82fdd63 = DecryptedMessageAction;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [decryptedMessageActionSetMessageTTL](/constructor/decryptedMessageActionSetMessageTTL.md) | Setting of a message lifetime after reading.\
\
Upon receiving such message the client shall start deleting of all messages of an encrypted chat **ttl\_seconds** seconds after the messages were read by user. |
| [decryptedMessageActionReadMessages](/constructor/decryptedMessageActionReadMessages.md) | Messages marked as read. |
| [decryptedMessageActionDeleteMessages](/constructor/decryptedMessageActionDeleteMessages.md) | Deleted messages. |
| [decryptedMessageActionScreenshotMessages](/constructor/decryptedMessageActionScreenshotMessages.md) | A screenshot was taken. |
| [decryptedMessageActionFlushHistory](/constructor/decryptedMessageActionFlushHistory.md) | The entire message history has been deleted. |
| [decryptedMessageActionResend](/constructor/decryptedMessageActionResend.md) | Request for the other party in a Secret Chat to automatically resend a contiguous range of previously sent messages, as explained in [Sequence number is Secret Chats](/api/end-to-end/seq_no.md). |
| [decryptedMessageActionNotifyLayer](/constructor/decryptedMessageActionNotifyLayer.md) | A notification stating the API layer that is used by the client. You should use your current layer and take notice of the layer used on the other side of a conversation when sending messages. |
| [decryptedMessageActionTyping](/constructor/decryptedMessageActionTyping.md) | User is preparing a message: typing, recording, uploading, etc. |
| [decryptedMessageActionRequestKey](/constructor/decryptedMessageActionRequestKey.md) | Request rekeying, see [rekeying process](/api/end-to-end/pfs.md) |
| [decryptedMessageActionAcceptKey](/constructor/decryptedMessageActionAcceptKey.md) | Accept new key |
| [decryptedMessageActionAbortKey](/constructor/decryptedMessageActionAbortKey.md) | Abort rekeying |
| [decryptedMessageActionCommitKey](/constructor/decryptedMessageActionCommitKey.md) | Commit new key, see [rekeying process](/api/end-to-end/pfs.md) |
| [decryptedMessageActionNoop](/constructor/decryptedMessageActionNoop.md) | NOOP action |