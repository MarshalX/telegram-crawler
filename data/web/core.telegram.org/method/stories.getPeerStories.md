# stories.getPeerStories

Fetch the full active [story list](/api/stories.md#watching-stories) of a specific peer.

```tl
stories.peerStories#cae68768 stories:PeerStories chats:Vector<Chat> users:Vector<User> = stories.PeerStories;
---functions---
stories.getPeerStories#2c4ada50 peer:InputPeer = stories.PeerStories;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer whose stories should be fetched |

### Result
[stories.PeerStories](/type/stories.PeerStories.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.