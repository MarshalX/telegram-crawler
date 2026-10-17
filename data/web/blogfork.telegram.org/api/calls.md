# Phone calls


Telegram supports E2E-encrypted one-to-one calls.  

This page describes the API methods used to work with calls.  

    phoneCallProtocol#fc878fc8 flags:# udp_p2p:flags.0?true udp_reflector:flags.1?true min_layer:int max_layer:int library_versions:Vector<string> = PhoneCallProtocol;

    phoneConnectionWebrtc#635fe375 flags:# turn:flags.0?true stun:flags.1?true id:long ip:string ipv6:string port:int username:string password:string = PhoneConnection;

    phoneCallWaiting#c5226f17 flags:# video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long protocol:PhoneCallProtocol receive_date:flags.0?int = PhoneCall;
    phoneCallRequested#14b0ed0c flags:# video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long g_a_hash:bytes protocol:PhoneCallProtocol = PhoneCall;
    phoneCallAccepted#3660c311 flags:# video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long g_b:bytes protocol:PhoneCallProtocol = PhoneCall;
    phoneCall#30535af5 flags:# p2p_allowed:flags.5?true video:flags.6?true conference_supported:flags.8?true id:long access_hash:long date:int admin_id:long participant_id:long g_a_or_b:bytes key_fingerprint:long protocol:PhoneCallProtocol connections:Vector<PhoneConnection> start_date:int custom_parameters:flags.7?DataJSON = PhoneCall;
    phoneCallDiscarded#50ca4de1 flags:# need_rating:flags.2?true need_debug:flags.3?true video:flags.6?true id:long reason:flags.0?PhoneCallDiscardReason duration:flags.1?int = PhoneCall;
    
    phone.phoneCall#ec82e140 phone_call:PhoneCall users:Vector<User> = phone.PhoneCall;
    updatePhoneCall#ab0f6b1e phone_call:PhoneCall = Update;

    phoneCallDiscardReasonMissed#85e42301 = PhoneCallDiscardReason;
    phoneCallDiscardReasonDisconnect#e095c1a0 = PhoneCallDiscardReason;
    phoneCallDiscardReasonHangup#57adc690 = PhoneCallDiscardReason;
    phoneCallDiscardReasonBusy#faf7e8c9 = PhoneCallDiscardReason;
    phoneCallDiscardReasonMigrateConferenceCall#9fbbf1f7 slug:string = PhoneCallDiscardReason;

    ---functions---
    
    phone.requestCall#42ff96ed flags:# video:flags.0?true user_id:InputUser random_id:int g_a_hash:bytes protocol:PhoneCallProtocol = phone.PhoneCall;
    phone.acceptCall#3bd2b4a0 peer:InputPhoneCall g_b:bytes protocol:PhoneCallProtocol = phone.PhoneCall;
    phone.confirmCall#2efe1722 peer:InputPhoneCall g_a:bytes key_fingerprint:long protocol:PhoneCallProtocol = phone.PhoneCall;

    phone.receivedCall#17d54f61 peer:InputPhoneCall = Bool;
    
    phone.discardCall#b2cbc1c0 flags:# video:flags.0?true peer:InputPhoneCall duration:int reason:PhoneCallDiscardReason connection_id:long = Updates;

### One-to-one calls

See [here &raquo;](/api/end-to-end/video-calls.md) for a detailed description of the end-to-end encryption used for one-to-one calls, briefly re-explained below with some additional, API-level details:  

