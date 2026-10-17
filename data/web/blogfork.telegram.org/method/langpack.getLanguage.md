# langpack.getLanguage

Get information about a language in a localization pack

```tl
langPackLanguage#eeca5ce3 flags:# official:flags.0?true rtl:flags.2?true beta:flags.3?true name:string native_name:string lang_code:string base_lang_code:flags.1?string plural_code:string strings_count:int translated_count:int translations_url:string = LangPackLanguage;
---functions---
langpack.getLanguage#6a596502 lang_pack:string lang_code:string = LangPackLanguage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **lang\_pack** | [string](/type/string.md) | Platform identifier (i.e. `android`, `tdesktop`, etc). |
| **lang\_code** | [string](/type/string.md) | Either an ISO 639-1 language code or a language pack name obtained from a [language pack link](/api/links.md#language-pack-links). |

### Result
[LangPackLanguage](/type/LangPackLanguage.md)

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