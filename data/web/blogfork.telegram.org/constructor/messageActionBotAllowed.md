# messageActionBotAllowed

We have given the bot permission to send us direct messages.

The optional fields specify how did we authorize the bot to send us messages.

```tl
messageActionBotAllowed#c516d679 flags:# attach_menu:flags.1?true from_request:flags.3?true domain:flags.0?string app:flags.2?BotApp = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **attach\_menu** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | We have authorized the bot to send us messages by installing the bot's [attachment menu](/api/bots/attach.md). |
| **from\_request** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | We have allowed the bot to send us messages using [bots.allowSendMessage »](/method/bots.allowSendMessage.md). |
| **domain** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | We have authorized the bot to send us messages by logging into a website via [Telegram Login »](/widgets/login.md); this field contains the domain name of the website on which the user has logged in. |
| **app** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[BotApp](/type/BotApp.md) | We have authorized the bot to send us messages by opening the specified [bot mini app](/api/bots/webapps.md). |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Bot attachment menu and side menu entries](/api/bots/attach.md)
Bots can install attachment menu and side menu entries, offering conveniently accessible, versatile web apps.

#### [bots.allowSendMessage](/method/bots.allowSendMessage.md)
Allow the specified bot to send us messages

#### [Telegram Login Widget](/widgets/login.md)

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.