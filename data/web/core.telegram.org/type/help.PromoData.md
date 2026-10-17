# help.PromoData

Info about pinned MTProxy or Public Service Announcement peers.

```tl
help.promoDataEmpty#98f6ac75 expires:int = help.PromoData;
help.promoData#8a4d87a flags:# proxy:flags.0?true expires:int peer:flags.3?Peer psa_type:flags.1?string psa_message:flags.2?string pending_suggestions:Vector<string> dismissed_suggestions:Vector<string> custom_pending_suggestion:flags.4?PendingSuggestion chats:Vector<Chat> users:Vector<User> = help.PromoData;

---functions---

help.getPromoData#c0977421 = help.PromoData;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [help.promoDataEmpty](/constructor/help.promoDataEmpty.md) | No PSA/MTProxy info is available |
| [help.promoData](/constructor/help.promoData.md) | A set of useful suggestions and a PSA/MTProxy sponsored peer, see [here »](/api/config.md#suggestions) for more info. |

### Methods

| Method | Description |
| --- | --- |
| [help.getPromoData](/method/help.getPromoData.md) | Returns a set of useful suggestions and PSA/MTProxy sponsored peers, see [here »](/api/config.md#suggestions) for more info. |