# username

Contains information about a username.

```tl
username#b4073647 flags:# editable:flags.0?true active:flags.1?true username:string = Username;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **editable** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the username is editable, meaning it wasn't bought on [fragment](https://fragment.com). |
| **active** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the username is active. |
| **username** | [string](/type/string.md) | The username. |

### Type
[Username](/type/Username.md)