# ReportResult

Represents a report menu or result

```tl
reportResultChooseOption#f0e4e0b6 title:string options:Vector<MessageReportOption> = ReportResult;
reportResultAddComment#6f09ac31 flags:# optional:flags.0?true option:bytes = ReportResult;
reportResultReported#8db33c4b = ReportResult;

---functions---

messages.report#fc78af9b peer:InputPeer id:Vector<int> option:bytes message:string = ReportResult;
stories.report#19d8eb45 peer:InputPeer id:Vector<int> option:bytes message:string = ReportResult;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [reportResultChooseOption](/constructor/reportResultChooseOption.md) | The user must choose one of the following options, and then [messages.report](/method/messages.report.md) must be re-invoked, passing the option's `option` identifier to [messages.report](/method/messages.report.md).`option`. |
| [reportResultAddComment](/constructor/reportResultAddComment.md) | The user should enter an additional comment for the moderators, and then [messages.report](/method/messages.report.md) must be re-invoked, passing the comment to [messages.report](/method/messages.report.md).`message`. |
| [reportResultReported](/constructor/reportResultReported.md) | The report was sent successfully, no further actions are required. |

### Methods

| Method | Description |
| --- | --- |
| [messages.report](/method/messages.report.md) | Report a message in a chat for violation of telegram's Terms of Service |
| [stories.report](/method/stories.report.md) | Report a story. |