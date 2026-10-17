# stories.storyReactionsList

List of peers that reacted to or intercated with a specific [story](/api/stories.md)

```tl
stories.storyReactionsList#aa5f789c flags:# count:int reactions:Vector<StoryReaction> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = stories.StoryReactionsList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **count** | [int](/type/int.md) | Total number of reactions matching query |
| **reactions** | [Vector](/type/Vector%20t)&lt;[StoryReaction](/type/StoryReaction.md)&gt; | List of peers that reacted to or interacted with a specific story |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |
| **next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | If set, indicates the next offset to use to load more results by invoking [stories.getStoryReactionsList](/method/stories.getStoryReactionsList.md). |

### Type
[stories.StoryReactionsList](/type/stories.StoryReactionsList.md)

### Related pages

#### [stories.getStoryReactionsList](/method/stories.getStoryReactionsList.md)
Get the [reaction](/api/reactions.md) and interaction list of a [story](/api/stories.md) posted to a channel, along with the sender of each reaction.

Can only be used by channel admins.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.