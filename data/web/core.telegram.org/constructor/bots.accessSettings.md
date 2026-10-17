# bots.accessSettings

Access restriction settings for a [managed bot »](/api/bots/managed-bots.md#managing-a-managed-bot).

```tl
bots.accessSettings#dd1fbf93 flags:# restricted:flags.0?true add_users:flags.1?Vector<User> = bots.AccessSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **restricted** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, only the owner and the users in `add_users` can access the managed bot |
| **add\_users** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Additional users (max 10, excluding the owner) who can access the managed bot; only present when `restricted` is set |

### Type
[bots.AccessSettings](/type/bots.AccessSettings.md)

### Related pages

#### [Managed bots](/api/bots/managed-bots.md)
Users can create **managed** bots (which are controlled by a specific manager bot) directly through the MTProto API, without interacting with [@BotFather](https://t.me/botfather).