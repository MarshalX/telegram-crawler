# Working with Different Data Centers

The servers are divided into several data centers (hereinafter “DCs”) in different parts of the world.
A complete list of proxy access points for these DCs may be obtained using [help.getConfig](/method/help.getConfig.md):

    dcOption#18b7a10d flags:# ipv6:flags.0?true media_only:flags.1?true tcpo_only:flags.2?true cdn:flags.3?true static:flags.4?true this_port_only:flags.5?true id:int ip_address:string port:int secret:flags.10?bytes = DcOption;
    config#cc1a241e flags:# default_p2p_contacts:flags.3?true preload_featured_stickers:flags.4?true revoke_pm_inbox:flags.6?true blocked_mode:flags.8?true force_try_ipv6:flags.14?true date:int expires:int test_mode:Bool this_dc:int dc_options:Vector<DcOption> dc_txt_domain_name:string chat_size_max:int megagroup_size_max:int forwarded_count_max:int online_update_period_ms:int offline_blur_timeout_ms:int offline_idle_timeout_ms:int online_cloud_timeout_ms:int notify_cloud_delay_ms:int notify_default_delay_ms:int push_chat_period_ms:int push_chat_limit:int edit_time_limit:int revoke_time_limit:int revoke_pm_time_limit:int rating_e_decay:int stickers_recent_limit:int channels_read_media_period:int tmp_sessions:flags.0?int call_receive_timeout_ms:int call_ring_timeout_ms:int call_connect_timeout_ms:int call_packet_timeout_ms:int me_url_prefix:string autoupdate_url_prefix:flags.7?string gif_search_username:flags.9?string venue_search_username:flags.10?string img_search_username:flags.11?string static_maps_provider:flags.12?string caption_length_max:int message_length_max:int webfile_dc_id:int suggested_lang_code:flags.2?string lang_pack_version:flags.2?int base_lang_pack_version:flags.2?int reactions_default:flags.15?Reaction autologin_token:flags.16?string = Config;
    ---functions---
    help.getConfig#c4f9186b = Config;

In this context, **this_dc** is the number of the current DC, **dc_options** is a list of all DCs available at the moment, each of which has an **id**, **ip**, and **port** for establishing a connection. Please note that **ip** and **port** may change frequently, based on proxy server load and the user's current location.  
Typically, each DC has at least one IPv4 and one IPv6 endpoint available.  

To optimize client communication with the API, each client must use the connection to the closest access point for its main queries (sending messages, getting contacts, etc.). Therefore, knowing how to select a DC is required before communicating with the API.

### Registration/Authorization
The [auth.sendCode](/method/auth.sendCode.md) method is the basic entry point when registering a new user or authorizing an existing user. 95% of all redirection cases to a different DC will occur when invoking this method.

The client does not yet know which DC it will be associated with; therefore, it establishes an encrypted connection to a random address and sends its query to that address.
Having received a **phone_number** from a client, we can find out whether or not it is registered in the system. If it is, then, if necessary, instead of sending a text message, we request that it establish a connection with a different DC first (PHONE_MIGRATE_X error).
If we do not yet have a user with this number, we examine its IP-address. We can use it to identify the closest DC. Again, if necessary, we redirect the user to a different DC (NETWORK_MIGRATE_X error).

#### Testing Redirects

There are reserved phone number prefixes to test the correctness of the application's handling of redirects between DCs. Read more in [User Authorization](/api/auth.md#test-phone-numbers) article.

### File Access
A file saved by a user with [upload.saveFilePart](/method/upload.saveFilePart.md) will be available for direct download only from the DC where the query was executed. That is why each file has a **dc_id** parameter:

    document#8fd4c4d8 flags:# id:long access_hash:long file_reference:bytes date:int mime_type:string size:long thumbs:flags.0?Vector<PhotoSize> video_thumbs:flags.1?Vector<VideoSize> dc_id:int attributes:Vector<DocumentAttribute> = Document;
    photo#fb197a65 flags:# has_stickers:flags.0?true id:long access_hash:long file_reference:bytes date:int sizes:Vector<PhotoSize> video_sizes:flags.1?Vector<VideoSize> dc_id:int = Photo;
    
    encryptedFile#a8008cd8 id:long access_hash:long size:long dc_id:int key_fingerprint:int = EncryptedFile;

    userProfilePhoto#82d1f706 flags:# has_video:flags.0?true personal:flags.2?true photo_id:long stripped_thumb:flags.1?bytes dc_id:int = UserProfilePhoto;
    chatPhoto#1c6e1c11 flags:# has_video:flags.0?true photo_id:long stripped_thumb:flags.1?bytes dc_id:int = ChatPhoto;

To download the file, an encrypted connection to DC **dc_id** must be established and used to execute the [upload.getFile](/method/upload.getFile.md) query.
If an attempt is made to download the file over a wrong connection, the FILE_MIGRATE_X error will be returned.

