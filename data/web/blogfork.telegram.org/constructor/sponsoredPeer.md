# sponsoredPeer

A sponsored peer.

```tl
sponsoredPeer#c69708d3 flags:# random_id:bytes peer:Peer sponsor_info:flags.0?string additional_info:flags.1?string = SponsoredPeer;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **random\_id** | [bytes](/type/bytes.md) | ID of the sponsored peer, to be passed to [messages.viewSponsoredMessage](/method/messages.viewSponsoredMessage.md), [messages.clickSponsoredMessage](/method/messages.clickSponsoredMessage.md) or [messages.reportSponsoredMessage](/method/messages.reportSponsoredMessage.md) (the same methods used for [sponsored messages &amp;raquo](/api/sponsored-messages.md)). See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **peer** | [Peer](/type/Peer.md) | The sponsored peer. |
| **sponsor\_info** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | If set, contains additional information about the sponsor to be shown along with the peer. |
| **additional\_info** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | If set, contains additional information about the sponsored message to be shown along with the peer. |

### Type
[SponsoredPeer](/type/SponsoredPeer.md)

### Related pages

#### [messages.viewSponsoredMessage](/method/messages.viewSponsoredMessage.md)
Mark a specific [sponsored message »](/api/sponsored-messages.md) as read

#### [messages.clickSponsoredMessage](/method/messages.clickSponsoredMessage.md)
Informs the server that the user has interacted with a sponsored message in [one of the ways listed here »](/api/sponsored-messages.md#clicking-on-sponsored-messages).

#### [messages.reportSponsoredMessage](/method/messages.reportSponsoredMessage.md)
Report a [sponsored message »](/api/sponsored-messages.md), see [here »](/api/sponsored-messages.md#reporting-sponsored-messages) for more info on the full flow.

#### [Sponsored messages](/api/sponsored-messages.md)
How clients should fetch, display and interact with sponsored messages.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.