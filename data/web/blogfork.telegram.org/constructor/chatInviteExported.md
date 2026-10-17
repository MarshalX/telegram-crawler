# chatInviteExported

Exported chat invite

```tl
chatInviteExported#a22cbd96 flags:# revoked:flags.0?true permanent:flags.5?true request_needed:flags.6?true link:string admin_id:long date:int start_date:flags.4?int expire_date:flags.1?int usage_limit:flags.2?int usage:flags.3?int requested:flags.7?int subscription_expired:flags.10?int title:flags.8?string subscription_pricing:flags.9?StarsSubscriptionPricing = ExportedChatInvite;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **revoked** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this chat invite was revoked |
| **permanent** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether this chat invite has no expiration |
| **request\_needed** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Whether users importing this invite link will have to be approved to join the channel or group |
| **link** | [string](/type/string.md) | Chat invitation link |
| **admin\_id** | [long](/type/long.md) | ID of the admin that created this chat invite |
| **date** | [int](/type/int.md) | When was this chat invite created |
| **start\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | When was this chat invite last modified |
| **expire\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | When does this chat invite expire |
| **usage\_limit** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Maximum number of users that can join using this link |
| **usage** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | How many users joined using this link |
| **requested** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[int](/type/int.md) | Number of users that have already used this link to join |
| **subscription\_expired** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[int](/type/int.md) | For [Telegram Star subscriptions »](/api/stars.md#star-subscriptions), contains the number of chat members which have already joined the chat using the link, but have already left due to expiration of their subscription. |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[string](/type/string.md) | Custom description for the invite link, visible only to admins |
| **subscription\_pricing** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[StarsSubscriptionPricing](/type/StarsSubscriptionPricing.md) | For [Telegram Star subscriptions »](/api/stars.md#star-subscriptions), contains the pricing of the subscription the user must activate to join the private channel. |

### Type
[ExportedChatInvite](/type/ExportedChatInvite.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.