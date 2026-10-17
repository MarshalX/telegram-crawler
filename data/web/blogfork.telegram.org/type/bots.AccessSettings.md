# Bots.AccessSettings

Access restriction settings for a managed bot.

```tl
bots.accessSettings#dd1fbf93 flags:# restricted:flags.0?true add_users:flags.1?Vector<User> = bots.AccessSettings;

---functions---

bots.getAccessSettings#213853a3 bot:InputUser = bots.AccessSettings;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [bots.accessSettings](/constructor/bots.accessSettings.md) | Access restriction settings for a [managed bot »](/api/bots/managed-bots.md#managing-a-managed-bot). |

### Methods

| Method | Description |
| --- | --- |
| [bots.getAccessSettings](/method/bots.getAccessSettings.md) | Get the [access restriction settings »](/api/bots/managed-bots.md#managing-a-managed-bot) of a managed bot; can only be called by the manager bot. |