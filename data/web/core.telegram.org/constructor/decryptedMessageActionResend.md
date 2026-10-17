# decryptedMessageActionResend

Request for the other party in a Secret Chat to automatically resend a contiguous range of previously sent messages, as explained in [Sequence number is Secret Chats](/api/end-to-end/seq_no.md).

```tl
===17===
decryptedMessageActionResend#511110b0 start_seq_no:int end_seq_no:int = DecryptedMessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **start\_seq\_no** | [int](/type/int.md) | `out_seq_no` of the first message to be resent, with correct parity |
| **end\_seq\_no** | [int](/type/int.md) | `out_seq_no` of the last message to be resent, with same parity. |

### Type
[DecryptedMessageAction](/type/DecryptedMessageAction.md)

### Related pages

#### [Sequence numbers in Secret Chats](/api/end-to-end/seq_no.md)
How to assign and interpret seq_no counters in secret chats to protect against message manipulation.