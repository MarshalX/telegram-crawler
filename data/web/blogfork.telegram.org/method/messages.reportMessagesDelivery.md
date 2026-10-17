# messages.reportMessagesDelivery

Used for [Telegram Gateway verification messages »](https://telegram.org/blog/star-messages-gateway-2-0-and-more#save-even-more-on-user-verification): indicate to the server that one or more [message](/constructor/message.md)s were received by the client, if requested by the [message](/constructor/message.md).**report\_delivery\_until\_date** flag or the equivalent flag in [push notifications](/api/push-updates.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.reportMessagesDelivery#5a6d7395 flags:# push:flags.0?true peer:InputPeer id:Vector<int> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **push** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Must be set if the messages were received from a [push notification](/api/push-updates.md). |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer where the messages were received. |
| **id** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | The IDs of the received messages. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Handling PUSH-notifications](/api/push-updates.md)
How to subscribe to and handle PUSH notifications

#### [message](/constructor/message.md)
A message