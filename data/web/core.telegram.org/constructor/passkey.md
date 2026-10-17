# passkey

Human-readable info about a passkey associated to an account, returned when [creating a passkey »](/api/passkeys.md#creating-a-passkey) or [listing passkeys »](/api/passkeys.md#list-passkeys).

```tl
passkey#98613ebf flags:# id:string name:string date:int software_emoji_id:flags.0?long last_usage_date:flags.1?int = Passkey;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **id** | [string](/type/string.md) | Unique passkey ID, usable for example in [account.deletePasskey](/method/account.deletePasskey.md). |
| **name** | [string](/type/string.md) | Human-readable passkey name |
| **date** | [int](/type/int.md) | Creation date of the passkey |
| **software\_emoji\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | ID of the [custom emoji](/api/custom-emoji.md) used as icon for the software or password manager that created the passkey |
| **last\_usage\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Date when the passkey was last used to log in |

### Type
[Passkey](/type/Passkey.md)

### Related pages

#### [account.deletePasskey](/method/account.deletePasskey.md)
Delete a passkey associated to the current account, see [here »](/api/passkeys.md#delete-passkeys) for more info.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.