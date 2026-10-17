# updateBotMessageReaction

Bots only: a user has changed their reactions on a message with public reactions.

```tl
updateBotMessageReaction#ac21d3ce peer:Peer msg_id:int date:int actor:Peer old_reactions:Vector<Reaction> new_reactions:Vector<Reaction> qts:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [Peer](/type/Peer.md) | Peer of the reacted-to message. |
| **msg\_id** | [int](/type/int.md) | ID of the reacted-to message. |
| **date** | [int](/type/int.md) | Date of the change. |
| **actor** | [Peer](/type/Peer.md) | The user that (un)reacted to the message. |
| **old\_reactions** | [Vector](/type/Vector%20t)&lt;[Reaction](/type/Reaction.md)&gt; | Old reactions |
| **new\_reactions** | [Vector](/type/Vector%20t)&lt;[Reaction](/type/Reaction.md)&gt; | New reactions |
| **qts** | [int](/type/int.md) | [QTS](/api/updates.md) event sequence identifier |

### Type
[Update](/type/Update.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.