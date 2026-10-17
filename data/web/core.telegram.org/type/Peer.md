# Peer

Identifier of a private chat, basic group, group or channel (see [here »](/api/peers.md) for more info).

```tl
peerUser#59511722 user_id:long = Peer;
peerChat#36c6019a chat_id:long = Peer;
peerChannel#a2a5371e channel_id:long = Peer;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [peerUser](/constructor/peerUser.md) | Chat partner |
| [peerChat](/constructor/peerChat.md) | Group. |
| [peerChannel](/constructor/peerChannel.md) | Channel/supergroup |

### Related pages

#### [Peer database](/api/peers.md)
Many constructors in the API need to be stored in a local database upon reception and should only ever be updated reactively (passively) when received via updates or by other means (as specified in the documentation), to avoid overloading the server by continuously requesting changes for the same unchanged information.