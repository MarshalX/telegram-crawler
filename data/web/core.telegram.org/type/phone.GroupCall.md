# phone.GroupCall

Contains info about a group call, and partial info about its participants.

```tl
phone.groupCall#9e727aad call:GroupCall participants:Vector<GroupCallParticipant> participants_next_offset:string chats:Vector<Chat> users:Vector<User> = phone.GroupCall;

---functions---

phone.getGroupCall#41845db call:InputGroupCall limit:int = phone.GroupCall;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [phone.groupCall](/constructor/phone.groupCall.md) | Contains group call information and an initial participant page, see [getting info about a group call »](/api/group-calls.md#getting-info-about-a-group-call). |

### Methods

| Method | Description |
| --- | --- |
| [phone.getGroupCall](/method/phone.getGroupCall.md) | Get info about a [group call](/api/group-calls.md#getting-info-about-a-group-call) and its participants. |