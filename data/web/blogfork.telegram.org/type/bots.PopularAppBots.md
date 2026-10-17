# bots.PopularAppBots

Popular [Main Mini Apps](/api/bots/webapps.md#main-mini-apps), to be used in the [apps tab of global search »](/api/search.md#apps-tab).

```tl
bots.popularAppBots#1991b13b flags:# next_offset:flags.0?string users:Vector<User> = bots.PopularAppBots;

---functions---

bots.getPopularAppBots#c2510192 offset:string limit:int = bots.PopularAppBots;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [bots.popularAppBots](/constructor/bots.popularAppBots.md) | Popular [Main Mini Apps](/api/bots/webapps.md#main-mini-apps), to be used in the [apps tab of global search »](/api/search.md#apps-tab). |

### Methods

| Method | Description |
| --- | --- |
| [bots.getPopularAppBots](/method/bots.getPopularAppBots.md) | Fetch popular [Main Mini Apps](/api/bots/webapps.md#main-mini-apps), to be used in the [apps tab of global search »](/api/search.md#apps-tab). |

### Related pages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [Search and filters](/api/search.md)
Telegram allows applying detailed message filters while looking for messages in chats.