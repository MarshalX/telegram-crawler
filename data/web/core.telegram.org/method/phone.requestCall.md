# phone.requestCall

Start a telegram phone call, see [here »](/api/calls.md#one-to-one-calls) for more info on the full flow.

```tl
phone.phoneCall#ec82e140 phone_call:PhoneCall users:Vector<User> = phone.PhoneCall;
---functions---
phone.requestCall#42ff96ed flags:# video:flags.0?true user_id:InputUser random_id:int g_a_hash:bytes protocol:PhoneCallProtocol = phone.PhoneCall;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **video** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to start a video call |
| **user\_id** | [InputUser](/type/InputUser.md) | Destination of the phone call |
| **random\_id** | [int](/type/int.md) | Random ID to avoid resending the same object. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **g\_a\_hash** | [bytes](/type/bytes.md) | [Parameter for E2E encryption key exchange »](/api/end-to-end/voice-calls.md) |
| **protocol** | [PhoneCallProtocol](/type/PhoneCallProtocol.md) | Phone call settings |

### Result
[phone.PhoneCall](/type/phone.PhoneCall.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CALL\_PROTOCOL\_FLAGS\_INVALID | Call protocol flags invalid. |
| 400 | CALL\_PROTOCOL\_LAYER\_INVALID | The specified protocol layer version range is invalid. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | PARTICIPANT\_VERSION\_OUTDATED | The other participant does not use an up to date telegram client with support for calls. |
| 500 | RANDOM\_ID\_DUPLICATE | You provided a random ID that was already used. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |
| 403 | USER\_IS\_BLOCKED | You were blocked by this user. |
| 403 | USER\_PRIVACY\_RESTRICTED | The user's privacy settings do not allow you to do this. |

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [End-to-End Encrypted Voice Calls](/api/end-to-end/voice-calls.md)
Deprecated description of encryption in voice calls as implemented in Telegram apps older than version 7.0.

#### [Phone calls](/api/calls.md)
Telegram supports end-to-end-encrypted one-to-one voice and video calls.