# userStatusLastMonth

Online status: last seen last month

```tl
userStatusLastMonth#65899777 flags:# by_me:flags.0?true = UserStatus;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **by\_me** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, the exact user status of this user is actually available to us, but to view it we must first purchase a [Premium](/api/premium.md) subscription, or allow this user to see *our* exact last online status. See [here »](/constructor/privacyKeyStatusTimestamp.md) for more info. |

### Type
[UserStatus](/type/UserStatus.md)

### Related pages

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [privacyKeyStatusTimestamp](/constructor/privacyKeyStatusTimestamp.md)
Whether we can see the last online timestamp of this user.

Note that if *we* decide to hide our exact last online timestamp to someone (i.e., users A, B, C, or all users) **and** we do not have a [Premium](/api/premium.md) subscription, we won't be able to see the exact last online timestamp of those users (A, B, C, or all users), even if those users *do* share it with us.

If those users *do* share their exact online status with us, but we can't see it due to the reason mentioned above, the `by_me` flag of [userStatusRecently](/constructor/userStatusRecently.md), [userStatusLastWeek](/constructor/userStatusLastWeek.md), [userStatusLastMonth](/constructor/userStatusLastMonth.md) will be set.