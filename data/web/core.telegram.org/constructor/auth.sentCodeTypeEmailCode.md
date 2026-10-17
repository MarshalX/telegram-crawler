# auth.sentCodeTypeEmailCode

The code was sent via the [previously configured login email »](/api/auth.md#email-verification)

```tl
auth.sentCodeTypeEmailCode#f450f59b flags:# apple_signin_allowed:flags.0?true google_signin_allowed:flags.1?true email_pattern:string length:int reset_available_period:flags.3?int reset_pending_date:flags.4?int = auth.SentCodeType;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **apple\_signin\_allowed** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether authorization through Apple ID is allowed |
| **google\_signin\_allowed** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether authorization through Google ID is allowed |
| **email\_pattern** | [string](/type/string.md) | [Pattern](/api/pattern.md) of the email |
| **length** | [int](/type/int.md) | Length of the sent verification code |
| **reset\_available\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | Clients should wait for the specified amount of seconds before allowing the user to invoke [auth.resetLoginEmail](/method/auth.resetLoginEmail.md) (will be 0 for [Premium](/api/premium.md) users). |
| **reset\_pending\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | An email reset was already requested, and will occur at the specified date. |

### Type
[auth.SentCodeType](/type/auth.SentCodeType.md)

### Related pages

#### [Pattern matching](/api/pattern.md)
Some methods require the client to verify if the data obtained from an external source matches a certain pattern.

#### [auth.resetLoginEmail](/method/auth.resetLoginEmail.md)
Reset the [login email »](/api/auth.md#email-verification).

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.