# contacts.exportContactToken

Generates a [temporary profile link](/api/links.md#temporary-profile-links) for the currently logged-in user.

```tl
exportedContactToken#41bf109b url:string expires:int = ExportedContactToken;
---functions---
contacts.exportContactToken#f8654027 = ExportedContactToken;
```

### Parameters

This constructor does not require any parameters.

### Result
[ExportedContactToken](/type/ExportedContactToken.md)

### Only users can use this method

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.