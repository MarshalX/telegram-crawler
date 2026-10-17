# messages.getMessageReadParticipants

Get which users read a specific message: only available for groups and supergroups with less than [`chat_read_mark_size_threshold` members](/api/config.md#chat-read-mark-size-threshold), read receipts will be stored for [`chat_read_mark_expire_period` seconds after the message was sent](/api/config.md#chat-read-mark-expire-period), see [client configuration for more info »](/api/config.md#client-configuration).

```tl
---functions---
messages.getMessageReadParticipants#31c1c44f peer:InputPeer msg_id:int = Vector<ReadParticipantDate>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Dialog |
| **msg\_id** | [int](/type/int.md) | Message ID |

### Result
[Vector](/type/Vector%20t)&lt;[ReadParticipantDate](/type/ReadParticipantDate.md)&gt;

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_TOO\_BIG | This method is not available for groups with more than `chat_read_mark_size_threshold` members, [see client configuration&nbsp;&raquo;](/api/config.md#client-configuration). |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | MSG\_TOO\_OLD | [`chat_read_mark_expire_period` seconds](/api/config.md#chat-read-mark-expire-period) have passed since the message was sent, read receipts were deleted. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.