# updateConfig

The server-side configuration has changed; the client should re-fetch the config using [help.getConfig](/method/help.getConfig.md) and [help.getAppConfig](/method/help.getAppConfig.md).

```tl
updateConfig#a229dd06 = Update;
```

### Parameters

This constructor does not require any parameters.

### Type
[Update](/type/Update.md)

### Related pages

#### [help.getConfig](/method/help.getConfig.md)
Returns current configuration, including data center configuration.

#### [help.getAppConfig](/method/help.getAppConfig.md)
Get app-specific configuration, see [client configuration](/api/config.md#client-configuration) for more info on the result.