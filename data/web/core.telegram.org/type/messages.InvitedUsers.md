# messages.InvitedUsers

Contains info about successfully or unsuccessfully [invited »](/api/invites.md#direct-invites) users.

```tl
messages.invitedUsers#7f5defa6 updates:Updates missing_invitees:Vector<MissingInvitee> = messages.InvitedUsers;

---functions---

messages.addChatUser#cbc6d107 chat_id:long user_id:InputUser fwd_limit:int = messages.InvitedUsers;
messages.createChat#92ceddd4 flags:# users:Vector<InputUser> title:string ttl_period:flags.0?int = messages.InvitedUsers;
channels.inviteToChannel#c9e33d54 channel:InputChannel users:Vector<InputUser> = messages.InvitedUsers;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.invitedUsers](/constructor/messages.invitedUsers.md) | Contains info about successfully or unsuccessfully [invited »](/api/invites.md#direct-invites) users. |

### Methods

| Method | Description |
| --- | --- |
| [messages.addChatUser](/method/messages.addChatUser.md) | Adds a user to a chat and sends a service message on it. |
| [messages.createChat](/method/messages.createChat.md) | Creates a new chat. |
| [channels.inviteToChannel](/method/channels.inviteToChannel.md) | Invite users to a channel/supergroup |

### Related pages

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.