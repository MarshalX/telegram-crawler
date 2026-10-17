# chatInvite

Chat invite info

```tl
chatInvite#5c9d3702 flags:# channel:flags.0?true broadcast:flags.1?true public:flags.2?true megagroup:flags.3?true request_needed:flags.6?true verified:flags.7?true scam:flags.8?true fake:flags.9?true can_refulfill_subscription:flags.11?true title:string about:flags.5?string photo:Photo participants_count:int participants:flags.4?Vector<User> color:int subscription_pricing:flags.10?StarsSubscriptionPricing subscription_form_id:flags.12?long bot_verification:flags.13?BotVerification = ChatInvite;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **channel** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this is a [channel/supergroup](/api/channel.md) or a [normal group](/api/channel.md) |
| **broadcast** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this is a [channel](/api/channel.md) |
| **public** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this is a public [channel/supergroup](/api/channel.md) |
| **megagroup** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether this is a [supergroup](/api/channel.md) |
| **request\_needed** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Whether the [join request »](/api/invites.md#join-requests) must be first approved by an administrator |
| **verified** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Is this chat or channel verified by Telegram? |
| **scam** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | This chat is probably a scam |
| **fake** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | If set, this chat was reported by many users as a fake or scam: be careful when interacting with it. |
| **can\_refulfill\_subscription** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | If set, indicates that the user has already paid for the associated [Telegram Star subscriptions »](/api/stars.md#star-subscriptions) and it hasn't expired yet, so they may re-join the channel using [messages.importChatInvite](/method/messages.importChatInvite.md) without repeating the payment. |
| **title** | [string](/type/string.md) | Chat/supergroup/channel title |
| **about** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[string](/type/string.md) | Description of the group of channel |
| **photo** | [Photo](/type/Photo.md) | Chat/supergroup/channel photo |
| **participants\_count** | [int](/type/int.md) | Participant count |
| **participants** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | A few of the participants that are in the group |
| **color** | [int](/type/int.md) | [Profile color palette ID](/api/colors.md) |
| **subscription\_pricing** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[StarsSubscriptionPricing](/type/StarsSubscriptionPricing.md) | For [Telegram Star subscriptions »](/api/stars.md#star-subscriptions), contains the pricing of the subscription the user must activate to join the private channel. |
| **subscription\_form\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[long](/type/long.md) | For [Telegram Star subscriptions »](/api/stars.md#star-subscriptions), the ID of the payment form for the subscription. |
| **bot\_verification** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[BotVerification](/type/BotVerification.md) | Describes a [bot verification icon »](/api/bots/verification.md). |

### Type
[ChatInvite](/type/ChatInvite.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [messages.importChatInvite](/method/messages.importChatInvite.md)
Import a chat invite and join a private chat/supergroup/channel

#### [Accent colors](/api/colors.md)
Telegram users and channels can change the accent color and background pattern of their profile page and their messages!

#### [Third-party verification](/api/bots/verification.md)
To further improve transparency on Telegram, official third-party services are able to assign extra verification icons to user accounts and chats — in order to prevent scams and reduce misinformation.