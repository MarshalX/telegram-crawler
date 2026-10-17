# messages.sponsoredMessages

A set of sponsored messages associated to a channel

```tl
messages.sponsoredMessages#ffda656d flags:# posts_between:flags.0?int start_delay:flags.1?int between_delay:flags.2?int messages:Vector<SponsoredMessage> chats:Vector<Chat> users:Vector<User> = messages.SponsoredMessages;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **posts\_between** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | If set, specifies the minimum number of messages between shown sponsored messages; otherwise, only one sponsored message must be shown after all ordinary messages. |
| **start\_delay** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | For [sponsored messages to show on channel videos »](/api/sponsored-messages.md#getting-sponsored-video-advertisements), the number of seconds to wait before showing the first ad. |
| **between\_delay** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | For [sponsored messages to show on channel videos »](/api/sponsored-messages.md#getting-sponsored-video-advertisements), the number of seconds to wait after the previous ad is hidden, before showing the next ad. |
| **messages** | [Vector](/type/Vector%20t)&lt;[SponsoredMessage](/type/SponsoredMessage.md)&gt; | Sponsored messages |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chats mentioned in the sponsored messages |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users mentioned in the sponsored messages |

### Type
[messages.SponsoredMessages](/type/messages.SponsoredMessages.md)

### Related pages

#### [Sponsored messages](/api/sponsored-messages.md)
How clients should fetch, display and interact with sponsored messages.