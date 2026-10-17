# messages.exportChatInvite

Export an invite link for a chat

```tl
chatInviteExported#a22cbd96 flags:# revoked:flags.0?true permanent:flags.5?true request_needed:flags.6?true link:string admin_id:long date:int start_date:flags.4?int expire_date:flags.1?int usage_limit:flags.2?int usage:flags.3?int requested:flags.7?int subscription_expired:flags.10?int title:flags.8?string subscription_pricing:flags.9?StarsSubscriptionPricing = ExportedChatInvite;
chatInvitePublicJoinRequests#ed107ab7 = ExportedChatInvite;
---functions---
messages.exportChatInvite#a455de90 flags:# legacy_revoke_permanent:flags.2?true request_needed:flags.3?true peer:InputPeer expire_date:flags.0?int usage_limit:flags.1?int title:flags.4?string subscription_pricing:flags.5?StarsSubscriptionPricing = ExportedChatInvite;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **legacy\_revoke\_permanent** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Legacy flag, reproducing legacy behavior of this method: if set, revokes all previous links before creating a new one. Kept for bot API BC, should not be used by modern clients. |
| **request\_needed** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether admin confirmation is required before admitting each separate user into the chat |
| **peer** | [InputPeer](/type/InputPeer.md) | Chat |
| **expire\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Expiration date |
| **usage\_limit** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Maximum number of users that can join using this link |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[string](/type/string.md) | Description of the invite link, visible only to administrators |
| **subscription\_pricing** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[StarsSubscriptionPricing](/type/StarsSubscriptionPricing.md) | For [Telegram Star subscriptions »](/api/stars.md#star-subscriptions), contains the pricing of the subscription the user must activate to join the private channel. |

### Result
[ExportedChatInvite](/type/ExportedChatInvite.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_MONOFORUM\_UNSUPPORTED | [Monoforums](/api/channel.md#monoforums) do not support this feature. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | EXPIRE\_DATE\_INVALID | The specified expiration date is invalid. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | PRICING\_CHAT\_INVALID | The pricing for the [subscription](/api/subscriptions.md) is invalid, the maximum price is specified in the [`stars_subscription_amount_max` config key&nbsp;&raquo;](/api/config.md#stars-subscription-amount-max). |
| 400 | SUBSCRIPTION\_PERIOD\_INVALID | The specified subscription_pricing.period is invalid. |
| 400 | USAGE\_LIMIT\_INVALID | The specified usage limit is invalid. |

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Star subscriptions](/api/subscriptions.md)
Bots and channels may create subscriptions, periodically charging users a certain amount of Telegram Stars in exchange for content and services.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.