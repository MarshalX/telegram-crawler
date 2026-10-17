# account.chatThemes

Available [chat themes](/api/themes.md#chat-themes)

```tl
account.chatThemes#be098173 flags:# hash:long themes:Vector<ChatTheme> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = account.ChatThemes;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **hash** | [long](/type/long.md) | Hash to pass to the method that returned this constructor, to avoid refetching the result if it hasn't changed. |
| **themes** | [Vector](/type/Vector%20t)&lt;[ChatTheme](/type/ChatTheme.md)&gt; | Themes. |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chats mentioned in the `themes` field. |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users mentioned in the `themes` field. |
| **next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Next offset for pagination. |

### Type
[account.ChatThemes](/type/account.ChatThemes.md)

### Related pages

#### [Telegram themes](/api/themes.md)
Telegram apps support generating, sharing and synchronizing app themes.