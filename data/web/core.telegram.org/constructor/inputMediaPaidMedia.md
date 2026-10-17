# inputMediaPaidMedia

[Paid media, see here »](/api/paid-media.md) for more info.

```tl
inputMediaPaidMedia#c4103386 flags:# stars_amount:long extended_media:Vector<InputMedia> payload:flags.0?string = InputMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **stars\_amount** | [long](/type/long.md) | The price of the media in [Telegram Stars](/api/stars.md). |
| **extended\_media** | [Vector](/type/Vector%20t)&lt;[InputMedia](/type/InputMedia.md)&gt; | Photos or videos. |
| **payload** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Bots only, specifies a custom payload that will then be passed in [updateBotPurchasedPaidMedia](/constructor/updateBotPurchasedPaidMedia.md) when a payment is made (this field will not be visible to the user) |

### Type
[InputMedia](/type/InputMedia.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [updateBotPurchasedPaidMedia](/constructor/updateBotPurchasedPaidMedia.md)
Bots only: a user has purchased a [paid media](/api/paid-media.md).

#### [Paid media](/api/paid-media.md)
Content creators can accept Stars by publishing paid photos or videos on their channels.  Subscribers will be allowed to view such posts only after paying the author to unlock them.