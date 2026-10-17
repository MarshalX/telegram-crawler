# channels.SendAsPeers

A list of peers that can be used to send messages in a specific group

```tl
channels.sendAsPeers#f496b0c6 peers:Vector<SendAsPeer> chats:Vector<Chat> users:Vector<User> = channels.SendAsPeers;

---functions---

channels.getSendAs#e785a43f flags:# for_paid_reactions:flags.0?true for_live_stories:flags.1?true peer:InputPeer = channels.SendAsPeers;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [channels.sendAsPeers](/constructor/channels.sendAsPeers.md) | A list of peers that can be used to send messages in a specific group |

### Methods

| Method | Description |
| --- | --- |
| [channels.getSendAs](/method/channels.getSendAs.md) | Obtains a list of peers that can be displayed as the sender in a specific context. With `for_live_stories`, returns peers that may author [live story in-call messages »](/api/group-calls.md#in-call-messages). |