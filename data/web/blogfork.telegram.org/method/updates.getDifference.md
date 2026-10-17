# updates.getDifference

Get new [updates](/api/updates.md).

```tl
updates.differenceEmpty#5d75a138 date:int seq:int = updates.Difference;
updates.difference#f49ca0 new_messages:Vector<Message> new_encrypted_messages:Vector<EncryptedMessage> other_updates:Vector<Update> chats:Vector<Chat> users:Vector<User> state:updates.State = updates.Difference;
updates.differenceSlice#a8fb1981 new_messages:Vector<Message> new_encrypted_messages:Vector<EncryptedMessage> other_updates:Vector<Update> chats:Vector<Chat> users:Vector<User> intermediate_state:updates.State = updates.Difference;
updates.differenceTooLong#4afe8f6d pts:int = updates.Difference;
---functions---
updates.getDifference#19c2f763 flags:# pts:int pts_limit:flags.1?int pts_total_limit:flags.0?int date:int qts:int qts_limit:flags.2?int = updates.Difference;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **pts** | [int](/type/int.md) | PTS, see [updates](/api/updates.md). |
| **pts\_limit** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | PTS limit |
| **pts\_total\_limit** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | For fast updating: if provided and `pts + pts_total_limit < remote pts`, [updates.differenceTooLong](/constructor/updates.differenceTooLong.md) will be returned.\
Simply tells the server to not return the difference if it is bigger than `pts_total_limit`\
If the remote pts is too big (&gt; ~4000000), this field will default to 1000000 |
| **date** | [int](/type/int.md) | date, see [updates](/api/updates.md). |
| **qts** | [int](/type/int.md) | QTS, see [updates](/api/updates.md). |
| **qts\_limit** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | QTS limit |

### Result
[updates.Difference](/type/updates.Difference.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CDN\_METHOD\_INVALID | You can't call this method in a CDN DC. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_NOT\_MODIFIED | No changes were made to chat information because the new information you passed is identical to the current information. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | DATE\_EMPTY | Date empty. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PERSISTENT\_TIMESTAMP\_EMPTY | Persistent timestamp empty. |
| 400 | PERSISTENT\_TIMESTAMP\_INVALID | Persistent timestamp invalid. |
| 500 | RANDOM\_ID\_DUPLICATE | You provided a random ID that was already used. |
| 400 | USERNAME\_INVALID | The provided username is not valid. |
| 400 | USER\_NOT\_PARTICIPANT | You're not a member of this supergroup/channel. |

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [updates.differenceTooLong](/constructor/updates.differenceTooLong.md)
The difference is [too long](/api/updates.md#recovering-gaps), and the specified state must be used to refetch updates.