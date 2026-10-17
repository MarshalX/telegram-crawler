# phone.joinAsPeers

Contains the peers that may be used to join a video chat/livestream, see [joining on behalf of owned channels »](/api/group-calls.md#joining-a-group-call-on-behalf-of-owned-channels).

```tl
phone.joinAsPeers#afe5623f peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = phone.JoinAsPeers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peers** | [Vector](/type/Vector%20t)&lt;[Peer](/type/Peer.md)&gt; | Peers |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chats mentioned in the peers vector |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users mentioned in the peers vector |

### Type
[phone.JoinAsPeers](/type/phone.JoinAsPeers.md)

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.