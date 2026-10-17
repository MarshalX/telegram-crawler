# help.dismissSuggestion

Dismiss a [suggestion, see here for more info »](/api/config.md#suggestions).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
help.dismissSuggestion#f50dbaa1 peer:InputPeer suggestion:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | In the case of pending suggestions in [channels](/constructor/channelFull.md), the channel ID. |
| **suggestion** | [string](/type/string.md) | [Suggestion, see here for more info »](/api/config.md#suggestions). |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [channelFull](/constructor/channelFull.md)
Full info about a [channel](/api/channel.md#channels), [supergroup](/api/channel.md#supergroups) or [gigagroup](/api/channel.md#gigagroups).

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.