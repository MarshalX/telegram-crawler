# messages.reportSpam

Report a new incoming chat for spam, if the [peer settings](/constructor/peerSettings.md) of the chat allow us to do that

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.reportSpam#cf1592db peer:InputPeer = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer to report |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [peerSettings](/constructor/peerSettings.md)
List of actions that are possible when interacting with this user, to be shown as suggested actions in the [chat action bar »](/api/action-bar.md), see [here »](/api/action-bar.md) for more info.