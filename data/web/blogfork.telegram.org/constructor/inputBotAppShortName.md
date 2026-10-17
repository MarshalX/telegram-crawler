# inputBotAppShortName

Used to fetch information about a [direct link Mini App](/api/bots/webapps.md#direct-link-mini-apps) by its short name

```tl
inputBotAppShortName#908c0407 bot_id:InputUser short_name:string = InputBotApp;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot\_id** | [InputUser](/type/InputUser.md) | ID of the bot that owns the bot mini app |
| **short\_name** | [string](/type/string.md) | Short name, obtained from a [Direct Mini App deep link](/api/links.md#direct-mini-app-links) |

### Type
[InputBotApp](/type/InputBotApp.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.