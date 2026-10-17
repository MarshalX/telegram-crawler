# restrictionReason

Restriction reason.

See [here »](/api/age-verification.md) for the full flow to use for restricted or age-gated content.

```tl
restrictionReason#d072acb4 platform:string reason:string text:string = RestrictionReason;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **platform** | [string](/type/string.md) | Platform identifier (ios, android, wp, all, etc.), can be concatenated with a dash as separator (`android-ios`, `ios-wp`, etc) |
| **reason** | [string](/type/string.md) | Restriction reason (`porno`, `terms`, etc.). Ignore this restriction reason if it is contained in the [ignore\_restriction\_reasons »](/api/config.md#ignore-restriction-reasons) client configuration parameter. |
| **text** | [string](/type/string.md) | Error message to be shown to the user |

### Type
[RestrictionReason](/type/RestrictionReason.md)

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Age verification](/api/age-verification.md)
Some legislations require age verification to view restricted content: Telegram implements this through the Main Mini App of a special bot.