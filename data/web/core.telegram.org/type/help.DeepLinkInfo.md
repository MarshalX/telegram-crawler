# Help.DeepLinkInfo

Contains information about an unsupported [deep link »](/api/links.md#unsupported-links)

```tl
help.deepLinkInfoEmpty#66afa166 = help.DeepLinkInfo;
help.deepLinkInfo#6a4ee832 flags:# update_app:flags.0?true message:string entities:flags.1?Vector<MessageEntity> = help.DeepLinkInfo;

---functions---

help.getDeepLinkInfo#3fedc75f path:string = help.DeepLinkInfo;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [help.deepLinkInfoEmpty](/constructor/help.deepLinkInfoEmpty.md) | Deep link info empty |
| [help.deepLinkInfo](/constructor/help.deepLinkInfo.md) | Deep link info, see [the here for more details](/api/links.md#unsupported-links) |

### Methods

| Method | Description |
| --- | --- |
| [help.getDeepLinkInfo](/method/help.getDeepLinkInfo.md) | Get info about an unsupported deep link, see [here for more info »](/api/links.md#unsupported-links). |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.