# bots.setCustomVerification

Verify a user or chat [on behalf of an organization »](/api/bots/verification.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
bots.setCustomVerification#8b89dfbd flags:# enabled:flags.1?true bot:flags.0?InputUser peer:InputPeer custom_description:flags.2?string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **enabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, adds the verification; otherwise removes verification. |
| **bot** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputUser](/type/InputUser.md) | Must **not** be set if invoked by a bot, **must** be set to the ID of an owned bot if invoked by a user. |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer to verify |
| **custom\_description** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Custom description for the verification, the UTF-8 length limit for this field is contained in [bot\_verification\_description\_length\_limit »](/api/config.md#bot-verification-description-length-limit). \
If not set, `Was verified by organization "organization_name"` will be used as description. |

### Result
[Bool](/type/Bool.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 403 | BOT\_VERIFIER\_FORBIDDEN | This bot cannot assign [verification icons](/api/bots/verification.md). |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Third-party verification](/api/bots/verification.md)
To further improve transparency on Telegram, official third-party services are able to assign extra verification icons to user accounts and chats — in order to prevent scams and reduce misinformation.