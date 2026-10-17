# Fragment collectibles


Telegram users can make it easy for others to contact them or find their public groups and channels via [usernames](https://telegram.org/faq#usernames-and-t-me): clients can also assign multiple [Fragment&nbsp;&raquo;](https://fragment.com) **collectible usernames** to accounts, supergroups and channels they own; [Fragment&nbsp;&raquo;](https://fragment.com) also allows purchasing phone number collectibles that can be used to register Telegram accounts.  

### Collectible usernames

Schema:

    username#b4073647 flags:# editable:flags.0?true active:flags.1?true username:string = Username;

    updateUserName#a7848924 user_id:long first_name:string last_name:string usernames:Vector<Username> = Update;

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    channel#1c32b11c flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true signature_profiles:flags2.12?true autotranslation:flags2.15?true broadcast_messages_allowed:flags2.16?true monoforum:flags2.17?true forum_tabs:flags2.19?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?RecentStory color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int subscription_until_date:flags2.11?int bot_verification_icon:flags2.13?long send_paid_messages_stars:flags2.14?long linked_monoforum_id:flags2.18?long = Chat;

    ---functions---

    account.toggleUsername#58d6b376 username:string active:Bool = Bool;
    account.reorderUsernames#ef500eab order:Vector<string> = Bool;

    bots.reorderUsernames#9709b1c2 bot:InputUser order:Vector<string> = Bool;
    bots.toggleUsername#053ca973 bot:InputUser username:string active:Bool = Bool;

    channels.toggleUsername#50f24105 channel:InputChannel username:string active:Bool = Bool;
    channels.reorderUsernames#b45ced1d channel:InputChannel order:Vector<string> = Bool;
    channels.deactivateAllUsernames#0a245dd3 channel:InputChannel = Bool;

Collectible usernames work just like basic [@usernames](https://t.me/username), they appear in Global Search results and have [deep links&nbsp;&raquo;](/api/links.md#public-username-links), just like basic usernames.  

The ownership of collectible usernames is secured by TON, a fast and scalable blockchain network. They can be bought and sold through the [Fragment platform&nbsp;&raquo;](https://fragment.com), giving a simple and secure way to acquire and exchange valuable Telegram domains.  

On the Fragment platform, clients may associate or dissociate purchased collectible usernames either to their Telegram account, or to a bot/channel/supergroup they own.  

If any collectible username is associated to an account, channel or supergroup, [user](/constructor/user.md).`username` and [channel](/constructor/channel.md).`username` won't be set, and [user](/constructor/user.md).`usernames` and [channel](/constructor/channel.md).`usernames` will be set, instead: these fields contain an array of [username](/constructor/username.md) constructors, which indicate whether a certain username is a basic username (`editable` is set) or a collectible username (`editable` is not set); and whether a collectible username is `active` or not.  
The first username in the `usernames` vector must be shown in-UI as the main username.

Immediately after association, a username is marked as not `active` (i.e. only the owner can see it in the `usernames` list): use [account.toggleUsername](/method/account.toggleUsername.md), [bots.toggleUsername](/method/bots.toggleUsername.md) or [channels.toggleUsername](/method/channels.toggleUsername.md) to mark it as active.  
Note that you can't mark as inactive the basic (non-collectible) username, if any.  

[channels.deactivateAllUsernames](/method/channels.deactivateAllUsernames.md) may also be used to mark as inactive all collectible usernames associated to a certain supergroup or channel: useful for example when making a group or channel private, by first invoking [channels.updateUsername](/method/channels.updateUsername.md) with an empty username to remove the editable username (if present), and then invoking this method to remove all associated collectible usernames.  

Use [account.reorderUsernames](/method/account.reorderUsernames.md)/[bots.reorderUsernames](/method/bots.reorderUsernames.md)/[channels.reorderUsernames](/method/channels.reorderUsernames.md) to change the order of the usernames associated to an account, channel or supergroup: all currently active usernames must be specified.  

### Collectible phone numbers

[Fragment](https://fragment.com) collectible phone numbers can only be used to create Telegram accounts, using the usual [sign up/login flow&nbsp;&raquo;](/api/auth.md).

### Fetching info about Fragment collectibles

Schema:

    inputCollectibleUsername#e39460a9 username:string = InputCollectible;
    inputCollectiblePhone#a2e214a4 phone:string = InputCollectible;

    fragment.collectibleInfo#6ebdff91 purchase_date:int currency:string amount:long crypto_currency:string crypto_amount:long url:string = fragment.CollectibleInfo;

    ---functions---

    fragment.getCollectibleInfo#be1e85ba collectible:InputCollectible = fragment.CollectibleInfo;

[fragment.getCollectibleInfo](/method/fragment.getCollectibleInfo.md) may be used to fetch info about [Fragment](https://fragment.com) collectible owned by us or other users (i.e. the purchase date & price).  

The collectible must be visible to the current user, for example it can be a Fragment user/phone number collectible we own, or a Fragment username that another user has enabled on their account, or another user's Fragment phone number that we can see thanks to the owner's [privacy settings](/api/privacy.md).  