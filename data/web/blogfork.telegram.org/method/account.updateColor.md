# account.updateColor

Update the [accent color and background custom emoji »](/api/colors.md) of the current account.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.updateColor#684d214e flags:# for_profile:flags.1?true color:flags.2?PeerColor = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **for\_profile** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether to change the accent color emoji pattern of the profile page; otherwise, the accent color and emoji pattern of messages will be changed. |
| **color** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[PeerColor](/type/PeerColor.md) | [ID of the accent color palette »](/api/colors.md) to use (not RGB24, see [here »](/api/colors.md) for more info). |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | COLOR\_INVALID | The specified color palette ID was invalid. |
| 400 | DOCUMENT\_INVALID | The specified document is invalid. |
| 403 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |

### Related pages

#### [Accent colors](/api/colors.md)
Telegram users and channels can change the accent color and background pattern of their profile page and their messages!