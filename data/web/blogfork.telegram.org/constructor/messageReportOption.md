# messageReportOption

Report menu option

```tl
messageReportOption#7903e3d9 text:string option:bytes = MessageReportOption;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **text** | [string](/type/string.md) | Option title |
| **option** | [bytes](/type/bytes.md) | Option identifier: if the user selects this option, re-invoke [messages.report](/method/messages.report.md), passing this option to `option` |

### Type
[MessageReportOption](/type/MessageReportOption.md)

### Related pages

#### [messages.report](/method/messages.report.md)
Report a message in a chat for violation of telegram's Terms of Service