# sendMessageEmojiInteraction

User has clicked on an animated emoji triggering a [reaction, click here for more info »](/api/animated-emojis.md#emoji-reactions).

```tl
sendMessageEmojiInteraction#25972bcb emoticon:string msg_id:int interaction:DataJSON = SendMessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **emoticon** | [string](/type/string.md) | Emoji |
| **msg\_id** | [int](/type/int.md) | Message ID of the animated emoji that was clicked |
| **interaction** | [DataJSON](/type/DataJSON.md) | A JSON object with interaction info, [click here for more info »](/api/animated-emojis.md#emoji-reactions) |

### Type
[SendMessageAction](/type/SendMessageAction.md)

### Related pages

#### [Animated Emojis](/api/animated-emojis.md)
Graphical telegram clients should transform emojis into their respective animated version.