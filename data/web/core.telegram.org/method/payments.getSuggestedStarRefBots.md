# payments.getSuggestedStarRefBots

Obtain a list of suggested [mini apps](/api/bots/webapps.md) with available [affiliate programs](/api/bots/referrals.md)

`order_by_revenue` and `order_by_date` are mutually exclusive: if neither is set, results are sorted by profitability.

```tl
payments.suggestedStarRefBots#b4d5d859 flags:# count:int suggested_bots:Vector<StarRefProgram> users:Vector<User> next_offset:flags.0?string = payments.SuggestedStarRefBots;
---functions---
payments.getSuggestedStarRefBots#d6b48f7 flags:# order_by_revenue:flags.0?true order_by_date:flags.1?true peer:InputPeer offset:string limit:int = payments.SuggestedStarRefBots;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **order\_by\_revenue** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, orders results by the expected revenue |
| **order\_by\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, orders results by the creation date of the affiliate program |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer that will become the affiliate: star commissions will be transferred to this peer's star balance. |
| **offset** | [string](/type/string.md) | Offset for pagination, taken from [payments.suggestedStarRefBots](/constructor/payments.suggestedStarRefBots.md).`next_offset`, initially empty. |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[payments.SuggestedStarRefBots](/type/payments.SuggestedStarRefBots.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [payments.suggestedStarRefBots](/constructor/payments.suggestedStarRefBots.md)
A list of suggested [mini apps](/api/bots/webapps.md) with available [affiliate programs](/api/bots/referrals.md)

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [Affiliate programs](/api/bots/referrals.md)
Developers can open affiliate programs for their mini app – allowing content creators, other mini app developers and any Telegram user to promote it and earn commissions on purchases made by people they referred.