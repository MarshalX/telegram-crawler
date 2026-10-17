# account.toggleNoPaidMessagesException

Allow a user to send us messages without paying if [paid messages »](/api/paid-messages.md) are enabled.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.toggleNoPaidMessagesException#fe2eda76 flags:# refund_charged:flags.0?true require_payment:flags.2?true parent_peer:flags.1?InputPeer user_id:InputUser = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **refund\_charged** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set and `require_payment` is not set, refunds the amounts the user has already paid us to send us messages (directly or via a monoforum). |
| **require\_payment** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | If set, requires the user to pay in order to send us messages. \
Can only be **set** by monoforums, not users, i.e. `parent_peer` must be set if this flag is set; users must instead use the [inputPrivacyKeyNoPaidMessages](/constructor/inputPrivacyKeyNoPaidMessages.md) privacy setting to remove a previously added exemption. \
If not set, allows the user to send us messages without paying (can be **unset** by both monoforums and users). |
| **parent\_peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputPeer](/type/InputPeer.md) | If set, applies the setting within the [monoforum aka direct messages »](/api/monoforum.md) (pass the ID of the monoforum, **not** the ID of the associated channel). |
| **user\_id** | [InputUser](/type/InputUser.md) | The user to exempt or unexempt. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PARENT\_PEER\_INVALID | The specified `parent_peer` is invalid. |
| 400 | UNSUPPORTED | `require_payment` cannot be *set* by users, only by monoforums: users must instead use the [inputPrivacyKeyNoPaidMessages](/constructor/inputPrivacyKeyNoPaidMessages.md) privacy setting to remove a previously added exemption. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [inputPrivacyKeyNoPaidMessages](/constructor/inputPrivacyKeyNoPaidMessages.md)
Who can send you messages without paying, if [paid messages »](/api/paid-messages.md) are enabled.

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.