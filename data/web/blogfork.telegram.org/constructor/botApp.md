# botApp

Contains information about a [direct link Mini App](/api/bots/webapps.md#direct-link-mini-apps).

```tl
botApp#95fcd1d6 flags:# id:long access_hash:long short_name:string title:string description:string photo:Photo document:flags.0?Document hash:long = BotApp;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **id** | [long](/type/long.md) | bot mini app ID |
| **access\_hash** | [long](/type/long.md) | bot mini app access hash |
| **short\_name** | [string](/type/string.md) | bot mini app short name, used to generate [Direct Mini App deep links](/api/links.md#direct-mini-app-links). |
| **title** | [string](/type/string.md) | bot mini app title. |
| **description** | [string](/type/string.md) | bot mini app description. |
| **photo** | [Photo](/type/Photo.md) | bot mini app photo. |
| **document** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Document](/type/Document.md) | bot mini app animation. |
| **hash** | [long](/type/long.md) | Hash to pass to [messages.getBotApp](/method/messages.getBotApp.md), to avoid refetching bot app info if it hasn't changed. |

### Type
[BotApp](/type/BotApp.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [messages.getBotApp](/method/messages.getBotApp.md)
Obtain information about a [direct link Mini App](/api/bots/webapps.md#direct-link-mini-apps)

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.