# langPackLanguage

Identifies a localization pack

```tl
langPackLanguage#eeca5ce3 flags:# official:flags.0?true rtl:flags.2?true beta:flags.3?true name:string native_name:string lang_code:string base_lang_code:flags.1?string plural_code:string strings_count:int translated_count:int translations_url:string = LangPackLanguage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **official** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the language pack is official |
| **rtl** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Is this a localization pack for an RTL language |
| **beta** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Is this a beta localization pack? |
| **name** | [string](/type/string.md) | Language name |
| **native\_name** | [string](/type/string.md) | Language name in the language itself |
| **lang\_code** | [string](/type/string.md) | Language code (pack identifier) |
| **base\_lang\_code** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Identifier of a base language pack; may be empty. If a string is missed in the language pack, then it should be fetched from base language pack. Unsupported in custom language packs |
| **plural\_code** | [string](/type/string.md) | A language code to be used to apply plural forms. See [https://www.unicode.org/cldr/charts/latest/supplemental/language\_plural\_rules.html](https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html) for more info |
| **strings\_count** | [int](/type/int.md) | Total number of non-deleted strings from the language pack |
| **translated\_count** | [int](/type/int.md) | Total number of translated strings from the language pack |
| **translations\_url** | [string](/type/string.md) | Link to language translation interface; empty for custom local language packs |

### Type
[LangPackLanguage](/type/LangPackLanguage.md)