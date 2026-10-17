# phone.getGroupParticipants

Get [group call](/api/group-calls.md#getting-info-about-a-group-call) participants.

```tl
phone.groupParticipants#f47751b6 count:int participants:Vector<GroupCallParticipant> next_offset:string chats:Vector<Chat> users:Vector<User> version:int = phone.GroupParticipants;
---functions---
phone.getGroupParticipants#c558d8ab call:InputGroupCall ids:Vector<InputPeer> sources:Vector<int> offset:string limit:int = phone.GroupParticipants;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Group call whose participants should be fetched |
| **ids** | [Vector](/type/Vector%20t)&lt;[InputPeer](/type/InputPeer.md)&gt; | If specified, will fetch group participant info about the specified peers |
| **sources** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | If specified, will fetch group participant info about the specified WebRTC source IDs |
| **offset** | [string](/type/string.md) | Offset for results, taken from the `next_offset` field of [phone.groupParticipants](/constructor/phone.groupParticipants.md) or the `participants_next_offset` field of [phone.groupCall](/constructor/phone.groupCall.md), initially an empty string. \
Note: if no more results are available, the method call will return an empty `next_offset`; thus, avoid providing the `next_offset` returned in [phone.groupParticipants](/constructor/phone.groupParticipants.md) if it is empty, to avoid an infinite loop. |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[phone.GroupParticipants](/type/phone.GroupParticipants.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | GROUPCALL\_INVALID | The specified group call is invalid. |

### Related pages

#### [phone.groupParticipants](/constructor/phone.groupParticipants.md)
Contains a page of group call participants, see [getting info about a group call »](/api/group-calls.md#getting-info-about-a-group-call).

#### [phone.groupCall](/constructor/phone.groupCall.md)
Contains group call information and an initial participant page, see [getting info about a group call »](/api/group-calls.md#getting-info-about-a-group-call).

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.