# invokeWithLayer

Invoke the specified query using the specified API [layer](/api/invoking.md#layers)

```tl
---functions---
invokeWithLayer#da9b0d0d {X:Type} layer:int query:!X = X;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **layer** | [int](/type/int.md) | The layer to use |
| **query** | !X | The query |

### Result
Returns the type returned by the invoked method.

### Both users and bots can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | AUTH\_BYTES\_INVALID | The provided authorization is invalid. |
| 400 | CDN\_METHOD\_INVALID | You can't call this method in a CDN DC. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | CONNECTION\_API\_ID\_INVALID | The provided API id is invalid. |
| 400 | CONNECTION\_LAYER\_INVALID | Layer invalid. |
| 406 | INVITE\_HASH\_EXPIRED | The invite link has expired. |

### Related pages

#### [Calling API Methods](/api/invoking.md)
Additional options for calling methods.