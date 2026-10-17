# inputAppEvent

Event that occurred in the application.

```tl
inputAppEvent#1d1b1245 time:double type:string peer:long data:JSONValue = InputAppEvent;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **time** | [double](/type/double.md) | Client's exact timestamp for the event |
| **type** | [string](/type/string.md) | Type of event |
| **peer** | [long](/type/long.md) | Arbitrary numeric value for more convenient selection of certain event types, or events referring to a certain object |
| **data** | [JSONValue](/type/JSONValue.md) | Details of the event |

### Type
[InputAppEvent](/type/InputAppEvent.md)