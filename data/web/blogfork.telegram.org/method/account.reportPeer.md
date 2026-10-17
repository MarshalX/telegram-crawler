# account.reportPeer

Report a peer for violation of telegram's Terms of Service

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.reportPeer#c5ba3d86 peer:InputPeer reason:ReportReason message:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer to report |
| **reason** | [ReportReason](/type/ReportReason.md) | The reason why this peer is being reported |
| **message** | [string](/type/string.md) | Comment for report moderation |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |