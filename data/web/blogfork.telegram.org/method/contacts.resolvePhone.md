# contacts.resolvePhone

Resolve a phone number to get user info, if their privacy settings allow it.

Make sure to implement client-side ratelimiting/debounce for this method, allowing at most 1 call every 3 seconds.

```tl
contacts.resolvedPeer#7f077ad9 peer:Peer chats:Vector<Chat> users:Vector<User> = contacts.ResolvedPeer;
---functions---
contacts.resolvePhone#8af94344 phone:string = contacts.ResolvedPeer;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **phone** | [string](/type/string.md) | Phone number in international format, possibly obtained from a [phone number deep link](/api/links.md#phone-number-links). |

### Result
[contacts.ResolvedPeer](/type/contacts.ResolvedPeer.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PHONE\_NOT\_OCCUPIED | No user is associated to the specified phone number. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.