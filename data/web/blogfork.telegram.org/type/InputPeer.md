# InputPeer

Peer

```tl
inputPeerEmpty#7f3b18ea = InputPeer;
inputPeerSelf#7da07ec9 = InputPeer;
inputPeerChat#35a95cb9 chat_id:long = InputPeer;
inputPeerUser#dde8a54c user_id:long access_hash:long = InputPeer;
inputPeerChannel#27bcbbfc channel_id:long access_hash:long = InputPeer;
inputPeerUserFromMessage#a87b0a1c peer:InputPeer msg_id:int user_id:long = InputPeer;
inputPeerChannelFromMessage#bd2a0840 peer:InputPeer msg_id:int channel_id:long = InputPeer;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputPeerEmpty](/constructor/inputPeerEmpty.md) | An empty constructor, no user or chat is defined. |
| [inputPeerSelf](/constructor/inputPeerSelf.md) | Defines the current user. |
| [inputPeerChat](/constructor/inputPeerChat.md) | Defines a chat for further interaction. |
| [inputPeerUser](/constructor/inputPeerUser.md) | Defines a user for further interaction. |
| [inputPeerChannel](/constructor/inputPeerChannel.md) | Defines a channel for further interaction. |
| [inputPeerUserFromMessage](/constructor/inputPeerUserFromMessage.md) | Defines a [min](/api/min.md) user that was seen in a certain message of a certain chat. |
| [inputPeerChannelFromMessage](/constructor/inputPeerChannelFromMessage.md) | Defines a [min](/api/min.md) channel that was seen in a certain message of a certain chat. |