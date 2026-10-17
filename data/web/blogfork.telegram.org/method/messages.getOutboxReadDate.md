# messages.getOutboxReadDate

Get the exact read date of one of our messages, sent to a private chat with another user.

Can be only done for private outgoing messages not older than [appConfig.pm\_read\_date\_expire\_period »](/api/config.md#pm-read-date-expire-period).

If the `peer`'s [userFull](/constructor/userFull.md).`read_dates_private` flag is set, we will not be able to fetch the exact read date of messages we send to them, and a `USER_PRIVACY_RESTRICTED` RPC error will be emitted.  
The exact read date of messages might still be unavailable for other reasons, see [here »](/constructor/globalPrivacySettings.md) for more info.  
To set [userFull](/constructor/userFull.md).`read_dates_private` for ourselves invoke [account.setGlobalPrivacySettings](/method/account.setGlobalPrivacySettings.md), setting the `settings.hide_read_marks` flag.

```tl
outboxReadDate#3bb842ac date:int = OutboxReadDate;
---functions---
messages.getOutboxReadDate#8c4bfe5d peer:InputPeer msg_id:int = OutboxReadDate;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The user to whom we sent the message. |
| **msg\_id** | [int](/type/int.md) | The message ID. |

### Result
[OutboxReadDate](/type/OutboxReadDate.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | MESSAGE\_NOT\_READ\_YET | The specified message wasn't read yet. |
| 400 | MESSAGE\_TOO\_OLD | The message is too old, the requested information is not available. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 403 | USER\_PRIVACY\_RESTRICTED | The user's privacy settings do not allow you to do this. |
| 403 | YOUR\_PRIVACY\_RESTRICTED | You cannot fetch the read date of this message because you have disallowed other users to do so for *your* messages; to fix, allow other users to see *your* exact last online date OR purchase a [Telegram Premium](/api/premium.md) subscription. |

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [userFull](/constructor/userFull.md)
Extended user info

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

#### [globalPrivacySettings](/constructor/globalPrivacySettings.md)
Global privacy settings

#### [account.setGlobalPrivacySettings](/method/account.setGlobalPrivacySettings.md)
Set global privacy settings

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.