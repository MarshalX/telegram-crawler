# langPackStringPluralized

A language pack string which has different forms based on the number of some object it mentions. See [https://www.unicode.org/cldr/charts/latest/supplemental/language\_plural\_rules.html](https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html) for more info

```tl
langPackStringPluralized#6c47ac9f flags:# key:string zero_value:flags.0?string one_value:flags.1?string two_value:flags.2?string few_value:flags.3?string many_value:flags.4?string other_value:string = LangPackString;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **key** | [string](/type/string.md) | Localization key |
| **zero\_value** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Value for zero objects |
| **one\_value** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Value for one object |
| **two\_value** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Value for two objects |
| **few\_value** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | Value for a few objects |
| **many\_value** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[string](/type/string.md) | Value for many objects |
| **other\_value** | [string](/type/string.md) | Default value |

### Type
[LangPackString](/type/LangPackString.md)