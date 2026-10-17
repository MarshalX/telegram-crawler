# messages.getFactCheck

Fetch one or more [factchecks, see here »](/api/factcheck.md) for the full flow.

```tl
---functions---
messages.getFactCheck#b9cdc5ee peer:InputPeer msg_id:Vector<int> = Vector<FactCheck>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where the messages were sent. |
| **msg\_id** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | Messages that have associated [factCheck](/constructor/factCheck.md) constructors with the `need_check` flag set. |

### Result
[Vector](/type/Vector%20t)&lt;[FactCheck](/type/FactCheck.md)&gt;

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [factCheck](/constructor/factCheck.md)
Represents a [fact-check »](/api/factcheck.md) created by an independent fact-checker.

#### [Fact checks](/api/factcheck.md)
Telegram clients support displaying fact-checks added to messages by independent fact-checkers.