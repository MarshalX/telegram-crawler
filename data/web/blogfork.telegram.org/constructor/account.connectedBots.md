# account.connectedBots

Info about currently connected [business bots](/api/bots/connected-business-bots.md).

```tl
account.connectedBots#17d7f87b connected_bots:Vector<ConnectedBot> users:Vector<User> = account.ConnectedBots;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **connected\_bots** | [Vector](/type/Vector%20t)&lt;[ConnectedBot](/type/ConnectedBot.md)&gt; | Info about the connected bots |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Bot information |

### Type
[account.ConnectedBots](/type/account.ConnectedBots.md)

### Related pages

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.