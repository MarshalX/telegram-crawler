# phone.exportGroupCallInvite

Get an invite link for a public [video chat/livestream »](/api/group-calls.md#video-chats-livestreams).

Non-admin members or subscribers may export a link with `can_self_unmute` omitted. Only group call admins may set `can_self_unmute` to export a link that allows users to speak.

Cannot be used for video chats/livestreams associated with private groups/channels, [conference calls »](/api/group-calls.md#conference-calls) or [live stories »](/api/group-calls.md#live-stories).

```tl
phone.exportedGroupCallInvite#204bd158 link:string = phone.ExportedGroupCallInvite;
---functions---
phone.exportGroupCallInvite#e6aa647f flags:# can_self_unmute:flags.0?true call:InputGroupCall = phone.ExportedGroupCallInvite;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **can\_self\_unmute** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | For public video chats/livestreams, group call admins only: allow users that join using this link to speak without explicitly requesting permission, for example by raising their hand. |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | The public [video chat/livestream »](/api/group-calls.md#video-chats-livestreams) |

### Result
[phone.ExportedGroupCallInvite](/type/phone.ExportedGroupCallInvite.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | GROUPCALL\_INVALID | The specified group call is invalid. |
| 403 | PUBLIC\_CHANNEL\_MISSING | You can only export group call invite links for public chats or channels. |

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.