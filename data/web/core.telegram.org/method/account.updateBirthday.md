# account.updateBirthday

Update our [birthday, see here »](/api/profile.md#birthday) for more info.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.updateBirthday#cc6e0c11 flags:# birthday:flags.0?Birthday = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **birthday** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Birthday](/type/Birthday.md) | Birthday. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BIRTHDAY\_INVALID | An invalid age was specified, must be between 0 and 150 years. |

### Related pages

#### [User profiles](/api/profile.md)
Telegram offers many customization options for your profile!