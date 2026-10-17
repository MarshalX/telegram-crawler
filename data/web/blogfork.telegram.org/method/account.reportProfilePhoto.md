# account.reportProfilePhoto

Report a profile photo of a dialog

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.reportProfilePhoto#fa8cc6f5 peer:InputPeer photo_id:InputPhoto reason:ReportReason message:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The dialog |
| **photo\_id** | [InputPhoto](/type/InputPhoto.md) | Dialog photo ID |
| **reason** | [ReportReason](/type/ReportReason.md) | Report reason |
| **message** | [string](/type/string.md) | Comment for report moderation |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |