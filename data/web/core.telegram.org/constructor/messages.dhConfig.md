# messages.dhConfig

New set of configuring parameters.

```tl
messages.dhConfig#2c221edd g:int p:bytes version:int random:bytes = messages.DhConfig;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **g** | [int](/type/int.md) | New value **primitive root**, see [Wikipedia](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) |
| **p** | [bytes](/type/bytes.md) | New value **prime**, see [Wikipedia](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) |
| **version** | [int](/type/int.md) | Version of set of parameters |
| **random** | [bytes](/type/bytes.md) | Random sequence of bytes of assigned length |

### Type
[messages.DhConfig](/type/messages.DhConfig.md)