# messages.getAttachMenuBot

Returns attachment menu entry for a [bot mini app that can be launched from the attachment menu »](/api/bots/attach.md)

```tl
attachMenuBotsBot#93bf667f bot:AttachMenuBot users:Vector<User> = AttachMenuBotsBot;
---functions---
messages.getAttachMenuBot#77216192 bot:InputUser = AttachMenuBotsBot;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot** | [InputUser](/type/InputUser.md) | Bot ID |

### Result
[AttachMenuBotsBot](/type/AttachMenuBotsBot.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |

### Related pages

#### [Bot attachment menu and side menu entries](/api/bots/attach.md)
Bots can install attachment menu and side menu entries, offering conveniently accessible, versatile web apps.