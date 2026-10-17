# updateBotGuestChatQuery

Sent to [guest bots »](/api/bots/guest-mode.md) when a user invokes the bot as a guest in a chat. The bot should reply by invoking [messages.setBotGuestChatResult](/method/messages.setBotGuestChatResult.md), see [here »](/api/bots/guest-mode.md#handling-guest-queries-bot-side) for more info.

```tl
updateBotGuestChatQuery#cdd4093d flags:# query_id:long message:Message reference_messages:flags.0?Vector<Message> qts:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **query\_id** | [long](/type/long.md) | Query identifier, to be passed to [messages.setBotGuestChatResult](/method/messages.setBotGuestChatResult.md) when replying |
| **message** | [Message](/type/Message.md) | The message that triggered the query |
| **reference\_messages** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | Additional context messages referenced by the triggering message (for example replied-to messages) |
| **qts** | [int](/type/int.md) | [Persistent timestamp](/api/updates.md) (`qts`) of the update, used by bots to receive updates of this type |

### Type
[Update](/type/Update.md)

### Related pages

#### [messages.setBotGuestChatResult](/method/messages.setBotGuestChatResult.md)
Bots may use this method to answer a [guest mode »](/api/bots/guest-mode.md) query received via an [updateBotGuestChatQuery](/constructor/updateBotGuestChatQuery.md) update, providing the message to post into the chat as a guest, see [here »](/api/bots/guest-mode.md#handling-guest-queries-bot-side) for more info.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Guest mode for bots](/api/bots/guest-mode.md)
Guest bots can be queried by username from **any** non-secret private chat, group and supergroup (except for groups/supergroups with [content protection &raquo;](/api/content-protection.md#for-groups-and-channels) enabled), posting their results directly into the chat, even if they're not a member.