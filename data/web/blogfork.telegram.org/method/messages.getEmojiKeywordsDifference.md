# messages.getEmojiKeywordsDifference

Get changed [emoji keywords »](/api/custom-emoji.md#emoji-keywords).

```tl
emojiKeywordsDifference#5cc761bd lang_code:string from_version:int version:int keywords:Vector<EmojiKeyword> = EmojiKeywordsDifference;
---functions---
messages.getEmojiKeywordsDifference#1508b6af lang_code:string from_version:int = EmojiKeywordsDifference;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **lang\_code** | [string](/type/string.md) | Language code |
| **from\_version** | [int](/type/int.md) | Previous stored emoji keyword list `version` |

### Result
[EmojiKeywordsDifference](/type/EmojiKeywordsDifference.md)

### Only users can use this method

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.