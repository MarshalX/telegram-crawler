# attachMenuBots

Represents a list of [bot mini apps that can be launched from the attachment menu »](/api/bots/attach.md)

```tl
attachMenuBots#3c4301c0 hash:long bots:Vector<AttachMenuBot> users:Vector<User> = AttachMenuBots;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |
| **bots** | [Vector](/type/Vector%20t)&lt;[AttachMenuBot](/type/AttachMenuBot.md)&gt; | List of [bot mini apps that can be launched from the attachment menu »](/api/bots/attach.md) |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Info about related users/bots |

### Type
[AttachMenuBots](/type/AttachMenuBots.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Bot attachment menu and side menu entries](/api/bots/attach.md)
Bots can install attachment menu and side menu entries, offering conveniently accessible, versatile web apps.