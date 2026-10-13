# Telegram Bot API

All types are listed at [Bot API types](/bots/api/types.md).

> The Bot API is an HTTP-based interface created for developers keen on building bots for Telegram.
To learn how to create and set up a bot, please consult our [**Introduction to Bots**](/bots.md) and [**Bot FAQ**](/bots/faq.md).

### Recent changes

Recent updates are listed in the [Bot API changelog](/bots/api-changelog.md).

### Authorizing your bot

Each bot is given a unique authentication token [when it is created](/bots/features.md#botfather). The token looks something like `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`, but we'll use simply **&lt;token&gt;** in this document instead. You can learn about obtaining tokens and generating new ones in [this document](/bots/features.md#botfather).

### Making requests

All queries to the Telegram Bot API must be served over HTTPS and need to be presented in this form: `https://api.telegram.org/bot<token>/METHOD_NAME`. Like this for example:

	https://api.telegram.org/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/getMe

We support **GET** and **POST** HTTP methods. We support four ways of passing parameters in Bot API requests:

- [URL query string](https://en.wikipedia.org/wiki/Query_string)
- application/x-www-form-urlencoded
- application/json (except for uploading files)
- multipart/form-data (use to upload files)

The response contains a JSON object, which always has a Boolean field 'ok' and may have an optional String field 'description' with a human-readable description of the result. If 'ok' equals *True*, the request was successful and the result of the query can be found in the 'result' field. In case of an unsuccessful request, 'ok' equals *False* and the error is explained in the 'description'. An Integer 'error_code' field is also returned, but its contents are subject to change in the future. Some errors may also have an optional field 'parameters' of the type [ResponseParameters](/bots/api/types/responseparameters.md), which can help to automatically handle the error.

- All methods in the Bot API are case-insensitive.
- All queries must be made using UTF-8.

#### Making requests when getting updates

If you're using [**webhooks**](/bots/api.md#getting-updates), you can perform a request to the Bot API while sending an answer to the webhook. Use either *application/json* or *application/x-www-form-urlencoded* or *multipart/form-data* response content type for passing parameters. Specify the method to be invoked in the *method* parameter of the request. It's not possible to know that such a request was successful or get its result.

>Please see our [FAQ](/bots/faq.md#how-can-i-make-requests-in-response-to-updates) for examples.

### Using a Local Bot API Server

The Bot API server source code is available at [telegram-bot-api](https://github.com/tdlib/telegram-bot-api). You can run it locally and send the requests to your own server instead of `https://api.telegram.org`. If you switch to a local Bot API server, your bot will be able to:

- Download files without a size limit.
- Upload files up to 2000 MB.
- Upload files using their local path and [the file URI scheme](https://en.wikipedia.org/wiki/File_URI_scheme).
- Use an HTTP URL for the webhook.
- Use any local IP address for the webhook.
- Use any port for the webhook.
- Set *max_webhook_connections* up to 100000.
- Receive the absolute local path as a value of the *file_path* field without the need to download the file after a [getFile](/bots/api/methods/getfile.md) request.

#### Do I need a Local Bot API Server

The majority of bots will be OK with the default configuration, running on our servers. But if you feel that you need one of [these features](/bots/api.md#using-a-local-bot-api-server), you're welcome to switch to your own at any time.

### Getting updates

There are two mutually exclusive ways of receiving updates for your bot - the [getUpdates](/bots/api/methods/getupdates.md) method on one hand and [webhooks](/bots/api/methods/setwebhook.md) on the other. Incoming updates are stored on the server until the bot receives them either way, but they will not be kept longer than 24 hours.

Regardless of which option you choose, you will receive JSON-serialized [Update](/bots/api/types/update.md) objects as a result.

Types of this section are listed at [Bot API types](/bots/api/types.md#getting-updates).

- [getUpdates](/bots/api/methods/getupdates.md): receive incoming updates using long polling (wiki).
- [setWebhook](/bots/api/methods/setwebhook.md): specify a URL and receive incoming updates via an outgoing webhook.
- [deleteWebhook](/bots/api/methods/deletewebhook.md): remove webhook integration if you decide to switch back to getUpdates.
- [getWebhookInfo](/bots/api/methods/getwebhookinfo.md): get current webhook status.

### Available types
All types used in the Bot API responses are represented as JSON-objects.

It is safe to use 32-bit signed integers for storing all **Integer** fields unless otherwise noted.

>**Optional** fields may be not returned when irrelevant.

Types of this section are listed at [Bot API types](/bots/api/types.md#available-types).

#### Determining list of commands

The following algorithm is used to determine the list of commands for a particular user viewing the bot menu. The first list of commands which is set is returned:

**Commands in the chat with the bot**

* botCommandScopeChat + language_code
* botCommandScopeChat
* botCommandScopeAllPrivateChats + language_code
* botCommandScopeAllPrivateChats
* botCommandScopeDefault + language_code
* botCommandScopeDefault

**Commands in group and supergroup chats**

* botCommandScopeChatMember + language_code
* botCommandScopeChatMember
* botCommandScopeChatAdministrators + language_code (administrators only)
* botCommandScopeChatAdministrators (administrators only)
* botCommandScopeChat + language_code
* botCommandScopeChat
* botCommandScopeAllChatAdministrators + language_code (administrators only)
* botCommandScopeAllChatAdministrators (administrators only)
* botCommandScopeAllGroupChats + language_code
* botCommandScopeAllGroupChats
* botCommandScopeDefault + language_code
* botCommandScopeDefault

#### Sending files

There are three ways to send files (photos, stickers, audio, media, etc.):

1. If the file is already stored somewhere on the Telegram servers, you don't need to reupload it: each file object has a **file_id** field, simply pass this **file_id** as a parameter instead of uploading. There are **no limits** for files sent this way.
2. Provide Telegram with an HTTP URL for the file to be sent. Telegram will download and send the file. 5 MB max size for photos and 20 MB max for other types of content.
3. Post the file using multipart/form-data in the usual way that files are uploaded via the browser. 10 MB max size for photos, 50 MB for other files.

**Sending by file_id**

* It is not possible to change the file type when resending by **file_id**. I.e. a [video](/bots/api/types/video.md) can't be [sent as a photo](/bots/api/methods/sendphoto.md), a [photo](/bots/api/types/photosize.md) can't be [sent as a document](/bots/api/methods/senddocument.md), etc.
* It is not possible to resend thumbnails.
* Resending a photo by **file_id** will send all of its [sizes](/bots/api/types/photosize.md).
* **file_id** is unique for each individual bot and **can't** be transferred from one bot to another.
* **file_id** uniquely identifies a file, but a file can have different valid **file_id**s even for the same bot.

**Sending by URL**

* When sending by URL the target file must have the correct MIME type (e.g., audio/mpeg for [sendAudio](/bots/api/methods/sendaudio.md), etc.).
* In [sendDocument](/bots/api/methods/senddocument.md), sending by URL will currently only work for **.PDF** and **.ZIP** files.
* To use [sendVoice](/bots/api/methods/sendvoice.md), the file must have the type audio/ogg and be no more than 1MB in size. 1-20MB voice notes will be sent as files.
* Other configurations may work but we can't guarantee that they will.

#### Accent colors

Colors with identifiers 0 (red), 1 (orange), 2 (purple/violet), 3 (green), 4 (cyan), 5 (blue), 6 (pink) can be customized by app themes. Additionally, the following colors in RGB format are currently in use.

|Color identifier|Light colors|Dark colors|
|-----------|
|7|E15052 F9AE63|FF9380 992F37|
|8|E0802B FAC534|ECB04E C35714|
|9|A05FF3 F48FFF|C697FF 5E31C8|
|10|27A910 A7DC57|A7EB6E 167E2D|
|11|27ACCE 82E8D6|40D8D0 045C7F|
|12|3391D4 7DD3F0|52BFFF 0B5494|
|13|DD4371 FFBE9F|FF86A6 8E366E|
|14|247BED F04856 FFFFFF|3FA2FE E5424F FFFFFF|
|15|D67722 1EA011 FFFFFF|FF905E 32A527 FFFFFF|
|16|179E42 E84A3F FFFFFF|66D364 D5444F FFFFFF|
|17|2894AF 6FC456 FFFFFF|22BCE2 3DA240 FFFFFF|
|18|0C9AB3 FFAD95 FFE6B5|22BCE2 FF9778 FFDA6B|
|19|7757D6 F79610 FFDE8E|9791FF F2731D FFDB59|
|20|1585CF F2AB1D FFFFFF|3DA6EB EEA51D FFFFFF|

#### Profile accent colors

Currently, the following colors in RGB format are in use for profile backgrounds.

|Color identifier|Light colors|Dark colors|
|-----------|
|0|BA5650|9C4540|
|1|C27C3E|945E2C|
|2|956AC8|715099|
|3|49A355|33713B|
|4|3E97AD|387E87|
|5|5A8FBB|477194|
|6|B85378|944763|
|7|7F8B95|435261|
|8|C9565D D97C57|994343 AC583E|
|9|CF7244 CC9433|8F552F A17232|
|10|9662D4 B966B6|634691 9250A2|
|11|3D9755 89A650|296A43 5F8F44|
|12|3D95BA 50AD98|306C7C 3E987E|
|13|538BC2 4DA8BD|38618C 458BA1|
|14|B04F74 D1666D|884160 A65259|
|15|637482 7B8A97|53606E 384654|

#### Inline mode objects

Objects and methods used in the inline mode are described in the [Inline mode section](/bots/api.md#inline-mode).

### Available methods

>All methods in the Bot API are case-insensitive. We support **GET** and **POST** HTTP methods. Use either [URL query string](https://en.wikipedia.org/wiki/Query_string) or *application/json* or *application/x-www-form-urlencoded* or *multipart/form-data* for passing parameters in Bot API requests.
On successful call, a JSON-object containing the result will be returned.

- [getMe](/bots/api/methods/getme.md): A simple method for testing your bot's authentication token.
- [logOut](/bots/api/methods/logout.md): log out from the cloud Bot API server before launching the bot locally.
- [close](/bots/api/methods/close.md): close the bot instance before moving it from one local server to another.
- [sendMessage](/bots/api/methods/sendmessage.md): send text messages.

#### Formatting options

Message text formatting is documented at [Formatting options](/bots/api/formatting.md).

#### Ephemeral Messages and Commands

Ephemeral interactions allow a bot and an individual member of a group or supergroup chat to communicate privately on the public timeline without cluttering the chat for other members. They may disappear automatically after some time, or if the app is restarted.

**Ephemeral Commands (User to Bot)**
Bots can declare ephemeral commands by setting the *is_ephemeral* field to *True* in the [BotCommand](/bots/api/types/botcommand.md) class. A user can then send an ephemeral command that is received by the target bot but remains invisible to all members of the chat, including both users and other bots.

**Ephemeral Messages**
Bots can send an ephemeral message response back to a specific user designated by the *receiver_user_id* parameter. Other members of the group or supergroup chat will not see the message.

> It is **not guaranteed** that the ephemeral message will be received, especially if the user is offline.

**Reply Targets and Conditions**

* Any bot can send an ephemeral message to a user within **15 seconds** of the incoming eligible action. The message will be sent to the exact client application that triggered the action. For this the bot must provide either:

  * The *callback_query_id* from a received callback query, or
  * The *reply_parameters.ephemeral_message_id* from an incoming ephemeral message.

* If the bot is a chat administrator, it can send an ephemeral message to any non-bot member of the chat at any time without needing to specify a *callback_query_id* or *reply_parameters.ephemeral_message_id*. In this case, the message may be delivered across multiple active client applications of the user, but is regardless not guaranteed to be delivered to any of them.

#### Paid Broadcasts

By default, all bots are able to broadcast up to [30 messages](/bots/faq.md#my-bot-is-hitting-limits-how-do-i-avoid-this) per second to their users. Developers can increase this limit by enabling *Paid Broadcasts* in [@BotFather](https://t.me/botfather) - allowing their bot to broadcast **up to 1000 messages** per second.

Each message broadcasted over the free amount of 30 messages per second incurs a cost of 0.1 Stars per message, paid with Telegram Stars from the bot's balance. In order to use this feature, a bot must have at least *10,000 Stars* on its balance.

> Bots with increased limits are only charged for messages that are broadcasted successfully.

- [forwardMessage](/bots/api/methods/forwardmessage.md): forward messages of any kind.
- [forwardMessages](/bots/api/methods/forwardmessages.md): forward multiple messages of any kind.
- [copyMessage](/bots/api/methods/copymessage.md): copy messages of any kind.
- [copyMessages](/bots/api/methods/copymessages.md): copy messages of any kind.
- [sendPhoto](/bots/api/methods/sendphoto.md): send photos.
- [sendLivePhoto](/bots/api/methods/sendlivephoto.md): send live photos.
- [sendAudio](/bots/api/methods/sendaudio.md): send audio files, if you want Telegram clients to display them in the music player.
- [sendDocument](/bots/api/methods/senddocument.md): send general files.
- [sendVideo](/bots/api/methods/sendvideo.md): send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document).
- [sendAnimation](/bots/api/methods/sendanimation.md): send animation files (GIF or H.264/MPEG-4 AVC video without sound).
- [sendVoice](/bots/api/methods/sendvoice.md): send audio files, if you want Telegram clients to display the file as a playable voice message.
- [sendVideoNote](/bots/api/methods/sendvideonote.md): send a rounded square MPEG4 video of up to 1 minute long.
- [sendPaidMedia](/bots/api/methods/sendpaidmedia.md): send paid media.
- [sendMediaGroup](/bots/api/methods/sendmediagroup.md): send a group of photos, live photos, videos, documents or audios as an album.
- [sendLocation](/bots/api/methods/sendlocation.md): send point on the map.
- [sendVenue](/bots/api/methods/sendvenue.md): send information about a venue.
- [sendContact](/bots/api/methods/sendcontact.md): send phone contacts.
- [sendPoll](/bots/api/methods/sendpoll.md): send a native poll.
- [sendChecklist](/bots/api/methods/sendchecklist.md): send a checklist on behalf of a connected business account.
- [sendDice](/bots/api/methods/senddice.md): send an animated emoji that will display a random value.
- [sendMessageDraft](/bots/api/methods/sendmessagedraft.md): stream a partial message to a user while the message is being generated.
- [sendChatAction](/bots/api/methods/sendchataction.md): Use this method when you need to tell the user that something is happening on the bot's side.
- [setMessageReaction](/bots/api/methods/setmessagereaction.md): change the chosen reactions on a message.
- [getUserProfilePhotos](/bots/api/methods/getuserprofilephotos.md): get a list of profile pictures for a user.
- [getUserProfileAudios](/bots/api/methods/getuserprofileaudios.md): get a list of profile audios for a user.
- [setUserEmojiStatus](/bots/api/methods/setuseremojistatus.md): Changes the emoji status for a given user that previously allowed the bot to manage their emoji status via the Mini App method requestEmojiStatusAccess.
- [getFile](/bots/api/methods/getfile.md): get basic information about a file and prepare it for downloading.
- [banChatMember](/bots/api/methods/banchatmember.md): ban a user in a group, a supergroup or a channel.
- [unbanChatMember](/bots/api/methods/unbanchatmember.md): unban a previously banned user in a supergroup or channel.
- [restrictChatMember](/bots/api/methods/restrictchatmember.md): restrict a user in a supergroup.
- [promoteChatMember](/bots/api/methods/promotechatmember.md): promote or demote a user in a supergroup or a channel.
- [setChatAdministratorCustomTitle](/bots/api/methods/setchatadministratorcustomtitle.md): set a custom title for an administrator in a supergroup promoted by the bot.
- [setChatMemberTag](/bots/api/methods/setchatmembertag.md): set a tag for a regular member in a group or a supergroup.
- [banChatSenderChat](/bots/api/methods/banchatsenderchat.md): ban a channel chat in a supergroup or a channel.
- [unbanChatSenderChat](/bots/api/methods/unbanchatsenderchat.md): unban a previously banned channel chat in a supergroup or channel.
- [setChatPermissions](/bots/api/methods/setchatpermissions.md): set default chat permissions for all members.
- [exportChatInviteLink](/bots/api/methods/exportchatinvitelink.md): generate a new primary invite link for a chat; any previously generated primary link is revoked.
- [createChatInviteLink](/bots/api/methods/createchatinvitelink.md): create an additional invite link for a chat.
- [editChatInviteLink](/bots/api/methods/editchatinvitelink.md): edit a non-primary invite link created by the bot.
- [createChatSubscriptionInviteLink](/bots/api/methods/createchatsubscriptioninvitelink.md): create a subscription invite link for a channel chat.
- [editChatSubscriptionInviteLink](/bots/api/methods/editchatsubscriptioninvitelink.md): edit a subscription invite link created by the bot.
- [revokeChatInviteLink](/bots/api/methods/revokechatinvitelink.md): revoke an invite link created by the bot.
- [approveChatJoinRequest](/bots/api/methods/approvechatjoinrequest.md): approve a chat join request.
- [declineChatJoinRequest](/bots/api/methods/declinechatjoinrequest.md): decline a chat join request.
- [answerChatJoinRequestQuery](/bots/api/methods/answerchatjoinrequestquery.md): process a received chat join request query.
- [sendChatJoinRequestWebApp](/bots/api/methods/sendchatjoinrequestwebapp.md): process a received chat join request query by showing a Mini App to the user before deciding the outcome.
- [setChatPhoto](/bots/api/methods/setchatphoto.md): set a new profile photo for the chat.
- [deleteChatPhoto](/bots/api/methods/deletechatphoto.md): delete a chat photo.
- [setChatTitle](/bots/api/methods/setchattitle.md): change the title of a chat.
- [setChatDescription](/bots/api/methods/setchatdescription.md): change the description of a group, a supergroup or a channel.
- [pinChatMessage](/bots/api/methods/pinchatmessage.md): add a message to the list of pinned messages in a chat.
- [unpinChatMessage](/bots/api/methods/unpinchatmessage.md): remove a message from the list of pinned messages in a chat.
- [unpinAllChatMessages](/bots/api/methods/unpinallchatmessages.md): clear the list of pinned messages in a chat.
- [leaveChat](/bots/api/methods/leavechat.md): Use this method for your bot to leave a group, supergroup or channel.
- [getChat](/bots/api/methods/getchat.md): get up-to-date information about the chat.
- [getChatAdministrators](/bots/api/methods/getchatadministrators.md): get a list of administrators in a chat.
- [getChatMemberCount](/bots/api/methods/getchatmembercount.md): get the number of members in a chat.
- [getChatMember](/bots/api/methods/getchatmember.md): get information about a member of a chat.
- [getUserPersonalChatMessages](/bots/api/methods/getuserpersonalchatmessages.md): get the last messages from the personal chat (i.e., the chat currently added to their profile) of a given user.
- [setChatStickerSet](/bots/api/methods/setchatstickerset.md): set a new group sticker set for a supergroup.
- [deleteChatStickerSet](/bots/api/methods/deletechatstickerset.md): delete a group sticker set from a supergroup.
- [getForumTopicIconStickers](/bots/api/methods/getforumtopiciconstickers.md): get custom emoji stickers, which can be used as a forum topic icon by any user.
- [createForumTopic](/bots/api/methods/createforumtopic.md): create a topic in a forum supergroup chat or a private chat with a user.
- [editForumTopic](/bots/api/methods/editforumtopic.md): edit name and icon of a topic in a forum supergroup chat or a private chat with a user.
- [closeForumTopic](/bots/api/methods/closeforumtopic.md): close an open topic in a forum supergroup chat.
- [reopenForumTopic](/bots/api/methods/reopenforumtopic.md): reopen a closed topic in a forum supergroup chat.
- [deleteForumTopic](/bots/api/methods/deleteforumtopic.md): delete a forum topic along with all its messages in a forum supergroup chat or a private chat with a user.
- [unpinAllForumTopicMessages](/bots/api/methods/unpinallforumtopicmessages.md): clear the list of pinned messages in a forum topic in a forum supergroup chat or a private chat with a user.
- [editGeneralForumTopic](/bots/api/methods/editgeneralforumtopic.md): edit the name of the 'General' topic in a forum supergroup chat.
- [closeGeneralForumTopic](/bots/api/methods/closegeneralforumtopic.md): close an open 'General' topic in a forum supergroup chat.
- [reopenGeneralForumTopic](/bots/api/methods/reopengeneralforumtopic.md): reopen a closed 'General' topic in a forum supergroup chat.
- [hideGeneralForumTopic](/bots/api/methods/hidegeneralforumtopic.md): hide the 'General' topic in a forum supergroup chat.
- [unhideGeneralForumTopic](/bots/api/methods/unhidegeneralforumtopic.md): unhide the 'General' topic in a forum supergroup chat.
- [unpinAllGeneralForumTopicMessages](/bots/api/methods/unpinallgeneralforumtopicmessages.md): clear the list of pinned messages in a General forum topic.
- [answerCallbackQuery](/bots/api/methods/answercallbackquery.md): send answers to callback queries sent from inline keyboards.
- [answerGuestQuery](/bots/api/methods/answerguestquery.md): reply to a received guest message.
- [getUserChatBoosts](/bots/api/methods/getuserchatboosts.md): get the list of boosts added to a chat by a user.
- [getBusinessConnection](/bots/api/methods/getbusinessconnection.md): get information about the connection of the bot with a business account.
- [getManagedBotToken](/bots/api/methods/getmanagedbottoken.md): get the token of a managed bot.
- [replaceManagedBotToken](/bots/api/methods/replacemanagedbottoken.md): revoke the current token of a managed bot and generate a new one.
- [getManagedBotAccessSettings](/bots/api/methods/getmanagedbotaccesssettings.md): get the access settings of a managed bot.
- [setManagedBotAccessSettings](/bots/api/methods/setmanagedbotaccesssettings.md): change the access settings of a managed bot.
- [setMyCommands](/bots/api/methods/setmycommands.md): change the list of the bot's commands.
- [deleteMyCommands](/bots/api/methods/deletemycommands.md): delete the list of the bot's commands for the given scope and user language.
- [getMyCommands](/bots/api/methods/getmycommands.md): get the current list of the bot's commands for the given scope and user language.
- [setMyName](/bots/api/methods/setmyname.md): change the bot's name.
- [getMyName](/bots/api/methods/getmyname.md): get the current bot name for the given user language.
- [setMyDescription](/bots/api/methods/setmydescription.md): change the bot's description, which is shown in the chat with the bot if the chat is empty.
- [getMyDescription](/bots/api/methods/getmydescription.md): get the current bot description for the given user language.
- [setMyShortDescription](/bots/api/methods/setmyshortdescription.md): change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot.
- [getMyShortDescription](/bots/api/methods/getmyshortdescription.md): get the current bot short description for the given user language.
- [setMyProfilePhoto](/bots/api/methods/setmyprofilephoto.md): Changes the profile photo of the bot.
- [removeMyProfilePhoto](/bots/api/methods/removemyprofilephoto.md): Removes the profile photo of the bot.
- [setChatMenuButton](/bots/api/methods/setchatmenubutton.md): change the bot's menu button in a private chat, or the default menu button.
- [getChatMenuButton](/bots/api/methods/getchatmenubutton.md): get the current value of the bot's menu button in a private chat, or the default menu button.
- [setMyDefaultAdministratorRights](/bots/api/methods/setmydefaultadministratorrights.md): change the default administrator rights requested by the bot when it's added as an administrator to groups or channels.
- [getMyDefaultAdministratorRights](/bots/api/methods/getmydefaultadministratorrights.md): get the current default administrator rights of the bot.
- [getAvailableGifts](/bots/api/methods/getavailablegifts.md): Returns the list of gifts that can be sent by the bot to users and channel chats.
- [sendGift](/bots/api/methods/sendgift.md): Sends a gift to the given user or channel chat.
- [giftPremiumSubscription](/bots/api/methods/giftpremiumsubscription.md): Gifts a Telegram Premium subscription to the given user.
- [verifyUser](/bots/api/methods/verifyuser.md): Verifies a user on behalf of the organization which is represented by the bot.
- [verifyChat](/bots/api/methods/verifychat.md): Verifies a chat on behalf of the organization which is represented by the bot.
- [removeUserVerification](/bots/api/methods/removeuserverification.md): Removes verification from a user who is currently verified on behalf of the organization represented by the bot.
- [removeChatVerification](/bots/api/methods/removechatverification.md): Removes verification from a chat that is currently verified on behalf of the organization represented by the bot.
- [readBusinessMessage](/bots/api/methods/readbusinessmessage.md): Marks incoming message as read on behalf of a business account.
- [deleteBusinessMessages](/bots/api/methods/deletebusinessmessages.md): Delete messages on behalf of a business account.
- [setBusinessAccountName](/bots/api/methods/setbusinessaccountname.md): Changes the first and last name of a managed business account.
- [setBusinessAccountUsername](/bots/api/methods/setbusinessaccountusername.md): Changes the username of a managed business account.
- [setBusinessAccountBio](/bots/api/methods/setbusinessaccountbio.md): Changes the bio of a managed business account.
- [setBusinessAccountProfilePhoto](/bots/api/methods/setbusinessaccountprofilephoto.md): Changes the profile photo of a managed business account.
- [removeBusinessAccountProfilePhoto](/bots/api/methods/removebusinessaccountprofilephoto.md): Removes the current profile photo of a managed business account.
- [setBusinessAccountGiftSettings](/bots/api/methods/setbusinessaccountgiftsettings.md): Changes the privacy settings pertaining to incoming gifts in a managed business account.
- [getBusinessAccountStarBalance](/bots/api/methods/getbusinessaccountstarbalance.md): Returns the amount of Telegram Stars owned by a managed business account.
- [transferBusinessAccountStars](/bots/api/methods/transferbusinessaccountstars.md): Transfers Telegram Stars from the business account balance to the bot's balance.
- [getBusinessAccountGifts](/bots/api/methods/getbusinessaccountgifts.md): Returns the gifts received and owned by a managed business account.
- [getUserGifts](/bots/api/methods/getusergifts.md): Returns the gifts owned and hosted by a user.
- [getChatGifts](/bots/api/methods/getchatgifts.md): Returns the gifts owned by a chat.
- [convertGiftToStars](/bots/api/methods/convertgifttostars.md): Converts a given regular gift to Telegram Stars.
- [upgradeGift](/bots/api/methods/upgradegift.md): Upgrades a given regular gift to a unique gift.
- [transferGift](/bots/api/methods/transfergift.md): Transfers an owned unique gift to another user.
- [postStory](/bots/api/methods/poststory.md): Posts a story on behalf of a managed business account.
- [repostStory](/bots/api/methods/repoststory.md): Reposts a story on behalf of a business account from another business account.
- [editStory](/bots/api/methods/editstory.md): Edits a story previously posted by the bot on behalf of a managed business account.
- [deleteStory](/bots/api/methods/deletestory.md): Deletes a story previously posted by the bot on behalf of a managed business account.
- [answerWebAppQuery](/bots/api/methods/answerwebappquery.md): set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat from which the query originated.
- [savePreparedInlineMessage](/bots/api/methods/savepreparedinlinemessage.md): Stores a message that can be sent by a user of a Mini App.
- [savePreparedKeyboardButton](/bots/api/methods/savepreparedkeyboardbutton.md): Stores a keyboard button that can be used by a user within a Mini App.

#### Inline mode methods

Methods and objects used in the inline mode are described in the [Inline mode section](/bots/api.md#inline-mode).

### Updating messages

The following methods allow you to change an existing message in the message history instead of sending a new one with a result of an action. This is most useful for messages with [inline keyboards](/bots/features.md#inline-keyboards) using callback queries, but can also help reduce clutter in conversations with regular chat bots.

Please note, that it is currently only possible to edit messages without *reply_markup* or with [inline keyboards](/bots/features.md#inline-keyboards).

- [editMessageText](/bots/api/methods/editmessagetext.md): edit text, rich and game messages.
- [editMessageCaption](/bots/api/methods/editmessagecaption.md): edit captions of messages.
- [editMessageMedia](/bots/api/methods/editmessagemedia.md): edit animation, audio, document, live photo, photo, or video messages, or to replace a text or a rich message with a media.
- [editMessageLiveLocation](/bots/api/methods/editmessagelivelocation.md): edit live location messages.
- [stopMessageLiveLocation](/bots/api/methods/stopmessagelivelocation.md): stop updating a live location message before *live_period* expires.
- [editMessageChecklist](/bots/api/methods/editmessagechecklist.md): edit a checklist on behalf of a connected business account.
- [editMessageReplyMarkup](/bots/api/methods/editmessagereplymarkup.md): edit only the reply markup of messages.
- [stopPoll](/bots/api/methods/stoppoll.md): stop a poll which was sent by the bot.
- [editEphemeralMessageText](/bots/api/methods/editephemeralmessagetext.md): edit an ephemeral text or rich message.
- [editEphemeralMessageMedia](/bots/api/methods/editephemeralmessagemedia.md): edit the media of an ephemeral message.
- [editEphemeralMessageCaption](/bots/api/methods/editephemeralmessagecaption.md): edit the caption of an ephemeral message.
- [editEphemeralMessageReplyMarkup](/bots/api/methods/editephemeralmessagereplymarkup.md): edit only the reply markup of an ephemeral message.
- [approveSuggestedPost](/bots/api/methods/approvesuggestedpost.md): approve a suggested post in a direct messages chat.
- [declineSuggestedPost](/bots/api/methods/declinesuggestedpost.md): decline a suggested post in a direct messages chat.
- [deleteMessage](/bots/api/methods/deletemessage.md): delete a message, including service messages, with the following limitations:
- [deleteMessages](/bots/api/methods/deletemessages.md): delete multiple messages simultaneously.
- [deleteEphemeralMessage](/bots/api/methods/deleteephemeralmessage.md): delete an ephemeral message.
- [deleteMessageReaction](/bots/api/methods/deletemessagereaction.md): remove a reaction from a message in a group or a supergroup chat.
- [deleteAllMessageReactions](/bots/api/methods/deleteallmessagereactions.md): remove up to 10000 recent reactions in a group or a supergroup chat added by a given user or chat.

### Stickers

The following methods and objects allow your bot to handle stickers and sticker sets.

Types of this section are listed at [Bot API types](/bots/api/types.md#stickers).

- [sendSticker](/bots/api/methods/sendsticker.md): send static .WEBP, animated .TGS, or video .WEBM stickers.
- [getStickerSet](/bots/api/methods/getstickerset.md): get a sticker set.
- [getCustomEmojiStickers](/bots/api/methods/getcustomemojistickers.md): get information about custom emoji stickers by their identifiers.
- [uploadStickerFile](/bots/api/methods/uploadstickerfile.md): upload a file with a sticker for later use in the createNewStickerSet, addStickerToSet, or replaceStickerInSet methods (the file can be used multiple times).
- [createNewStickerSet](/bots/api/methods/createnewstickerset.md): create a new sticker set owned by a user.
- [addStickerToSet](/bots/api/methods/addstickertoset.md): add a new sticker to a set created by the bot.
- [setStickerPositionInSet](/bots/api/methods/setstickerpositioninset.md): move a sticker in a set created by the bot to a specific position.
- [deleteStickerFromSet](/bots/api/methods/deletestickerfromset.md): delete a sticker from a set created by the bot.
- [replaceStickerInSet](/bots/api/methods/replacestickerinset.md): replace an existing sticker in a sticker set with a new one.
- [setStickerEmojiList](/bots/api/methods/setstickeremojilist.md): change the list of emoji assigned to a regular or custom emoji sticker.
- [setStickerKeywords](/bots/api/methods/setstickerkeywords.md): change search keywords assigned to a regular or custom emoji sticker.
- [setStickerMaskPosition](/bots/api/methods/setstickermaskposition.md): change the mask position of a mask sticker.
- [setStickerSetTitle](/bots/api/methods/setstickersettitle.md): set the title of a created sticker set.
- [setStickerSetThumbnail](/bots/api/methods/setstickersetthumbnail.md): set the thumbnail of a regular or mask sticker set.
- [setCustomEmojiStickerSetThumbnail](/bots/api/methods/setcustomemojistickersetthumbnail.md): set the thumbnail of a custom emoji sticker set.
- [deleteStickerSet](/bots/api/methods/deletestickerset.md): delete a sticker set that was created by the bot.

### Rich messages

Rich message methods, types and formatting rules are documented at [Rich messages](/bots/api/rich-messages.md).

### Inline mode

The following methods and objects allow your bot to work in [inline mode](/bots/inline.md).
Please see our [Introduction to Inline bots](/bots/inline.md) for more details.

To enable this option, send the `/setinline` command to [@BotFather](https://t.me/botfather) and provide the placeholder text that the user will see in the input field after typing your bot's name.

Types of this section are listed at [Bot API types](/bots/api/types.md#inline-mode).

- [answerInlineQuery](/bots/api/methods/answerinlinequery.md): send answers to an inline query.

### Payments

Your bot can accept payments from Telegram users. Please see the [introduction to payments](/bots/payments.md) for more details on the process and how to set up payments for your bot.

- [sendInvoice](/bots/api/methods/sendinvoice.md): send invoices.
- [createInvoiceLink](/bots/api/methods/createinvoicelink.md): create a link for an invoice.
- [answerShippingQuery](/bots/api/methods/answershippingquery.md): If you sent an invoice requesting a shipping address and the parameter *is_flexible* was specified, the Bot API will send an Update with a *shipping_query* field to the bot.
- [answerPreCheckoutQuery](/bots/api/methods/answerprecheckoutquery.md): Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field *pre_checkout_query*.
- [getMyStarBalance](/bots/api/methods/getmystarbalance.md): A method to get the current Telegram Stars balance of the bot.
- [getStarTransactions](/bots/api/methods/getstartransactions.md): Returns the bot's Telegram Star transactions in chronological order.
- [refundStarPayment](/bots/api/methods/refundstarpayment.md): Refunds a successful payment in Telegram Stars.
- [editUserStarSubscription](/bots/api/methods/edituserstarsubscription.md): Allows the bot to cancel or re-enable extension of a subscription paid in Telegram Stars.

Types of this section are listed at [Bot API types](/bots/api/types.md#payments).

### Telegram Passport

**Telegram Passport** is a unified authorization method for services that require personal identification. Users can upload their documents once, then instantly share their data with services that require real-world ID (finance, ICOs, etc.). Please see the [manual](/passport) for details.

Types of this section are listed at [Bot API types](/bots/api/types.md#telegram-passport).

- [setPassportDataErrors](/bots/api/methods/setpassportdataerrors.md): Informs a user that some of the Telegram Passport elements they provided contains errors.

### Games

Your bot can offer users **HTML5 games** to play solo or to compete against each other in groups and one-on-one chats. Create games via [@BotFather](https://t.me/botfather) using the */newgame* command. Please note that this kind of power requires responsibility: you will need to accept the terms for each game that your bots will be offering.

* Games are a new type of content on Telegram, represented by the [Game](/bots/api/types/game.md) and [InlineQueryResultGame](/bots/api/types/inlinequeryresultgame.md) objects.
* Once you've created a game via [BotFather](https://t.me/botfather), you can send games to chats as regular messages using the [sendGame](/bots/api/methods/sendgame.md) method, or use [inline mode](/bots/api.md#inline-mode) with [InlineQueryResultGame](/bots/api/types/inlinequeryresultgame.md).
* If you send the game message without any buttons, it will automatically have a 'Play *GameName*' button. When this button is pressed, your bot gets a [CallbackQuery](/bots/api/types/callbackquery.md) with the *game_short_name* of the requested game. You provide the correct URL for this particular user and the app opens the game in the in-app browser.
* You can manually add multiple buttons to your game message. Please note that the first button in the first row **must always** launch the game, using the field *callback_game* in [InlineKeyboardButton](/bots/api/types/inlinekeyboardbutton.md). You can add extra buttons according to taste: e.g., for a description of the rules, or to open the game's official community.
* To make your game more attractive, you can upload a GIF animation that demonstrates the game to the users via [BotFather](https://t.me/botfather) (see [Lumberjack](https://t.me/gamebot?game=lumberjack) for example).
* A game message will also display high scores for the current chat. Use [setGameScore](/bots/api/methods/setgamescore.md) to post high scores to the chat with the game, add the *disable_edit_message* parameter to disable automatic update of the message with the current scoreboard.
* Use [getGameHighScores](/bots/api/methods/getgamehighscores.md) to get data for in-game high score tables.
* You can also add an extra [sharing button](/bots/games.md#sharing-your-game-to-telegram-chats) for users to share their best score to different chats.
* For examples of what can be done using this new stuff, check the [@gamebot](https://t.me/gamebot) and [@gamee](https://t.me/gamee) bots.

- [sendGame](/bots/api/methods/sendgame.md): send a game.

Types of this section are listed at [Bot API types](/bots/api/types.md#games).

- [setGameScore](/bots/api/methods/setgamescore.md): set the score of the specified user in a game message.
- [getGameHighScores](/bots/api/methods/getgamehighscores.md): get data for high score tables.

____________

And that's about all we've got for now.
If you've got any questions, please check out our [**Bot FAQ »**](/bots/faq.md)
