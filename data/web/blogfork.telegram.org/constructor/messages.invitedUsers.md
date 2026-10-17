# messages.invitedUsers

Contains info about successfully or unsuccessfully [invited »](/api/invites.md#direct-invites) users.

```tl
messages.invitedUsers#7f5defa6 updates:Updates missing_invitees:Vector<MissingInvitee> = messages.InvitedUsers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **updates** | [Updates](/type/Updates.md) | List of updates about successfully invited users (and eventually info about the created group) |
| **missing\_invitees** | [Vector](/type/Vector%20t)&lt;[MissingInvitee](/type/MissingInvitee.md)&gt; | A list of users that could not be invited, along with the reason why they couldn't be invited. |

### Type
[messages.InvitedUsers](/type/messages.InvitedUsers.md)

### Related pages

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.