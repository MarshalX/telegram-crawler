# account.getSavedMusicIds

Fetch the full list of only the IDs of [songs currently added to the profile, see here »](/api/profile.md#music) for more info.

```tl
account.savedMusicIdsNotModified#4fc81d6e = account.SavedMusicIds;
account.savedMusicIds#998d6636 ids:Vector<long> = account.SavedMusicIds;
---functions---
account.getSavedMusicIds#e09d5faf hash:long = account.SavedMusicIds;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | Hash [generated »](/api/offsets.md#hash-generation) from the previously returned list of IDs. |

### Result
[account.SavedMusicIds](/type/account.SavedMusicIds.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [User profiles](/api/profile.md)
Telegram offers many customization options for your profile!