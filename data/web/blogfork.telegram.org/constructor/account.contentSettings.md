# account.contentSettings

Sensitive content settings

```tl
account.contentSettings#57e28221 flags:# sensitive_enabled:flags.0?true sensitive_can_change:flags.1?true = account.ContentSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **sensitive\_enabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether viewing of sensitive (NSFW) content is enabled |
| **sensitive\_can\_change** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the current client can change the sensitive content settings to view NSFW content |

### Type
[account.ContentSettings](/type/account.ContentSettings.md)