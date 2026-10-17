# users.SavedMusic

List of songs ([document](/constructor/document.md).`id`s) currently pinned on a user's profile, see [here »](/api/profile.md#music) for more info.

```tl
users.savedMusicNotModified#e3878aa4 count:int = users.SavedMusic;
users.savedMusic#34a2f297 count:int documents:Vector<Document> = users.SavedMusic;

---functions---

users.getSavedMusic#788d7fe3 id:InputUser offset:int limit:int hash:long = users.SavedMusic;
users.getSavedMusicByID#7573a4e9 id:InputUser documents:Vector<InputDocument> = users.SavedMusic;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [users.savedMusicNotModified](/constructor/users.savedMusicNotModified.md) | This subset of the songs currently pinned on a user's profile hasn't changed, see [here »](/api/profile.md#music) for more info. |
| [users.savedMusic](/constructor/users.savedMusic.md) | List of songs currently pinned on a user's profile, see [here »](/api/profile.md#music) for more info. |

### Methods

| Method | Description |
| --- | --- |
| [users.getSavedMusic](/method/users.getSavedMusic.md) | Get songs [pinned to the user's profile, see here »](/api/profile.md#music) for more info. |
| [users.getSavedMusicByID](/method/users.getSavedMusicByID.md) | Check if the passed songs are still pinned to the user's profile, or refresh the file references of songs pinned on a user's profile [see here »](/api/profile.md#music) for more info. |

### Related pages

#### [document](/constructor/document.md)
Document

#### [User profiles](/api/profile.md)
Telegram offers many customization options for your profile!