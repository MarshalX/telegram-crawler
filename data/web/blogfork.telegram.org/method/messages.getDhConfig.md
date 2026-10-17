# messages.getDhConfig

Returns configuration parameters for Diffie-Hellman key generation. Can also return a random sequence of bytes of required length.

```tl
messages.dhConfigNotModified#c0e24635 random:bytes = messages.DhConfig;
messages.dhConfig#2c221edd g:int p:bytes version:int random:bytes = messages.DhConfig;
---functions---
messages.getDhConfig#26cf8950 version:int random_length:int = messages.DhConfig;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **version** | [int](/type/int.md) | Value of the **version** parameter from [messages.dhConfig](/constructor/messages.dhConfig.md), available at the client |
| **random\_length** | [int](/type/int.md) | Length of the required random sequence |

### Result
[messages.DhConfig](/type/messages.DhConfig.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | RANDOM\_LENGTH\_INVALID | Random length invalid. |

### Related pages

#### [messages.dhConfig](/constructor/messages.dhConfig.md)
New set of configuring parameters.