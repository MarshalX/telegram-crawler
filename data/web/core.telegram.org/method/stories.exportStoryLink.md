# stories.exportStoryLink

Generate a [story deep link](/api/links.md#story-links) for a specific story

```tl
exportedStoryLink#3fc9053b link:string = ExportedStoryLink;
---functions---
stories.exportStoryLink#7b8def20 peer:InputPeer id:int = ExportedStoryLink;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where the story was posted |
| **id** | [int](/type/int.md) | Story ID |

### Result
[ExportedStoryLink](/type/ExportedStoryLink.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | STORY\_ID\_EMPTY | You specified no story IDs. |
| 400 | USER\_PUBLIC\_MISSING | Cannot generate a link to stories posted by a peer without a username. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.