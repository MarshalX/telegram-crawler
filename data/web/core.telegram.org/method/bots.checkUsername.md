# bots.checkUsername

Check whether a username is available and valid for use when [creating a managed bot »](/api/bots/managed-bots.md#creating-a-managed-bot).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
bots.checkUsername#87f2219b username:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **username** | [string](/type/string.md) | Username to check; only letters, digits and underscores are allowed, must end in `bot`, and the full username must be 5–32 characters long |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | USERNAME\_INVALID | The provided username is not valid. |
| 400 | USERNAME\_OCCUPIED | The provided username is already occupied. |
| 400 | USERNAME\_SUFFIX\_MISSING | The required `bot` suffix is missing from the passed username. |

### Related pages

#### [Managed bots](/api/bots/managed-bots.md)
Users can create **managed** bots (which are controlled by a specific manager bot) directly through the MTProto API, without interacting with [@BotFather](https://t.me/botfather).