# inputStorePaymentPremiumSubscription

Info about a Telegram Premium purchase

```tl
inputStorePaymentPremiumSubscription#a6751e66 flags:# restore:flags.0?true upgrade:flags.1?true = InputStorePaymentPurpose;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **restore** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Pass true if this is a restore of a Telegram Premium purchase; only for the App Store |
| **upgrade** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Pass true if this is an upgrade from a monthly subscription to a yearly subscription; only for App Store |

### Type
[InputStorePaymentPurpose](/type/InputStorePaymentPurpose.md)