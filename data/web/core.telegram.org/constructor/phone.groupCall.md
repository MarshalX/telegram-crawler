# phone.groupCall

Contains group call information and an initial participant page, see [getting info about a group call »](/api/group-calls.md#getting-info-about-a-group-call).

```tl
phone.groupCall#9e727aad call:GroupCall participants:Vector<GroupCallParticipant> participants_next_offset:string chats:Vector<Chat> users:Vector<User> = phone.GroupCall;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **call** | [GroupCall](/type/GroupCall.md) | Info about the group call |
| **participants** | [Vector](/type/Vector%20t)&lt;[GroupCallParticipant](/type/GroupCallParticipant.md)&gt; | A partial list of participants. |
| **participants\_next\_offset** | [string](/type/string.md) | Next offset to use when fetching the remaining participants using [phone.getGroupParticipants](/method/phone.getGroupParticipants.md) |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chats mentioned in the participants vector |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users mentioned in the participants vector |

### Type
[phone.GroupCall](/type/phone.GroupCall.md)

### Related pages

#### [phone.getGroupParticipants](/method/phone.getGroupParticipants.md)
Get [group call](/api/group-calls.md#getting-info-about-a-group-call) participants.

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.