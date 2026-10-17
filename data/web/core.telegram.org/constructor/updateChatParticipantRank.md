# updateChatParticipantRank

The [tag »](/api/rank.md) of a participant of a [basic group »](/api/channel.md#basic-groups) has changed.

```tl
updateChatParticipantRank#bd8367b9 chat_id:long user_id:long rank:string version:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **chat\_id** | [long](/type/long.md) | Basic group ID. |
| **user\_id** | [long](/type/long.md) | User ID. |
| **rank** | [string](/type/string.md) | The new tag. |
| **version** | [int](/type/int.md) | Used similarly to `pts` values to deduplicate/update outdated chat information as specified [here »](/api/peers.md#basic-group-updates). |

### Type
[Update](/type/Update.md)

### Related pages

#### [Peer database](/api/peers.md)
Many constructors in the API need to be stored in a local database upon reception and should only ever be updated reactively (passively) when received via updates or by other means (as specified in the documentation), to avoid overloading the server by continuously requesting changes for the same unchanged information.

#### [Group participant tags](/api/rank.md)
Members in group chats (both basic groups and supergroups) can add a tag next to their name — to show their role at work, what they study in school, and more.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.