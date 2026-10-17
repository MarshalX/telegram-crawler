# users.getSavedMusic

Get songs [pinned to the user's profile, see here »](/api/profile.md#music) for more info.

```tl
users.savedMusicNotModified#e3878aa4 count:int = users.SavedMusic;
users.savedMusic#34a2f297 count:int documents:Vector<Document> = users.SavedMusic;
---functions---
users.getSavedMusic#788d7fe3 id:InputUser offset:int limit:int hash:long = users.SavedMusic;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [InputUser](/type/InputUser.md) | The ID of the user. |
| **offset** | [int](/type/int.md) | Offset for pagination. |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |
| **hash** | [long](/type/long.md) | [Hash »](/api/offsets.md#hash-generation) of the IDs of previously added songs, to avoid returning any result if there was no change. |

### Result
[users.SavedMusic](/type/users.SavedMusic.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [User profiles](/api/profile.md)
Telegram offers many customization options for your profile!