# messages.setEncryptedTyping

Send typing event by the current user to a secret chat.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.setEncryptedTyping#791451ed peer:InputEncryptedChat typing:Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputEncryptedChat](/type/InputEncryptedChat.md) | Secret chat ID |
| **typing** | [Bool](/type/Bool.md) | Typing.\
**Possible values**:\
[(boolTrue)](/constructor/boolTrue.md), if the user started typing and more than **5 seconds** have passed since the last request\
[(boolFalse)](/constructor/boolFalse.md), if the user stopped typing |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |

### Related pages

#### [boolTrue](/constructor/boolTrue.md)
The constructor can be interpreted as a **boolean**`true` value.

#### [boolFalse](/constructor/boolFalse.md)
Constructor may be interpreted as a **boolean**`false` value.