# smsjobs.getStatus

Get SMS jobs status (official clients only).

```tl
smsjobs.status#2aee9191 flags:# allow_international:flags.0?true recent_sent:int recent_since:int recent_remains:int total_sent:int total_since:int last_gift_slug:flags.1?string terms_url:string = smsjobs.Status;
---functions---
smsjobs.getStatus#10a698e8 = smsjobs.Status;
```

### Parameters

This constructor does not require any parameters.

### Result
[smsjobs.Status](/type/smsjobs.Status.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | NOT\_JOINED | The current user hasn't joined the Peer-to-Peer Login Program. |