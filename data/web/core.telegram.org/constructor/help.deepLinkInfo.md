# help.deepLinkInfo

Deep link info, see [the here for more details](/api/links.md#unsupported-links)

```tl
help.deepLinkInfo#6a4ee832 flags:# update_app:flags.0?true message:string entities:flags.1?Vector<MessageEntity> = help.DeepLinkInfo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **update\_app** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | An update of the app is required to parse this link |
| **message** | [string](/type/string.md) | Message to show to the user |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) |

### Type
[help.DeepLinkInfo](/type/help.DeepLinkInfo.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.