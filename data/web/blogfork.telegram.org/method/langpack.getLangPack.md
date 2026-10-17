# langpack.getLangPack

Get localization pack strings

```tl
langPackDifference#f385c1f6 lang_code:string from_version:int version:int strings:Vector<LangPackString> = LangPackDifference;
---functions---
langpack.getLangPack#f2f2330a lang_pack:string lang_code:string = LangPackDifference;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **lang\_pack** | [string](/type/string.md) | Platform identifier (i.e. `android`, `tdesktop`, etc). |
| **lang\_code** | [string](/type/string.md) | Either an ISO 639-1 language code or a language pack name obtained from a [language pack link](/api/links.md#language-pack-links). |

### Result
[LangPackDifference](/type/LangPackDifference.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | LANGUAGE\_INVALID | The specified lang_code is invalid. |
| 400 | LANG\_CODE\_NOT\_SUPPORTED | The specified language code is not supported. |
| 400 | LANG\_PACK\_INVALID | The provided language pack is invalid. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.