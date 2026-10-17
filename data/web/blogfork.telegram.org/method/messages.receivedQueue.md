# messages.receivedQueue

Confirms receipt of messages in a secret chat by client, cancels push notifications.  
The method returns a list of **random\_id**s of messages for which push notifications were cancelled.

```tl
---functions---
messages.receivedQueue#55a5bb66 max_qts:int = Vector<long>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **max\_qts** | [int](/type/int.md) | Maximum qts value available at the client |

### Result
[Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt;

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | MAX\_QTS\_INVALID | The specified max_qts is invalid. |
| 500 | MSG\_WAIT\_FAILED | A waiting call returned an error. |