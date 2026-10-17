# ChatParticipant

Details of a group member.

```tl
chatParticipant#38e79fde flags:# user_id:long inviter_id:long date:int rank:flags.0?string = ChatParticipant;
chatParticipantCreator#e1f867b8 flags:# user_id:long rank:flags.0?string = ChatParticipant;
chatParticipantAdmin#360d5d2 flags:# user_id:long inviter_id:long date:int rank:flags.0?string = ChatParticipant;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [chatParticipant](/constructor/chatParticipant.md) | [Basic group](/api/channel.md#basic-groups) member (not usable by supergroups). |
| [chatParticipantCreator](/constructor/chatParticipantCreator.md) | Represents the creator of the [basic group »](/api/channel.md#basic-groups) |
| [chatParticipantAdmin](/constructor/chatParticipantAdmin.md) | [Basic group](/api/channel.md#basic-groups) admin (not usable by supergroups). |