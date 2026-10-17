# InputGroupCall

Indicates a group call

```tl
inputGroupCall#d8aa840f id:long access_hash:long = InputGroupCall;
inputGroupCallSlug#fe06823f slug:string = InputGroupCall;
inputGroupCallInviteMessage#8c10603f msg_id:int = InputGroupCall;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputGroupCall](/constructor/inputGroupCall.md) | Points to a specific [group call](/api/group-calls.md). |
| [inputGroupCallSlug](/constructor/inputGroupCallSlug.md) | Identify a [conference call »](/api/group-calls.md#conference-calls) using the slug from its invitation link.\
\
This constructor can only be used for conference calls. It cannot be used for video chats/livestreams, live stories or any other group call type. |
| [inputGroupCallInviteMessage](/constructor/inputGroupCallInviteMessage.md) | Identifies a [conference call »](/api/group-calls.md#conference-calls) using its [messageActionConferenceCall](/constructor/messageActionConferenceCall.md) invitation service message. |