# inputBotAppID

Used to fetch information about a [direct link Mini App](/api/bots/webapps.md#direct-link-mini-apps) by its ID

```tl
inputBotAppID#a920bd7a id:long access_hash:long = InputBotApp;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | [direct link Mini App](/api/bots/webapps.md#direct-link-mini-apps) ID. |
| **access\_hash** | [long](/type/long.md) | Access hash, obtained from the [botApp](/constructor/botApp.md) constructor. |

### Type
[InputBotApp](/type/InputBotApp.md)

### Related pages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [botApp](/constructor/botApp.md)
Contains information about a [direct link Mini App](/api/bots/webapps.md#direct-link-mini-apps).