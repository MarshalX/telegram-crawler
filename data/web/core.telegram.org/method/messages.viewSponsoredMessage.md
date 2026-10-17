# messages.viewSponsoredMessage

Mark a specific [sponsored message »](/api/sponsored-messages.md) as read

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.viewSponsoredMessage#269e3643 random_id:bytes = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **random\_id** | [bytes](/type/bytes.md) | The ad's unique ID. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Sponsored messages](/api/sponsored-messages.md)
How clients should fetch, display and interact with sponsored messages.