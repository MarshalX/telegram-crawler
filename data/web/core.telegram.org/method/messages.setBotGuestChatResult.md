# messages.setBotGuestChatResult

Bots may use this method to answer a [guest mode »](/api/bots/guest-mode.md) query received via an [updateBotGuestChatQuery](/constructor/updateBotGuestChatQuery.md) update, providing the message to post into the chat as a guest, see [here »](/api/bots/guest-mode.md#handling-guest-queries-bot-side) for more info.

```tl
inputBotInlineMessageID#890c3d89 dc_id:int id:long access_hash:long = InputBotInlineMessageID;
inputBotInlineMessageID64#b6d915d7 dc_id:int owner_id:long id:int access_hash:long = InputBotInlineMessageID;
---functions---
messages.setBotGuestChatResult#b8f106e3 query_id:long result:InputBotInlineResult = InputBotInlineMessageID;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **query\_id** | [long](/type/long.md) | Query identifier from the [updateBotGuestChatQuery](/constructor/updateBotGuestChatQuery.md).`query_id` field |
| **result** | [InputBotInlineResult](/type/InputBotInlineResult.md) | The result to send as the answer to the query |

### Result
[InputBotInlineMessageID](/type/InputBotInlineMessageID.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | USER\_BOT\_INVALID | User accounts must provide the `bot` method parameter when calling this method. If there is no such method parameter, this method can only be invoked by bot accounts. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |

### Related pages

#### [updateBotGuestChatQuery](/constructor/updateBotGuestChatQuery.md)
Sent to [guest bots »](/api/bots/guest-mode.md) when a user invokes the bot as a guest in a chat. The bot should reply by invoking [messages.setBotGuestChatResult](/method/messages.setBotGuestChatResult.md), see [here »](/api/bots/guest-mode.md#handling-guest-queries-bot-side) for more info.

#### [Guest mode for bots](/api/bots/guest-mode.md)
Guest bots can be queried by username from **any** non-secret private chat, group and supergroup (except for groups/supergroups with [content protection &raquo;](/api/content-protection.md#for-groups-and-channels) enabled), posting their results directly into the chat, even if they're not a member.