# contacts.resolveUsername

Resolve a @username to get peer info

```tl
contacts.resolvedPeer#7f077ad9 peer:Peer chats:Vector<Chat> users:Vector<User> = contacts.ResolvedPeer;
---functions---
contacts.resolveUsername#725afbbc flags:# username:string referer:flags.0?string = contacts.ResolvedPeer;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **username** | [string](/type/string.md) | @username to resolve |
| **referer** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | [Referrer ID from referral links »](/api/links.md#referral-links). |

### Result
[contacts.ResolvedPeer](/type/contacts.ResolvedPeer.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CONNECTION\_LAYER\_INVALID | Layer invalid. |
| 400 | STARREF\_EXPIRED | The specified referral link is invalid. |
| 400 | USERNAME\_INVALID | The provided username is not valid. |
| 400 | USERNAME\_NOT\_OCCUPIED | The provided username is not occupied. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.