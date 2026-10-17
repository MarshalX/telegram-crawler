# missingInvitee

Info about why a specific user could not be [invited »](/api/invites.md#direct-invites).

```tl
missingInvitee#628c9224 flags:# premium_would_allow_invite:flags.0?true premium_required_for_pm:flags.1?true user_id:long = MissingInvitee;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **premium\_would\_allow\_invite** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, we could not add the user *only because* the current account needs to purchase a [Telegram Premium](/api/premium.md) subscription to complete the operation. |
| **premium\_required\_for\_pm** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, we could not add the user because of their privacy settings, and additionally, the current account needs to purchase a [Telegram Premium](/api/premium.md) subscription to directly share an invite link with the user via a private message. |
| **user\_id** | [long](/type/long.md) | ID of the user. If neither of the flags below are set, we could not add the user because of their privacy settings, and we can create and directly share an [invite link](/api/invites.md#invite-links) with them using a normal message, instead. |

### Type
[MissingInvitee](/type/MissingInvitee.md)

### Related pages

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.