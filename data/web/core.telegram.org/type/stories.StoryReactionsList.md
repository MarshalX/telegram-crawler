# stories.StoryReactionsList

List of peers that reacted to a specific [story](/api/stories.md)

```tl
stories.storyReactionsList#aa5f789c flags:# count:int reactions:Vector<StoryReaction> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = stories.StoryReactionsList;

---functions---

stories.getStoryReactionsList#b9b2881f flags:# forwards_first:flags.2?true peer:InputPeer id:int reaction:flags.0?Reaction offset:flags.1?string limit:int = stories.StoryReactionsList;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [stories.storyReactionsList](/constructor/stories.storyReactionsList.md) | List of peers that reacted to or intercated with a specific [story](/api/stories.md) |

### Methods

| Method | Description |
| --- | --- |
| [stories.getStoryReactionsList](/method/stories.getStoryReactionsList.md) | Get the [reaction](/api/reactions.md) and interaction list of a [story](/api/stories.md) posted to a channel, along with the sender of each reaction.\
\
Can only be used by channel admins. |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.