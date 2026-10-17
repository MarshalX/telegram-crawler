# updateGroupCallEncryptedMessage

A new E2E-encrypted message or emoji reaction was received in a conference call, see [here »](/api/end-to-end/group-calls.md#receiving-and-decrypting-a-message) for the decryption process.

```tl
updateGroupCallEncryptedMessage#c957a766 call:InputGroupCall from_id:Peer encrypted_message:bytes = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Conference call that received the encrypted message |
| **from\_id** | [Peer](/type/Peer.md) | Sender whose blockchain public key must be used to verify the encrypted packet |
| **encrypted\_message** | [bytes](/type/bytes.md) | Complete encrypted packet |

### Type
[Update](/type/Update.md)

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.