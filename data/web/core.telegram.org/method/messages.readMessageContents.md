# messages.readMessageContents

Notifies the sender about the recipient having listened a voice message or watched a video, emitting an [updateReadMessagesContents](/constructor/updateReadMessagesContents.md).

```tl
messages.affectedMessages#84d19185 pts:int pts_count:int = messages.AffectedMessages;
---functions---
messages.readMessageContents#36a73f77 id:Vector<int> = messages.AffectedMessages;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | Message ID list |

### Result
[messages.AffectedMessages](/type/messages.AffectedMessages.md)

### Only users can use this method

### Related pages

#### [updateReadMessagesContents](/constructor/updateReadMessagesContents.md)
Contents of messages in the common [message box](/api/updates.md) were read (emitted specifically for messages like voice messages or video, only once the media is watched and marked as read using [messages.readMessageContents](/method/messages.readMessageContents.md)).