# OutboxReadDate

Exact read date of a private message we sent to another user.

```tl
outboxReadDate#3bb842ac date:int = OutboxReadDate;

---functions---

messages.getOutboxReadDate#8c4bfe5d peer:InputPeer msg_id:int = OutboxReadDate;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [outboxReadDate](/constructor/outboxReadDate.md) | Exact read date of a private message we sent to another user. |

### Methods

| Method | Description |
| --- | --- |
| [messages.getOutboxReadDate](/method/messages.getOutboxReadDate.md) | Get the exact read date of one of our messages, sent to a private chat with another user.\
\
Can be only done for private outgoing messages not older than [appConfig.pm\_read\_date\_expire\_period »](/api/config.md#pm-read-date-expire-period).\
\
If the `peer`'s [userFull](/constructor/userFull.md).`read_dates_private` flag is set, we will not be able to fetch the exact read date of messages we send to them, and a `USER_PRIVACY_RESTRICTED` RPC error will be emitted.  \
The exact read date of messages might still be unavailable for other reasons, see [here »](/constructor/globalPrivacySettings.md) for more info.  \
To set [userFull](/constructor/userFull.md).`read_dates_private` for ourselves invoke [account.setGlobalPrivacySettings](/method/account.setGlobalPrivacySettings.md), setting the `settings.hide_read_marks` flag. |