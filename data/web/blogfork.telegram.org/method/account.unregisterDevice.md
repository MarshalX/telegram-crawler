# account.unregisterDevice

Deletes a device by its token, stops sending PUSH-notifications to it.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.unregisterDevice#6a0d3206 token_type:int token:string other_uids:Vector<long> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **token\_type** | [int](/type/int.md) | Device token type, see [PUSH updates](/api/push-updates.md#subscribing-to-notifications) for the possible values. |
| **token** | [string](/type/string.md) | Device token, see [PUSH updates](/api/push-updates.md#subscribing-to-notifications) for the possible values. |
| **other\_uids** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | List of user identifiers of other users currently using the client |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | TOKEN\_INVALID | The provided token is invalid. |

### Related pages

#### [Handling PUSH-notifications](/api/push-updates.md)
How to subscribe to and handle PUSH notifications