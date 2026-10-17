# phone.GroupParticipants

Info about the participants of a group call or livestream

```tl
phone.groupParticipants#f47751b6 count:int participants:Vector<GroupCallParticipant> next_offset:string chats:Vector<Chat> users:Vector<User> version:int = phone.GroupParticipants;

---functions---

phone.getGroupParticipants#c558d8ab call:InputGroupCall ids:Vector<InputPeer> sources:Vector<int> offset:string limit:int = phone.GroupParticipants;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [phone.groupParticipants](/constructor/phone.groupParticipants.md) | Contains a page of group call participants, see [getting info about a group call »](/api/group-calls.md#getting-info-about-a-group-call). |

### Methods

| Method | Description |
| --- | --- |
| [phone.getGroupParticipants](/method/phone.getGroupParticipants.md) | Get [group call](/api/group-calls.md#getting-info-about-a-group-call) participants. |