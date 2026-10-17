# channels.setDiscussionGroup

Associate a group to a channel as [discussion group](/api/discussion.md) for that channel

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
channels.setDiscussionGroup#40582bb2 broadcast:InputChannel group:InputChannel = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **broadcast** | [InputChannel](/type/InputChannel.md) | Channel |
| **group** | [InputChannel](/type/InputChannel.md) | [Discussion group](/api/discussion.md) to associate to the channel |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BROADCAST\_ID\_INVALID | Broadcast ID invalid. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | LINK\_NOT\_MODIFIED | Discussion link not modified. |
| 400 | MEGAGROUP\_ID\_INVALID | Invalid supergroup ID. |
| 400 | MEGAGROUP\_PREHISTORY\_HIDDEN | Group with hidden history for new members can't be set as discussion groups. |

### Related pages

#### [Discussion groups](/api/discussion.md)
Groups can be associated to a channel as a discussion group, to allow users to discuss about posts.