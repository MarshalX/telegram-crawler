# messages.clickSponsoredMessage

Informs the server that the user has interacted with a sponsored message in [one of the ways listed here »](/api/sponsored-messages.md#clicking-on-sponsored-messages).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.clickSponsoredMessage#8235057e flags:# media:flags.0?true fullscreen:flags.1?true random_id:bytes = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **media** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | The user clicked on the media |
| **fullscreen** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | The user expanded the video to full screen, and then clicked on it. |
| **random\_id** | [bytes](/type/bytes.md) | The ad's unique ID. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Sponsored messages](/api/sponsored-messages.md)
How clients should fetch, display and interact with sponsored messages.