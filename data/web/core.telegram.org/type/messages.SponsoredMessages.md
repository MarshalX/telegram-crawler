# messages.SponsoredMessages

A set of [sponsored messages](/api/sponsored-messages.md) associated with a channel

```tl
messages.sponsoredMessages#ffda656d flags:# posts_between:flags.0?int start_delay:flags.1?int between_delay:flags.2?int messages:Vector<SponsoredMessage> chats:Vector<Chat> users:Vector<User> = messages.SponsoredMessages;
messages.sponsoredMessagesEmpty#1839490f = messages.SponsoredMessages;

---functions---

messages.getSponsoredMessages#3d6ce850 flags:# peer:InputPeer msg_id:flags.0?int = messages.SponsoredMessages;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.sponsoredMessages](/constructor/messages.sponsoredMessages.md) | A set of sponsored messages associated to a channel |
| [messages.sponsoredMessagesEmpty](/constructor/messages.sponsoredMessagesEmpty.md) | No sponsored messages are available. |

### Methods

| Method | Description |
| --- | --- |
| [messages.getSponsoredMessages](/method/messages.getSponsoredMessages.md) | Get a list of [sponsored messages for a peer, see here »](/api/sponsored-messages.md) for more info. |