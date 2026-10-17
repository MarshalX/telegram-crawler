# businessBotRecipients

Specifies the private chats that a [connected business bot »](/api/bots/connected-business-bots.md) may receive messages and interact with.

```tl
businessBotRecipients#b88cf373 flags:# existing_chats:flags.0?true new_chats:flags.1?true contacts:flags.2?true non_contacts:flags.3?true exclude_selected:flags.5?true users:flags.4?Vector<long> exclude_users:flags.6?Vector<long> = BusinessBotRecipients;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **existing\_chats** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Selects all existing private chats. |
| **new\_chats** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Selects all new private chats. |
| **contacts** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Selects all private chats with contacts. |
| **non\_contacts** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Selects all private chats with non-contacts. |
| **exclude\_selected** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | If set, then all private chats *except* the ones selected by `existing_chats`, `new_chats`, `contacts`, `non_contacts` and `users` are chosen. \
Note that if this flag is set, any values passed in `exclude_users` will be merged and moved into `users` by the server, thus `exclude_users` will always be empty. |
| **users** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | Explicitly selected private chats. |
| **exclude\_users** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | Identifiers of private chats that are always excluded. |

### Type
[BusinessBotRecipients](/type/BusinessBotRecipients.md)

### Related pages

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.