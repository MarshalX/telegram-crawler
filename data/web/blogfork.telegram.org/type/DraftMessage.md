# DraftMessage

Represents a message [draft](/api/drafts.md).

```tl
draftMessageEmpty#1b0c841a flags:# date:flags.0?int = DraftMessage;
draftMessage#96eaa5eb flags:# no_webpage:flags.1?true invert_media:flags.6?true reply_to:flags.4?InputReplyTo message:string entities:flags.3?Vector<MessageEntity> media:flags.5?InputMedia date:int effect:flags.7?long suggested_post:flags.8?SuggestedPost = DraftMessage;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [draftMessageEmpty](/constructor/draftMessageEmpty.md) | Empty draft |
| [draftMessage](/constructor/draftMessage.md) | Represents a message [draft](/api/drafts.md). |

### Related pages

#### [Message drafts](/api/drafts.md)
How to handle message drafts