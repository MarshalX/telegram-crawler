# StatsGraph

Channel statistics graph

```tl
statsGraphAsync#4a27eb2d token:string = StatsGraph;
statsGraphError#bedc9822 error:string = StatsGraph;
statsGraph#8ea464b6 flags:# json:DataJSON zoom_token:flags.0?string = StatsGraph;

---functions---

stats.loadAsyncGraph#621d5fa0 flags:# token:string x:flags.0?long = StatsGraph;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [statsGraphAsync](/constructor/statsGraphAsync.md) | This [channel statistics graph](/api/stats.md) must be generated asynchronously using [stats.loadAsyncGraph](/method/stats.loadAsyncGraph.md) to reduce server load |
| [statsGraphError](/constructor/statsGraphError.md) | An error occurred while generating the [statistics graph](/api/stats.md) |
| [statsGraph](/constructor/statsGraph.md) | [Channel statistics graph](/api/stats.md) |

### Methods

| Method | Description |
| --- | --- |
| [stats.loadAsyncGraph](/method/stats.loadAsyncGraph.md) | Load [channel statistics graph](/api/stats.md) asynchronously |