# messageReactions

[Message reactions »](/api/reactions.md)

```tl
messageReactions#a339f0b flags:# min:flags.0?true can_see_list:flags.2?true reactions_as_tags:flags.3?true results:Vector<ReactionCount> recent_reactions:flags.1?Vector<MessagePeerReaction> top_reactors:flags.4?Vector<MessageReactor> = MessageReactions;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **min** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Similar to [min](/api/min.md) objects, used for [message reaction »](/api/reactions.md) constructors that are the same for all users so they don't have the reactions sent by the current user (you can use [messages.getMessagesReactions](/method/messages.getMessagesReactions.md) to get the full reaction info). |
| **can\_see\_list** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether [messages.getMessageReactionsList](/method/messages.getMessageReactionsList.md) can be used to see how each specific peer reacted to the message |
| **reactions\_as\_tags** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | If set or if there are no reactions, all present and future reactions should be treated as [message tags, see here » for more info](/api/saved-messages.md#tags). |
| **results** | [Vector](/type/Vector%20t)&lt;[ReactionCount](/type/ReactionCount.md)&gt; | Reactions |
| **recent\_reactions** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[MessagePeerReaction](/type/MessagePeerReaction.md)&gt; | List of recent peers and their reactions |
| **top\_reactors** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[Vector](/type/Vector%20t)&lt;[MessageReactor](/type/MessageReactor.md)&gt; | [Paid Telegram Star reactions leaderboard »](/api/reactions.md#paid-reactions) for this message. |

### Type
[MessageReactions](/type/MessageReactions.md)

### Related pages

#### [Min constructors](/api/min.md)
In some situations user and channel constructors have reduced set of fields present (although id is always there) and min flag set.

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.

#### [messages.getMessagesReactions](/method/messages.getMessagesReactions.md)
Get [message reactions »](/api/reactions.md)

#### [messages.getMessageReactionsList](/method/messages.getMessageReactionsList.md)
Get [message reaction](/api/reactions.md) list, along with the sender of each reaction.

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.