# account.SavedMusicIds

List of IDs of songs ([document](/constructor/document.md).`id`s) currently pinned on our profile, see [here »](/api/profile.md#music) for more info.

```tl
account.savedMusicIdsNotModified#4fc81d6e = account.SavedMusicIds;
account.savedMusicIds#998d6636 ids:Vector<long> = account.SavedMusicIds;

---functions---

account.getSavedMusicIds#e09d5faf hash:long = account.SavedMusicIds;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [account.savedMusicIdsNotModified](/constructor/account.savedMusicIdsNotModified.md) | The list of IDs of songs ([document](/constructor/document.md).`id`s) currently pinned on our profile hasn't changed. |
| [account.savedMusicIds](/constructor/account.savedMusicIds.md) | List of IDs of songs ([document](/constructor/document.md).`id`s) currently pinned on our profile, see [here »](/api/profile.md#music) for more info. |

### Methods

| Method | Description |
| --- | --- |
| [account.getSavedMusicIds](/method/account.getSavedMusicIds.md) | Fetch the full list of only the IDs of [songs currently added to the profile, see here »](/api/profile.md#music) for more info. |

### Related pages

#### [document](/constructor/document.md)
Document

#### [User profiles](/api/profile.md)
Telegram offers many customization options for your profile!