1) User *A* invokes [phone.requestCall](/method/phone.requestCall.md) to call user *B*, passing the initial DH parameters and [phone call protocol information &raquo;](#populating-phonecallprotocol). Set the `video` flag to request a video call, otherwise an audio call is requested.  
  The method will return a [phone.phoneCall](/constructor/phone.phoneCall.md) with a [phoneCallWaiting](/constructor/phoneCallWaiting.md)
2) The Server *S* performs privacy checks and sends an [updatePhoneCall](/constructor/updatePhoneCall.md) update with a [phoneCallRequested](/constructor/phoneCallRequested.md) constructor to all of *B*'s active devices.  
3) Optionally, when *B* receives the [phoneCallRequested](/constructor/phoneCallRequested.md), *B* may choose to invoke [phone.receivedCall](/method/phone.receivedCall.md): this will prevent other users from calling *B* until the current call is discarded (either refused, or accepted, confirmed and then discarded), as the server will immediately reject incoming calls with a `reason` equal to [phoneCallDiscardReasonBusy](/constructor/phoneCallDiscardReasonBusy.md).  
   This step is not strictly necessary, and may be omitted for example by userbot webradios: this will allow multiple users to establish multiple parallel calls with the same user.  
4) User *B* accepts the call on one of their devices,  performs all the required security checks, and invokes the [phone.acceptCall](/method/phone.acceptCall.md) method passing DH parameters and [phone call protocol information &raquo;](#populating-phonecallprotocol): this method will return a [phone.phoneCall](/constructor/phone.phoneCall.md) with a [phoneCallAccepted](/constructor/phoneCallAccepted.md).  
   User *B* may also choose to refuse the call instead, using [phone.discardCall](/method/phone.discardCall.md) with [phoneCallDiscardReasonMissed](/constructor/phoneCallDiscardReasonMissed.md) (user *A* can do the same as well).  
5) The Server *S* sends an [updatePhoneCall](/constructor/updatePhoneCall.md) with the [phoneCallDiscarded](/constructor/phoneCallDiscarded.md) constructor to all other devices *B* has authorized, to prevent accepting the same call on any of the other devices. From this point on, the server *S* works only with the specific device owned by *B* that invoked [phone.acceptCall](/method/phone.acceptCall.md) first.
6) The Server *S* sends to *A* an [updatePhoneCall](/constructor/updatePhoneCall.md) update with a [phoneCallAccepted](/constructor/phoneCallAccepted.md) constructor: *A* performs all the usual security checks, then invokes the [phone.confirmCall](/method/phone.confirmCall.md) method passing DH parameters and [phone call protocol information &raquo;](#populating-phonecallprotocol): the method will return a [phone.phoneCall](/constructor/phone.phoneCall.md) with a [phoneCall](/constructor/phoneCall.md).  
    Then, *A* hands off the call to the tgcalls library using the [phoneCallProtocol](/constructor/phoneCallProtocol.md) and [phoneConnectionWebrtc](/constructor/phoneConnectionWebrtc.md) constructors contained in the [phoneCall](/constructor/phoneCall.md) constructor.
7) The Server *S* sends to *B* an [updatePhoneCall](/constructor/updatePhoneCall.md) update with the [phoneCall](/constructor/phoneCall.md) constructor: at this point *B* performs all the required security checks, and hands off the call to the tgcalls library as above.
8) To hang up the call, invoke [phone.discardCall](/method/phone.discardCall.md), which will emit an [updatePhoneCall](/constructor/updatePhoneCall.md) with a [phoneCallDiscarded](/constructor/phoneCallDiscarded.md) for both users.  
    Set the `video` flag if at least one of the two sides of the discarded call has a video stream enabled (regardless of whether initially the call was a video call or a voice call), or when migrating to a [conference call &raquo;](#migrating-to-a-conference-call).  
    If the [phoneCallDiscarded](/constructor/phoneCallDiscarded.md).`need_rating` flag is set, the client must invite the user to [rate the call &raquo;](#call-rating) when it ends.  
    The user may still rate the call manually by right-clicking on the call service message: in this case, the `user_initiative` flag must be set when invoking [phone.setCallRating](/method/phone.setCallRating.md).  

### Migrating to a conference call

    phoneCallDiscardReasonMigrateConferenceCall#9fbbf1f7 slug:string = PhoneCallDiscardReason;

    ---functions---

    phone.createConferenceCall#7d0444bb flags:# muted:flags.0?true video_stopped:flags.2?true join:flags.3?true random_id:int public_key:flags.3?int256 block:flags.3?bytes params:flags.3?DataJSON = Updates;
    phone.discardCall#b2cbc1c0 flags:# video:flags.0?true peer:InputPhoneCall duration:int reason:PhoneCallDiscardReason connection_id:long = Updates;

An ongoing one-to-one call may be upgraded ("migrated") to an E2E-encrypted [conference call &raquo;](/api/group-calls.md#conference-calls), for example in order to add more participants.  

Migration is only possible if the other party's client supports conference calls, as indicated by the [phoneCall](/constructor/phoneCall.md).`conference_supported` flag (set by the server in the final [phoneCall](/constructor/phoneCall.md) constructor): clients should only offer the migrate/"Add participants" option in the call UI when this flag is set.  

To migrate the call, the initiating client:

1. Creates a new conference call by invoking [phone.createConferenceCall](/method/phone.createConferenceCall.md) with the `join` flag set, joining the freshly created conference itself as described [here &raquo;](/api/group-calls.md#conference-calls); the current call's media state (mute and camera/video status) is carried over to the new conference.  
2. Extracts the [conference deep link &raquo;](/api/links.md#conference-links) slug from the returned [groupCall](/constructor/groupCall.md).`invite_link`.  
3. Discards the one-to-one call by invoking [phone.discardCall](/method/phone.discardCall.md) with a [phoneCallDiscardReasonMigrateConferenceCall](/constructor/phoneCallDiscardReasonMigrateConferenceCall.md) `reason`, passing the conference slug in its `slug` field (as for any discarded call, also set the `video` flag if either side had a video stream enabled).  

The other party then receives an [updatePhoneCall](/constructor/updatePhoneCall.md) with a [phoneCallDiscarded](/constructor/phoneCallDiscarded.md) whose `reason` is a [phoneCallDiscardReasonMigrateConferenceCall](/constructor/phoneCallDiscardReasonMigrateConferenceCall.md): it must extract the `slug`, fetch the newly created conference call by invoking [phone.getGroupCall](/method/phone.getGroupCall.md) with an [inputGroupCallSlug](/constructor/inputGroupCallSlug.md) generated from the slug, and automatically join it as described [here &raquo;](/api/group-calls.md#conference-calls), again carrying over the previous call's media state.  

This effectively moves both users from the one-to-one call into the new conference call, where additional users can then be [invited &raquo;](/api/group-calls.md#conference-calls).  

### Populating `phoneCallProtocol`

    phoneCallProtocol#fc878fc8 flags:# udp_p2p:flags.0?true udp_reflector:flags.1?true min_layer:int max_layer:int library_versions:Vector<string> = PhoneCallProtocol;

[phoneCallProtocol](/constructor/phoneCallProtocol.md) describes the tgcalls protocol versions supported by the local build of tgcalls, populated as follows:

- fill `library_versions` with the ordered list of supported tgcalls protocol versions (order matters, the preferred tgcalls protocol version must come first)
- set both `udp_p2p` and `udp_reflector` to true (deprecated, previously used to allow or disallow the use of direct peer-to-peer networking for libtgvoip calls)
- set `min_layer` to `65` (deprecated, was previously used to describe the oldest supported libtgvoip protocol)
- set `max_layer` to `92` (deprecated, was previously used to describe the newest supported libtgvoip protocol)

`udp_p2p`, `udp_reflector`, `min_layer` and `max_layer` were previously used by the deprecated libtgvoip library, and should not be passed to tgcalls: the values listed here are hardcoded and immutable, fixed to the last values supported by libtgvoip and are only used if the other end still uses libtgvoip.  

The use of peer-to-peer networking is now controlled by the [privacyKeyPhoneP2P](/constructor/privacyKeyPhoneP2P.md) [privacy setting &raquo;](/api/privacy.md), which is used by the server to choose whether to also return P2P STUN [phoneConnectionWebrtc](/constructor/phoneConnectionWebrtc.md) connection options, along with the usual reflector TURN [phoneConnectionWebrtc](/constructor/phoneConnectionWebrtc.md) connection options.  

The same local capability set is re-sent in all three outbound handshake methods: the `protocol` embedded in [phoneCallWaiting](/constructor/phoneCallWaiting.md), [phoneCallRequested](/constructor/phoneCallRequested.md) and [phoneCallAccepted](/constructor/phoneCallAccepted.md) does not stop either client from advertising its own local capabilities again in the next outgoing RPC.  

### Signaling data

    updatePhoneCallSignalingData#2661bf09 phone_call_id:long data:bytes = Update;

    ---functions---

    phone.sendSignalingData#ff7a9383 peer:InputPhoneCall data:bytes = Bool;

[phone.sendSignalingData](/method/phone.sendSignalingData.md) is only used after the DH handshake is over and both sides have the final [phoneCall](/constructor/phoneCall.md) with verified key material and connection info: at this point, tgcalls should be initialized from the final [phoneCall](/constructor/phoneCall.md) constructor's `protocol` and `connections` fields, and only then tgcalls's signaling callback can be wired to invoke [phone.sendSignalingData](/method/phone.sendSignalingData.md).  

Invoke this method whenever the tgcalls emits an opaque signaling packet that must be delivered to the peer: this will emit an [updatePhoneCallSignalingData](/constructor/updatePhoneCallSignalingData.md) for the other peer in the call, who should then pass [updatePhoneCallSignalingData](/constructor/updatePhoneCallSignalingData.md).`data` to their own instance of tgcalls.  

### Call rating

    ---functions---

    phone.setCallRating#59ead627 flags:# user_initiative:flags.0?true peer:InputPhoneCall rating:int comment:string = Updates;

Invoke [phone.setCallRating](/method/phone.setCallRating.md) after the call ends to rate the call (sending a message to the official VoIP rating bot), passing the following parameters:

- `peer`: The [inputPhoneCall](/constructor/inputPhoneCall.md) generated from the [phoneCallDiscarded](/constructor/phoneCallDiscarded.md)
- `user_initiative`: Set this flag if the rating was initiated by the user by right-clicking on the call service message; must NOT be set if rating was requested by the server with [phoneCallDiscarded](/constructor/phoneCallDiscarded.md).`need_rating`.
- `rating`: A score from 1 to 5, chosen by the user.
- `comment`: A user-specified comment (only for ratings not equal to 5). 
  
  The user may also choose to report additional problems from the following fixed list, in the form of `#hashtags` appended to the comment.  

  These hashtags may be appended even for ratings equal to 5, using this algorithm:
  
  - If the accumulated comment is not empty, append a whitespace
  - Append the ID of the chosen problem as a hashtag (i.e. `#echo`) 
  - Repeat for all problems chosen by the user, from the following available options:

#### Call rating problem types

<!-- start call rating comment types 5 -->

##### `echo`

The user heard their own voice (echo).

##### `noise`

The user heard background noise.

##### `interruptions`

The other side kept disappearing.

##### `distorted_speech`

The speech was distorted.

##### `silent_local`

The user couldn't hear the other side.

##### `silent_remote`

The other side couldn't hear the user.

##### `dropped`

The call ended unexpectedly.

##### `distorted_video`

The video was distorted.

##### `pixelated_video`

The video was pixelated.

<!-- end call rating comment types -->

### Call debug

    ---functions---

    phone.saveCallDebug#277add7e peer:InputPhoneCall debug:DataJSON = Bool;

If the final [phoneCallDiscarded](/constructor/phoneCallDiscarded.md).`need_debug` flag is set, the client should upload implementation-specific debug information for the finished call, by calling [phone.saveCallDebug](/method/phone.saveCallDebug.md) with the JSON string returned by the active tgcalls instance.
