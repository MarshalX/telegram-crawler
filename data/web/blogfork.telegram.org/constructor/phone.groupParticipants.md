# phone.groupParticipants

Contains a page of group call participants, see [getting info about a group call »](/api/group-calls.md#getting-info-about-a-group-call).

```tl
phone.groupParticipants#f47751b6 count:int participants:Vector<GroupCallParticipant> next_offset:string chats:Vector<Chat> users:Vector<User> version:int = phone.GroupParticipants;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **count** | [int](/type/int.md) | Number of participants |
| **participants** | [Vector](/type/Vector%20t)&lt;[GroupCallParticipant](/type/GroupCallParticipant.md)&gt; | List of participants |
| **next\_offset** | [string](/type/string.md) | If not empty, the specified list of participants is partial, and more participants can be fetched specifying this parameter as `offset` in [phone.getGroupParticipants](/method/phone.getGroupParticipants.md). |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |
| **version** | [int](/type/int.md) | Current participant-list version, used to apply and detect gaps in versioned [updateGroupCallParticipants](/constructor/updateGroupCallParticipants.md) updates |

### Type
[phone.GroupParticipants](/type/phone.GroupParticipants.md)

### Related pages

#### [phone.getGroupParticipants](/method/phone.getGroupParticipants.md)
Get [group call](/api/group-calls.md#getting-info-about-a-group-call) participants.

#### [updateGroupCallParticipants](/constructor/updateGroupCallParticipants.md)
The participant list of a [group call](/api/group-calls.md#applying-group-call-updates) has changed.

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.