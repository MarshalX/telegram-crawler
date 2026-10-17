# messages.AvailableReactions

Animations and metadata associated with [message reactions »](/api/reactions.md)

```tl
messages.availableReactionsNotModified#9f071957 = messages.AvailableReactions;
messages.availableReactions#768e3aad hash:int reactions:Vector<AvailableReaction> = messages.AvailableReactions;

---functions---

messages.getAvailableReactions#18dea0ac hash:int = messages.AvailableReactions;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.availableReactionsNotModified](/constructor/messages.availableReactionsNotModified.md) | No new reactions are available |
| [messages.availableReactions](/constructor/messages.availableReactions.md) | Animations and metadata associated with [message reactions »](/api/reactions.md) |

### Methods

| Method | Description |
| --- | --- |
| [messages.getAvailableReactions](/method/messages.getAvailableReactions.md) | Obtain available [message reactions »](/api/reactions.md) |

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.