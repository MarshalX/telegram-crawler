# updateBotMessageReactions

Bots only: the number of reactions on a message with anonymous reactions has changed.

```tl
updateBotMessageReactions#9cb7759 peer:Peer msg_id:int date:int reactions:Vector<ReactionCount> qts:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [Peer](/type/Peer.md) | Peer of the reacted-to message. |
| **msg\_id** | [int](/type/int.md) | ID of the reacted-to message. |
| **date** | [int](/type/int.md) | Date of the change. |
| **reactions** | [Vector](/type/Vector%20t)&lt;[ReactionCount](/type/ReactionCount.md)&gt; | New reaction counters. |
| **qts** | [int](/type/int.md) | [QTS](/api/updates.md) event sequence identifier |

### Type
[Update](/type/Update.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.