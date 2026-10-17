# PublicForward

Contains info about the forwards of a [story](/api/stories.md) as a message to public chats and reposts by public channels.

```tl
publicForwardMessage#1f2bf4a message:Message = PublicForward;
publicForwardStory#edf3add0 peer:Peer story:StoryItem = PublicForward;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [publicForwardMessage](/constructor/publicForwardMessage.md) | Contains info about a forward of a [story](/api/stories.md) as a message. |
| [publicForwardStory](/constructor/publicForwardStory.md) | Contains info about a forward of a [story](/api/stories.md) as a repost by a public channel. |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.