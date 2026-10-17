# inputGroupCallSlug

Identify a [conference call »](/api/group-calls.md#conference-calls) using the slug from its invitation link.

This constructor can only be used for conference calls. It cannot be used for video chats/livestreams, live stories or any other group call type.

```tl
inputGroupCallSlug#fe06823f slug:string = InputGroupCall;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **slug** | [string](/type/string.md) | Slug from the [conference link »](/api/links.md#conference-links). |

### Type
[InputGroupCall](/type/InputGroupCall.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.