Please note that encryption keys are not copied between DCs; therefore, the process of establishing an encrypted connection is started from the very beginning for each new DC. An issued auth_key can be associated with the current authorized user by using an [authorization transfer](#authorization-transfer).

### User Migration

During the process of working with the API, user information is accumulated in the DC with which the user is associated. This is the reason a user cannot be associated with a different DC by means of the client. However, in the future, during prolonged communication from an unusual location, we may decide that the user's data must be moved to a different DC. After some time, the data will be copied and the association will be updated. Once this happens, when executing any query transmitted to the old DC, the API will return the USER_MIGRATE_X error. The client will then have to establish a connection with the new DC and repeat the query.

### Authorization Transfer

The following methods can be used to eliminate the need for users to enter the code from a text message every time:

    auth.exportedAuthorization#b434e2b8 id:long bytes:bytes = auth.ExportedAuthorization;
    auth.authorization#2ea2c0d4 flags:# setup_password_required:flags.1?true otherwise_relogin_days:flags.1?int tmp_sessions:flags.0?int future_auth_token:flags.2?bytes user:User = auth.Authorization;
    ---functions---
    auth.importAuthorization#a57a7dad id:long bytes:bytes = auth.Authorization;
    auth.exportAuthorization#e5bfffcd dc_id:int = auth.ExportedAuthorization;

[auth.exportAuthorization](/method/auth.exportAuthorization.md) must be executed in the current DC (the DC with which a connection has already been established), passing in **dc_id** as the value for the new DC. The method should return the user identifier and a long string of random data. An import operation can be performed at the new DC by sending it what was received. Queries requiring authorization can then be successfully executed in the new DC.

### Parallel sessions
    
    config#cc1a241e flags:# default_p2p_contacts:flags.3?true preload_featured_stickers:flags.4?true revoke_pm_inbox:flags.6?true blocked_mode:flags.8?true force_try_ipv6:flags.14?true date:int expires:int test_mode:Bool this_dc:int dc_options:Vector<DcOption> dc_txt_domain_name:string chat_size_max:int megagroup_size_max:int forwarded_count_max:int online_update_period_ms:int offline_blur_timeout_ms:int offline_idle_timeout_ms:int online_cloud_timeout_ms:int notify_cloud_delay_ms:int notify_default_delay_ms:int push_chat_period_ms:int push_chat_limit:int edit_time_limit:int revoke_time_limit:int revoke_pm_time_limit:int rating_e_decay:int stickers_recent_limit:int channels_read_media_period:int tmp_sessions:flags.0?int call_receive_timeout_ms:int call_ring_timeout_ms:int call_connect_timeout_ms:int call_packet_timeout_ms:int me_url_prefix:string autoupdate_url_prefix:flags.7?string gif_search_username:flags.9?string venue_search_username:flags.10?string img_search_username:flags.11?string static_maps_provider:flags.12?string caption_length_max:int message_length_max:int webfile_dc_id:int suggested_lang_code:flags.2?string lang_pack_version:flags.2?int base_lang_pack_version:flags.2?int reactions_default:flags.15?Reaction autologin_token:flags.16?string = Config;

    auth.authorization#2ea2c0d4 flags:# setup_password_required:flags.1?true otherwise_relogin_days:flags.1?int tmp_sessions:flags.0?int future_auth_token:flags.2?bytes user:User = auth.Authorization;

A single [authorization key](/mtproto/auth_key.md) may be used by **multiple independent MTProto sessions** at the same time.  

Each session is identified by its own randomly generated 64-bit [session_id](/mtproto/description.md#session), while sharing the same **auth_key_id**: the server treats every `(auth_key_id, session_id)` pair as a separate session, with its own [message identifier](/mtproto/description.md#message-identifier-msg-id) and [sequence number](/mtproto/description.md#message-sequence-number-msg-seqno) space, salt usage and acknowledgement state.  

Opening an additional session therefore requires **no** re-authorization: the client simply generates a new **session_id** over the existing authorization key.  

Please note that if [Perfect Forward Secrecy](/api/pfs.md) is enabled, to create a new concurrent session clients **must** generate a new temporary auth key, not just change the **session_id**; in this case both entries of the `(auth_key_id, session_id)` pair will be different for each session.  

Clients use this to spread traffic over several simultaneous connections to the same DC, in two distinct ways:

* **Media DC sessions.** Large [file queries](/api/files.md) sent to media DCs ([upload.getFile](/method/upload.getFile.md), [upload.saveFilePart](/method/upload.saveFilePart.md)) should be handled through one or more separate sessions and separate connections, in which no other methods are executed, so that bulk transfers do not interfere with [getting updates](/api/updates.md) and other method calls.
  These sessions never carry [updates](/api/updates.md#subscribing-to-updates) and are established towards [media-only DCs](#file-access) (identified by the `media_only` flag of [dcOption](/constructor/dcOption.md)).  
  See [parallelizing file transfers&nbsp;&raquo;](/api/files.md#general-considerations) for details.

  Media DC sessions can be parallelized both with and without [Perfect Forward Secrecy](/api/pfs.md) enabled.  

* **Main (RPC) sessions.** The number of parallel sessions a client may open to the **main connection** of its home DC is advertised by the server through the **tmp_sessions** field of the [config](/constructor/config.md) and [auth.authorization](/constructor/auth.authorization.md) constructors.

  When **tmp_sessions** is greater than `1`, the client may open up to that many simultaneous sessions to its home DC and distribute outgoing API calls among them to increase throughput; when the field is absent or `≤ 1`, a single main session must be used.  

  Please note that if **tmp_sessions** is greater than `1`, the client **must** enable [Perfect Forward Secrecy](/api/pfs.md) for all of its sessions: each session binds its own temporary authorization key to the permanent key and never uses the permanent key directly.  

  Unlike file transfer sessions, every main session shares the account's full authorization and **may receive [updates](/api/updates.md)**, all sharing the same `pts`/`seq`/`qts` sequence: each update will be delivered via only **one** of the currently active sessions, chosen randomly.  

  The client **must not** open more concurrent sessions towards the home DC than the number specified in **tmp_sessions** (which defaults to `1` if the flag is absent), otherwise the server will terminate all sessions an [`AUTH_KEY_DUPLICATED` error](/api/errors.md#406-not-acceptable), which will also invalidate the authorization key, forcing the user to log in again.  
  
  Respecting **tmp_sessions** (using a single main session when it is absent or `≤ 1`) is therefore mandatory; only [file transfer sessions](/api/files.md#general-considerations) on media DCs may always be opened in parallel, regardless of the value of **tmp_sessions**.  
