# channels.setMainProfileTab

Changes the main profile tab of a channel, see [here »](/api/profile.md#tabs) for more info.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
channels.setMainProfileTab#3583fcb1 channel:InputChannel tab:ProfileTab = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | The channel. |
| **tab** | [ProfileTab](/type/ProfileTab.md) | The tab to set as main tab. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |

### Related pages

#### [User profiles](/api/profile.md)
Telegram offers many customization options for your profile!