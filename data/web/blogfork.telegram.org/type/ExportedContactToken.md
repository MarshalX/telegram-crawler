# ExportedContactToken

Describes a [temporary profile link](/api/links.md#temporary-profile-links).

```tl
exportedContactToken#41bf109b url:string expires:int = ExportedContactToken;

---functions---

contacts.exportContactToken#f8654027 = ExportedContactToken;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [exportedContactToken](/constructor/exportedContactToken.md) | Describes a [temporary profile link](/api/links.md#temporary-profile-links). |

### Methods

| Method | Description |
| --- | --- |
| [contacts.exportContactToken](/method/contacts.exportContactToken.md) | Generates a [temporary profile link](/api/links.md#temporary-profile-links) for the currently logged-in user. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.