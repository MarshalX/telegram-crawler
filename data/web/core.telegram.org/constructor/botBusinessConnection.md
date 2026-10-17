# botBusinessConnection

Contains info about a [bot business connection](/api/bots/connected-business-bots.md).

```tl
botBusinessConnection#8f34b2f5 flags:# disabled:flags.1?true connection_id:string user_id:long dc_id:int date:int rights:flags.2?BusinessBotRights = BotBusinessConnection;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **disabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this business connection is currently disabled |
| **connection\_id** | [string](/type/string.md) | Business connection ID, used to identify messages coming from the connection and to reply to them as specified [here »](/api/bots/connected-business-bots.md). |
| **user\_id** | [long](/type/long.md) | ID of the user that the bot is connected to via this connection. |
| **dc\_id** | [int](/type/int.md) | ID of the datacenter where to send queries wrapped in a [invokeWithBusinessConnection](/method/invokeWithBusinessConnection.md) as specified [here »](/api/bots/connected-business-bots.md). |
| **date** | [int](/type/int.md) | When was the connection created. |
| **rights** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[BusinessBotRights](/type/BusinessBotRights.md) | Business bot rights. |

### Type
[BotBusinessConnection](/type/BotBusinessConnection.md)

### Related pages

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [invokeWithBusinessConnection](/method/invokeWithBusinessConnection.md)
Invoke a method using a [Telegram Business Bot connection, see here » for more info, including a list of the methods that can be wrapped in this constructor](/api/bots/connected-business-bots.md).

Make sure to always send queries wrapped in a `invokeWithBusinessConnection` to the datacenter ID, specified in the `dc_id` field of the [botBusinessConnection](/constructor/botBusinessConnection.md) that is being used.