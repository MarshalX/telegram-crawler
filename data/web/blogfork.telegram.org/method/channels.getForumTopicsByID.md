# channels.getForumTopicsByID

Get forum topics by their ID

No such method in the current schema.

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | Forum |
| **topics** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | Topic IDs |

### Result
[messages.ForumTopics](/type/messages.ForumTopics.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_FORUM\_MISSING | This supergroup is not a forum. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | TOPICS\_EMPTY | You specified no topic IDs. |