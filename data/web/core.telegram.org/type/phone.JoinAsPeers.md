# phone.JoinAsPeers

A list of peers that can be used to join a group call, presenting yourself as a specific user/channel.

```tl
phone.joinAsPeers#afe5623f peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = phone.JoinAsPeers;

---functions---

phone.getGroupCallJoinAs#ef7c213a peer:InputPeer = phone.JoinAsPeers;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [phone.joinAsPeers](/constructor/phone.joinAsPeers.md) | Contains the peers that may be used to join a video chat/livestream, see [joining on behalf of owned channels »](/api/group-calls.md#joining-a-group-call-on-behalf-of-owned-channels). |

### Methods

| Method | Description |
| --- | --- |
| [phone.getGroupCallJoinAs](/method/phone.getGroupCallJoinAs.md) | Get a list of peers that can be used to join a [video chat or livestream »](/api/group-calls.md#joining-a-group-call-on-behalf-of-owned-channels), presenting yourself as a specific user/channel.\
\
This method cannot be used for live stories or conference calls. To comment or react in a live story as another peer, use [channels.getSendAs](/method/channels.getSendAs.md) with `for_live_stories` set and pass one of the returned peers to [phone.sendGroupCallMessage](/method/phone.sendGroupCallMessage.md).`send_as`. |