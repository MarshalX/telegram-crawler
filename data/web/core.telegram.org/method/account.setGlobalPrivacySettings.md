# account.setGlobalPrivacySettings

Set global privacy settings

```tl
globalPrivacySettings#fe41b34f flags:# archive_and_mute_new_noncontact_peers:flags.0?true keep_archived_unmuted:flags.1?true keep_archived_folders:flags.2?true hide_read_marks:flags.3?true new_noncontact_peers_require_premium:flags.4?true display_gifts_button:flags.7?true noncontact_peers_paid_stars:flags.5?long disallowed_gifts:flags.6?DisallowedGiftsSettings = GlobalPrivacySettings;
---functions---
account.setGlobalPrivacySettings#1edaaac2 settings:GlobalPrivacySettings = GlobalPrivacySettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **settings** | [GlobalPrivacySettings](/type/GlobalPrivacySettings.md) | Global privacy settings |

### Result
[GlobalPrivacySettings](/type/GlobalPrivacySettings.md)

### Only users can use this method

### This method can be invoked over a [business connection &raquo;](/api/bots/connected-business-bots.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | AUTOARCHIVE\_NOT\_AVAILABLE | The autoarchive setting is not available at this time: please check the value of the [autoarchive_setting_available field in client config&nbsp;&raquo;](/api/config.md#client-configuration) before calling this method. |
| 403 | BOT\_ACCESS\_FORBIDDEN | The specified method *can* be used over a [business connection](/api/bots/connected-business-bots.md) for some operations, but the specified query attempted an operation that is not allowed over a business connection. |
| 400 | BUSINESS\_CONNECTION\_INVALID | The `connection_id` passed to the wrapping [invokeWithBusinessConnection](/api/business.md) call is invalid. |
| 403 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.