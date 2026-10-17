# updateStoryID

A story was successfully uploaded.

Once a story is successfully uploaded, an [updateStoryID](/constructor/updateStoryID.md) will be returned, indicating the story ID (`id`) that was attributed to the story (like for messages, `random_id` indicates the `random_id` that was passed to [stories.sendStory](/method/stories.sendStory.md): this way, you can tell which story was assigned a specific `id` by checking which [stories.sendStory](/method/stories.sendStory.md) call has the returned `random_id`).

```tl
updateStoryID#1bf335b9 id:int random_id:long = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [int](/type/int.md) | The `id` that was attributed to the story. |
| **random\_id** | [long](/type/long.md) | The `random_id` that was passed to [stories.sendStory](/method/stories.sendStory.md). See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |

### Type
[Update](/type/Update.md)

### Related pages

#### [stories.sendStory](/method/stories.sendStory.md)
Uploads a [Telegram Story](/api/stories.md).

May also be used in a [business connection](/api/bots/connected-business-bots.md), *not* by wrapping the query in [invokeWithBusinessConnection »](/method/invokeWithBusinessConnection.md), but rather by specifying the ID of a controlled business user in `peer`.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [updateStoryID](/constructor/updateStoryID.md)
A story was successfully uploaded.

Once a story is successfully uploaded, an [updateStoryID](/constructor/updateStoryID.md) will be returned, indicating the story ID (`id`) that was attributed to the story (like for messages, `random_id` indicates the `random_id` that was passed to [stories.sendStory](/method/stories.sendStory.md): this way, you can tell which story was assigned a specific `id` by checking which [stories.sendStory](/method/stories.sendStory.md) call has the returned `random_id`).