# payments.getStarsRevenueWithdrawalUrl

Withdraw funds from a channel or bot's [star balance »](/api/stars.md#withdrawing-revenue).

```tl
payments.starsRevenueWithdrawalUrl#1dab80b7 url:string = payments.StarsRevenueWithdrawalUrl;
---functions---
payments.getStarsRevenueWithdrawalUrl#2433dc92 flags:# ton:flags.0?true peer:InputPeer amount:flags.1?long password:InputCheckPasswordSRP = payments.StarsRevenueWithdrawalUrl;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **ton** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, withdraws channel/ad revenue in TON. |
| **peer** | [InputPeer](/type/InputPeer.md) | Channel or bot from which to withdraw funds. |
| **amount** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[long](/type/long.md) | The amount of stars or nanograms to withdraw. |
| **password** | [InputCheckPasswordSRP](/type/InputCheckPasswordSRP.md) | 2FA password, see [here »](/api/srp.md#using-the-2fa-password) for more info. |

### Result
[payments.StarsRevenueWithdrawalUrl](/type/payments.StarsRevenueWithdrawalUrl.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PASSWORD\_HASH\_INVALID | The provided password hash is invalid. |
| 400 | PASSWORD\_MISSING | You must [enable 2FA](/api/srp.md) before executing this operation. |
| 400 | PASSWORD\_TOO\_FRESH\_%d | The password was modified less than 24 hours ago, try again in %d seconds. |
| 400 | SESSION\_TOO\_FRESH\_%d | This session was created less than 24 hours ago, try again in %d seconds. |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.