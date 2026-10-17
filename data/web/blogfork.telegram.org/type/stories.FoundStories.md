# stories.FoundStories

Stories found using [global story search »](/api/stories.md#searching-stories).

```tl
stories.foundStories#e2de7737 flags:# count:int stories:Vector<FoundStory> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = stories.FoundStories;

---functions---

stories.searchPosts#d1810907 flags:# hashtag:flags.0?string area:flags.1?MediaArea peer:flags.2?InputPeer offset:string limit:int = stories.FoundStories;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [stories.foundStories](/constructor/stories.foundStories.md) | Stories found using [global story search »](/api/stories.md#searching-stories). |

### Methods

| Method | Description |
| --- | --- |
| [stories.searchPosts](/method/stories.searchPosts.md) | Globally search for [stories](/api/stories.md) using a hashtag or a [location media area](/api/stories.md#location-tags), see [here »](/api/stories.md#searching-stories) for more info on the full flow.\
\
Either `hashtag` **or** `area` **must** be set when invoking the method. |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.