# stories.stories

List of [stories](/api/stories.md#pinned-or-archived-stories)

```tl
stories.stories#63c3dd0a flags:# count:int stories:Vector<StoryItem> pinned_to_top:flags.0?Vector<int> chats:Vector<Chat> users:Vector<User> = stories.Stories;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **count** | [int](/type/int.md) | Total number of stories that can be fetched |
| **stories** | [Vector](/type/Vector%20t)&lt;[StoryItem](/type/StoryItem.md)&gt; | Stories |
| **pinned\_to\_top** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of pinned stories. |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |

### Type
[stories.Stories](/type/stories.Stories.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.