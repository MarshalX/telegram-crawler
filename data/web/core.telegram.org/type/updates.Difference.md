# updates.Difference

Occurred changes.

```tl
updates.differenceEmpty#5d75a138 date:int seq:int = updates.Difference;
updates.difference#f49ca0 new_messages:Vector<Message> new_encrypted_messages:Vector<EncryptedMessage> other_updates:Vector<Update> chats:Vector<Chat> users:Vector<User> state:updates.State = updates.Difference;
updates.differenceSlice#a8fb1981 new_messages:Vector<Message> new_encrypted_messages:Vector<EncryptedMessage> other_updates:Vector<Update> chats:Vector<Chat> users:Vector<User> intermediate_state:updates.State = updates.Difference;
updates.differenceTooLong#4afe8f6d pts:int = updates.Difference;

---functions---

updates.getDifference#19c2f763 flags:# pts:int pts_limit:flags.1?int pts_total_limit:flags.0?int date:int qts:int qts_limit:flags.2?int = updates.Difference;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [updates.differenceEmpty](/constructor/updates.differenceEmpty.md) | No events. |
| [updates.difference](/constructor/updates.difference.md) | Full list of occurred events. |
| [updates.differenceSlice](/constructor/updates.differenceSlice.md) | Incomplete list of occurred events. |
| [updates.differenceTooLong](/constructor/updates.differenceTooLong.md) | The difference is [too long](/api/updates.md#recovering-gaps), and the specified state must be used to refetch updates. |

### Methods

| Method | Description |
| --- | --- |
| [updates.getDifference](/method/updates.getDifference.md) | Get new [updates](/api/updates.md). |