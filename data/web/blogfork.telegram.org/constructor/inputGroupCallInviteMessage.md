# inputGroupCallInviteMessage

Identifies a [conference call »](/api/group-calls.md#conference-calls) using its [messageActionConferenceCall](/constructor/messageActionConferenceCall.md) invitation service message.

```tl
inputGroupCallInviteMessage#8c10603f msg_id:int = InputGroupCall;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **msg\_id** | [int](/type/int.md) | ID of the [messageActionConferenceCall](/constructor/messageActionConferenceCall.md). |

### Type
[InputGroupCall](/type/InputGroupCall.md)

### Related pages

#### [messageActionConferenceCall](/constructor/messageActionConferenceCall.md)
Represents a [conference call »](/api/group-calls.md#conference-calls), or an invitation to one if neither the `missed` nor `active` flags are set.

If [call\_requests\_disabled](/api/config.md#call-requests-disabled) is not set or false, an incoming [messageActionConferenceCall](/constructor/messageActionConferenceCall.md) with the `missed` and `active` flags **not** set should trigger ringing and an incoming call screen, just like for one-on-one calls.

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.