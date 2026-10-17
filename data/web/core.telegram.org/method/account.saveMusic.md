# account.saveMusic

Adds or removes a song from the current user's profile [see here »](/api/profile.md#music) for more info on the music tab of the profile page.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.saveMusic#b26732a9 flags:# unsave:flags.0?true id:InputDocument after_id:flags.1?InputDocument = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **unsave** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, removes the song. |
| **id** | [InputDocument](/type/InputDocument.md) | The song to add or remove; can be an already added song when reordering songs with `after_id`. Adding an already added song will never re-add it, only move it to the top of the song list (or after the song passed in `after_id`). |
| **after\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputDocument](/type/InputDocument.md) | If set, the song will be added after the passed song (must be already pinned on the profile). |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | DOCUMENT\_INVALID | The specified document is invalid. |

### Related pages

#### [User profiles](/api/profile.md)
Telegram offers many customization options for your profile!