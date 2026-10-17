# PeerSettings

List of actions that are possible when interacting with this user, to be shown as suggested actions in the chat bar

```tl
peerSettings#f47741f7 flags:# report_spam:flags.0?true add_contact:flags.1?true block_contact:flags.2?true share_contact:flags.3?true need_contacts_exception:flags.4?true report_geo:flags.5?true autoarchived:flags.7?true invite_members:flags.8?true request_chat_broadcast:flags.10?true business_bot_paused:flags.11?true business_bot_can_reply:flags.12?true geo_distance:flags.6?int request_chat_title:flags.9?string request_chat_date:flags.9?int business_bot_id:flags.13?long business_bot_manage_url:flags.13?string charge_paid_message_stars:flags.14?long registration_month:flags.15?string phone_country:flags.16?string name_change_date:flags.17?int photo_change_date:flags.18?int = PeerSettings;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [peerSettings](/constructor/peerSettings.md) | List of actions that are possible when interacting with this user, to be shown as suggested actions in the [chat action bar »](/api/action-bar.md), see [here »](/api/action-bar.md) for more info. |