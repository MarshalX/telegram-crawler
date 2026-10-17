# starsTransaction

Represents a [Telegram Stars or TON transaction »](/api/stars.md).

```tl
starsTransaction#13659eb0 flags:# refund:flags.3?true pending:flags.4?true failed:flags.6?true gift:flags.10?true reaction:flags.11?true stargift_upgrade:flags.18?true business_transfer:flags.21?true stargift_resale:flags.22?true posts_search:flags.24?true stargift_prepaid_upgrade:flags.25?true stargift_drop_original_details:flags.26?true phonegroup_message:flags.27?true stargift_auction_bid:flags.28?true offer:flags.29?true id:string amount:StarsAmount date:int peer:StarsTransactionPeer title:flags.0?string description:flags.1?string photo:flags.2?WebDocument transaction_date:flags.5?int transaction_url:flags.5?string bot_payload:flags.7?bytes msg_id:flags.8?int extended_media:flags.9?Vector<MessageMedia> subscription_period:flags.12?int giveaway_post_id:flags.13?int stargift:flags.14?StarGift floodskip_number:flags.15?int starref_commission_permille:flags.16?int starref_peer:flags.17?Peer starref_amount:flags.17?StarsAmount paid_messages:flags.19?int premium_gift_months:flags.20?int ads_proceeds_from_date:flags.23?int ads_proceeds_to_date:flags.23?int = StarsTransaction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **refund** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether this transaction is a refund. |
| **pending** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | The transaction is currently pending. |
| **failed** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | This transaction has failed. |
| **gift** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | This transaction was a gift from the user in `peer.peer`. |
| **reaction** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | This transaction is a [paid reaction »](/api/reactions.md#paid-reactions). |
| **stargift\_upgrade** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[true](/constructor/true.md) | This transaction pays for the upgrade of a gift to a [collectible gift »](/api/gifts.md#collectible-gifts). |
| **business\_transfer** | [flags](/mtproto/TL-combinators.md#conditional-fields).21?[true](/constructor/true.md) | This transaction transfers stars from the balance of a user account [connected to a business bot](/api/bots/connected-business-bots.md), to the balance of the business bot, see [here »](/api/stars.md#transferring-stars-from-a-business-account-to-the-business-bot) for more info. |
| **stargift\_resale** | [flags](/mtproto/TL-combinators.md#conditional-fields).22?[true](/constructor/true.md) | This transaction is related to the [resale of a collectible gift »](/api/gifts.md#reselling-collectible-gifts). |
| **posts\_search** | [flags](/mtproto/TL-combinators.md#conditional-fields).24?[true](/constructor/true.md) | Represents payment for a [paid global post search »](/api/search.md#posts-tab). |
| **stargift\_prepaid\_upgrade** | [flags](/mtproto/TL-combinators.md#conditional-fields).25?[true](/constructor/true.md) | Represents payment for a [separate prepaid upgrade of a gift](/api/gifts.md#prepaying-for-someone-elses-upgrade). |
| **stargift\_drop\_original\_details** | [flags](/mtproto/TL-combinators.md#conditional-fields).26?[true](/constructor/true.md) | Represents payment for the removal of the [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md) attribute from a gift, see [here »](/api/gifts.md#dropping-the-original-details-of-an-upgraded-gift) for the full flow. |
| **phonegroup\_message** | [flags](/mtproto/TL-combinators.md#conditional-fields).27?[true](/constructor/true.md) | Represents payment for a paid text message sent during a [group call or live video stream »](/api/group-calls.md). |
| **stargift\_auction\_bid** | [flags](/mtproto/TL-combinators.md#conditional-fields).28?[true](/constructor/true.md) | Represents payment for placing a [collectible gift auction bid »](/api/auctions.md). |
| **offer** | [flags](/mtproto/TL-combinators.md#conditional-fields).29?[true](/constructor/true.md) | Represents payment for a [collectible gift purchase offer »](/api/gifts.md#collectible-gift-purchase-offers). |
| **id** | [string](/type/string.md) | Transaction ID. |
| **amount** | [StarsAmount](/type/StarsAmount.md) | Amount of Telegram Stars or TON. |
| **date** | [int](/type/int.md) | Date of the transaction (unixtime). |
| **peer** | [StarsTransactionPeer](/type/StarsTransactionPeer.md) | Source of the incoming transaction, or its recipient for outgoing transactions. |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | For transactions with bots, title of the bought product. |
| **description** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | For transactions with bots, description of the bought product. |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[WebDocument](/type/WebDocument.md) | For transactions with bots, photo of the bought product. |
| **transaction\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[int](/type/int.md) | If neither `pending` nor `failed` are set, the transaction was completed successfully, and this field will contain the point in time (Unix timestamp) when the withdrawal was completed successfully. |
| **transaction\_url** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[string](/type/string.md) | If neither `pending` nor `failed` are set, the transaction was completed successfully, and this field will contain a URL where the withdrawal transaction can be viewed. |
| **bot\_payload** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[bytes](/type/bytes.md) | Bot specified invoice payload (i.e. the `payload` passed to [inputMediaInvoice](/constructor/inputMediaInvoice.md) when [creating the invoice](/api/payments.md)). |
| **msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[int](/type/int.md) | For [paid media transactions »](/api/paid-media.md), message ID of the paid media posted to `peer.peer` (can point to a deleted message; either way, `extended_media` will always contain the bought media). |
| **extended\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[Vector](/type/Vector%20t)&lt;[MessageMedia](/type/MessageMedia.md)&gt; | The purchased [paid media »](/api/paid-media.md). |
| **subscription\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[int](/type/int.md) | The number of seconds between consecutive Telegram Star debiting for [Telegram Star subscriptions »](/api/stars.md#star-subscriptions). |
| **giveaway\_post\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[int](/type/int.md) | ID of the message containing the [messageMediaGiveaway](/constructor/messageMediaGiveaway.md), for incoming [star giveaway prizes](/api/giveaways.md#star-giveaways). |
| **stargift** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[StarGift](/type/StarGift.md) | This transaction indicates a purchase or a sale (conversion back to Stars) of a [gift »](/api/stars.md). |
| **floodskip\_number** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[int](/type/int.md) | This transaction is payment for [paid bot broadcasts](/bots/faq.md#how-can-i-message-all-of-my-bot-39s-subscribers-at-once).  \
Paid broadcasts are only allowed if the `allow_paid_floodskip` parameter of [messages.sendMessage](/method/messages.sendMessage.md) and other message sending methods is set while trying to broadcast more than 30 messages per second to bot users. \
The integer value returned by this flag indicates the number of billed API calls. |
| **starref\_commission\_permille** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[int](/type/int.md) | This transaction is the receival (or refund) of an [affiliate commission](/api/bots/referrals.md) (i.e. this is the transaction received by the peer that created the [referral link](/api/links.md#referral-links), flag 17 is for transactions made by users that imported the referral link). |
| **starref\_peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[Peer](/type/Peer.md) | For transactions made by [referred users](/api/bots/referrals.md), the peer that received the affiliate commission. |
| **starref\_amount** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[StarsAmount](/type/StarsAmount.md) | For transactions made by [referred users](/api/bots/referrals.md), the amount of Telegram Stars received by the affiliate, can be negative for refunds. |
| **paid\_messages** | [flags](/mtproto/TL-combinators.md#conditional-fields).19?[int](/type/int.md) | This transaction is related to the reception or transmission of a [paid message »](/api/paid-messages.md). |
| **premium\_gift\_months** | [flags](/mtproto/TL-combinators.md#conditional-fields).20?[int](/type/int.md) | This transaction indicates the payment for a [gifted Telegram Premium subscription »](/api/premium.md#gifting-telegram-premium). |
| **ads\_proceeds\_from\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).23?[int](/type/int.md) | Indicates that this is payment for ad revenue from the specified unixtime (always set together with **ads\_proceeds\_to\_date**). |
| **ads\_proceeds\_to\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).23?[int](/type/int.md) | Indicates that this is payment for ad revenue to the specified unixtime. |

### Type
[StarsTransaction](/type/StarsTransaction.md)

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Search and filters](/api/search.md)
Telegram allows applying detailed message filters while looking for messages in chats.

#### [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md)
Info about the sender, receiver and message attached to the original [gift »](/api/gifts.md), before it was upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.

#### [inputMediaInvoice](/constructor/inputMediaInvoice.md)
Generated invoice of a [bot payment](/bots/payments.md)

#### [Payments API](/api/payments.md)
You can accept payments from Telegram users via Telegram Bots.

#### [Paid media](/api/paid-media.md)
Content creators can accept Stars by publishing paid photos or videos on their channels.  Subscribers will be allowed to view such posts only after paying the author to unlock them.

#### [messageMediaGiveaway](/constructor/messageMediaGiveaway.md)
Contains info about a [giveaway, see here »](/api/giveaways.md) for more info.

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.

#### [Bots FAQ](/bots/faq.md)

#### [messages.sendMessage](/method/messages.sendMessage.md)
Sends a message to a chat

#### [Affiliate programs](/api/bots/referrals.md)
Developers can open affiliate programs for their mini app – allowing content creators, other mini app developers and any Telegram user to promote it and earn commissions on purchases made by people they referred.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.