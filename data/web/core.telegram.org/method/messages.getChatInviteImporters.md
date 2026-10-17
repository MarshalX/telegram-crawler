# messages.getChatInviteImporters

Get info about the users that joined the chat using a specific chat invite

```tl
messages.chatInviteImporters#81b6b00a count:int importers:Vector<ChatInviteImporter> users:Vector<User> = messages.ChatInviteImporters;
---functions---
messages.getChatInviteImporters#df04dd4e flags:# requested:flags.0?true subscription_expired:flags.3?true peer:InputPeer link:flags.1?string q:flags.2?string offset_date:int offset_user:InputUser limit:int = messages.ChatInviteImporters;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **requested** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, only returns info about users with pending [join requests »](/api/invites.md#join-requests) |
| **subscription\_expired** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Set this flag if the link is a [Telegram Star subscription link »](/api/stars.md#star-subscriptions) and only members with already expired subscription must be returned. |
| **peer** | [InputPeer](/type/InputPeer.md) | Chat |
| **link** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Invite link |
| **q** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Search for a user in the pending [join requests »](/api/invites.md#join-requests) list: only available when the `requested` flag is set, cannot be used together with a specific `link`. |
| **offset\_date** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **offset\_user** | [InputUser](/type/InputUser.md) | User ID for [pagination](/api/offsets.md): if set, `offset_date` must also be set. |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[messages.ChatInviteImporters](/type/messages.ChatInviteImporters.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | INVITE\_HASH\_EXPIRED | The invite link has expired. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | SEARCH\_WITH\_LINK\_NOT\_SUPPORTED | You cannot provide a search query and an invite link at the same time. |

### Related pages

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.