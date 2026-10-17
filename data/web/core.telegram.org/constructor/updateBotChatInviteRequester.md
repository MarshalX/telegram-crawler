# updateBotChatInviteRequester

Someone has requested to join a chat or channel (bots only, users will receive an [updatePendingJoinRequests](/constructor/updatePendingJoinRequests.md), instead)

```tl
updateBotChatInviteRequester#11dfa986 peer:Peer date:int user_id:long about:string invite:ExportedChatInvite qts:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [Peer](/type/Peer.md) | The chat or channel in question |
| **date** | [int](/type/int.md) | When was the [join request »](/api/invites.md#join-requests) made |
| **user\_id** | [long](/type/long.md) | The user ID that is asking to join the chat or channel |
| **about** | [string](/type/string.md) | Bio of the user |
| **invite** | [ExportedChatInvite](/type/ExportedChatInvite.md) | Chat invite link that was used by the user to send the [join request »](/api/invites.md#join-requests) |
| **qts** | [int](/type/int.md) | [QTS](/api/updates.md) event sequence identifier |

### Type
[Update](/type/Update.md)

### Related pages

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [updatePendingJoinRequests](/constructor/updatePendingJoinRequests.md)
Someone has requested to join a chat or channel