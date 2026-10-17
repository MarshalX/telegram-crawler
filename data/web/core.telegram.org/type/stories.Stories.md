# stories.Stories

List of [stories](/api/stories.md#pinned-or-archived-stories)

```tl
stories.stories#63c3dd0a flags:# count:int stories:Vector<StoryItem> pinned_to_top:flags.0?Vector<int> chats:Vector<Chat> users:Vector<User> = stories.Stories;

---functions---

stories.getPinnedStories#5821a5dc peer:InputPeer offset_id:int limit:int = stories.Stories;
stories.getStoriesArchive#b4352016 peer:InputPeer offset_id:int limit:int = stories.Stories;
stories.getStoriesByID#5774ca74 peer:InputPeer id:Vector<int> = stories.Stories;
stories.getAlbumStories#ac806d61 peer:InputPeer album_id:int offset:int limit:int = stories.Stories;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [stories.stories](/constructor/stories.stories.md) | List of [stories](/api/stories.md#pinned-or-archived-stories) |

### Methods

| Method | Description |
| --- | --- |
| [stories.getPinnedStories](/method/stories.getPinnedStories.md) | Fetch the [stories](/api/stories.md#pinned-or-archived-stories) pinned on a peer's profile. |
| [stories.getStoriesArchive](/method/stories.getStoriesArchive.md) | Fetch the [story archive »](/api/stories.md#pinned-or-archived-stories) of a peer we control. |
| [stories.getStoriesByID](/method/stories.getStoriesByID.md) | Obtain full info about a set of [stories](/api/stories.md) by their IDs. |
| [stories.getAlbumStories](/method/stories.getAlbumStories.md) | Get stories in a [story album »](/api/stories.md#story-albums). |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.