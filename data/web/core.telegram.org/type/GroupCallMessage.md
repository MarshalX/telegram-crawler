# GroupCallMessage

Represents an in-call message, [emoji reaction »](/api/group-calls.md#in-call-reactions), paid live story comment or standalone paid live story donation.

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===216===
groupCallMessage#907ce88e random_id:long message:TextWithEntities = GroupCallMessage;
```

API schema:
<!-- /schema-blocks -->

```tl
groupCallMessage#1a8afc7e flags:# from_admin:flags.1?true id:int from_id:Peer date:int message:TextWithEntities paid_message_stars:flags.0?long = GroupCallMessage;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [groupCallMessage](/constructor/groupCallMessage.md) | Represents an [in-call message »](/api/group-calls.md#in-call-messages), emoji reaction, paid live story comment or standalone paid live story donation. |

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.