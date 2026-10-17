# InputChatTheme

Specifies a [chat theme »](/api/themes.md#chat-themes).

```tl
inputChatThemeEmpty#83268483 = InputChatTheme;
inputChatTheme#c93de95c emoticon:string = InputChatTheme;
inputChatThemeUniqueGift#87e5dfe4 slug:string = InputChatTheme;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputChatThemeEmpty](/constructor/inputChatThemeEmpty.md) | Remove any currently configured theme. |
| [inputChatTheme](/constructor/inputChatTheme.md) | Set an emoji-based chat theme, returned by [account.getChatThemes](/method/account.getChatThemes.md). |
| [inputChatThemeUniqueGift](/constructor/inputChatThemeUniqueGift.md) | Set a theme based on an owned or [hosted collectible gift »](/api/gifts.md#hosted-collectible-gifts), returned by [account.getUniqueGiftChatThemes](/method/account.getUniqueGiftChatThemes.md). |

### Related pages

#### [Telegram themes](/api/themes.md)
Telegram apps support generating, sharing and synchronizing app themes.