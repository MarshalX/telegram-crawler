# exportedContactToken

Describes a [temporary profile link](/api/links.md#temporary-profile-links).

```tl
exportedContactToken#41bf109b url:string expires:int = ExportedContactToken;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **url** | [string](/type/string.md) | The [temporary profile link](/api/links.md#temporary-profile-links). |
| **expires** | [int](/type/int.md) | Its expiration date |

### Type
[ExportedContactToken](/type/ExportedContactToken.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.