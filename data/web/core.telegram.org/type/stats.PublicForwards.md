# Stats.PublicForwards

Contains info about the forwards of a [story](/api/stories.md) as a message to public chats and reposts by public channels.

```tl
stats.publicForwards#93037e20 flags:# count:int forwards:Vector<PublicForward> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = stats.PublicForwards;

---functions---

stats.getMessagePublicForwards#5f150144 channel:InputChannel msg_id:int offset:string limit:int = stats.PublicForwards;
stats.getStoryPublicForwards#a6437ef6 peer:InputPeer id:int offset:string limit:int = stats.PublicForwards;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [stats.publicForwards](/constructor/stats.publicForwards.md) | Contains info about the forwards of a [story](/api/stories.md) as a message to public chats and reposts by public channels. |

### Methods

| Method | Description |
| --- | --- |
| [stats.getMessagePublicForwards](/method/stats.getMessagePublicForwards.md) | Obtains a list of messages, indicating to which other public channels was a channel message forwarded.  \
Will return a list of [messages](/constructor/message.md) with `peer_id` equal to the public channel to which this message was forwarded. |
| [stats.getStoryPublicForwards](/method/stats.getStoryPublicForwards.md) | Obtain forwards of a [story](/api/stories.md) as a message to public chats and reposts by public channels. |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.