# payments.changeStarsSubscription

Activate or deactivate a [Telegram Star subscription »](/api/invites.md#paid-invite-links).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
payments.changeStarsSubscription#c7770878 flags:# peer:InputPeer subscription_id:string canceled:flags.0?Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | Always pass [inputPeerSelf](/constructor/inputPeerSelf.md). |
| **subscription\_id** | [string](/type/string.md) | ID of the subscription. |
| **canceled** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Bool](/type/Bool.md) | Whether to cancel or reactivate the subscription. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [inputPeerSelf](/constructor/inputPeerSelf.md)
Defines the current user.

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.