# inputMessageReadMetric

Read metric for a single message exposure, describing how long the message was visible in the chat viewport.

```tl
inputMessageReadMetric#402b4495 msg_id:int view_id:long time_in_view_ms:int active_time_in_view_ms:int height_to_viewport_ratio_permille:int seen_range_ratio_permille:int = InputMessageReadMetric;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **msg\_id** | [int](/type/int.md) | ID of the message |
| **view\_id** | [long](/type/long.md) | Random non-zero 64-bit ID generated for this exposure |
| **time\_in\_view\_ms** | [int](/type/int.md) | Total exposure time in milliseconds of at least one pixel of the message, after the 300 ms entry grace period |
| **active\_time\_in\_view\_ms** | [int](/type/int.md) | Part of `time_in_view_ms` accumulated while the user is active |
| **height\_to\_viewport\_ratio\_permille** | [int](/type/int.md) | `round(max_message_height * 1000 / max_viewport_height)`, may exceed 1000 when the message is taller than the viewport |
| **seen\_range\_ratio\_permille** | [int](/type/int.md) | `round(max_seen_vertical_range * 1000 / max_message_height)`, clamped to the 0–1000 range |

### Type
[InputMessageReadMetric](/type/InputMessageReadMetric.md)