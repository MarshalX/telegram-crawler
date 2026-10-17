# phone.saveDefaultGroupCallJoinAs

Set the default peer used to join a [video chat/livestream »](/api/group-calls.md#joining-a-group-call-on-behalf-of-owned-channels) associated with a specific dialog.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
phone.saveDefaultGroupCallJoinAs#575e1f8c peer:InputPeer join_as:InputPeer = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Basic group, supergroup or channel whose video chat/livestream default should be changed |
| **join\_as** | [InputPeer](/type/InputPeer.md) | Eligible peer to use by default when joining the dialog's video chats/livestreams, selected from [phone.getGroupCallJoinAs](/method/phone.getGroupCallJoinAs.md) |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | JOIN\_AS\_PEER\_INVALID | The specified peer cannot be used to join a group call. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [phone.getGroupCallJoinAs](/method/phone.getGroupCallJoinAs.md)
Get a list of peers that can be used to join a [video chat or livestream »](/api/group-calls.md#joining-a-group-call-on-behalf-of-owned-channels), presenting yourself as a specific user/channel.

This method cannot be used for live stories or conference calls. To comment or react in a live story as another peer, use [channels.getSendAs](/method/channels.getSendAs.md) with `for_live_stories` set and pass one of the returned peers to [phone.sendGroupCallMessage](/method/phone.sendGroupCallMessage.md).`send_as`.

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.