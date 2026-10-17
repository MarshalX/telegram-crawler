# ExportedChatInvite

Exported chat invite

```tl
chatInviteExported#a22cbd96 flags:# revoked:flags.0?true permanent:flags.5?true request_needed:flags.6?true link:string admin_id:long date:int start_date:flags.4?int expire_date:flags.1?int usage_limit:flags.2?int usage:flags.3?int requested:flags.7?int subscription_expired:flags.10?int title:flags.8?string subscription_pricing:flags.9?StarsSubscriptionPricing = ExportedChatInvite;
chatInvitePublicJoinRequests#ed107ab7 = ExportedChatInvite;

---functions---

messages.exportChatInvite#a455de90 flags:# legacy_revoke_permanent:flags.2?true request_needed:flags.3?true peer:InputPeer expire_date:flags.0?int usage_limit:flags.1?int title:flags.4?string subscription_pricing:flags.5?StarsSubscriptionPricing = ExportedChatInvite;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [chatInviteExported](/constructor/chatInviteExported.md) | Exported chat invite |
| [chatInvitePublicJoinRequests](/constructor/chatInvitePublicJoinRequests.md) | Used in updates and in the channel log to indicate when a user is requesting to join or has joined a [discussion group](/api/discussion.md#requiring-users-to-join-the-group) |

### Methods

| Method | Description |
| --- | --- |
| [messages.exportChatInvite](/method/messages.exportChatInvite.md) | Export an invite link for a chat |