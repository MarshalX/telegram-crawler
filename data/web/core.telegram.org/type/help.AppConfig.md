# help.AppConfig

Contains various [client configuration parameters](/api/config.md#client-configuration)

```tl
help.appConfigNotModified#7cde641d = help.AppConfig;
help.appConfig#dd18782e hash:int config:JSONValue = help.AppConfig;

---functions---

help.getAppConfig#61e3f854 hash:int = help.AppConfig;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [help.appConfigNotModified](/constructor/help.appConfigNotModified.md) | The client configuration parameters haven't changed |
| [help.appConfig](/constructor/help.appConfig.md) | Contains various [client configuration parameters](/api/config.md#client-configuration) |

### Methods

| Method | Description |
| --- | --- |
| [help.getAppConfig](/method/help.getAppConfig.md) | Get app-specific configuration, see [client configuration](/api/config.md#client-configuration) for more info on the result. |

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.