# BotCommandScope

Represents a scope where the bot commands, specified using [bots.setBotCommands](/method/bots.setBotCommands.md) will be valid.

```tl
botCommandScopeDefault#2f6cb2ab = BotCommandScope;
botCommandScopeUsers#3c4f04d8 = BotCommandScope;
botCommandScopeChats#6fe1a881 = BotCommandScope;
botCommandScopeChatAdmins#b9aa606a = BotCommandScope;
botCommandScopePeer#db9d897d peer:InputPeer = BotCommandScope;
botCommandScopePeerAdmins#3fd863d1 peer:InputPeer = BotCommandScope;
botCommandScopePeerUser#a1321f3 peer:InputPeer user_id:InputUser = BotCommandScope;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [botCommandScopeDefault](/constructor/botCommandScopeDefault.md) | The commands will be valid in all dialogs |
| [botCommandScopeUsers](/constructor/botCommandScopeUsers.md) | The specified bot commands will only be valid in all private chats with users. |
| [botCommandScopeChats](/constructor/botCommandScopeChats.md) | The specified bot commands will be valid in all [groups and supergroups](/api/channel.md). |
| [botCommandScopeChatAdmins](/constructor/botCommandScopeChatAdmins.md) | The specified bot commands will be valid only for chat administrators, in all [groups and supergroups](/api/channel.md). |
| [botCommandScopePeer](/constructor/botCommandScopePeer.md) | The specified bot commands will be valid only in a specific dialog. |
| [botCommandScopePeerAdmins](/constructor/botCommandScopePeerAdmins.md) | The specified bot commands will be valid for all admins of the specified [group or supergroup](/api/channel.md). |
| [botCommandScopePeerUser](/constructor/botCommandScopePeerUser.md) | The specified bot commands will be valid only for a specific user in the specified [group or supergroup](/api/channel.md). |

### Related pages

#### [bots.setBotCommands](/method/bots.setBotCommands.md)
Set bot command list