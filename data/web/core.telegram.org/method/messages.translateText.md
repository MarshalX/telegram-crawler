# messages.translateText

Translate a given text.

[Styled text entities](/api/entities.md) will only be preserved for [Telegram Premium](/api/premium.md) users.

```tl
messages.translateResult#33db32f8 result:Vector<TextWithEntities> = messages.TranslatedText;
---functions---
messages.translateText#a5eec345 flags:# peer:flags.0?InputPeer id:flags.0?Vector<int> text:flags.1?Vector<TextWithEntities> to_lang:string tone:flags.2?string = messages.TranslatedText;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputPeer](/type/InputPeer.md) | If the text is a chat message, the peer ID |
| **id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | A list of message IDs to translate |
| **text** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[TextWithEntities](/type/TextWithEntities.md)&gt; | A list of styled messages to translate |
| **to\_lang** | [string](/type/string.md) | Two-letter ISO 639-1 language code of the language to which the message is translated |
| **tone** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | If set, rephrases the translation using the specified [AI composer tone »](/api/ai.md#ai-compose-tones) (pass the tone identifier) |

### Result
[messages.TranslatedText](/type/messages.TranslatedText.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | INPUT\_TEXT\_EMPTY | The specified text is empty. |
| 400 | INPUT\_TEXT\_TOO\_LONG | The specified text is too long. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | TO\_LANG\_INVALID | The specified destination language is invalid. |
| 500 | TRANSLATE\_REQ\_FAILED | Translation failed, please try again later. |
| 400 | TRANSLATE\_REQ\_QUOTA\_EXCEEDED | Translation is currently unavailable due to a temporary server-side lack of resources. |
| 406 | TRANSLATIONS\_DISABLED | Translations are unavailable, a detailed and localized description for the error will be emitted via an [updateServiceNotification as specified here&nbsp;&raquo;](/api/errors.md#406-not-acceptable). |
| 500 | TRANSLATION\_TIMEOUT | A timeout occurred while translating the specified text. |

### Related pages

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Error handling ](/api/errors.md)
How to handle API return errors correctly.