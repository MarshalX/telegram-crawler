# payments.fulfillStarsSubscription

Re-join a private channel associated to an active [Telegram Star subscription »](/api/invites.md#paid-invite-links).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
payments.fulfillStarsSubscription#cc5bebb3 peer:InputPeer subscription_id:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Always pass [inputPeerSelf](/constructor/inputPeerSelf.md). |
| **subscription\_id** | [string](/type/string.md) | ID of the subscription. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [inputPeerSelf](/constructor/inputPeerSelf.md)
Defines the current user.

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.