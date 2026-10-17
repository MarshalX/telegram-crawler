# encryptedChatDiscarded

Discarded or deleted chat.

```tl
encryptedChatDiscarded#1e1c7c45 flags:# history_deleted:flags.0?true id:int = EncryptedChat;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **history\_deleted** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether both users of this secret chat should also remove all of its messages |
| **id** | [int](/type/int.md) | Chat ID |

### Type
[EncryptedChat](/type/EncryptedChat.md)