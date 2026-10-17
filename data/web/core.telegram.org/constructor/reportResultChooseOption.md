# reportResultChooseOption

The user must choose one of the following options, and then [messages.report](/method/messages.report.md) must be re-invoked, passing the option's `option` identifier to [messages.report](/method/messages.report.md).`option`.

```tl
reportResultChooseOption#f0e4e0b6 title:string options:Vector<MessageReportOption> = ReportResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **title** | [string](/type/string.md) | Title of the option popup |
| **options** | [Vector](/type/Vector%20t)&lt;[MessageReportOption](/type/MessageReportOption.md)&gt; | Available options, rendered as menu entries. |

### Type
[ReportResult](/type/ReportResult.md)

### Related pages

#### [messages.report](/method/messages.report.md)
Report a message in a chat for violation of telegram's Terms of Service