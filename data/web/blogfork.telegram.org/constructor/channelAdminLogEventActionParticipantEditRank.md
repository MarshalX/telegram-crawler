# channelAdminLogEventActionParticipantEditRank

A participant's [tag »](/api/rank.md) was changed.

```tl
channelAdminLogEventActionParticipantEditRank#5806b4ec user_id:long prev_rank:string new_rank:string = ChannelAdminLogEventAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [long](/type/long.md) | The user ID. |
| **prev\_rank** | [string](/type/string.md) | The previous tag. |
| **new\_rank** | [string](/type/string.md) | The new tag. |

### Type
[ChannelAdminLogEventAction](/type/ChannelAdminLogEventAction.md)

### Related pages

#### [Group participant tags](/api/rank.md)
Members in group chats (both basic groups and supergroups) can add a tag next to their name — to show their role at work, what they study in school, and more.