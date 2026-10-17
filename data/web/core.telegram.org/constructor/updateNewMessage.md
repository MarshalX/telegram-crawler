# updateNewMessage

New message in a private chat or in a [basic group](/api/channel.md#basic-groups).

```tl
updateNewMessage#1f2b0afd message:Message pts:int pts_count:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **message** | [Message](/type/Message.md) | Message |
| **pts** | [int](/type/int.md) | New quantity of actions in a message box |
| **pts\_count** | [int](/type/int.md) | Number of generated events |

### Type
[Update](/type/Update.md)