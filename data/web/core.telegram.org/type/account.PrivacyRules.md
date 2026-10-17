# Account.PrivacyRules

Privacy rules

```tl
account.privacyRules#50a04e45 rules:Vector<PrivacyRule> chats:Vector<Chat> users:Vector<User> = account.PrivacyRules;

---functions---

account.getPrivacy#dadbc950 key:InputPrivacyKey = account.PrivacyRules;
account.setPrivacy#c9f81ce8 key:InputPrivacyKey rules:Vector<InputPrivacyRule> = account.PrivacyRules;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [account.privacyRules](/constructor/account.privacyRules.md) | Privacy rules |

### Methods

| Method | Description |
| --- | --- |
| [account.getPrivacy](/method/account.getPrivacy.md) | Get privacy settings of current account |
| [account.setPrivacy](/method/account.setPrivacy.md) | Change privacy settings of current account |