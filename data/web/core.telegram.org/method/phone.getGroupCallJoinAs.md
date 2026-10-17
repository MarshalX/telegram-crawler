# phone.getGroupCallJoinAs

Get a list of peers that can be used to join a [video chat or livestream »](/api/group-calls.md#joining-a-group-call-on-behalf-of-owned-channels), presenting yourself as a specific user/channel.

This method cannot be used for live stories or conference calls. To comment or react in a live story as another peer, use [channels.getSendAs](/method/channels.getSendAs.md) with `for_live_stories` set and pass one of the returned peers to [phone.sendGroupCallMessage](/method/phone.sendGroupCallMessage.md).`send_as`.

```tl
phone.joinAsPeers#afe5623f peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = phone.JoinAsPeers;
---functions---
phone.getGroupCallJoinAs#ef7c213a peer:InputPeer = phone.JoinAsPeers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The basic group, supergroup or channel whose video chat/livestream we're trying to join; cannot target a live story. |

### Result
[phone.JoinAsPeers](/type/phone.JoinAsPeers.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.

#### [channels.getSendAs](/method/channels.getSendAs.md)
Obtains a list of peers that can be displayed as the sender in a specific context. With `for_live_stories`, returns peers that may author [live story in-call messages »](/api/group-calls.md#in-call-messages).

#### [phone.sendGroupCallMessage](/method/phone.sendGroupCallMessage.md)
Send an in-call message to all participants of a video chat/livestream or live story, including in RTMP mode, see [here »](/api/group-calls.md#in-call-messages) for more info.

The `send_as` field can only be populated for live stories, where it optionally selects the displayed author. If omitted, the server automatically selects the appropriate author. Do not populate it for video chats/livestreams.

Video chats/livestreams and live stories support [animated emoji reactions »](/api/group-calls.md#in-call-reactions), encoded as messages containing only a standard available reaction emoji or a single custom emoji entity.

For a paid live story comment, pass the user-confirmed donation amount in `allow_paid_stars`. For commenters other than the live story owner, this amount must be at least the current [groupCall](/constructor/groupCall.md).`send_paid_messages_stars` minimum. A higher amount may be donated to highlight the comment. The live story owner may comment without populating `allow_paid_stars`. To send a standalone paid live story donation, pass a positive `allow_paid_stars` value and an empty `message`, see [here »](/api/group-calls.md#paid-live-story-donations) for the full flow.