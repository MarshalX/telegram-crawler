# account.updateDeviceLocked

When client-side passcode lock feature is enabled, will not show message texts in incoming [PUSH notifications](/api/push-updates.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.updateDeviceLocked#38df3532 period:int = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **period** | [int](/type/int.md) | Inactivity period after which to start hiding message texts in [PUSH notifications](/api/push-updates.md). |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [Handling PUSH-notifications](/api/push-updates.md)
How to subscribe to and handle PUSH notifications