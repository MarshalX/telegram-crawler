# PrivacyRule

Privacy **rules** together with [privacy keys](/api/privacy.md#privacy-keys) indicate *what* can or can't someone do and are specified by a [PrivacyRule](/type/PrivacyRule.md) constructor, and its input counterpart [InputPrivacyRule](/type/InputPrivacyRule.md).

See the [privacy documentation »](/api/privacy.md) for more info.

```tl
privacyValueAllowContacts#fffe1bac = PrivacyRule;
privacyValueAllowAll#65427b82 = PrivacyRule;
privacyValueAllowUsers#b8905fb2 users:Vector<long> = PrivacyRule;
privacyValueDisallowContacts#f888fa1a = PrivacyRule;
privacyValueDisallowAll#8b73e763 = PrivacyRule;
privacyValueDisallowUsers#e4621141 users:Vector<long> = PrivacyRule;
privacyValueAllowChatParticipants#6b134e8e chats:Vector<long> = PrivacyRule;
privacyValueDisallowChatParticipants#41c87565 chats:Vector<long> = PrivacyRule;
privacyValueAllowCloseFriends#f7e8d89b = PrivacyRule;
privacyValueAllowPremium#ece9814b = PrivacyRule;
privacyValueAllowBots#21461b5d = PrivacyRule;
privacyValueDisallowBots#f6a5f82f = PrivacyRule;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [privacyValueAllowContacts](/constructor/privacyValueAllowContacts.md) | Allow all contacts |
| [privacyValueAllowAll](/constructor/privacyValueAllowAll.md) | Allow all users |
| [privacyValueAllowUsers](/constructor/privacyValueAllowUsers.md) | Allow only certain users |
| [privacyValueDisallowContacts](/constructor/privacyValueDisallowContacts.md) | Disallow only contacts |
| [privacyValueDisallowAll](/constructor/privacyValueDisallowAll.md) | Disallow all users |
| [privacyValueDisallowUsers](/constructor/privacyValueDisallowUsers.md) | Disallow only certain users |
| [privacyValueAllowChatParticipants](/constructor/privacyValueAllowChatParticipants.md) | Allow all participants of certain chats |
| [privacyValueDisallowChatParticipants](/constructor/privacyValueDisallowChatParticipants.md) | Disallow only participants of certain chats |
| [privacyValueAllowCloseFriends](/constructor/privacyValueAllowCloseFriends.md) | Allow only [close friends »](/api/privacy.md) |
| [privacyValueAllowPremium](/constructor/privacyValueAllowPremium.md) | Allow only users with a [Premium subscription »](/api/premium.md), currently only usable for [inputPrivacyKeyChatInvite](/constructor/inputPrivacyKeyChatInvite.md). |
| [privacyValueAllowBots](/constructor/privacyValueAllowBots.md) | Allow bots and mini apps |
| [privacyValueDisallowBots](/constructor/privacyValueDisallowBots.md) | Disallow bots and mini apps |

### Related pages

#### [Privacy settings](/api/privacy.md)
Telegram allows users to specify granular privacy settings, choosing which users can or can't interact with them in certain ways.

#### [PrivacyRule](/type/PrivacyRule.md)
Privacy **rules** together with [privacy keys](/api/privacy.md#privacy-keys) indicate *what* can or can't someone do and are specified by a [PrivacyRule](/type/PrivacyRule.md) constructor, and its input counterpart [InputPrivacyRule](/type/InputPrivacyRule.md).

See the [privacy documentation »](/api/privacy.md) for more info.

#### [InputPrivacyRule](/type/InputPrivacyRule.md)
Privacy **rules** indicate *who* can or can't do something and are specified by a [PrivacyRule](/type/PrivacyRule.md), and its input counterpart [InputPrivacyRule](/type/InputPrivacyRule.md).

See the [privacy documentation »](/api/privacy.md) for more info.