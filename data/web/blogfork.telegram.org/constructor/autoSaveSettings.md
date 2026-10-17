# autoSaveSettings

Media autosave settings

```tl
autoSaveSettings#c84834ce flags:# photos:flags.0?true videos:flags.1?true video_max_size:flags.2?long = AutoSaveSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **photos** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether photos should be autosaved to the gallery. |
| **videos** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether videos should be autosaved to the gallery. |
| **video\_max\_size** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[long](/type/long.md) | If set, specifies a size limit for autosavable videos |

### Type
[AutoSaveSettings](/type/AutoSaveSettings.md)