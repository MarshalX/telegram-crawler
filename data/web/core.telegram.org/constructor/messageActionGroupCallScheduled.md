# messageActionGroupCallScheduled

A [video chat/livestream](/api/group-calls.md#video-chats-livestreams) was scheduled.

```tl
messageActionGroupCallScheduled#b3a07661 call:InputGroupCall schedule_date:int = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Scheduled video chat/livestream |
| **schedule\_date** | [int](/type/int.md) | When is the group call scheduled to start |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.