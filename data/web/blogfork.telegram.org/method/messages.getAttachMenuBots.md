# messages.getAttachMenuBots

Returns installed attachment menu [bot mini apps »](/api/bots/attach.md)

```tl
attachMenuBotsNotModified#f1d88a5c = AttachMenuBots;
attachMenuBots#3c4301c0 hash:long bots:Vector<AttachMenuBot> users:Vector<User> = AttachMenuBots;
---functions---
messages.getAttachMenuBots#16fcc2cb hash:long = AttachMenuBots;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). |

### Result
[AttachMenuBots](/type/AttachMenuBots.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Bot attachment menu and side menu entries](/api/bots/attach.md)
Bots can install attachment menu and side menu entries, offering conveniently accessible, versatile web apps.