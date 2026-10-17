# invokeWithBusinessConnection

Invoke a method using a [Telegram Business Bot connection, see here » for more info, including a list of the methods that can be wrapped in this constructor](/api/bots/connected-business-bots.md).

Make sure to always send queries wrapped in a `invokeWithBusinessConnection` to the datacenter ID, specified in the `dc_id` field of the [botBusinessConnection](/constructor/botBusinessConnection.md) that is being used.

```tl
---functions---
invokeWithBusinessConnection#dd289f8e {X:Type} connection_id:string query:!X = X;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **connection\_id** | [string](/type/string.md) | Business connection ID. |
| **query** | !X | The actual query. |

### Result
Returns the type returned by the invoked method.

### Both users and bots can use this method

### Related pages

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [botBusinessConnection](/constructor/botBusinessConnection.md)
Contains info about a [bot business connection](/api/bots/connected-business-bots.md).