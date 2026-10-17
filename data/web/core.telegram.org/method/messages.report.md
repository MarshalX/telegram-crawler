# messages.report

Report a message in a chat for violation of telegram's Terms of Service

```tl
reportResultChooseOption#f0e4e0b6 title:string options:Vector<MessageReportOption> = ReportResult;
reportResultAddComment#6f09ac31 flags:# optional:flags.0?true option:bytes = ReportResult;
reportResultReported#8db33c4b = ReportResult;
---functions---
messages.report#fc78af9b peer:InputPeer id:Vector<int> option:bytes message:string = ReportResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer |
| **id** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of messages to report |
| **option** | [bytes](/type/bytes.md) | Menu option, intially empty |
| **message** | [string](/type/string.md) | Comment for report moderation |

### Result
[ReportResult](/type/ReportResult.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | MESSAGE\_REQUIRED | A non-empty list of IDs must be passed to `id`. |
| 400 | OPTION\_INVALID | Invalid option selected. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |