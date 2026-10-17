# contacts.getSaved

Get all contacts, requires a [takeout session, see here » for more info](/api/takeout.md).

```tl
---functions---
contacts.getSaved#82f1e39f = Vector<SavedContact>;
```

### Parameters

This constructor does not require any parameters.

### Result
[Vector](/type/Vector%20t)&lt;[SavedContact](/type/SavedContact.md)&gt;

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | TAKEOUT\_INVALID | The specified takeout ID is invalid. |
| 403 | TAKEOUT\_REQUIRED | A [takeout](/api/takeout.md) session needs to be initialized first, [see here &raquo; for more info](/api/takeout.md). |

### Related pages

#### [Takeout API](/api/takeout.md)
Telegram's API allows users to export all of their information through the takeout API.