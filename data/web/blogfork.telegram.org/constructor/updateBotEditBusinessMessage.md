# updateBotEditBusinessMessage

A message was edited in a [connected business chat »](/api/bots/connected-business-bots.md).

```tl
updateBotEditBusinessMessage#7df587c flags:# connection_id:string message:Message reply_to_message:flags.0?Message qts:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **connection\_id** | [string](/type/string.md) | Business connection ID |
| **message** | [Message](/type/Message.md) | New message. |
| **reply\_to\_message** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Message](/type/Message.md) | The message that `message` is replying to. |
| **qts** | [int](/type/int.md) | New **qts** value, see [updates »](/api/updates.md) for more info. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.