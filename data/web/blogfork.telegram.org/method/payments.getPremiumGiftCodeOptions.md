# payments.getPremiumGiftCodeOptions

Obtain a list of Telegram Premium [giveaway/gift code »](/api/giveaways.md) options.

```tl
---functions---
payments.getPremiumGiftCodeOptions#2757ba54 flags:# boost_peer:flags.0?InputPeer = Vector<PremiumGiftCodeOption>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **boost\_peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputPeer](/type/InputPeer.md) | The channel that will start the giveaway |

### Result
[Vector](/type/Vector%20t)&lt;[PremiumGiftCodeOption](/type/PremiumGiftCodeOption.md)&gt;

### Only users can use this method

### Related pages

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.