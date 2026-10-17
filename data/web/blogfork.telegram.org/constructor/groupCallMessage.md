# groupCallMessage

Represents an [in-call message »](/api/group-calls.md#in-call-messages), emoji reaction, paid live story comment or standalone paid live story donation.

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===216===
groupCallMessage#907ce88e random_id:long message:TextWithEntities = GroupCallMessage;
```

#### API schema
<!-- /schema-blocks -->

```tl
groupCallMessage#1a8afc7e flags:# from_admin:flags.1?true id:int from_id:Peer date:int message:TextWithEntities paid_message_stars:flags.0?long = GroupCallMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **from\_admin** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the message was sent by a group call admin |
| **id** | [int](/type/int.md) | Message ID |
| **from\_id** | [Peer](/type/Peer.md) | Displayed message author |
| **date** | [int](/type/int.md) | Message date |
| **message** | [TextWithEntities](/type/TextWithEntities.md) | Message text or emoji reaction; empty for standalone paid live story donations. \
Must be at most [`group_call_message_length_limit` »](/api/config.md#group-call-message-length-limit) UTF-8 characters long. \
For paid chats, use [`stars_groupcall_message_limits` »](/api/config.md#stars-groupcall-message-limits) to source limits according to the passed value of `paid_message_stars`, instead. |
| **paid\_message\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | Number of Telegram Stars donated with the message or standalone donation |

### Type
[GroupCallMessage](/type/GroupCallMessage.md)

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.