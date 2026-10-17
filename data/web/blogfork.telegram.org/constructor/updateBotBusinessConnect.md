# updateBotBusinessConnect

Connecting or disconnecting a [business bot](/api/bots/connected-business-bots.md) or changing the connection settings will emit an [updateBotBusinessConnect](/constructor/updateBotBusinessConnect.md) update to the bot, with the new settings and a `connection_id` that will be used by the bot to handle updates from and send messages as the user.

```tl
updateBotBusinessConnect#8ae5c97a connection:BotBusinessConnection qts:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **connection** | [BotBusinessConnection](/type/BotBusinessConnection.md) | Business connection settings |
| **qts** | [int](/type/int.md) | New **qts** value, see [updates »](/api/updates.md) for more info. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [updateBotBusinessConnect](/constructor/updateBotBusinessConnect.md)
Connecting or disconnecting a [business bot](/api/bots/connected-business-bots.md) or changing the connection settings will emit an [updateBotBusinessConnect](/constructor/updateBotBusinessConnect.md) update to the bot, with the new settings and a `connection_id` that will be used by the bot to handle updates from and send messages as the user.