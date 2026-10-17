# account.reorderUsernames

Reorder usernames associated with the currently logged-in user.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.reorderUsernames#ef500eab order:Vector<string> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **order** | [Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | The new order for active usernames. All active usernames must be specified. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | ORDER\_INVALID | The specified username order is invalid. |
| 400 | USERNAME\_NOT\_MODIFIED | The username was not modified. |