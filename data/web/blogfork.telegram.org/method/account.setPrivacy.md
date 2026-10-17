# account.setPrivacy

Change privacy settings of current account

```tl
account.privacyRules#50a04e45 rules:Vector<PrivacyRule> chats:Vector<Chat> users:Vector<User> = account.PrivacyRules;
---functions---
account.setPrivacy#c9f81ce8 key:InputPrivacyKey rules:Vector<InputPrivacyRule> = account.PrivacyRules;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **key** | [InputPrivacyKey](/type/InputPrivacyKey.md) | New privacy rule |
| **rules** | [Vector](/type/Vector%20t)&lt;[InputPrivacyRule](/type/InputPrivacyRule.md)&gt; | Peers to which the privacy rule will apply. |

### Result
[account.PrivacyRules](/type/account.PrivacyRules.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PRIVACY\_KEY\_INVALID | The privacy key is invalid. |
| 400 | PRIVACY\_TOO\_LONG | Too many privacy rules were specified, the current limit is 1000. |
| 400 | PRIVACY\_VALUE\_INVALID | The specified privacy rule combination is invalid. |