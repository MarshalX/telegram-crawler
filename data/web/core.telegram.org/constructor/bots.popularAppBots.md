# bots.popularAppBots

Popular [Main Mini Apps](/api/bots/webapps.md#main-mini-apps), to be used in the [apps tab of global search »](/api/search.md#apps-tab).

```tl
bots.popularAppBots#1991b13b flags:# next_offset:flags.0?string users:Vector<User> = bots.PopularAppBots;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Offset for [pagination](/api/offsets.md). |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | The bots associated to each [Main Mini App, see here »](/api/bots/webapps.md#main-mini-apps) for more info. |

### Type
[bots.PopularAppBots](/type/bots.PopularAppBots.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [Search and filters](/api/search.md)
Telegram allows applying detailed message filters while looking for messages in chats.