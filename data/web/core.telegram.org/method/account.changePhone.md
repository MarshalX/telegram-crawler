# account.changePhone

Change the phone number of the current account

```tl
userEmpty#d3bc4b7a id:long = User;
user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;
---functions---
account.changePhone#70c32edb phone_number:string phone_code_hash:string phone_code:string = User;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **phone\_number** | [string](/type/string.md) | New phone number |
| **phone\_code\_hash** | [string](/type/string.md) | Phone code hash received when calling [account.sendChangePhoneCode](/method/account.sendChangePhoneCode.md) |
| **phone\_code** | [string](/type/string.md) | Phone code received when calling [account.sendChangePhoneCode](/method/account.sendChangePhoneCode.md) |

### Result
[User](/type/User.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PHONE\_CODE\_EMPTY | phone_code is missing. |
| 400 | PHONE\_CODE\_EXPIRED | The phone code you provided has expired. |
| 400 | PHONE\_CODE\_INVALID | The provided phone code is invalid. |
| 406 | PHONE\_NUMBER\_INVALID | The phone number is invalid. |
| 400 | PHONE\_NUMBER\_OCCUPIED | The phone number is already in use. |

### Related pages

#### [account.sendChangePhoneCode](/method/account.sendChangePhoneCode.md)
Verify a new phone number to associate to the current account