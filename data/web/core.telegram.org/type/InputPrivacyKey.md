# InputPrivacyKey

Privacy **keys** together with [privacy rules »](/api/privacy.md#privacy-rules) indicate *what* can or can't someone do and are specified by a [PrivacyKey](/type/PrivacyKey.md) constructor, and its input counterpart [InputPrivacyKey](/type/InputPrivacyKey.md).

See the [privacy documentation »](/api/privacy.md) for more info.

```tl
inputPrivacyKeyStatusTimestamp#4f96cb18 = InputPrivacyKey;
inputPrivacyKeyChatInvite#bdfb0426 = InputPrivacyKey;
inputPrivacyKeyPhoneCall#fabadc5f = InputPrivacyKey;
inputPrivacyKeyPhoneP2P#db9e70d2 = InputPrivacyKey;
inputPrivacyKeyForwards#a4dd4c08 = InputPrivacyKey;
inputPrivacyKeyProfilePhoto#5719bacc = InputPrivacyKey;
inputPrivacyKeyPhoneNumber#352dafa = InputPrivacyKey;
inputPrivacyKeyAddedByPhone#d1219bdd = InputPrivacyKey;
inputPrivacyKeyVoiceMessages#aee69d68 = InputPrivacyKey;
inputPrivacyKeyAbout#3823cc40 = InputPrivacyKey;
inputPrivacyKeyBirthday#d65a11cc = InputPrivacyKey;
inputPrivacyKeyStarGiftsAutoSave#e1732341 = InputPrivacyKey;
inputPrivacyKeyNoPaidMessages#bdc597b4 = InputPrivacyKey;
inputPrivacyKeySavedMusic#4dbe9226 = InputPrivacyKey;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputPrivacyKeyStatusTimestamp](/constructor/inputPrivacyKeyStatusTimestamp.md) | Whether people will be able to see our exact last online timestamp.\
\
Note that if *we* decide to hide our exact last online timestamp to someone (i.e., users A, B, C, or all users) **and** we do not have a [Premium](/api/premium.md) subscription, we won't be able to see the exact last online timestamp of those users (A, B, C, or all users), even if those users *do* share it with us.\
\
If those users *do* share their exact online status with us, but we can't see it due to the reason mentioned above, the `by_me` flag of [userStatusRecently](/constructor/userStatusRecently.md), [userStatusLastWeek](/constructor/userStatusLastWeek.md), [userStatusLastMonth](/constructor/userStatusLastMonth.md) will be set. |
| [inputPrivacyKeyChatInvite](/constructor/inputPrivacyKeyChatInvite.md) | Whether people will be able to invite you to chats |
| [inputPrivacyKeyPhoneCall](/constructor/inputPrivacyKeyPhoneCall.md) | Whether you will accept phone calls |
| [inputPrivacyKeyPhoneP2P](/constructor/inputPrivacyKeyPhoneP2P.md) | Whether to allow P2P communication during VoIP calls |
| [inputPrivacyKeyForwards](/constructor/inputPrivacyKeyForwards.md) | Whether messages forwarded from you will be [anonymous](https://telegram.org/blog/unsend-privacy-emoji#anonymous-forwarding) |
| [inputPrivacyKeyProfilePhoto](/constructor/inputPrivacyKeyProfilePhoto.md) | Whether people will be able to see your profile picture |
| [inputPrivacyKeyPhoneNumber](/constructor/inputPrivacyKeyPhoneNumber.md) | Whether people will be able to see your phone number |
| [inputPrivacyKeyAddedByPhone](/constructor/inputPrivacyKeyAddedByPhone.md) | Whether people can add you to their contact list by your phone number |
| [inputPrivacyKeyVoiceMessages](/constructor/inputPrivacyKeyVoiceMessages.md) | Whether people can send you voice messages or round videos ([Premium](/api/premium.md) users only). |
| [inputPrivacyKeyAbout](/constructor/inputPrivacyKeyAbout.md) | Whether people can see your bio |
| [inputPrivacyKeyBirthday](/constructor/inputPrivacyKeyBirthday.md) | Whether the user can see our birthday. |
| [inputPrivacyKeyStarGiftsAutoSave](/constructor/inputPrivacyKeyStarGiftsAutoSave.md) | Whether received [gifts](/api/gifts.md) will be automatically displayed on our profile |
| [inputPrivacyKeyNoPaidMessages](/constructor/inputPrivacyKeyNoPaidMessages.md) | Who can send you messages without paying, if [paid messages »](/api/paid-messages.md) are enabled. |
| [inputPrivacyKeySavedMusic](/constructor/inputPrivacyKeySavedMusic.md) | Whether the user can see the [songs we pinned to our profile »](/api/profile.md#music). |

### Related pages

#### [Privacy settings](/api/privacy.md)
Telegram allows users to specify granular privacy settings, choosing which users can or can't interact with them in certain ways.

#### [PrivacyKey](/type/PrivacyKey.md)
Privacy **keys** together with [privacy rules »](/api/privacy.md#privacy-rules) indicate *what* can or can't someone do and are specified by a [PrivacyKey](/type/PrivacyKey.md) constructor, and its input counterpart [InputPrivacyKey](/type/InputPrivacyKey.md).

See the [privacy documentation »](/api/privacy.md) for more info.

#### [InputPrivacyKey](/type/InputPrivacyKey.md)
Privacy **keys** together with [privacy rules »](/api/privacy.md#privacy-rules) indicate *what* can or can't someone do and are specified by a [PrivacyKey](/type/PrivacyKey.md) constructor, and its input counterpart [InputPrivacyKey](/type/InputPrivacyKey.md).

See the [privacy documentation »](/api/privacy.md) for more info.