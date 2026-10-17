# help.appUpdate

An update is available for the application.

```tl
help.appUpdate#ccbbce30 flags:# can_not_skip:flags.0?true id:int version:string text:string entities:Vector<MessageEntity> document:flags.1?Document url:flags.2?string sticker:flags.3?Document = help.AppUpdate;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **can\_not\_skip** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Unskippable, the new info must be shown to the user (with a popup or something else) |
| **id** | [int](/type/int.md) | Update ID |
| **version** | [string](/type/string.md) | New version name |
| **text** | [string](/type/string.md) | Text description of the update |
| **entities** | [Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) |
| **document** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Document](/type/Document.md) | Application binary |
| **url** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Application download URL |
| **sticker** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Document](/type/Document.md) | Associated sticker |

### Type
[help.AppUpdate](/type/help.AppUpdate.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities