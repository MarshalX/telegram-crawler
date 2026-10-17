# help.AppUpdate

Contains info on app update availability.

```tl
help.appUpdate#ccbbce30 flags:# can_not_skip:flags.0?true id:int version:string text:string entities:Vector<MessageEntity> document:flags.1?Document url:flags.2?string sticker:flags.3?Document = help.AppUpdate;
help.noAppUpdate#c45a6536 = help.AppUpdate;

---functions---

help.getAppUpdate#522d5a7d source:string = help.AppUpdate;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [help.appUpdate](/constructor/help.appUpdate.md) | An update is available for the application. |
| [help.noAppUpdate](/constructor/help.noAppUpdate.md) | No updates are available for the application. |

### Methods

| Method | Description |
| --- | --- |
| [help.getAppUpdate](/method/help.getAppUpdate.md) | Returns information on update availability for the current application. |