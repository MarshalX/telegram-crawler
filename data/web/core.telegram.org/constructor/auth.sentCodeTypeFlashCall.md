# auth.sentCodeTypeFlashCall

The code will be sent via a flash phone call, that will be closed immediately. The phone code will then be the phone number itself, just make sure that the phone number matches the specified pattern.

```tl
auth.sentCodeTypeFlashCall#ab03c6d9 pattern:string = auth.SentCodeType;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **pattern** | [string](/type/string.md) | [pattern](/api/pattern.md) to match |

### Type
[auth.SentCodeType](/type/auth.SentCodeType.md)

### Related pages

#### [Pattern matching](/api/pattern.md)
Some methods require the client to verify if the data obtained from an external source matches a certain pattern.