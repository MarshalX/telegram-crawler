# messages.Reactions

A set of [message reactions](/api/reactions.md)

```tl
messages.reactionsNotModified#b06fdbdf = messages.Reactions;
messages.reactions#eafdf716 hash:long reactions:Vector<Reaction> = messages.Reactions;

---functions---

messages.getTopReactions#bb8125ba limit:int hash:long = messages.Reactions;
messages.getRecentReactions#39461db2 limit:int hash:long = messages.Reactions;
messages.getDefaultTagReactions#bdf93428 hash:long = messages.Reactions;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.reactionsNotModified](/constructor/messages.reactionsNotModified.md) | The server-side list of [message reactions](/api/reactions.md) hasn't changed |
| [messages.reactions](/constructor/messages.reactions.md) | List of [message reactions](/api/reactions.md) |

### Methods

| Method | Description |
| --- | --- |
| [messages.getTopReactions](/method/messages.getTopReactions.md) | Got popular [message reactions](/api/reactions.md) |
| [messages.getRecentReactions](/method/messages.getRecentReactions.md) | Get recently used [message reactions](/api/reactions.md) |
| [messages.getDefaultTagReactions](/method/messages.getDefaultTagReactions.md) | Fetch a default recommended list of [saved message tag reactions](/api/saved-messages.md#tags). |

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.