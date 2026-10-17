# WebPage

[Instant View](https://instantview.telegram.org) webpage preview

```tl
webPageEmpty#211a1788 flags:# id:long url:flags.0?string = WebPage;
webPagePending#b0d13e47 flags:# id:long url:flags.0?string date:int = WebPage;
webPage#e89c45b2 flags:# has_large_media:flags.13?true video_cover_photo:flags.14?true id:long url:string display_url:string hash:int type:flags.0?string site_name:flags.1?string title:flags.2?string description:flags.3?string photo:flags.4?Photo embed_url:flags.5?string embed_type:flags.5?string embed_width:flags.6?int embed_height:flags.6?int duration:flags.7?int author:flags.8?string document:flags.9?Document cached_page:flags.10?Page attributes:flags.12?Vector<WebPageAttribute> = WebPage;
webPageNotModified#7311ca11 flags:# cached_page_views:flags.0?int = WebPage;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [webPageEmpty](/constructor/webPageEmpty.md) | No preview is available for the webpage |
| [webPagePending](/constructor/webPagePending.md) | A preview of the webpage is currently being generated |
| [webPage](/constructor/webPage.md) | Webpage preview\
\
The `type` field indicates the type of the web page, which influences how the preview is rendered (i.e. which extra action button is offered, where the media is taken from, and which [WebPageAttribute](/type/WebPageAttribute.md) is present in the `attributes` field). It can be one of the following:\
\
<!-- start_table webpage type -->\
\
- `app` - Preview of a [Mini App link »](/api/links.md#main-mini-app-links): the `photo` is the app icon, and clients render a button that launches the [Mini App »](/api/bots/webapps.md).\
- `article` - Preview of a generic external article or webpage. If `cached_page` is set, clients render an [instant view](https://instantview.telegram.org) button.\
- `document` - Preview of an external document or file, contained in the `document` field.\
- `gif` - Preview of an external animated GIF. If `embed_url`+`embed_type` are set the GIF is rendered using an embedded player, otherwise the animation is contained in the `document` field.\
- `photo` - Preview of an external photo, contained in the `photo` field.\
- `profile` - Preview of an external author or profile page; clients typically render this with a small thumbnail (forced small media).\
- `telegram_aicomposetone` - Preview of an [AI compose tone link »](/api/links.md#ai-compose-tone-links), shared when previewing a [custom AI composer tone »](/api/ai.md#ai-compose-tones). The `attributes` field contains a [webPageAttributeAiComposeTone](/constructor/webPageAttributeAiComposeTone.md) with the [custom emoji »](/api/custom-emoji.md) representing the tone; clients render a button that applies the shared tone.\
- `telegram_album` - Preview of a [message link »](/api/links.md#message-links) pointing to a group of messages (album), rendered as a grouped media album rather than as a single-media preview. For this type the album media is **not** taken from the top-level `photo`/`document` fields: instead, a [cached\_page](#) ([instant view](https://instantview.telegram.org)) must be present, and clients render the items of its first [pageBlockCollage](/constructor/pageBlockCollage.md) or [pageBlockSlideshow](/constructor/pageBlockSlideshow.md) block. Each [pageBlockPhoto](/constructor/pageBlockPhoto.md)/[pageBlockVideo](/constructor/pageBlockVideo.md) item in that block references a photo or video by ID, resolved against the `photos` and `documents` of the `cached_page`. The instant view itself is not offered as a button (the album media replaces it).\
- `telegram_auction` - Preview of an [auction link »](/api/links.md#auction-links) to a [collectible gift auction »](/api/auctions.md). The `attributes` field contains a [webPageAttributeStarGiftAuction](/constructor/webPageAttributeStarGiftAuction.md) with the auctioned gift and the auction end date; clients render a button to join the auction, or to view the results once the auction has ended.\
- `telegram_background` - Preview of a [wallpaper deep link »](/api/links.md#wallpaper-links) to a [chat wallpaper »](/api/wallpapers.md). The wallpaper settings (background colors, gradient rotation, pattern intensity, blur/motion, etc.) are parsed from the deep link in the `url`, not from dedicated fields. Image wallpapers carry the wallpaper image in the `document` field. Pattern wallpapers also use the `document` field, with `application/x-tgwallpattern` or `image/png` as the pattern MIME type; the colors from the `url` are rendered as the pattern background and tint. Solid-color and gradient wallpapers carry no media and are rendered from the colors encoded in the `url`. No `photo` is present. Clients render a button to apply the background.\
- `telegram_bot` - Preview of a [bot link »](/api/links.md#bot-links), rendered like a profile preview using the bot's avatar in the `photo` field.\
- `telegram_botapp` - Preview of a [direct Mini App link »](/api/links.md#direct-mini-app-links) to a named bot Mini App: the `photo` is the app preview, and clients render a button that opens the Mini App.\
- `telegram_call` - Preview of a [conference link »](/api/links.md#conference-links) to a [group call/conference call »](/api/group-calls.md); clients render a button to join the call (no `photo`/`document` is present).\
- `telegram_channel` - Preview of a [public username link »](/api/links.md#public-username-links) to a channel, using the channel's avatar in the `photo` field; clients render a button to open/join the channel.\
- `telegram_channel_boost` - Preview of a [boost link »](/api/links.md#boost-links) to [boost a channel »](/api/boost.md), using the channel avatar in the `photo` field; clients render a button to boost the channel.\
- `telegram_channel_direct` - Preview of a [monoforum link »](/api/links.md#monoforum-links) to the direct messages of a channel, using the channel avatar in the `photo` field.\
- `telegram_channel_request` - Preview of a [chat invite link »](/api/links.md#chat-invite-links) to a channel that has [join requests »](/api/invites.md#join-requests) enabled; clients render a "Request to join" button.\
- `telegram_chat` - Preview of a [public username link »](/api/links.md#public-username-links) to a basic group, using the group avatar in the `photo` field; clients render a button to open/join the group.\
- `telegram_chat_request` - Preview of a [chat invite link »](/api/links.md#chat-invite-links) to a group that has [join requests »](/api/invites.md#join-requests) enabled; clients render a "Request to join" button.\
- `telegram_chatlist` - Preview of a [chat folder link »](/api/links.md#chat-folder-links) to a [shareable chat folder »](/api/folders.md#shared-folders) (no `photo`/`document` is present): clients use the `site_name`, `title` and `description` fields for the preview text, no [WebPageAttribute](/type/WebPageAttribute.md) is required, and the action button opens the deep link in `url` to import the folder.\
- `telegram_collection` - Preview of a [gift collection link »](/api/links.md#gift-collection-links) to a [gift collection »](/api/gifts.md#gift-collections). The `attributes` field contains a [webPageAttributeStarGiftCollection](/constructor/webPageAttributeStarGiftCollection.md) with the collection's icon stickers; clients render a button to view the collection.\
- `telegram_community` - Preview of a [chat folder link »](/api/links.md#chat-folder-links) to a [shareable chat folder »](/api/folders.md#shared-folders), rendered like `telegram_chatlist`.\
- `telegram_giftcode` - Preview of a [premium giftcode link »](/api/links.md#premium-giftcode-links) to a [Telegram Premium gift code »](/api/giveaways.md); clients render a button to view/redeem the gift code (no `photo`/`document` is present).\
- `telegram_group_boost` - Preview of a [boost link »](/api/links.md#boost-links) to [boost a supergroup »](/api/boost.md), using the supergroup avatar in the `photo` field; clients render a button to boost the supergroup.\
- `telegram_livestream` - Preview of a [video chat/livestream link »](/api/links.md#video-chat-livestream-links) to a [live video stream »](/api/group-calls.md), rendered as a video chat preview marked as a livestream; clients render a button to watch the stream.\
- `telegram_megagroup` - Preview of a [public username link »](/api/links.md#public-username-links) to a supergroup, using the supergroup avatar in the `photo` field; clients render a button to open/join the supergroup.\
- `telegram_megagroup_request` - Preview of a [chat invite link »](/api/links.md#chat-invite-links) to a supergroup that has [join requests »](/api/invites.md#join-requests) enabled; clients render a "Request to join" button.\
- `telegram_message` - Preview of a [message link »](/api/links.md#message-links) to a single message; clients render a button to open the message. Any `cached_page` instant view is ignored for this type.\
- `telegram_newbot` - Preview of a [managed bot creation request link »](/api/links.md#managed-bot-creation-request-links) used to create a new bot; clients render a button to create/register the managed bot.\
- `telegram_nft` - Preview of a [collectible gift link »](/api/links.md#collectible-gift-link) to a [collectible (unique) gift »](/api/gifts.md#collectible-gifts). The `attributes` field contains a [webPageAttributeUniqueStarGift](/constructor/webPageAttributeUniqueStarGift.md) with the unique gift; clients render a button to view the collectible.\
- `telegram_stickerset` - Preview of a [stickerset link »](/api/links.md#stickerset-links) to a [sticker or custom emoji set »](/api/stickers.md). The `attributes` field contains a [webPageAttributeStickerSet](/constructor/webPageAttributeStickerSet.md) with a few preview stickers and the `emojis`/`text_color` flags; clients display the preview stickers and render a button to view the sticker set (or custom emoji set, if the `emojis` flag is set).\
- `telegram_story` - Preview of a [story link »](/api/links.md#story-links) to a [story »](/api/stories.md). The `attributes` field contains a [webPageAttributeStory](/constructor/webPageAttributeStory.md) with the story's peer and ID (and optionally the embedded [storyItem](/constructor/storyItem.md)); the preview media and caption are taken from the story, and clients render a button to view it.\
- `telegram_story_album` - Preview of a [story album link »](/api/links.md#story-album-links) to a [story album »](/api/stories.md): a `photo` (and optional video `document`) cover is present, and clients render a button to view the story album.\
- `telegram_theme` - Preview of a [theme link »](/api/links.md#theme-links) to a [theme »](/api/themes.md). The `attributes` field contains a [webPageAttributeTheme](/constructor/webPageAttributeTheme.md) with the theme file(s) and theme settings; clients render a button to apply the theme.\
- `telegram_user` - Preview of a [public username link »](/api/links.md#public-username-links) to a user, rendered like a profile preview using the user's avatar in the `photo` field.\
- `telegram_videochat` - Preview of a [video chat/livestream link »](/api/links.md#video-chat-livestream-links) to a [video chat »](/api/group-calls.md), rendered as a video chat preview.\
- `telegram_voicechat` - Preview of a [video chat/livestream link »](/api/links.md#video-chat-livestream-links) to a [voice chat »](/api/group-calls.md), rendered as a (non-video) video chat preview; clients render a button to join the voice chat.\
- `video` - Preview of an external video. If `embed_url`+`embed_type` are set the video is rendered using an embedded player, otherwise the video is contained in the `document` field.\
\
<!-- end_table webpage type --> |
| [webPageNotModified](/constructor/webPageNotModified.md) | The preview of the webpage hasn't changed |