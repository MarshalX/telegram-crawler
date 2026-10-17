# users.savedMusic

List of songs currently pinned on a user's profile, see [here »](/api/profile.md#music) for more info.

```tl
users.savedMusic#34a2f297 count:int documents:Vector<Document> = users.SavedMusic;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **count** | [int](/type/int.md) | Total number of songs (can be bigger than `documents` depending on the passed `limit`, and the default maximum `limit` in which case pagination is required). |
| **documents** | [Vector](/type/Vector%20t)&lt;[Document](/type/Document.md)&gt; | Songs. |

### Type
[users.SavedMusic](/type/users.SavedMusic.md)

### Related pages

#### [User profiles](/api/profile.md)
Telegram offers many customization options for your profile!