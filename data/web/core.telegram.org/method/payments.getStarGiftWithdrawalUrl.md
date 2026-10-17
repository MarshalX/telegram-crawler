# payments.getStarGiftWithdrawalUrl

Convert a [collectible gift »](/api/gifts.md) to an NFT on the TON blockchain.

```tl
payments.starGiftWithdrawalUrl#84aa3a9c url:string = payments.StarGiftWithdrawalUrl;
---functions---
payments.getStarGiftWithdrawalUrl#d06e93a8 stargift:InputSavedStarGift password:InputCheckPasswordSRP = payments.StarGiftWithdrawalUrl;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **stargift** | [InputSavedStarGift](/type/InputSavedStarGift.md) | The collectible gift to export. |
| **password** | [InputCheckPasswordSRP](/type/InputCheckPasswordSRP.md) | The current user's 2FA password, passed as [specified here »](/api/srp.md). |

### Result
[payments.StarGiftWithdrawalUrl](/type/payments.StarGiftWithdrawalUrl.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PASSWORD\_HASH\_INVALID | The provided password hash is invalid. |
| 400 | PASSWORD\_TOO\_FRESH\_%d | The password was modified less than 24 hours ago, try again in %d seconds. |
| 400 | SESSION\_TOO\_FRESH\_%d | This session was created less than 24 hours ago, try again in %d seconds. |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.