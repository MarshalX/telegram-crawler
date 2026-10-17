# account.ChatThemes

Available chat themes

```tl
account.chatThemesNotModified#e011e1c4 = account.ChatThemes;
account.chatThemes#be098173 flags:# hash:long themes:Vector<ChatTheme> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = account.ChatThemes;

---functions---

account.getUniqueGiftChatThemes#e42ce9c9 offset:string limit:int hash:long = account.ChatThemes;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [account.chatThemesNotModified](/constructor/account.chatThemesNotModified.md) | The available chat themes were not modified |
| [account.chatThemes](/constructor/account.chatThemes.md) | Available [chat themes](/api/themes.md#chat-themes) |

### Methods

| Method | Description |
| --- | --- |
| [account.getUniqueGiftChatThemes](/method/account.getUniqueGiftChatThemes.md) | Obtain all [chat themes »](/api/themes.md#chat-themes) associated to owned or [hosted collectible gifts »](/api/gifts.md#hosted-collectible-gifts). |