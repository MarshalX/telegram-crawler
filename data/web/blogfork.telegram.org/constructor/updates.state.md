# updates.state

Updates state.

```tl
updates.state#a56c2a3e pts:int qts:int date:int seq:int unread_count:int = updates.State;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **pts** | [int](/type/int.md) | Number of events occurred in a text box |
| **qts** | [int](/type/int.md) | Position in a sequence of updates in secret chats. For further details refer to article [secret chats](/api/end-to-end.md) |
| **date** | [int](/type/int.md) | Date of condition |
| **seq** | [int](/type/int.md) | Number of sent updates |
| **unread\_count** | [int](/type/int.md) | Number of unread messages |

### Type
[updates.State](/type/updates.State.md)

### Related pages

#### [End-to-End Encryption, Secret Chats](/api/end-to-end.md)
New feature for end-to-end-encrypted messaging.