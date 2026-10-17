# help.getDeepLinkInfo

Get info about an unsupported deep link, see [here for more info »](/api/links.md#unsupported-links).

```tl
help.deepLinkInfoEmpty#66afa166 = help.DeepLinkInfo;
help.deepLinkInfo#6a4ee832 flags:# update_app:flags.0?true message:string entities:flags.1?Vector<MessageEntity> = help.DeepLinkInfo;
---functions---
help.getDeepLinkInfo#3fedc75f path:string = help.DeepLinkInfo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **path** | [string](/type/string.md) | Path component of a `tg:` link |

### Result
[help.DeepLinkInfo](/type/help.DeepLinkInfo.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.