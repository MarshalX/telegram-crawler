# account.autoSaveSettings

Contains media autosave settings

```tl
account.autoSaveSettings#4c3e069d users_settings:AutoSaveSettings chats_settings:AutoSaveSettings broadcasts_settings:AutoSaveSettings exceptions:Vector<AutoSaveException> chats:Vector<Chat> users:Vector<User> = account.AutoSaveSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **users\_settings** | [AutoSaveSettings](/type/AutoSaveSettings.md) | Default media autosave settings for private chats |
| **chats\_settings** | [AutoSaveSettings](/type/AutoSaveSettings.md) | Default media autosave settings for [groups and supergroups](/api/channel.md) |
| **broadcasts\_settings** | [AutoSaveSettings](/type/AutoSaveSettings.md) | Default media autosave settings for [channels](/api/channel.md) |
| **exceptions** | [Vector](/type/Vector%20t)&lt;[AutoSaveException](/type/AutoSaveException.md)&gt; | Peer-specific granular autosave settings |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chats mentioned in the peer-specific granular autosave settings |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users mentioned in the peer-specific granular autosave settings |

### Type
[account.AutoSaveSettings](/type/account.AutoSaveSettings.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.