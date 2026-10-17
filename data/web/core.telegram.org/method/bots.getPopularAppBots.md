# bots.getPopularAppBots

Fetch popular [Main Mini Apps](/api/bots/webapps.md#main-mini-apps), to be used in the [apps tab of global search »](/api/search.md#apps-tab).

```tl
bots.popularAppBots#1991b13b flags:# next_offset:flags.0?string users:Vector<User> = bots.PopularAppBots;
---functions---
bots.getPopularAppBots#c2510192 offset:string limit:int = bots.PopularAppBots;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **offset** | [string](/type/string.md) | Offset for [pagination](/api/offsets.md), initially an empty string, then re-use the `next_offset` returned by the previous query. |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[bots.PopularAppBots](/type/bots.PopularAppBots.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [Search and filters](/api/search.md)
Telegram allows applying detailed message filters while looking for messages in chats.