# LangPackString

Language pack string

```tl
langPackString#cad181f6 key:string value:string = LangPackString;
langPackStringPluralized#6c47ac9f flags:# key:string zero_value:flags.0?string one_value:flags.1?string two_value:flags.2?string few_value:flags.3?string many_value:flags.4?string other_value:string = LangPackString;
langPackStringDeleted#2979eeb2 key:string = LangPackString;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [langPackString](/constructor/langPackString.md) | Translated localization string |
| [langPackStringPluralized](/constructor/langPackStringPluralized.md) | A language pack string which has different forms based on the number of some object it mentions. See [https://www.unicode.org/cldr/charts/latest/supplemental/language\_plural\_rules.html](https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html) for more info |
| [langPackStringDeleted](/constructor/langPackStringDeleted.md) | Deleted localization string |