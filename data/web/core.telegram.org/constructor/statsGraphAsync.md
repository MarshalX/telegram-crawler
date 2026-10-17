# statsGraphAsync

This [channel statistics graph](/api/stats.md) must be generated asynchronously using [stats.loadAsyncGraph](/method/stats.loadAsyncGraph.md) to reduce server load

```tl
statsGraphAsync#4a27eb2d token:string = StatsGraph;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **token** | [string](/type/string.md) | Token to use for fetching the async graph |

### Type
[StatsGraph](/type/StatsGraph.md)

### Related pages

#### [Channel statistics](/api/stats.md)
Telegram offers detailed channel statistics for channels and supergroups.

#### [stats.loadAsyncGraph](/method/stats.loadAsyncGraph.md)
Load [channel statistics graph](/api/stats.md) asynchronously