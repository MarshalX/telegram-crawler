# Messages.DhConfig

Contains Diffie-Hellman key generation protocol parameters.

```tl
messages.dhConfigNotModified#c0e24635 random:bytes = messages.DhConfig;
messages.dhConfig#2c221edd g:int p:bytes version:int random:bytes = messages.DhConfig;

---functions---

messages.getDhConfig#26cf8950 version:int random_length:int = messages.DhConfig;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.dhConfigNotModified](/constructor/messages.dhConfigNotModified.md) | Configuring parameters did not change. |
| [messages.dhConfig](/constructor/messages.dhConfig.md) | New set of configuring parameters. |

### Methods

| Method | Description |
| --- | --- |
| [messages.getDhConfig](/method/messages.getDhConfig.md) | Returns configuration parameters for Diffie-Hellman key generation. Can also return a random sequence of bytes of required length. |