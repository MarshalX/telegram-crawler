# updateDeleteGroupCallMessages

Indicates that messages were deleted from the [in-call message overlay »](/api/group-calls.md#in-call-messages) of a video chat/livestream or live story, including in RTMP mode.

```tl
updateDeleteGroupCallMessages#3e85e92c call:InputGroupCall messages:Vector<int> = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Video chat/livestream or live story from which the messages were deleted |
| **messages** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of the deleted in-call messages |

### Type
[Update](/type/Update.md)

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.