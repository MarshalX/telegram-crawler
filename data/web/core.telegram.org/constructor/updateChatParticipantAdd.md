# updateChatParticipantAdd

New group member.

```tl
updateChatParticipantAdd#3dda5451 chat_id:long user_id:long inviter_id:long date:int version:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **chat\_id** | [long](/type/long.md) | Group ID |
| **user\_id** | [long](/type/long.md) | ID of the new member |
| **inviter\_id** | [long](/type/long.md) | ID of the user, who added member to the group |
| **date** | [int](/type/int.md) | When was the participant added |
| **version** | [int](/type/int.md) | Used similarly to `pts` values to deduplicate/update outdated chat information as specified [here »](/api/peers.md#basic-group-updates). |

### Type
[Update](/type/Update.md)

### Related pages

#### [Peer database](/api/peers.md)
Many constructors in the API need to be stored in a local database upon reception and should only ever be updated reactively (passively) when received via updates or by other means (as specified in the documentation), to avoid overloading the server by continuously requesting changes for the same unchanged information.