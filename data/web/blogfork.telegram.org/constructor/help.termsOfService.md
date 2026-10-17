# help.termsOfService

Info about the latest telegram Terms Of Service

```tl
help.termsOfService#780a0310 flags:# popup:flags.0?true id:DataJSON text:string entities:Vector<MessageEntity> min_age_confirm:flags.1?int = help.TermsOfService;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **popup** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether a prompt must be showed to the user, in order to accept the new terms. |
| **id** | [DataJSON](/type/DataJSON.md) | ID of the new terms |
| **text** | [string](/type/string.md) | Text of the new terms |
| **entities** | [Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) |
| **min\_age\_confirm** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Minimum age required to sign up to telegram, the user must confirm that they is older than the minimum age. |

### Type
[help.TermsOfService](/type/help.TermsOfService.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities