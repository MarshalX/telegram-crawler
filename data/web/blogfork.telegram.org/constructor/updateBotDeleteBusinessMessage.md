# updateBotDeleteBusinessMessage

A message was deleted in a [connected business chat »](/api/bots/connected-business-bots.md).

```tl
updateBotDeleteBusinessMessage#a02a982e connection_id:string peer:Peer messages:Vector<int> qts:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **connection\_id** | [string](/type/string.md) | Business connection ID. |
| **peer** | [Peer](/type/Peer.md) | [Peer](/api/peers.md) where the messages were deleted. |
| **messages** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of the messages that were deleted. |
| **qts** | [int](/type/int.md) | New **qts** value, see [updates »](/api/updates.md) for more info. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Peer database](/api/peers.md)
Many constructors in the API need to be stored in a local database upon reception and should only ever be updated reactively (passively) when received via updates or by other means (as specified in the documentation), to avoid overloading the server by continuously requesting changes for the same unchanged information.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.