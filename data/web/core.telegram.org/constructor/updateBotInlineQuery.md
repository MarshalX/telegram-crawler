# updateBotInlineQuery

An incoming inline query

```tl
updateBotInlineQuery#496f379c flags:# query_id:long user_id:long query:string geo:flags.0?GeoPoint peer_type:flags.1?InlineQueryPeerType offset:string = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **query\_id** | [long](/type/long.md) | Query ID |
| **user\_id** | [long](/type/long.md) | User that sent the query |
| **query** | [string](/type/string.md) | Text of query |
| **geo** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[GeoPoint](/type/GeoPoint.md) | Attached geolocation |
| **peer\_type** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InlineQueryPeerType](/type/InlineQueryPeerType.md) | Type of the chat from which the inline query was sent. |
| **offset** | [string](/type/string.md) | Offset to navigate through results |

### Type
[Update](/type/Update.md)