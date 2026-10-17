# messages.messageReactionsList

List of peers that reacted to a specific message

```tl
messages.messageReactionsList#31bd492d flags:# count:int reactions:Vector<MessagePeerReaction> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = messages.MessageReactionsList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **count** | [int](/type/int.md) | Total number of reactions matching query |
| **reactions** | [Vector](/type/Vector%20t)&lt;[MessagePeerReaction](/type/MessagePeerReaction.md)&gt; | List of peers that reacted to a specific message |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |
| **next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | If set, indicates the next offset to use to load more results by invoking [messages.getMessageReactionsList](/method/messages.getMessageReactionsList.md). |

### Type
[messages.MessageReactionsList](/type/messages.MessageReactionsList.md)

### Related pages

#### [messages.getMessageReactionsList](/method/messages.getMessageReactionsList.md)
Get [message reaction](/api/reactions.md) list, along with the sender of each reaction.