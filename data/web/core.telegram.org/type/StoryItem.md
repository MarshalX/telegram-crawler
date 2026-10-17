# StoryItem

Represents a [Telegram Story](/api/stories.md)

```tl
storyItemDeleted#51e6ee4f id:int = StoryItem;
storyItemSkipped#ffadc913 flags:# close_friends:flags.8?true live:flags.9?true id:int date:int expire_date:int = StoryItem;
storyItem#16a4b93c flags:# pinned:flags.5?true public:flags.7?true close_friends:flags.8?true min:flags.9?true noforwards:flags.10?true edited:flags.11?true contacts:flags.12?true selected_contacts:flags.13?true out:flags.16?true id:int date:int from_id:flags.18?Peer fwd_from:flags.17?StoryFwdHeader expire_date:int caption:flags.0?string entities:flags.1?Vector<MessageEntity> media:MessageMedia media_areas:flags.14?Vector<MediaArea> privacy:flags.2?Vector<PrivacyRule> views:flags.3?StoryViews sent_reaction:flags.15?Reaction albums:flags.19?Vector<int> music:flags.20?Document = StoryItem;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [storyItemDeleted](/constructor/storyItemDeleted.md) | Represents a previously active story, that was deleted |
| [storyItemSkipped](/constructor/storyItemSkipped.md) | Represents an active story, whose full information was omitted for space and performance reasons; use [stories.getStoriesByID](/method/stories.getStoriesByID.md) to fetch full info about the skipped story when and if needed. |
| [storyItem](/constructor/storyItem.md) | Represents a [story](/api/stories.md). |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.