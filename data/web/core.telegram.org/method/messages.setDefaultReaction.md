# messages.setDefaultReaction

Change default emoji reaction to use in the quick reaction menu: the value is synced across devices and can be fetched using [help.getConfig, `reactions_default` field](/method/help.getConfig.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.setDefaultReaction#4f47a016 reaction:Reaction = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **reaction** | [Reaction](/type/Reaction.md) | New emoji reaction |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | REACTION\_INVALID | The specified reaction is invalid. |

### Related pages

#### [help.getConfig](/method/help.getConfig.md)
Returns current configuration, including data center configuration.