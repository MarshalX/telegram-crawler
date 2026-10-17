# Sponsored messages


Related TL schema:

#### Getting sponsored messages

    sponsoredMessage#7dbf8673 flags:# recommended:flags.5?true can_report:flags.12?true random_id:bytes url:string title:string message:string entities:flags.1?Vector<MessageEntity> photo:flags.6?Photo media:flags.14?MessageMedia color:flags.13?PeerColor button_text:string sponsor_info:flags.7?string additional_info:flags.8?string min_display_duration:flags.15?int max_display_duration:flags.15?int = SponsoredMessage;

    messages.sponsoredMessages#ffda656d flags:# posts_between:flags.0?int start_delay:flags.1?int between_delay:flags.2?int messages:Vector<SponsoredMessage> chats:Vector<Chat> users:Vector<User> = messages.SponsoredMessages;

    ---functions---

    messages.getSponsoredMessages#3d6ce850 flags:# peer:InputPeer msg_id:flags.0?int = messages.SponsoredMessages;

Each time the user opens a channel or a chat with a bot, [messages.getSponsoredMessages](/method/messages.getSponsoredMessages.md) must be called to receive [sponsored messages](https://promote.telegram.org) available for the channel or bot. The result must be cached for **5 minutes**.

> [More about sponsored messages on Telegram](https://t.me/durov/172)

#### Getting sponsored video advertisements

    sponsoredMessage#7dbf8673 flags:# recommended:flags.5?true can_report:flags.12?true random_id:bytes url:string title:string message:string entities:flags.1?Vector<MessageEntity> photo:flags.6?Photo media:flags.14?MessageMedia color:flags.13?PeerColor button_text:string sponsor_info:flags.7?string additional_info:flags.8?string min_display_duration:flags.15?int max_display_duration:flags.15?int = SponsoredMessage;

    messages.sponsoredMessages#ffda656d flags:# posts_between:flags.0?int start_delay:flags.1?int between_delay:flags.2?int messages:Vector<SponsoredMessage> chats:Vector<Chat> users:Vector<User> = messages.SponsoredMessages;

    ---functions---

    messages.getSponsoredMessages#3d6ce850 flags:# peer:InputPeer msg_id:flags.0?int = messages.SponsoredMessages;

Each time the user starts watching a channel video in fullscreen, [messages.getSponsoredMessages](/method/messages.getSponsoredMessages.md) must be called with `msg_id` set to the ID of the message with the video to receive sponsored messages to show in a small box on the video player, while the video is being played. 

The returned [sponsoredMessage](/constructor/sponsoredMessage.md)s will always be text-only ads with the `min_display_duration` and `max_display_duration` flags set, and the containing [messages.sponsoredMessages](/constructor/messages.sponsoredMessages.md) constructor will always have the `start_delay` and `between_delay` flags set.  

The returned video ads must be displayed, in order, for [sponsoredMessage](/constructor/sponsoredMessage.md).`max_display_duration` seconds each, and then hidden automatically.  

Video ads may also be hidden manually by the user after [sponsoredMessage](/constructor/sponsoredMessage.md).`min_display_duration` seconds.  

The first ad must be displayed after [messages.sponsoredMessages](/constructor/messages.sponsoredMessages.md).`start_delay` seconds of video playtime.  

Subsequent ads must be displayed [messages.sponsoredMessages](/constructor/messages.sponsoredMessages.md).`between_delay` seconds after the previous ad is hidden, either automatically or manually by the user.  

Switching to the next or the previous video on the channel by swiping left or right while in the fullscreen player should **not** trigger a new [messages.getSponsoredMessages](/method/messages.getSponsoredMessages.md) call nor interrupt any timers: in fact, treat the ads as linked to the fullscreen player, not to a specific video (this is true as long as we're playing videos on the same channel).  

Pause all timers when the user pauses the video, for example assume:

* `start_delay=5`
* `between_delay=10`
* `min_display_duration=5` for all ads
* `max_display_duration=10` for all ads

And the following timeline:

* `T=0`: the user starts playing the video
* `T=3`: the user pauses the video
* `T=10`: The user resumes the video
* `T=12`: Show the first ad
* `T=15`: The user pauses the video
* `T=20`: The user resumes the video
* `T=22`: Allow the user to hide the ad
* `T=25`: The user pauses the video
* `T=30`: The user resumes the video
* `T=32`: Auto-hide the ad
* `T=35`: The user pauses the video
* `T=40`: The user resumes the video
* `T=47`: Show the next ad

#### Getting sponsored search results

    contacts.found#b3134d9d my_results:Vector<Peer> results:Vector<Peer> chats:Vector<Chat> users:Vector<User> = contacts.Found;

    contacts.sponsoredPeersEmpty#ea32b4b1 = contacts.SponsoredPeers;
    contacts.sponsoredPeers#eb032884 peers:Vector<SponsoredPeer> chats:Vector<Chat> users:Vector<User> = contacts.SponsoredPeers;
    
    sponsoredPeer#c69708d3 flags:# random_id:bytes peer:Peer sponsor_info:flags.0?string additional_info:flags.1?string = SponsoredPeer;

    ---functions---

    contacts.search#11f812d8 q:string limit:int = contacts.Found;

    contacts.getSponsoredPeers#b6c8c393 q:string = contacts.SponsoredPeers;

Clients must also support sponsored peers, to be shown when searching for peers using the **global search function**, together with [contacts.search](/method/contacts.search.md).  

[contacts.getSponsoredPeers](/method/contacts.getSponsoredPeers.md) should be invoked, returning a list of sponsored peers to be displayed after the results in [contacts.found](/constructor/contacts.found.md).`my_results` and before the results in [contacts.found](/constructor/contacts.found.md).`results`.  

Sponsored peers should be treated similarly to sponsored messages: 

* If the [sponsoredPeer](/constructor/sponsoredPeer.md).`sponsor_info` or [sponsoredPeer](/constructor/sponsoredPeer.md).`additional_info` flags are set, an additional "Sponsor info" label must be present, that when clicked, displays the contents of the flags.  
* When they scroll into view, [messages.viewSponsoredMessage](/method/messages.viewSponsoredMessage.md) should be [invoked as specified here &raquo;](#counting-sponsored-message-views), passing the `random_id` of the [sponsoredPeer](/constructor/sponsoredPeer.md) to the `random_id` parameter.
* Clicks should be reported by invoking [messages.clickSponsoredMessage](/method/messages.clickSponsoredMessage.md), without setting any flag, passing the `random_id` of the [sponsoredPeer](/constructor/sponsoredPeer.md) to the `random_id` parameter.
* Sponsored search results can be reported using [messages.reportSponsoredMessage](/method/messages.reportSponsoredMessage.md), following the [usual flow &raquo;](#reporting-sponsored-messages), passing the `random_id` of the [sponsoredPeer](/constructor/sponsoredPeer.md) to the `random_id` parameter.  

As specified above, the `random_id` of a [sponsoredPeer](/constructor/sponsoredPeer.md) **can** be passed to methods related to sponsored messages.  

#### Displaying sponsored messages

Sponsored messages must be displayed as follows:

- In channels, they must be displayed below all other posts in the channel, after the user scrolls further down, past the last message.  
  Sponsored channel messages have:

  * A title (contained in `title`)
  * A text (contained in `message`+`entities`)
  * An optional media (contained in `media`, clicking on it should open the URL in `url` as below; a separate button should be available to expand the video in fullscreen, which should *not* open the linked `url` when clicked).
  * A button at the bottom (label in `button_text`) that when clicked, opens the URL in `url`.  
    A confirmation prompt should be shown before opening the URL, unless the host part of the URL matches the following regex: `(^|\\.)(telegram\.(org|me|dog)|t\.me|te\.?legra\.ph|graph\.org|fragment\.com|telesco\.pe)$`, in which case the URL should be opened without confirmation (and if it's a [deep link&nbsp;&raquo;](/api/links.md), it should be opened directly in-app, without passing through the browser).  
  * The message should be marked as "Recommended" instead of "Sponsored" if the `recommended` flag is set.  
  * If the `photo` flag is set, it should be used to display a profile photo bubble for the sponsored message, like for messages sent in groups.  
  * If the `sponsor_info` or `additional_info` flags are set, an additional "Sponsor info" menu item must be present in the message context menu (the menu that pops up when clicking on a button), that when clicked, displays the contents of the flags.  
- In bots, they must be displayed [above the chat](https://telegram.org/blog/dynamic-video-quality-and-more#telegram-ads-in-bots), akin to an [action bar](/api/action-bar.md)
  Bot ads have:

  * A title (contained in `title`): must be locally prepended with a blue-colored "Ad" prefix, or a "Recommended" prefix if the `recommended` flag is set. 
  * A text (contained in `message`+`entities`)
  * When the ad action bar is clicked, clients should open the URL in `url`.  
    A confirmation prompt should be shown before opening the URL, unless the host part of the URL matches the following regex: `(^|\\.)(telegram\.(org|me|dog)|t\.me|te\.?legra\.ph|graph\.org|fragment\.com|telesco\.pe)$`, in which case the URL should be opened without confirmation (and if it's a [deep link&nbsp;&raquo;](/api/links.md), it should be opened directly in-app, without passing through the browser).  

  If the `photo` flag is set, a thumbnail-sized version of it should be displayed in the right section of the action bar.

If set, the sponsored message/action bar should use the [message accent color&nbsp;&raquo;](/api/colors.md) specified in `color`.

#### Counting sponsored message views

    ---functions---

    messages.viewSponsoredMessage#269e3643 random_id:bytes = Bool;

Once the entire text of the ad is shown on the screen (excluding the button for channel ads), [messages.viewSponsoredMessage](/method/messages.viewSponsoredMessage.md) must be called with the `random_id` of the sponsored message.

#### Clicking on sponsored messages 
    
    ---functions---

    messages.clickSponsoredMessage#8235057e flags:# media:flags.0?true fullscreen:flags.1?true random_id:bytes = Bool;

Depending on the action made by the user, the following logic must be followed.  

- Click on a link in the sponsored message: invoke [messages.clickSponsoredMessage](/method/messages.clickSponsoredMessage.md), open link.  
- Click on the bot ad bar: invoke [messages.clickSponsoredMessage](/method/messages.clickSponsoredMessage.md), open link.  
- Open a sponsored chat or a sponsored website via the associated button: invoke [messages.clickSponsoredMessage](/method/messages.clickSponsoredMessage.md), open chat.  
- Open the sponsored chat via the sponsored message name, the sponsored message photo, or a mention in the sponsored message: invoke [messages.clickSponsoredMessage](/method/messages.clickSponsoredMessage.md), open chat.  
- Clicks on media (only **photos and videos without sound**): invoke [messages.clickSponsoredMessage](/method/messages.clickSponsoredMessage.md) with the `media` flag set, open link.  
- Clicks on media (only **videos with sound**): invoke [messages.clickSponsoredMessage](/method/messages.clickSponsoredMessage.md) with the `media` flag set, open video in fullscreen (do **not** open the link yet).
- Clicks on media (only **videos with sound in fullscreen**): invoke [messages.clickSponsoredMessage](/method/messages.clickSponsoredMessage.md) with the `media` and `fullscreen` flags set, open link.  
- Clicks on the button while a sponsored video is in fullscreen: invoke [messages.clickSponsoredMessage](/method/messages.clickSponsoredMessage.md) with the `fullscreen` flag set, open link.  

#### Reporting sponsored messages

    sponsoredMessage#7dbf8673 flags:# recommended:flags.5?true can_report:flags.12?true random_id:bytes url:string title:string message:string entities:flags.1?Vector<MessageEntity> photo:flags.6?Photo media:flags.14?MessageMedia color:flags.13?PeerColor button_text:string sponsor_info:flags.7?string additional_info:flags.8?string min_display_duration:flags.15?int max_display_duration:flags.15?int = SponsoredMessage;

    sponsoredMessageReportOption#430d3150 text:string option:bytes = SponsoredMessageReportOption;

    channels.sponsoredMessageReportResultChooseOption#846f9e42 title:string options:Vector<SponsoredMessageReportOption> = channels.SponsoredMessageReportResult;
    channels.sponsoredMessageReportResultAdsHidden#3e3bcf2f = channels.SponsoredMessageReportResult;
    channels.sponsoredMessageReportResultReported#ad798849 = channels.SponsoredMessageReportResult;

    ---functions---

    messages.reportSponsoredMessage#12cbf0c4 random_id:bytes option:bytes = channels.SponsoredMessageReportResult;

To report a sponsored message to Telegram's moderators, invoke [messages.reportSponsoredMessage](/method/messages.reportSponsoredMessage.md), passing the channel/bot ID, the `random_id` of the sponsored message and an empty `option` field.  

Note that only sponsored messages with the [sponsoredMessage](/constructor/sponsoredMessage.md).`can_report` flag set may be reported.  

Then, if the result is:

* A [channels.sponsoredMessageReportResultChooseOption](/constructor/channels.sponsoredMessageReportResultChooseOption.md) constructor, the user must choose a report option from the localized options available in `options`, and after selection, the method must be invoked again, passing the option's `option` field to the `option` parameter of [messages.reportSponsoredMessage](/method/messages.reportSponsoredMessage.md).  
  The `title` field of [channels.sponsoredMessageReportResultChooseOption](/constructor/channels.sponsoredMessageReportResultChooseOption.md) must be used as title of the option selection popup.  
* A [channels.sponsoredMessageReportResultAdsHidden](/constructor/channels.sponsoredMessageReportResultAdsHidden.md) constructor, sponsored messages were hidden for the user in all chats.  
* A [channels.sponsoredMessageReportResultReported](/constructor/channels.sponsoredMessageReportResultReported.md) constructor, the sponsored message was reported successfully. 

The method may also return:

* An `AD_EXPIRED` RPC error, for expired (too old or not found) ads
* A `PREMIUM_ACCOUNT_REQUIRED` RPC error, if the user asked to hide sponsored messages in the chosen option, but Telegram Premium is required for this action.  

#### Testing sponsored messages

For the channel [https://t.me/SecretAdTestChannel](https://t.me/SecretAdTestChannel) the system will **always** return a sponsored message: promoting either a channel, a particular message in a channel, or a bot with a start parameter.

#### Withdrawing ad revenue as a channel/bot owner

Telegram has one of the **most generous reward systems** in the history of social media. Telegram channel/bot owners can now receive **50%** of the revenue from ads displayed in their channels.

[See here&nbsp;&raquo;](/api/revenue.md) for more info on how to withdraw channel/bot ad revenue, as well as view detailed revenue stats.  

---

#### Sponsored messages in third-party apps

Telegram continues to grow worldwide, in part thanks to third-party apps using the Telegram API. To cover the increasing costs that come with this growth, Telegram added [sponsored messages](https://promote.telegram.org) – a paid [privacy-friendly way](https://t.me/durov/172) to promote **bots and channels**. 

If their app allows its users to **access content from Telegram channels**, third-party developers using the Telegram API are required to support and properly display official sponsored messages in their apps by **January 1, 2022**. Unfortunately, Telegram cannot financially sustain third-party apps that do not display sponsored messages and they will have to be disconnected. 

Telegram's API usage will continue to be **free of charge** for all developers. The [rules](/api/terms.md#3-advertising-amp-monetization) regarding monetization in third-party apps remain the same: developers are allowed to monetize their coding efforts through advertising of their own or other legitimate means, provided that all the methods of monetization used in their apps are prominently mentioned in their app store descriptions.
