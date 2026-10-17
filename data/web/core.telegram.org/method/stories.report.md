# stories.report

Report a story.

```tl
reportResultChooseOption#f0e4e0b6 title:string options:Vector<MessageReportOption> = ReportResult;
reportResultAddComment#6f09ac31 flags:# optional:flags.0?true option:bytes = ReportResult;
reportResultReported#8db33c4b = ReportResult;
---functions---
stories.report#19d8eb45 peer:InputPeer id:Vector<int> option:bytes message:string = ReportResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer that uploaded the story. |
| **id** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of the stories to report. |
| **option** | [bytes](/type/bytes.md) | Menu option, intially empty |
| **message** | [string](/type/string.md) | Comment for report moderation |

### Result
[ReportResult](/type/ReportResult.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |