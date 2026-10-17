# users.getSavedMusicByID

Check if the passed songs are still pinned to the user's profile, or refresh the file references of songs pinned on a user's profile [see here »](/api/profile.md#music) for more info.

```tl
users.savedMusicNotModified#e3878aa4 count:int = users.SavedMusic;
users.savedMusic#34a2f297 count:int documents:Vector<Document> = users.SavedMusic;
---functions---
users.getSavedMusicByID#7573a4e9 id:InputUser documents:Vector<InputDocument> = users.SavedMusic;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [InputUser](/type/InputUser.md) | The ID of the user. |
| **documents** | [Vector](/type/Vector%20t)&lt;[InputDocument](/type/InputDocument.md)&gt; | The songs (here, `file_reference` can be empty to refresh file references). |

### Result
[users.SavedMusic](/type/users.SavedMusic.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [User profiles](/api/profile.md)
Telegram offers many customization options for your profile!