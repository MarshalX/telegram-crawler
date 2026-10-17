# langpack.getStrings

Get strings from a language pack

```tl
---functions---
langpack.getStrings#efea3803 lang_pack:string lang_code:string keys:Vector<string> = Vector<LangPackString>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **lang\_pack** | [string](/type/string.md) | Platform identifier (i.e. `android`, `tdesktop`, etc). |
| **lang\_code** | [string](/type/string.md) | Either an ISO 639-1 language code or a language pack name obtained from a [language pack link](/api/links.md#language-pack-links). |
| **keys** | [Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | Strings to get |

### Result
[Vector](/type/Vector%20t)&lt;[LangPackString](/type/LangPackString.md)&gt;

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | LANG\_CODE\_NOT\_SUPPORTED | The specified language code is not supported. |
| 400 | LANG\_PACK\_INVALID | The provided language pack is invalid. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.