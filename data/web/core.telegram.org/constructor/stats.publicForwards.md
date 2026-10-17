# stats.publicForwards

Contains info about the forwards of a [story](/api/stories.md) as a message to public chats and reposts by public channels.

```tl
stats.publicForwards#93037e20 flags:# count:int forwards:Vector<PublicForward> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = stats.PublicForwards;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **count** | [int](/type/int.md) | Total number of results |
| **forwards** | [Vector](/type/Vector%20t)&lt;[PublicForward](/type/PublicForward.md)&gt; | Info about the forwards of a story. |
| **next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Offset used for [pagination](/api/offsets.md). |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |

### Type
[stats.PublicForwards](/type/stats.PublicForwards.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.