# channels.reportAntiSpamFalsePositive

Report a [native antispam](/api/antispam.md) false positive

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
channels.reportAntiSpamFalsePositive#a850a693 channel:InputChannel msg_id:int = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | Supergroup ID |
| **msg\_id** | [int](/type/int.md) | Message ID that was mistakenly deleted by the [native antispam](/api/antispam.md) system, taken from the [admin log](/api/recent-actions.md) |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |

### Related pages

#### [Native antispam system](/api/antispam.md)
Admins of supergroups with a certain number of members can choose to unleash the full proactive power of Telegram's own antispam algorithms – turning on the new Aggressive mode for the automated spam filters.

#### [Admin log](/api/recent-actions.md)
Both supergroups and channels offer a so-called admin log, a log of recent relevant supergroup and channel actions, like the modification of group/channel settings or information on behalf of an admin, user kicks and bans, and more.