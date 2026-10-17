# updatePendingJoinRequests

Someone has requested to join a chat or channel

```tl
updatePendingJoinRequests#7063c3db peer:Peer requests_pending:int recent_requesters:Vector<long> = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [Peer](/type/Peer.md) | Chat or channel |
| **requests\_pending** | [int](/type/int.md) | Number of pending [join requests »](/api/invites.md#join-requests) for the chat or channel |
| **recent\_requesters** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | IDs of users that have recently requested to join |

### Type
[Update](/type/Update.md)

### Related pages

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.