# config

Current configuration

```tl
config#cc1a241e flags:# default_p2p_contacts:flags.3?true preload_featured_stickers:flags.4?true revoke_pm_inbox:flags.6?true blocked_mode:flags.8?true force_try_ipv6:flags.14?true date:int expires:int test_mode:Bool this_dc:int dc_options:Vector<DcOption> dc_txt_domain_name:string chat_size_max:int megagroup_size_max:int forwarded_count_max:int online_update_period_ms:int offline_blur_timeout_ms:int offline_idle_timeout_ms:int online_cloud_timeout_ms:int notify_cloud_delay_ms:int notify_default_delay_ms:int push_chat_period_ms:int push_chat_limit:int edit_time_limit:int revoke_time_limit:int revoke_pm_time_limit:int rating_e_decay:int stickers_recent_limit:int channels_read_media_period:int tmp_sessions:flags.0?int call_receive_timeout_ms:int call_ring_timeout_ms:int call_connect_timeout_ms:int call_packet_timeout_ms:int me_url_prefix:string autoupdate_url_prefix:flags.7?string gif_search_username:flags.9?string venue_search_username:flags.10?string img_search_username:flags.11?string static_maps_provider:flags.12?string caption_length_max:int message_length_max:int webfile_dc_id:int suggested_lang_code:flags.2?string lang_pack_version:flags.2?int base_lang_pack_version:flags.2?int reactions_default:flags.15?Reaction autologin_token:flags.16?string = Config;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **default\_p2p\_contacts** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether the client should use P2P by default for phone calls with contacts |
| **preload\_featured\_stickers** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether the client should preload featured stickers |
| **revoke\_pm\_inbox** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Whether incoming private messages can be deleted for both participants |
| **blocked\_mode** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | Indicates that telegram is *probably* censored by governments/ISPs in the current region |
| **force\_try\_ipv6** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[true](/constructor/true.md) | Whether to forcefully connect using IPv6 [dcOptions](/type/DcOption.md), even if the client knows that IPv4 is available. |
| **date** | [int](/type/int.md) | Current date at the server |
| **expires** | [int](/type/int.md) | Expiration date of this config: when it expires it'll have to be refetched using [help.getConfig](/method/help.getConfig.md) |
| **test\_mode** | [Bool](/type/Bool.md) | Whether we're connected to the test DCs |
| **this\_dc** | [int](/type/int.md) | ID of the DC that returned the reply |
| **dc\_options** | [Vector](/type/Vector%20t)&lt;[DcOption](/type/DcOption.md)&gt; | DC IP list |
| **dc\_txt\_domain\_name** | [string](/type/string.md) | Domain name for fetching encrypted DC list from DNS TXT record |
| **chat\_size\_max** | [int](/type/int.md) | Maximum member count for normal [groups](/api/channel.md) |
| **megagroup\_size\_max** | [int](/type/int.md) | Maximum member count for [supergroups](/api/channel.md) |
| **forwarded\_count\_max** | [int](/type/int.md) | Maximum number of messages that can be forwarded at once using [messages.forwardMessages](/method/messages.forwardMessages.md). |
| **online\_update\_period\_ms** | [int](/type/int.md) | The client should [update its online status](/method/account.updateStatus.md) every N milliseconds |
| **offline\_blur\_timeout\_ms** | [int](/type/int.md) | Delay before offline status needs to be sent to the server |
| **offline\_idle\_timeout\_ms** | [int](/type/int.md) | Time without any user activity after which it should be treated offline |
| **online\_cloud\_timeout\_ms** | [int](/type/int.md) | If we are offline, but were online from some other client in last `online_cloud_timeout_ms` milliseconds after we had gone offline, then delay offline notification for `notify_cloud_delay_ms` milliseconds. |
| **notify\_cloud\_delay\_ms** | [int](/type/int.md) | If we are offline, but online from some other client then delay sending the offline notification for `notify_cloud_delay_ms` milliseconds. |
| **notify\_default\_delay\_ms** | [int](/type/int.md) | If some other client is online, then delay notification for `notification_default_delay_ms` milliseconds |
| **push\_chat\_period\_ms** | [int](/type/int.md) | Not for client use |
| **push\_chat\_limit** | [int](/type/int.md) | Not for client use |
| **edit\_time\_limit** | [int](/type/int.md) | Only messages with age (in seconds) smaller than the one specified in this field can be edited |
| **revoke\_time\_limit** | [int](/type/int.md) | Only channel/supergroup messages with age smaller than the specified can be deleted |
| **revoke\_pm\_time\_limit** | [int](/type/int.md) | Only private messages with age smaller than the specified can be deleted |
| **rating\_e\_decay** | [int](/type/int.md) | Exponential decay rate for computing [top peer rating](/api/top-rating.md) |
| **stickers\_recent\_limit** | [int](/type/int.md) | Maximum number of recent stickers |
| **channels\_read\_media\_period** | [int](/type/int.md) | Indicates that round videos (video notes) and voice messages sent in channels and older than the specified period must be marked as read |
| **tmp\_sessions** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Number of [parallel sessions](/api/datacenter.md#parallel-sessions) the client may open to the main connection of its home DC to increase throughput; if absent or `≤ 1`, a single main session must be used |
| **call\_receive\_timeout\_ms** | [int](/type/int.md) | Maximum allowed outgoing ring time in VoIP calls: if the user we're calling doesn't reply within the specified time (in milliseconds), we should hang up the call |
| **call\_ring\_timeout\_ms** | [int](/type/int.md) | Maximum allowed incoming ring time in VoIP calls: if the current user doesn't reply within the specified time (in milliseconds), the call will be automatically refused |
| **call\_connect\_timeout\_ms** | [int](/type/int.md) | VoIP connection timeout: if the instance of libtgvoip on the other side of the call doesn't connect to our instance of libtgvoip within the specified time (in milliseconds), the call must be aborted |
| **call\_packet\_timeout\_ms** | [int](/type/int.md) | If during a VoIP call a packet isn't received for the specified period of time, the call must be aborted |
| **me\_url\_prefix** | [string](/type/string.md) | The domain to use to parse [deep links »](/api/links.md). |
| **autoupdate\_url\_prefix** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[string](/type/string.md) | URL to use to auto-update the current app |
| **gif\_search\_username** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[string](/type/string.md) | Username of the bot to use to search for GIFs |
| **venue\_search\_username** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[string](/type/string.md) | Username of the bot to use to search for venues |
| **img\_search\_username** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[string](/type/string.md) | Username of the bot to use for image search |
| **static\_maps\_provider** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[string](/type/string.md) | ID of the map provider to use for venues |
| **caption\_length\_max** | [int](/type/int.md) | Maximum length of caption (length in utf8 codepoints) |
| **message\_length\_max** | [int](/type/int.md) | Maximum length of messages (length in utf8 codepoints) |
| **webfile\_dc\_id** | [int](/type/int.md) | DC ID to use to download [webfiles](/api/files.md#downloading-webfiles) |
| **suggested\_lang\_code** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Suggested language code |
| **lang\_pack\_version** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Language pack version |
| **base\_lang\_pack\_version** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Basic language pack version |
| **reactions\_default** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[Reaction](/type/Reaction.md) | Default [message reaction](/api/reactions.md) |
| **autologin\_token** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[string](/type/string.md) | Autologin token, [click here for more info on URL authorization »](/api/url-authorization.md#link-url-authorization). |

### Type
[Config](/type/Config.md)

### Related pages

#### [DcOption](/type/DcOption.md)
Information for connection to data center.

#### [help.getConfig](/method/help.getConfig.md)
Returns current configuration, including data center configuration.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [messages.forwardMessages](/method/messages.forwardMessages.md)
Forwards messages by their IDs.

#### [account.updateStatus](/method/account.updateStatus.md)
Updates online user status.

#### [Top peer rating](/api/top-rating.md)
If enabled, the rating of top peers indicates the relevance of a frequently used peer in a certain category (frequently messaged users, frequently used bots, inline bots, frequently visited channels and so on).

#### [Working with Different Data Centers](/api/datacenter.md)
How to connect to the closest DC access point for faster interaction with the API, and things to watch out for when developing a client.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.

#### [Seamless Telegram Login](/api/url-authorization.md)
Handle Seamless Telegram Login URL authorization requests.