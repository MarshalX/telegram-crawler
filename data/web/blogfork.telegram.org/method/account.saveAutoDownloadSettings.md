# account.saveAutoDownloadSettings

Change media autodownload settings

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.saveAutoDownloadSettings#76f36233 flags:# low:flags.0?true high:flags.1?true settings:AutoDownloadSettings = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **low** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to save media in the low data usage preset |
| **high** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether to save media in the high data usage preset |
| **settings** | [AutoDownloadSettings](/type/AutoDownloadSettings.md) | Media autodownload settings |

### Result
[Bool](/type/Bool.md)

### Only users can use this method