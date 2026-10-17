# messages.getEmojiKeywordsLanguages

Obtain a list of related languages that must be used when fetching [emoji keyword lists »](/api/custom-emoji.md#emoji-keywords).

Usually the method will return the passed language codes (if localized) + `en` + some language codes for similar languages (if applicable).

```tl
---functions---
messages.getEmojiKeywordsLanguages#4e9963b2 lang_codes:Vector<string> = Vector<EmojiLanguage>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **lang\_codes** | [Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | The user's language codes |

### Result
[Vector](/type/Vector%20t)&lt;[EmojiLanguage](/type/EmojiLanguage.md)&gt;

### Only users can use this method

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.