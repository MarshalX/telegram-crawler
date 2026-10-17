# messageActionInviteToGroupCall

A set of users was invited to a [video chat/livestream »](/api/group-calls.md#video-chats-livestreams).

```tl
messageActionInviteToGroupCall#502f92f7 call:InputGroupCall users:Vector<long> = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Video chat/livestream to which the users were invited |
| **users** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | The invited users |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.