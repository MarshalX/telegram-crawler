# Managed bots


How to create bot accounts using the MTProto API.

Users can create **managed** bots (which are controlled by a specific manager bot) directly through the MTProto API, without interacting with [@BotFather](https://t.me/botfather).

### Creating a managed bot

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    ---functions---

    bots.checkUsername#87f2219b username:string = Bool;
    bots.createBot#e5b17f2b flags:# via_deeplink:flags.0?true name:string username:string manager_id:InputUser = User;

A **managed bot** is a bot that is fully owned by the user that created it using [bots.createBot](/method/bots.createBot.md).  

It can be managed by the user using [@BotFather](https://t.me/BotFather) as for all owned bots, but it can also be managed by the **manager bot**, specified in the `manager_id` parameter of [bots.createBot](/method/bots.createBot.md).  

The manager bot must have the [user](/constructor/user.md).`bot_can_manage_bots` flag set, which indicates that the bot can manage bots created by users through this flow, and can be toggled through [@BotFather](https://t.me/BotFather).  

To create a managed bot, first check if the username chosen by the user is available and can be used for a managed bot, by calling [bots.checkUsername](/method/bots.checkUsername.md), which will return [boolTrue](/constructor/boolTrue.md) on success, and an RPC error otherwise (see the method page for a list of errors that can be returned, and their meanings).  

As with all bots, the username **must** end in `bot`.  

Clients that implement a live username field should check the username locally before invoking [bots.checkUsername](/method/bots.checkUsername.md): only letters, digits and underscores are allowed, and the full username including the `bot` suffix must be 5-32 characters long.  

Debounce [bots.checkUsername](/method/bots.checkUsername.md) with a 200 millisecond delay.  

Then, invoke [bots.createBot](/method/bots.createBot.md), passing the following parameters:

* `name` is the bot display name, 1-64 characters.
* `username` is the checked username, including the `bot` suffix.
* `manager_id` is the manager bot.
* Set `via_deeplink` only if the creation prompt was opened from a [managed bot deep link &raquo;](/api/links.md#managed-bot-creation-request-links).

The returned [user](/constructor/user.md) is the created bot.  

The method can also return the following errors, instead:

* `BOT_CREATE_LIMIT_EXCEEDED` if the current user already owns the maximum allowed number of owned bots.    

  The owned bots limit is exposed through the [`bots_create_limit_default` &raquo;](/api/config.md#bots-create-limit-default) and [`bots_create_limit_premium` &raquo;](/api/config.md#bots-create-limit-premium) config keys, and as the [`double_limits__bots_create` &raquo;](/api/premium.md#double-limits-bots-create) Premium limit.

  If the current user is a non-Premium account, upon reception of this error the client should invite the user to purchase a [Premium subscription](/api/premium.md); if the current user already has a Premium subscription, clients should offer to open `https://t.me/BotFather?start=deletebot` so the user can delete an owned bot.  

* `MANAGER_PERMISSION_MISSING` if the bot passed to `manager_id` does not have the [user](/constructor/user.md).`bot_can_manage_bots` flag set (i.e. is not a **manager bot**).  
* `USERNAME_OCCUPIED` if the username was occupied in the lapse of time between [bots.checkUsername](/method/bots.checkUsername.md) and [bots.createBot](/method/bots.createBot.md)

Only users can invoke [bots.checkUsername](/method/bots.checkUsername.md) and [bots.createBot](/method/bots.createBot.md): bots and Mini Apps can request the creation of a managed bot using [peer requests &raquo;](/api/bots/buttons.md#requesting-a-managed-bot).

[Managed bot creation request deep links &raquo;](/api/links.md#managed-bot-creation-request-links) may also be used to request creation of a managed bots, just like with [peer requests &raquo;](/api/bots/buttons.md#requesting-a-managed-bot): handle these links by starting the usual [managed bot creation flow &raquo;](/api/bots/managed-bots.md#creating-a-managed-bot) with the arguments specified in the link, additionally setting the `via_deeplink` flag when finally invoking [bots.createBot](/method/bots.createBot.md).  

### Managing a managed bot

    updateManagedBot#4880ed9a user_id:long bot_id:long qts:int = Update;

    bots.exportedBotToken#3c60b621 token:string = bots.ExportedBotToken;

    bots.accessSettings#dd1fbf93 flags:# restricted:flags.0?true add_users:flags.1?Vector<User> = bots.AccessSettings;

    ---functions---

    bots.exportBotToken#bd0d99eb bot:InputUser revoke:Bool = bots.ExportedBotToken;
    bots.getAccessSettings#213853a3 bot:InputUser = bots.AccessSettings;
    bots.editAccessSettings#31813cd8 flags:# restricted:flags.0?true bot:InputUser add_users:flags.1?Vector<InputUser> = Bool;

The profile of a managed bot exposes the ID of its manager in the [userFull](/constructor/userFull.md).`bot_manager_id` field, see [here &raquo;](/api/profile.md#managed-bot-manager) for more info.  

When a managed bot is created or updated, (only) the manager bot will receive an [updateManagedBot](/constructor/updateManagedBot.md).  

The manager bot can then invoke [bots.exportBotToken](/method/bots.exportBotToken.md) for `bot_id` to obtain the managed [bot token](/api/bots.md). Set `revoke` to replace the current token.

Manager bots can also use [bots.getAccessSettings](/method/bots.getAccessSettings.md) and [bots.editAccessSettings](/method/bots.editAccessSettings.md) to view and edit access restriction settings of the managed bot.  

If [bots.accessSettings](/constructor/bots.accessSettings.md).`restricted` is set, only the owner of the managed bot will be able to access the managed bot.  

Optionally, only if `restricted` is set, [bots.accessSettings](/constructor/bots.accessSettings.md).`add_users` may be populated with an additional list of users (max 10 excluding the owner) who will be able to access the managed bot, in addition to the owner.  
