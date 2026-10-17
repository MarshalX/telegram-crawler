# help.countryCode

Country code and phone number pattern of a specific country

```tl
help.countryCode#4203c5ef flags:# country_code:string prefixes:flags.0?Vector<string> patterns:flags.1?Vector<string> = help.CountryCode;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **country\_code** | [string](/type/string.md) | ISO country code |
| **prefixes** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | Possible phone prefixes |
| **patterns** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | Phone patterns: for example, `XXX XXX XXX` |

### Type
[help.CountryCode](/type/help.CountryCode.md)