# AttachMenuBots

Represents a list of [bot mini apps that can be launched from the attachment menu »](/bots/webapps.md#launching-mini-apps-from-the-attachment-menu)

```tl
attachMenuBotsNotModified#f1d88a5c = AttachMenuBots;
attachMenuBots#3c4301c0 hash:long bots:Vector<AttachMenuBot> users:Vector<User> = AttachMenuBots;

---functions---

messages.getAttachMenuBots#16fcc2cb hash:long = AttachMenuBots;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [attachMenuBotsNotModified](/constructor/attachMenuBotsNotModified.md) | The list of bot mini apps hasn't changed |
| [attachMenuBots](/constructor/attachMenuBots.md) | Represents a list of [bot mini apps that can be launched from the attachment menu »](/api/bots/attach.md) |

### Methods

| Method | Description |
| --- | --- |
| [messages.getAttachMenuBots](/method/messages.getAttachMenuBots.md) | Returns installed attachment menu [bot mini apps »](/api/bots/attach.md) |

### Related pages

#### [Telegram Mini Apps](/bots/webapps.md)