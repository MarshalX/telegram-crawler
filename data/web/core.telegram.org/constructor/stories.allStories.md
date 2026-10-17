# stories.allStories

Full list of active (or active and hidden) [stories](/api/stories.md#watching-stories).

```tl
stories.allStories#6efc5e81 flags:# has_more:flags.0?true count:int state:string peer_stories:Vector<PeerStories> chats:Vector<Chat> users:Vector<User> stealth_mode:StoriesStealthMode = stories.AllStories;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **has\_more** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether more results can be fetched as [described here »](/api/stories.md#watching-stories). |
| **count** | [int](/type/int.md) | Total number of active (or active and hidden) stories |
| **state** | [string](/type/string.md) | State to use for pagination |
| **peer\_stories** | [Vector](/type/Vector%20t)&lt;[PeerStories](/type/PeerStories.md)&gt; | Stories |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |
| **stealth\_mode** | [StoriesStealthMode](/type/StoriesStealthMode.md) | Current [stealth mode](/api/stories.md#stealth-mode) information |

### Type
[stories.AllStories](/type/stories.AllStories.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.