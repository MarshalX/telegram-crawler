# messageFwdHeader

Info about a forwarded message

```tl
messageFwdHeader#4e4df4bb flags:# imported:flags.7?true saved_out:flags.11?true from_id:flags.0?Peer from_name:flags.5?string date:int channel_post:flags.2?int post_author:flags.3?string saved_from_peer:flags.4?Peer saved_from_msg_id:flags.4?int saved_from_id:flags.8?Peer saved_from_name:flags.9?string saved_date:flags.10?int psa_type:flags.6?string = MessageFwdHeader;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **imported** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Whether this message was [imported from a foreign chat service, click here for more info »](/api/import.md) |
| **saved\_out** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | Only for messages forwarded to [saved messages »](/api/saved-messages.md), set if the original message was outgoing (though the message may have been originally outgoing even if this flag is not set, if `from_id` points to the current user). |
| **from\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Peer](/type/Peer.md) | The ID of the user that originally sent the message |
| **from\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[string](/type/string.md) | The name of the user that originally sent the message |
| **date** | [int](/type/int.md) | When was the message originally sent |
| **channel\_post** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | ID of the channel message that was forwarded |
| **post\_author** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | For channels and if signatures are enabled, author of the channel message |
| **saved\_from\_peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[Peer](/type/Peer.md) | Only for messages forwarded to [saved messages »](/api/saved-messages.md), contains the dialog where the message was originally sent. |
| **saved\_from\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Only for messages forwarded to [saved messages »](/api/saved-messages.md), contains the original ID of the message in `saved_from_peer`. |
| **saved\_from\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[Peer](/type/Peer.md) | Only for forwarded messages reforwarded to [saved messages »](/api/saved-messages.md), contains the sender of the original message (i.e. if user A sends a message, then user B forwards it somewhere, then user C saves it to saved messages, this field will contain the ID of user B and `from_id` will contain the ID of user A). |
| **saved\_from\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[string](/type/string.md) | Only for forwarded messages from users with forward privacy enabled, sent by users with forward privacy enabled, reforwarded to [saved messages »](/api/saved-messages.md), contains the sender of the original message (i.e. if user A (fwd privacy enabled) sends a message, then user B (fwd privacy enabled) forwards it somewhere, then user C saves it to saved messages, this field will contain the name of user B and `from_name` will contain the name of user A). |
| **saved\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[int](/type/int.md) | Only for forwarded messages reforwarded to [saved messages »](/api/saved-messages.md), indicates when was the original message sent (i.e. if user A sends a message @ unixtime 1, then user B forwards it somewhere @ unixtime 2, then user C saves it to saved messages @ unixtime 3, this field will contain 2, `date` will contain 1 and the `date` of the containing [message](/constructor/message.md) will contain 3). |
| **psa\_type** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[string](/type/string.md) | PSA type |

### Type
[MessageFwdHeader](/type/MessageFwdHeader.md)

### Related pages

#### [Imported messages](/api/import.md)
Telegram allows importing messages and media from foreign chat apps.

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.

#### [message](/constructor/message.md)
A message