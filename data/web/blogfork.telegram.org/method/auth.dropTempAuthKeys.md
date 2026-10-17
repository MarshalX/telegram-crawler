# auth.dropTempAuthKeys

Delete all temporary authorization keys **except for** the ones specified

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
auth.dropTempAuthKeys#8e48a188 except_auth_keys:Vector<long> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **except\_auth\_keys** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | The auth keys that **shouldn't** be dropped. |

### Result
[Bool](/type/Bool.md)

### Both users and bots can use this method