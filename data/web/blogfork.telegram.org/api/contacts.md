# Contact list


Working with contacts.

[Contacts deep links&nbsp;&raquo;](/api/links.md#contacts-links) can be used to bring the user to the contact list, optionally directly opening a specific section or action (search, sorting, adding a new contact, inviting friends or managing contacts).  

### Importing phone contacts

Schema:
    
    inputPhoneContact#6a1dc4be flags:# client_id:long phone:string first_name:string last_name:string note:flags.0?TextWithEntities = InputContact;
    
    importedContact#c13e3c50 user_id:long client_id:long = ImportedContact;
    popularContact#5ce14175 client_id:long importers:int = PopularContact;

    contacts.importedContacts#77d01c3b imported:Vector<ImportedContact> popular_invites:Vector<PopularContact> retry_contacts:Vector<long> users:Vector<User> = contacts.ImportedContacts;

    ---functions---

    contacts.importContacts#2c800be5 contacts:Vector<InputContact> = contacts.ImportedContacts;

To upload the local contact list to Telegram and see which contacts are already signed up on telegram, use [contacts.importContacts](/method/contacts.importContacts.md), passing an array of [inputPhoneContact](/constructor/inputPhoneContact.md) constructors, containing:

* `phone` - The phone number in international format
* `first_name` - First name
* `last_name` - Last name, can be empty
* `client_id` - An arbitrary 64-bit integer (**not** the contact's Telegram user ID, since we do not have it yet); make sure there are no collisions between the client_ids passed to a single [contacts.importContacts](/method/contacts.importContacts.md) call (for example, use a simple incremental ID starting from 0)

The method will return a [contacts.importedContacts](/constructor/contacts.importedContacts.md) constructor, containing the following fields:

* `imported` - A list of successfully imported contacts that have an associated Telegram account as [importedContact](/constructor/importedContact.md) constructors.  
  `user_id` is the Telegram user ID, `client_id` is the `client_id` associated to the contact, passed during the method call.
  Note that according to the user's [privacy settings](/api/privacy.md) (specifically, the [inputPrivacyKeyAddedByPhone](/constructor/inputPrivacyKeyAddedByPhone.md) privacy key), not all contacts which have an associated Telegram account may be returned here.
* `users` - Contains info about the Telegram users mentioned in `imported`
* `popular_invites` - Contains info about popular contacts: each [popularContact](/constructor/popularContact.md) constructor indicates that the contact with the specified `client_id` was imported `imported` times by that many Telegram users.
* `retry_contacts` - List of contact ids that could not be imported due to a server-side system limitation and have to be reimported with another call to [contacts.importedContacts](/constructor/contacts.importedContacts.md).

### Resolve a phone number 

    contacts.resolvedPeer#7f077ad9 peer:Peer chats:Vector<Chat> users:Vector<User> = contacts.ResolvedPeer;
    
    ---functions---
    
    contacts.resolvePhone#8af94344 phone:string = contacts.ResolvedPeer;

You can use [contacts.resolvePhone](/method/contacts.resolvePhone.md) to check if a phone number has an associated Telegram account, without importing it as a contact.  

If there is no Telegram account associated with the specified phone number, `PHONE_NOT_OCCUPIED` will be returned.  

The same error will be returned if the target account's [privacy settings &raquo;](/api/privacy.md) (specifically, the [inputPrivacyKeyAddedByPhone](/constructor/inputPrivacyKeyAddedByPhone.md) privacy key) prevent phone number lookups of their account.  

Make sure to implement client-side ratelimiting/debounce for this method, allowing at most 1 call every 3 seconds.  

### Adding Telegram users as contacts

Schema:

    users.userFull#3b6d152e full_user:UserFull chats:Vector<Chat> users:Vector<User> = users.UserFull;

    inputUser#f21158c6 user_id:long access_hash:long = InputUser;
    
    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    peerSettings#f47741f7 flags:# report_spam:flags.0?true add_contact:flags.1?true block_contact:flags.2?true share_contact:flags.3?true need_contacts_exception:flags.4?true report_geo:flags.5?true autoarchived:flags.7?true invite_members:flags.8?true request_chat_broadcast:flags.10?true business_bot_paused:flags.11?true business_bot_can_reply:flags.12?true geo_distance:flags.6?int request_chat_title:flags.9?string request_chat_date:flags.9?int business_bot_id:flags.13?long business_bot_manage_url:flags.13?string charge_paid_message_stars:flags.14?long registration_month:flags.15?string phone_country:flags.16?string name_change_date:flags.17?int photo_change_date:flags.18?int = PeerSettings;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    updatePeerSettings#6a7e7366 peer:Peer settings:PeerSettings = Update;

    ---functions---

    users.getFullUser#b60f5918 id:InputUser = users.UserFull;

    contacts.addContact#d9ba2e54 flags:# add_phone_privacy_exception:flags.0?true id:InputUser first_name:string last_name:string phone:string note:flags.1?TextWithEntities = Updates;

Telegram users may also be added to the contact list (even if we do not have access to their phone number!) using [contacts.addContact](/method/contacts.addContact.md).  

Set the `add_phone_privacy_exception` flag if we wish to allow the other user to see our phone number: this flag **must** be set if the `need_contacts_exception` flag of [peerSettings](/constructor/peerSettings.md) is set (see the [action bar documentation for more info&nbsp;&raquo;](/api/action-bar.md)).  

The other user will be offered to also add us to the contact list via the [add contact action bar](/api/action-bar.md): if they accept, their phone number will be automatically added to our contact.  

When adding or editing a contact, you can now include a private note — to help you remember how you met, where they work, or their favorite ice cream flavor; see [here &raquo;](/api/contacts.md#private-notes-for-contacts) for more info.  

### Private notes for contacts

    inputPhoneContact#6a1dc4be flags:# client_id:long phone:string first_name:string last_name:string note:flags.0?TextWithEntities = InputContact;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    ---functions---

    contacts.addContact#d9ba2e54 flags:# add_phone_privacy_exception:flags.0?true id:InputUser first_name:string last_name:string phone:string note:flags.1?TextWithEntities = Updates;
    contacts.importContacts#2c800be5 contacts:Vector<InputContact> = contacts.ImportedContacts;

    contacts.updateContactNote#139f63fb id:InputUser note:TextWithEntities = Bool;

    users.getFullUser#b60f5918 id:InputUser = users.UserFull;

When adding or editing a **Telegram contact**, you can now include a private note — to help you remember how you met, where they work, or their favorite ice cream flavor.  

Notes for contacts are **only visible to you** and appear on the user's Telegram [profile &raquo;](/api/profile.md) under their bio.  

A note can be added when adding contacts using [contacts.addContact](/method/contacts.addContact.md).`note`, when importing contacts with [contacts.importContacts](/method/contacts.importContacts.md) (passing it to [inputPhoneContact](/constructor/inputPhoneContact.md).`note`).  

Edit notes of existing contacts using [contacts.updateContactNote](/method/contacts.updateContactNote.md).  

The maximum note length is specified in the [contact_note_length_limit client configuration key &raquo;](/api/config.md#contact-note-length-limit).  

Note that Telegram users may be added to the contact list (and thus may have an associated private note) even if we do not have access to their phone number using [contacts.addContact](/method/contacts.addContact.md), see [here &raquo;](/api/contacts.md#adding-telegram-users-as-contacts) for more info.  

The note will then be available in [userFull](/constructor/userFull.md).`note`, and can be fetched using [users.getFullUser](/method/users.getFullUser.md).  

### Share our phone number

    ---functions---

    contacts.acceptContact#f831a20f id:InputUser = Updates;

This method is invoked if the user clicks on the add contact button in the [add contact chat bar](/api/action-bar.md#add-contact).  

The bar is activated only if the other user has [added us as a contact](#adding-telegram-users-as-contacts) using [contacts.addContact](/method/contacts.addContact.md) without using a phone number, and none of the `add_contact`, `report_spam`, `block_contact` [bar flags](/api/action-bar.md) are set, the `share_contact` flag are be set, indicating we can invoke [contacts.acceptContact](/method/contacts.acceptContact.md) to share our phone number with the other user.  

### Fetching the contact list

Schema:

    contact#145ade0b user_id:long mutual:Bool = Contact;
    
    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    contacts.contacts#eae87e42 contacts:Vector<Contact> saved_count:int users:Vector<User> = contacts.Contacts;
    contacts.contactsNotModified#b74ba9d2 = contacts.Contacts;

    savedPhoneContact#1142bd56 phone:string first_name:string last_name:string date:int = SavedContact;

    ---functions---

    contacts.getContacts#5dd69e12 hash:long = contacts.Contacts;

    contacts.getSaved#82f1e39f = Vector<SavedContact>;

    contacts.getContactIDs#7adc669d hash:long = Vector<int>;

Use [contacts.getContacts](/method/contacts.getContacts.md) to obtain all members of the contact list that have an associated Telegram account.  

Use [contacts.getContactIDs](/method/contacts.getContactIDs.md) to obtain an array of Telegram user IDs for all contacts (0 is returned for contacts do not have an associated Telegram account or have hidden their account using privacy settings).  

To obtain the *full* contact list, including contacts which do not have an associated Telegram account, use [contacts.getSaved](/method/contacts.getSaved.md) in combination with a [takeout session&nbsp;&raquo;](/api/takeout.md).  

### Getting contact statuses

Schema:

    userStatusEmpty#9d05049 = UserStatus;
    userStatusOnline#edb93949 expires:int = UserStatus;
    userStatusOffline#8c703f was_online:int = UserStatus;
    userStatusRecently#7b197dc8 flags:# by_me:flags.0?true = UserStatus;
    userStatusLastWeek#541a1d1a flags:# by_me:flags.0?true = UserStatus;
    userStatusLastMonth#65899777 flags:# by_me:flags.0?true = UserStatus;

    contactStatus#16d9703b user_id:long status:UserStatus = ContactStatus;

    ---functions---

    contacts.getStatuses#c4a353ee = Vector<ContactStatus>;

Use [contacts.getStatuses](/method/contacts.getStatuses.md) to obtain the online statuses of all contacts with an accessible Telegram account.  

### Searching for contacts

Schema:

    contacts.found#b3134d9d my_results:Vector<Peer> results:Vector<Peer> chats:Vector<Chat> users:Vector<User> = contacts.Found;

    contacts.sponsoredPeersEmpty#ea32b4b1 = contacts.SponsoredPeers;
    contacts.sponsoredPeers#eb032884 peers:Vector<SponsoredPeer> chats:Vector<Chat> users:Vector<User> = contacts.SponsoredPeers;

    ---functions---

    contacts.search#11f812d8 q:string limit:int = contacts.Found;

    contacts.getSponsoredPeers#b6c8c393 q:string = contacts.SponsoredPeers;

Use [contacts.search](/method/contacts.search.md) to search within the contact list.  

**Note**: when using this method in global search, [contacts.getSponsoredPeers](/method/contacts.getSponsoredPeers.md) should also be invoked, returning a list of sponsored peers to be displayed after the results in [contacts.found](/constructor/contacts.found.md).`my_results` and before the results in [contacts.found](/constructor/contacts.found.md).`results`: see [here &raquo;](/api/sponsored-messages.md#getting-sponsored-search-results) for more info.  

### Deleting contacts

Schema:

    ---functions---

    contacts.deleteContacts#96a0e00 id:Vector<InputUser> = Updates;

    contacts.deleteByPhones#1013fd9e phones:Vector<string> = Bool;

    contacts.resetSaved#879537f1 = Bool;

Use [contacts.deleteContacts](/method/contacts.deleteContacts.md) to delete contacts with an associated Telegram account; the returned [Updates](/type/Updates.md) will contain updated user information.  

Use [contacts.deleteByPhones](/method/contacts.deleteByPhones.md) to delete contacts by their phone number, even if they don't have an associated Telegram account.  

Use [contacts.resetSaved](/method/contacts.resetSaved.md) to remove all contacts without an associated Telegram account.  

