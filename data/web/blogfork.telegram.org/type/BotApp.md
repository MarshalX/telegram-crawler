# BotApp

Contains information about a [direct link Mini App](/api/bots/webapps.md#direct-link-mini-apps).

```tl
botAppNotModified#5da674b7 = BotApp;
botApp#95fcd1d6 flags:# id:long access_hash:long short_name:string title:string description:string photo:Photo document:flags.0?Document hash:long = BotApp;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [botAppNotModified](/constructor/botAppNotModified.md) | Bot app info hasn't changed. |
| [botApp](/constructor/botApp.md) | Contains information about a [direct link Mini App](/api/bots/webapps.md#direct-link-mini-apps). |

### Related pages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.