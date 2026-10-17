# help.promoData

A set of useful suggestions and a PSA/MTProxy sponsored peer, see [here »](/api/config.md#suggestions) for more info.

```tl
help.promoData#8a4d87a flags:# proxy:flags.0?true expires:int peer:flags.3?Peer psa_type:flags.1?string psa_message:flags.2?string pending_suggestions:Vector<string> dismissed_suggestions:Vector<string> custom_pending_suggestion:flags.4?PendingSuggestion chats:Vector<Chat> users:Vector<User> = help.PromoData;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **proxy** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Set when connecting using an MTProxy that has configured an associated peer (that will be passed in `peer`, i.e. the channel that sponsored the MTProxy) that should be pinned on top of the chat list. |
| **expires** | [int](/type/int.md) | Unixtime when to re-invoke [help.getPromoData](/method/help.getPromoData.md). |
| **peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Peer](/type/Peer.md) | MTProxy/PSA peer |
| **psa\_type** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | For Public Service Announcement `peer`s, indicates the type of the PSA. |
| **psa\_message** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | For Public Service Announcement `peer`s, contains the PSA itself. |
| **pending\_suggestions** | [Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | Contains a list of [pending suggestions »](/api/config.md#basic-suggestions). |
| **dismissed\_suggestions** | [Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | Contains a list of [inverted suggestions »](/api/config.md#inverted-suggestions). |
| **custom\_pending\_suggestion** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[PendingSuggestion](/type/PendingSuggestion.md) | Contains a list of [custom pending suggestions »](/api/config.md#custom-suggestions). |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chat info |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | User info |

### Type
[help.PromoData](/type/help.PromoData.md)

### Related pages

#### [help.getPromoData](/method/help.getPromoData.md)
Returns a set of useful suggestions and PSA/MTProxy sponsored peers, see [here »](/api/config.md#suggestions) for more info.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.