# BusinessBotRecipients

Specifies the private chats that a [connected business bot »](/api/bots/connected-business-bots.md) may receive messages and interact with.

```tl
businessBotRecipients#b88cf373 flags:# existing_chats:flags.0?true new_chats:flags.1?true contacts:flags.2?true non_contacts:flags.3?true exclude_selected:flags.5?true users:flags.4?Vector<long> exclude_users:flags.6?Vector<long> = BusinessBotRecipients;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [businessBotRecipients](/constructor/businessBotRecipients.md) | Specifies the private chats that a [connected business bot »](/api/bots/connected-business-bots.md) may receive messages and interact with. |

### Related pages

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.