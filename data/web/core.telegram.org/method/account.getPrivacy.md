# account.getPrivacy

Get privacy settings of current account

```tl
account.privacyRules#50a04e45 rules:Vector<PrivacyRule> chats:Vector<Chat> users:Vector<User> = account.PrivacyRules;
---functions---
account.getPrivacy#dadbc950 key:InputPrivacyKey = account.PrivacyRules;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **key** | [InputPrivacyKey](/type/InputPrivacyKey.md) | Peer category whose privacy settings should be fetched |

### Result
[account.PrivacyRules](/type/account.PrivacyRules.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PRIVACY\_KEY\_INVALID | The privacy key is invalid. |