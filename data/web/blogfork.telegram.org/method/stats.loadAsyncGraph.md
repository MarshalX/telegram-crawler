# stats.loadAsyncGraph

Load [channel statistics graph](/api/stats.md) asynchronously

```tl
statsGraphAsync#4a27eb2d token:string = StatsGraph;
statsGraphError#bedc9822 error:string = StatsGraph;
statsGraph#8ea464b6 flags:# json:DataJSON zoom_token:flags.0?string = StatsGraph;
---functions---
stats.loadAsyncGraph#621d5fa0 flags:# token:string x:flags.0?long = StatsGraph;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **token** | [string](/type/string.md) | Graph token from [statsGraphAsync](/constructor/statsGraphAsync.md) constructor |
| **x** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | Zoom value, if required |

### Result
[StatsGraph](/type/StatsGraph.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | GRAPH\_EXPIRED\_RELOAD | This graph has expired, please obtain a new graph token. |
| 400 | GRAPH\_INVALID\_RELOAD | Invalid graph token provided, please reload the stats and provide the updated token. |
| 400 | GRAPH\_OUTDATED\_RELOAD | The graph is outdated, please get a new async token using stats.getBroadcastStats. |

### Related pages

#### [statsGraphAsync](/constructor/statsGraphAsync.md)
This [channel statistics graph](/api/stats.md) must be generated asynchronously using [stats.loadAsyncGraph](/method/stats.loadAsyncGraph.md) to reduce server load

#### [Channel statistics](/api/stats.md)
Telegram offers detailed channel statistics for channels and supergroups.