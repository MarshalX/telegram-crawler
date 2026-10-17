# InputPrivacyRule

Privacy **rules** indicate *who* can or can't do something and are specified by a [PrivacyRule](/type/PrivacyRule.md), and its input counterpart [InputPrivacyRule](/type/InputPrivacyRule.md).

See the [privacy documentation »](/api/privacy.md) for more info.

```tl
inputPrivacyValueAllowContacts#d09e07b = InputPrivacyRule;
inputPrivacyValueAllowAll#184b35ce = InputPrivacyRule;
inputPrivacyValueAllowUsers#131cc67f users:Vector<InputUser> = InputPrivacyRule;
inputPrivacyValueDisallowContacts#ba52007 = InputPrivacyRule;
inputPrivacyValueDisallowAll#d66b66c9 = InputPrivacyRule;
inputPrivacyValueDisallowUsers#90110467 users:Vector<InputUser> = InputPrivacyRule;
inputPrivacyValueAllowChatParticipants#840649cf chats:Vector<long> = InputPrivacyRule;
inputPrivacyValueDisallowChatParticipants#e94f0f86 chats:Vector<long> = InputPrivacyRule;
inputPrivacyValueAllowCloseFriends#2f453e49 = InputPrivacyRule;
inputPrivacyValueAllowPremium#77cdc9f1 = InputPrivacyRule;
inputPrivacyValueAllowBots#5a4fcce5 = InputPrivacyRule;
inputPrivacyValueDisallowBots#c4e57915 = InputPrivacyRule;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputPrivacyValueAllowContacts](/constructor/inputPrivacyValueAllowContacts.md) | Allow only contacts |
| [inputPrivacyValueAllowAll](/constructor/inputPrivacyValueAllowAll.md) | Allow all users |
| [inputPrivacyValueAllowUsers](/constructor/inputPrivacyValueAllowUsers.md) | Allow only certain users |
| [inputPrivacyValueDisallowContacts](/constructor/inputPrivacyValueDisallowContacts.md) | Disallow only contacts |
| [inputPrivacyValueDisallowAll](/constructor/inputPrivacyValueDisallowAll.md) | Disallow all |
| [inputPrivacyValueDisallowUsers](/constructor/inputPrivacyValueDisallowUsers.md) | Disallow only certain users |
| [inputPrivacyValueAllowChatParticipants](/constructor/inputPrivacyValueAllowChatParticipants.md) | Allow only participants of certain chats |
| [inputPrivacyValueDisallowChatParticipants](/constructor/inputPrivacyValueDisallowChatParticipants.md) | Disallow only participants of certain chats |
| [inputPrivacyValueAllowCloseFriends](/constructor/inputPrivacyValueAllowCloseFriends.md) | Allow only [close friends »](/api/privacy.md) |
| [inputPrivacyValueAllowPremium](/constructor/inputPrivacyValueAllowPremium.md) | Allow only users with a [Premium subscription »](/api/premium.md), currently only usable for [inputPrivacyKeyChatInvite](/constructor/inputPrivacyKeyChatInvite.md). |
| [inputPrivacyValueAllowBots](/constructor/inputPrivacyValueAllowBots.md) | Allow bots and mini apps |
| [inputPrivacyValueDisallowBots](/constructor/inputPrivacyValueDisallowBots.md) | Disallow bots and mini apps |

### Related pages

#### [PrivacyRule](/type/PrivacyRule.md)
Privacy **rules** together with [privacy keys](/api/privacy.md#privacy-keys) indicate *what* can or can't someone do and are specified by a [PrivacyRule](/type/PrivacyRule.md) constructor, and its input counterpart [InputPrivacyRule](/type/InputPrivacyRule.md).

See the [privacy documentation »](/api/privacy.md) for more info.

#### [InputPrivacyRule](/type/InputPrivacyRule.md)
Privacy **rules** indicate *who* can or can't do something and are specified by a [PrivacyRule](/type/PrivacyRule.md), and its input counterpart [InputPrivacyRule](/type/InputPrivacyRule.md).

See the [privacy documentation »](/api/privacy.md) for more info.

#### [Privacy settings](/api/privacy.md)
Telegram allows users to specify granular privacy settings, choosing which users can or can't interact with them in certain ways.