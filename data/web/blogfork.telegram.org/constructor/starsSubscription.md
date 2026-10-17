# starsSubscription

Represents a [Telegram Star subscription »](/api/invites.md#paid-invite-links).

```tl
starsSubscription#2e6eab1a flags:# canceled:flags.0?true can_refulfill:flags.1?true missing_balance:flags.2?true bot_canceled:flags.7?true id:string peer:Peer until_date:int pricing:StarsSubscriptionPricing chat_invite_hash:flags.3?string title:flags.4?string photo:flags.5?WebDocument invoice_slug:flags.6?string = StarsSubscription;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **canceled** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this subscription was cancelled. |
| **can\_refulfill** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether we left the associated private channel, but we can still rejoin it using [payments.fulfillStarsSubscription](/method/payments.fulfillStarsSubscription.md) because the current subscription period hasn't expired yet. |
| **missing\_balance** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this subscription has expired because there are not enough stars on the user's balance to extend it. |
| **bot\_canceled** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Set if this [bot subscription](/api/subscriptions.md#bot-subscriptions) was cancelled by the bot |
| **id** | [string](/type/string.md) | Subscription ID. |
| **peer** | [Peer](/type/Peer.md) | Identifier of the associated private chat. |
| **until\_date** | [int](/type/int.md) | Expiration date of the current subscription period. |
| **pricing** | [StarsSubscriptionPricing](/type/StarsSubscriptionPricing.md) | Pricing of the subscription in Telegram Stars. |
| **chat\_invite\_hash** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | Invitation link, used to renew the subscription after cancellation or expiration. |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[string](/type/string.md) | For bot subscriptions, the title of the subscription invoice |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[WebDocument](/type/WebDocument.md) | For bot subscriptions, the photo from the subscription invoice |
| **invoice\_slug** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[string](/type/string.md) | For bot subscriptions, the [identifier](/api/links.md#invoice-links) of the subscription invoice |

### Type
[StarsSubscription](/type/StarsSubscription.md)

### Related pages

#### [payments.fulfillStarsSubscription](/method/payments.fulfillStarsSubscription.md)
Re-join a private channel associated to an active [Telegram Star subscription »](/api/invites.md#paid-invite-links).

#### [Star subscriptions](/api/subscriptions.md)
Bots and channels may create subscriptions, periodically charging users a certain amount of Telegram Stars in exchange for content and services.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.