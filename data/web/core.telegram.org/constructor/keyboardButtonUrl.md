# keyboardButtonUrl

URL button

Available only in [inline keyboards](/constructor/replyInlineMarkup.md).

When pressed, clients open `url`, showing a confirmation prompt unless the URL is one of the [internal URIs](https://github.com/DrKLO/Telegram/blob/68d51749c4fcbaffa584829f23936565df55e08b/TMessagesProj/src/main/java/org/telegram/messenger/browser/Browser.java#L680).

```tl
keyboardButtonUrl#d80c25ec flags:# style:flags.10?KeyboardButtonStyle text:string url:string = KeyboardButton;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **style** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[KeyboardButtonStyle](/type/KeyboardButtonStyle.md) | Button style, see [here »](/api/bots/buttons.md#button-styles) for more info on button styles. |
| **text** | [string](/type/string.md) | Button label |
| **url** | [string](/type/string.md) | URL |

### Type
[KeyboardButton](/type/KeyboardButton.md)

### Related pages

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.

#### [replyInlineMarkup](/constructor/replyInlineMarkup.md)
Represents an inline keyboard