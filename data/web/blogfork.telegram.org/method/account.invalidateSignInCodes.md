# account.invalidateSignInCodes

Invalidate the specified login codes, see [here »](/api/auth.md#invalidating-login-codes) for more info.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.invalidateSignInCodes#ca8ae8ba codes:Vector<string> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **codes** | [Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | The login codes to invalidate. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.