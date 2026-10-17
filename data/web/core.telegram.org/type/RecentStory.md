# RecentStory

Summary of a peer's [active stories »](/api/stories.md#recent-story-summaries).

```tl
recentStory#711d692d flags:# live:flags.0?true max_id:flags.1?int = RecentStory;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [recentStory](/constructor/recentStory.md) | Summary of a peer's [active stories »](/api/stories.md#recent-story-summaries), embedded in [user](/constructor/user.md).`stories_max_id` and [channel](/constructor/channel.md).`stories_max_id` and returned by [stories.getPeerMaxIDs](/method/stories.getPeerMaxIDs.md). |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.