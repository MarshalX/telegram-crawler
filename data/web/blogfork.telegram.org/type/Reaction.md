# Reaction

[Message reaction](/api/reactions.md)

```tl
reactionEmpty#79f5d419 = Reaction;
reactionEmoji#1b2286b8 emoticon:string = Reaction;
reactionCustomEmoji#8935fc73 document_id:long = Reaction;
reactionPaid#523da4eb = Reaction;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [reactionEmpty](/constructor/reactionEmpty.md) | No reaction |
| [reactionEmoji](/constructor/reactionEmoji.md) | Normal emoji message reaction |
| [reactionCustomEmoji](/constructor/reactionCustomEmoji.md) | [Custom emoji](/api/custom-emoji.md) message reaction |
| [reactionPaid](/constructor/reactionPaid.md) | Represents a [paid Telegram Star reaction »](/api/reactions.md#paid-reactions). |

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.