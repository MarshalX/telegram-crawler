# connectedBot

Contains info about a [connected business bot »](/api/bots/connected-business-bots.md).

```tl
connectedBot#cd64636c flags:# bot_id:long recipients:BusinessBotRecipients rights:BusinessBotRights = ConnectedBot;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **bot\_id** | [long](/type/long.md) | ID of the connected bot |
| **recipients** | [BusinessBotRecipients](/type/BusinessBotRecipients.md) | Specifies the private chats that a [connected business bot »](/api/bots/connected-business-bots.md) may receive messages and interact with.\
 |
| **rights** | [BusinessBotRights](/type/BusinessBotRights.md) | Business bot rights. |

### Type
[ConnectedBot](/type/ConnectedBot.md)

### Related pages

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.