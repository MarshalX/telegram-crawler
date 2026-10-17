# phone.ExportedGroupCallInvite

An exported group call invitation.

```tl
phone.exportedGroupCallInvite#204bd158 link:string = phone.ExportedGroupCallInvite;

---functions---

phone.exportGroupCallInvite#e6aa647f flags:# can_self_unmute:flags.0?true call:InputGroupCall = phone.ExportedGroupCallInvite;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [phone.exportedGroupCallInvite](/constructor/phone.exportedGroupCallInvite.md) | An invite to a group call or livestream |

### Methods

| Method | Description |
| --- | --- |
| [phone.exportGroupCallInvite](/method/phone.exportGroupCallInvite.md) | Get an invite link for a public [video chat/livestream »](/api/group-calls.md#video-chats-livestreams).\
\
Non-admin members or subscribers may export a link with `can_self_unmute` omitted. Only group call admins may set `can_self_unmute` to export a link that allows users to speak.\
\
Cannot be used for video chats/livestreams associated with private groups/channels, [conference calls »](/api/group-calls.md#conference-calls) or [live stories »](/api/group-calls.md#live-stories). |