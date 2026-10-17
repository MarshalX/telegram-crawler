# PrivacyKey

Privacy **keys** together with [privacy rules »](/api/privacy.md#privacy-rules) indicate *what* can or can't someone do and are specified by a [PrivacyKey](/type/PrivacyKey.md) constructor, and its input counterpart [InputPrivacyKey](/type/InputPrivacyKey.md).

See the [privacy documentation »](/api/privacy.md) for more info.

```tl
privacyKeyStatusTimestamp#bc2eab30 = PrivacyKey;
privacyKeyChatInvite#500e6dfa = PrivacyKey;
privacyKeyPhoneCall#3d662b7b = PrivacyKey;
privacyKeyPhoneP2P#39491cc8 = PrivacyKey;
privacyKeyForwards#69ec56a3 = PrivacyKey;
privacyKeyProfilePhoto#96151fed = PrivacyKey;
privacyKeyPhoneNumber#d19ae46d = PrivacyKey;
privacyKeyAddedByPhone#42ffd42b = PrivacyKey;
privacyKeyVoiceMessages#697f414 = PrivacyKey;
privacyKeyAbout#a486b761 = PrivacyKey;
privacyKeyBirthday#2000a518 = PrivacyKey;
privacyKeyStarGiftsAutoSave#2ca4fdf8 = PrivacyKey;
privacyKeyNoPaidMessages#17d348d2 = PrivacyKey;
privacyKeySavedMusic#ff7a571b = PrivacyKey;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [privacyKeyStatusTimestamp](/constructor/privacyKeyStatusTimestamp.md) | Whether we can see the last online timestamp of this user.\
\
Note that if *we* decide to hide our exact last online timestamp to someone (i.e., users A, B, C, or all users) **and** we do not have a [Premium](/api/premium.md) subscription, we won't be able to see the exact last online timestamp of those users (A, B, C, or all users), even if those users *do* share it with us.\
\
If those users *do* share their exact online status with us, but we can't see it due to the reason mentioned above, the `by_me` flag of [userStatusRecently](/constructor/userStatusRecently.md), [userStatusLastWeek](/constructor/userStatusLastWeek.md), [userStatusLastMonth](/constructor/userStatusLastMonth.md) will be set. |
| [privacyKeyChatInvite](/constructor/privacyKeyChatInvite.md) | Whether the user can be invited to chats |
| [privacyKeyPhoneCall](/constructor/privacyKeyPhoneCall.md) | Whether the user accepts phone calls |
| [privacyKeyPhoneP2P](/constructor/privacyKeyPhoneP2P.md) | Whether P2P connections in phone calls with this user are allowed |
| [privacyKeyForwards](/constructor/privacyKeyForwards.md) | Whether messages forwarded from the user will be [anonymously forwarded](https://telegram.org/blog/unsend-privacy-emoji#anonymous-forwarding) |
| [privacyKeyProfilePhoto](/constructor/privacyKeyProfilePhoto.md) | Whether the profile picture of the user is visible |
| [privacyKeyPhoneNumber](/constructor/privacyKeyPhoneNumber.md) | Whether the user allows us to see his phone number |
| [privacyKeyAddedByPhone](/constructor/privacyKeyAddedByPhone.md) | Whether this user can be added to our contact list by their phone number |
| [privacyKeyVoiceMessages](/constructor/privacyKeyVoiceMessages.md) | Whether the user accepts voice messages |
| [privacyKeyAbout](/constructor/privacyKeyAbout.md) | Whether people can see your bio |
| [privacyKeyBirthday](/constructor/privacyKeyBirthday.md) | Whether the user can see our birthday. |
| [privacyKeyStarGiftsAutoSave](/constructor/privacyKeyStarGiftsAutoSave.md) | Whether received [gifts](/api/gifts.md) will be automatically displayed on our profile |
| [privacyKeyNoPaidMessages](/constructor/privacyKeyNoPaidMessages.md) | Who can send you messages without paying, if [paid messages »](/api/paid-messages.md) are enabled. |
| [privacyKeySavedMusic](/constructor/privacyKeySavedMusic.md) | Whether the user can see the [songs we pinned to our profile »](/api/profile.md#music). |

### Related pages

#### [Privacy settings](/api/privacy.md)
Telegram allows users to specify granular privacy settings, choosing which users can or can't interact with them in certain ways.

#### [PrivacyKey](/type/PrivacyKey.md)
Privacy **keys** together with [privacy rules »](/api/privacy.md#privacy-rules) indicate *what* can or can't someone do and are specified by a [PrivacyKey](/type/PrivacyKey.md) constructor, and its input counterpart [InputPrivacyKey](/type/InputPrivacyKey.md).

See the [privacy documentation »](/api/privacy.md) for more info.

#### [InputPrivacyKey](/type/InputPrivacyKey.md)
Privacy **keys** together with [privacy rules »](/api/privacy.md#privacy-rules) indicate *what* can or can't someone do and are specified by a [PrivacyKey](/type/PrivacyKey.md) constructor, and its input counterpart [InputPrivacyKey](/type/InputPrivacyKey.md).

See the [privacy documentation »](/api/privacy.md) for more info.