# smsjobs.status

Status

```tl
smsjobs.status#2aee9191 flags:# allow_international:flags.0?true recent_sent:int recent_since:int recent_remains:int total_sent:int total_since:int last_gift_slug:flags.1?string terms_url:string = smsjobs.Status;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **allow\_international** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Allow international numbers |
| **recent\_sent** | [int](/type/int.md) | Recently sent |
| **recent\_since** | [int](/type/int.md) | Since |
| **recent\_remains** | [int](/type/int.md) | Remaining |
| **total\_sent** | [int](/type/int.md) | Total sent |
| **total\_since** | [int](/type/int.md) | Total since |
| **last\_gift\_slug** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Last gift deep link |
| **terms\_url** | [string](/type/string.md) | Terms of service URL |

### Type
[smsjobs.Status](/type/smsjobs.Status.md)