# help.country

Name, ISO code, localized name and phone codes/patterns of a specific country

```tl
help.country#c3878e23 flags:# hidden:flags.0?true iso2:string default_name:string name:flags.1?string country_codes:Vector<help.CountryCode> = help.Country;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **hidden** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this country should not be shown in the list |
| **iso2** | [string](/type/string.md) | ISO code of country |
| **default\_name** | [string](/type/string.md) | Name of the country in the country's language |
| **name** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Name of the country in the user's language, if different from the original name |
| **country\_codes** | [Vector](/type/Vector%20t)&lt;[help.CountryCode](/type/help.CountryCode.md)&gt; | Phone codes/patterns |

### Type
[help.Country](/type/help.Country.md)