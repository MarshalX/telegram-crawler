# updateGroupCallParticipants

The participant list of a [group call](/api/group-calls.md#applying-group-call-updates) has changed.

```tl
updateGroupCallParticipants#f2ebdb4e call:InputGroupCall participants:Vector<GroupCallParticipant> version:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Group call whose participants changed |
| **participants** | [Vector](/type/Vector%20t)&lt;[GroupCallParticipant](/type/GroupCallParticipant.md)&gt; | Participants whose state changed |
| **version** | [int](/type/int.md) | Group call revision used by the [update application rules »](/api/group-calls.md#applying-group-call-updates) |

### Type
[Update](/type/Update.md)

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.