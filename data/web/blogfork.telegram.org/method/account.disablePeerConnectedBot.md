# account.disablePeerConnectedBot

Permanently disconnect a specific chat from all [business bots »](/api/bots/connected-business-bots.md) (equivalent to specifying it in `recipients.exclude_users` during initial configuration with [account.updateConnectedBot »](/method/account.updateConnectedBot.md)); to reconnect of a chat disconnected using this method the user must reconnect the entire bot by invoking [account.updateConnectedBot »](/method/account.updateConnectedBot.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.disablePeerConnectedBot#5e437ed9 peer:InputPeer = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The chat to disconnect |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_ALREADY\_DISABLED | The connected business bot was already disabled for the specified peer. |
| 400 | BOT\_NOT\_CONNECTED\_YET | No [business bot](/api/business.md#connected-bots) is connected to the currently logged in user. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [account.updateConnectedBot](/method/account.updateConnectedBot.md)
Connect a [business bot »](/api/bots/connected-business-bots.md) to the current account, or to change the current connection settings.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.