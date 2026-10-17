# messages.getEmojiURL

Returns an HTTP URL which can be used to automatically log in into translation platform and suggest new [emoji keywords »](/api/custom-emoji.md#emoji-keywords). The URL will be valid for 30 seconds after generation.

```tl
emojiURL#a575739d url:string = EmojiURL;
---functions---
messages.getEmojiURL#d5b10c26 lang_code:string = EmojiURL;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **lang\_code** | [string](/type/string.md) | Language code for which the emoji keywords will be suggested |

### Result
[EmojiURL](/type/EmojiURL.md)

### Only users can use this method

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.