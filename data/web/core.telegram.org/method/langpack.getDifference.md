# langpack.getDifference

Get new strings in language pack

```tl
langPackDifference#f385c1f6 lang_code:string from_version:int version:int strings:Vector<LangPackString> = LangPackDifference;
---functions---
langpack.getDifference#cd984aa5 lang_pack:string lang_code:string from_version:int = LangPackDifference;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **lang\_pack** | [string](/type/string.md) | Platform identifier (i.e. `android`, `tdesktop`, etc). |
| **lang\_code** | [string](/type/string.md) | Either an ISO 639-1 language code or a language pack name obtained from a [language pack link](/api/links.md#language-pack-links). |
| **from\_version** | [int](/type/int.md) | Previous localization pack version |

### Result
[LangPackDifference](/type/LangPackDifference.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | LANG\_PACK\_INVALID | The provided language pack is invalid. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.