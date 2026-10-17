# keyboardButtonSwitchInline

Button to switch the user to inline mode

Available only in [inline keyboards](/constructor/replyInlineMarkup.md).

When pressed, clients must insert the bot's username and `query` into the chat input field, triggering an [inline query](/api/bots/inline.md).

If `same_peer` is set, clients use the current chat. Otherwise, clients prompt the user to select a chat, filtered by `peer_types` if specified.

```tl
keyboardButtonSwitchInline#991399fc flags:# same_peer:flags.0?true style:flags.10?KeyboardButtonStyle text:string query:string peer_types:flags.1?Vector<InlineQueryPeerType> = KeyboardButton;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **same\_peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, pressing the button will insert the bot's username and the specified inline `query` in the current chat's input field. |
| **style** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[KeyboardButtonStyle](/type/KeyboardButtonStyle.md) | Button style, see [here »](/api/bots/buttons.md#button-styles) for more info on button styles. |
| **text** | [string](/type/string.md) | Button label |
| **query** | [string](/type/string.md) | The inline query to use |
| **peer\_types** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[InlineQueryPeerType](/type/InlineQueryPeerType.md)&gt; | Filter to use when selecting chats. |

### Type
[KeyboardButton](/type/KeyboardButton.md)

### Related pages

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.

#### [replyInlineMarkup](/constructor/replyInlineMarkup.md)
Represents an inline keyboard

#### [Inline queries](/api/bots/inline.md)
Users can interact with your bot via inline queries, straight from the text input field in any chat.