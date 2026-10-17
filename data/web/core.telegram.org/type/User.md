# User

Object defines a user.

```tl
userEmpty#d3bc4b7a id:long = User;
user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

---functions---

account.updateProfile#78515775 flags:# first_name:flags.0?string last_name:flags.1?string about:flags.2?string = User;
account.updateUsername#3e0bdd7c username:string = User;
account.changePhone#70c32edb phone_number:string phone_code_hash:string phone_code:string = User;
contacts.importContactToken#13005788 token:string = User;
channels.getMessageAuthor#ece2a0e6 channel:InputChannel id:int = User;
messages.getFutureChatCreatorAfterLeave#3b7d0ea6 peer:InputPeer = User;
bots.createBot#e5b17f2b flags:# via_deeplink:flags.0?true name:string username:string manager_id:InputUser = User;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [userEmpty](/constructor/userEmpty.md) | Empty constructor, non-existent user. |
| [user](/constructor/user.md) | Indicates info about a certain user.\
\
Unless specified otherwise, when updating the [local peer database](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).\
\
See [here »](https://github.com/tdlib/td/blob/73035e4a69ed26df563652de14aa9c4c86d23420/td/telegram/UserManager.cpp#L3106) for an implementation of the logic to use when updating the [local user peer database](/api/peers.md). |

### Methods

| Method | Description |
| --- | --- |
| [account.updateProfile](/method/account.updateProfile.md) | Updates user profile. |
| [account.updateUsername](/method/account.updateUsername.md) | Changes username for the current user. |
| [account.changePhone](/method/account.changePhone.md) | Change the phone number of the current account |
| [contacts.importContactToken](/method/contacts.importContactToken.md) | Obtain user info from a [temporary profile link](/api/links.md#temporary-profile-links). |
| [messages.getFutureChatCreatorAfterLeave](/method/messages.getFutureChatCreatorAfterLeave.md) | Group/channel owners only: returns the ID of the user that will become the new owner of the group if we decide to leave the group, see [here »](/api/channel.md#leaving-groups-channels) for more info on the full flow. |
| [channels.getMessageAuthor](/method/channels.getMessageAuthor.md) | Can only be invoked by non-bot admins of a [monoforum »](/api/monoforum.md), obtains the original sender of a message sent by other monoforum admins to the monoforum, on behalf of the channel associated to the monoforum. |
| [bots.createBot](/method/bots.createBot.md) | Create a [managed bot »](/api/bots/managed-bots.md#creating-a-managed-bot) owned by the current user and controlled by the specified manager bot. |