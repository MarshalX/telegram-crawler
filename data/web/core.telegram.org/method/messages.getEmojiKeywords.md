# messages.getEmojiKeywords

Get localized [emoji keywords »](/api/custom-emoji.md#emoji-keywords).

```tl
emojiKeywordsDifference#5cc761bd lang_code:string from_version:int version:int keywords:Vector<EmojiKeyword> = EmojiKeywordsDifference;
---functions---
messages.getEmojiKeywords#35a0e062 lang_code:string = EmojiKeywordsDifference;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **lang\_code** | [string](/type/string.md) | Language code |

### Result
[EmojiKeywordsDifference](/type/EmojiKeywordsDifference.md)

### Only users can use this method

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.