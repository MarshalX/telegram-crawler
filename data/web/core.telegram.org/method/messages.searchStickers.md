# messages.searchStickers

Search for stickers using AI-powered keyword search

```tl
messages.foundStickersNotModified#6010c534 flags:# next_offset:flags.0?int = messages.FoundStickers;
messages.foundStickers#82c9e290 flags:# next_offset:flags.0?int hash:long stickers:Vector<Document> = messages.FoundStickers;
---functions---
messages.searchStickers#29b1c66a flags:# emojis:flags.0?true q:string emoticon:string lang_code:Vector<string> offset:int limit:int hash:long = messages.FoundStickers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **emojis** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, returns [custom emoji stickers](/api/custom-emoji.md) |
| **q** | [string](/type/string.md) | The search term |
| **emoticon** | [string](/type/string.md) | Space-separated list of emojis to search for |
| **lang\_code** | [Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | List of possible IETF language tags of the user's input language; may be empty if unknown |
| **offset** | [int](/type/int.md) | [Offset for pagination](/api/offsets.md) |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). \
The hash may be generated locally by using the `id`s of the returned or stored sticker [document](/constructor/document.md)s. |

### Result
[messages.FoundStickers](/type/messages.FoundStickers.md)

### Only users can use this method

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [document](/constructor/document.md)
Document