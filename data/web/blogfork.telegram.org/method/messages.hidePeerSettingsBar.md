# messages.hidePeerSettingsBar

Should be called after the user hides the [report spam/add as contact bar](/api/action-bar.md) of a new chat, effectively prevents the user from executing the actions specified in the [action bar »](/api/action-bar.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.hidePeerSettingsBar#4facb138 peer:InputPeer = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Action bar](/api/action-bar.md)
Sometimes, when interacting with Telegram users via private or secret chats, an action bar must be shown on top of the chat, offering convenient action buttons or notices regarding the user.