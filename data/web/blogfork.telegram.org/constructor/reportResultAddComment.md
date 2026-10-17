# reportResultAddComment

The user should enter an additional comment for the moderators, and then [messages.report](/method/messages.report.md) must be re-invoked, passing the comment to [messages.report](/method/messages.report.md).`message`.

```tl
reportResultAddComment#6f09ac31 flags:# optional:flags.0?true option:bytes = ReportResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **optional** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this step can be skipped by the user, passing an empty `message` to [messages.report](/method/messages.report.md), or if a non-empty `message` is mandatory. |
| **option** | [bytes](/type/bytes.md) | The [messages.report](/method/messages.report.md) method must be re-invoked, passing this option to `option` |

### Type
[ReportResult](/type/ReportResult.md)

### Related pages

#### [messages.report](/method/messages.report.md)
Report a message in a chat for violation of telegram's Terms of Service