# messageActionGeoProximityReached

A user of the chat is now in proximity of another user

```tl
messageActionGeoProximityReached#98e0d697 from_id:Peer to_id:Peer distance:int = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **from\_id** | [Peer](/type/Peer.md) | The user or chat that is now in proximity of `to_id` |
| **to\_id** | [Peer](/type/Peer.md) | The user or chat that subscribed to [live geolocation proximity alerts](/api/live-location.md#proximity-alert) |
| **distance** | [int](/type/int.md) | Distance, in meters (0-100000) |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Live geolocation](/api/live-location.md)
Telegram allows sending the live geolocation of a user in a chat, optionally setting a proximity alert.