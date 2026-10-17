# chatInviteImporter

When and which user joined the chat using a chat invite

```tl
chatInviteImporter#8c5adfd9 flags:# requested:flags.0?true via_chatlist:flags.3?true user_id:long date:int about:flags.2?string approved_by:flags.1?long = ChatInviteImporter;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **requested** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this user currently has a pending [join request »](/api/invites.md#join-requests) |
| **via\_chatlist** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | The participant joined by importing a [chat folder deep link »](/api/links.md#chat-folder-links). |
| **user\_id** | [long](/type/long.md) | The user |
| **date** | [int](/type/int.md) | When did the user join |
| **about** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | For users with pending requests, contains bio of the user that requested to join |
| **approved\_by** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[long](/type/long.md) | The administrator that approved the [join request »](/api/invites.md#join-requests) of the user |

### Type
[ChatInviteImporter](/type/ChatInviteImporter.md)

### Related pages

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.