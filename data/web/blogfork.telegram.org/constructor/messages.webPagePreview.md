# messages.webPagePreview

Represents a webpage preview.

```tl
messages.webPagePreview#8c9a88ac media:MessageMedia chats:Vector<Chat> users:Vector<User> = messages.WebPagePreview;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **media** | [MessageMedia](/type/MessageMedia.md) | The [messageMediaWebPage](/constructor/messageMediaWebPage.md) or a [messageMediaEmpty](/constructor/messageMediaEmpty.md) if there is no preview. |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chats mentioned in the `gift` field. |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users mentioned within the `media` object. |

### Type
[messages.WebPagePreview](/type/messages.WebPagePreview.md)

### Related pages

#### [messageMediaWebPage](/constructor/messageMediaWebPage.md)
Preview of webpage

#### [messageMediaEmpty](/constructor/messageMediaEmpty.md)
Empty constructor.