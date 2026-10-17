# inputPrivacyKeyStatusTimestamp

Whether people will be able to see our exact last online timestamp.

Note that if *we* decide to hide our exact last online timestamp to someone (i.e., users A, B, C, or all users) **and** we do not have a [Premium](/api/premium.md) subscription, we won't be able to see the exact last online timestamp of those users (A, B, C, or all users), even if those users *do* share it with us.

If those users *do* share their exact online status with us, but we can't see it due to the reason mentioned above, the `by_me` flag of [userStatusRecently](/constructor/userStatusRecently.md), [userStatusLastWeek](/constructor/userStatusLastWeek.md), [userStatusLastMonth](/constructor/userStatusLastMonth.md) will be set.

```tl
inputPrivacyKeyStatusTimestamp#4f96cb18 = InputPrivacyKey;
```

### Parameters

This constructor does not require any parameters.

### Type
[InputPrivacyKey](/type/InputPrivacyKey.md)

### Related pages

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [userStatusRecently](/constructor/userStatusRecently.md)
Online status: last seen recently

#### [userStatusLastWeek](/constructor/userStatusLastWeek.md)
Online status: last seen last week

#### [userStatusLastMonth](/constructor/userStatusLastMonth.md)
Online status: last seen last month