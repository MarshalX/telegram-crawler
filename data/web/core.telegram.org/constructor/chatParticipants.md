# chatParticipants

Contains the full list of members of [basic groups »](/api/channel.md#basic-groups); is **NOT** usable for supergroups/channels.

```tl
chatParticipants#3cbc93f8 chat_id:long participants:Vector<ChatParticipant> version:int = ChatParticipants;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **chat\_id** | [long](/type/long.md) | Group identifier |
| **participants** | [Vector](/type/Vector%20t)&lt;[ChatParticipant](/type/ChatParticipant.md)&gt; | List of group members |
| **version** | [int](/type/int.md) | Group version number |

### Type
[ChatParticipants](/type/ChatParticipants.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.