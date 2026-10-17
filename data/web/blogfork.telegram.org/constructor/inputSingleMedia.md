# inputSingleMedia

A single media in an [album or grouped media](/api/files.md#albums-grouped-media) sent with [messages.sendMultiMedia](/method/messages.sendMultiMedia.md).

```tl
inputSingleMedia#1cc6e91f flags:# media:InputMedia random_id:long message:string entities:flags.0?Vector<MessageEntity> = InputSingleMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **media** | [InputMedia](/type/InputMedia.md) | The media |
| **random\_id** | [long](/type/long.md) | Unique client media ID required to prevent message resending. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **message** | [string](/type/string.md) | A caption for the media |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | Message [entities](/api/entities.md) for styled text |

### Type
[InputSingleMedia](/type/InputSingleMedia.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.

#### [messages.sendMultiMedia](/method/messages.sendMultiMedia.md)
Send an [album or grouped media](/api/files.md#albums-grouped-media)