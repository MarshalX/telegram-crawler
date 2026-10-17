# bots.editAccessSettings

Edit the [access restriction settings »](/api/bots/managed-bots.md#managing-a-managed-bot) of a managed bot; can only be called by the manager bot.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
bots.editAccessSettings#31813cd8 flags:# restricted:flags.0?true bot:InputUser add_users:flags.1?Vector<InputUser> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **restricted** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, restricts access to the managed bot to only the owner and the users in `add_users` |
| **bot** | [InputUser](/type/InputUser.md) | The managed bot whose access settings to edit |
| **add\_users** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[InputUser](/type/InputUser.md)&gt; | Additional users (max 10, excluding the owner) allowed to access the managed bot when `restricted` is set |

### Result
[Bool](/type/Bool.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |

### Related pages

#### [Managed bots](/api/bots/managed-bots.md)
Users can create **managed** bots (which are controlled by a specific manager bot) directly through the MTProto API, without interacting with [@BotFather](https://t.me/botfather).