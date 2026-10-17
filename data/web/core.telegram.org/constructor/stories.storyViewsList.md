# stories.storyViewsList

Reaction and view counters for a [story](/api/stories.md)

```tl
stories.storyViewsList#59d78fc5 flags:# count:int views_count:int forwards_count:int reactions_count:int views:Vector<StoryView> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = stories.StoryViewsList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **count** | [int](/type/int.md) | Total number of results that can be fetched |
| **views\_count** | [int](/type/int.md) | Total number of story views |
| **forwards\_count** | [int](/type/int.md) | Total number of story forwards/reposts |
| **reactions\_count** | [int](/type/int.md) | Number of reactions that were added to the story |
| **views** | [Vector](/type/Vector%20t)&lt;[StoryView](/type/StoryView.md)&gt; | Story view date and reaction information |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |
| **next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Offset for pagination |

### Type
[stories.StoryViewsList](/type/stories.StoryViewsList.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.