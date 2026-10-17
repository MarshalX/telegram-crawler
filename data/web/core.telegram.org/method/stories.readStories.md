# stories.readStories

Mark all stories up to a certain ID as read, for a given peer; will emit an [updateReadStories](/constructor/updateReadStories.md) update to all logged-in sessions.

```tl
---functions---
stories.readStories#a556dac8 peer:InputPeer max_id:int = Vector<int>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer whose stories should be marked as read. |
| **max\_id** | [int](/type/int.md) | Mark all stories up to and including this ID as read |

### Result
[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt;

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | MAX\_ID\_INVALID | The provided max ID is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | STORIES\_NEVER\_CREATED | This peer hasn't ever posted any stories. |

### Related pages

#### [updateReadStories](/constructor/updateReadStories.md)
Stories of a specific peer were marked as read.