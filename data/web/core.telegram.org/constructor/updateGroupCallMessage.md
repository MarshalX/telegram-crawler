# updateGroupCallMessage

A new message, reaction, paid comment or donation was received through the [in-call message overlay »](/api/group-calls.md#in-call-messages).

```tl
updateGroupCallMessage#d8326f0d call:InputGroupCall message:GroupCallMessage = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Group call that received the message |
| **message** | [GroupCallMessage](/type/GroupCallMessage.md) | Received in-call message |

### Type
[Update](/type/Update.md)

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.