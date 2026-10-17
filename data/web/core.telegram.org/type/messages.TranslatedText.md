# messages.TranslatedText

Translated text with [entities](/api/entities.md).

```tl
messages.translateResult#33db32f8 result:Vector<TextWithEntities> = messages.TranslatedText;

---functions---

messages.translateText#a5eec345 flags:# peer:flags.0?InputPeer id:flags.0?Vector<int> text:flags.1?Vector<TextWithEntities> to_lang:string tone:flags.2?string = messages.TranslatedText;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.translateResult](/constructor/messages.translateResult.md) | Translated text with [entities](/api/entities.md) |

### Methods

| Method | Description |
| --- | --- |
| [messages.translateText](/method/messages.translateText.md) | Translate a given text.\
\
[Styled text entities](/api/entities.md) will only be preserved for [Telegram Premium](/api/premium.md) users. |

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities