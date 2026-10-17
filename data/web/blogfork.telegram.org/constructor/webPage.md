# webPage

Webpage preview

The `type` field indicates the type of the web page, which influences how the preview is rendered (i.e. which extra action button is offered, where the media is taken from, and which [WebPageAttribute](/type/WebPageAttribute.md) is present in the `attributes` field). It can be one of the following:

<!-- start_table webpage type -->

- `app` - Preview of a [Mini App link »](/api/links.md#main-mini-app-links): the `photo` is the app icon, and clients render a button that launches the [Mini App »](/api/bots/webapps.md).
- `article` - Preview of a generic external article or webpage. If `cached_page` is set, clients render an [instant view](https://instantview.telegram.org) button.
- `document` - Preview of an external document or file, contained in the `document` field.
- `gif` - Preview of an external animated GIF. If `embed_url`+`embed_type` are set the GIF is rendered using an embedded player, otherwise the animation is contained in the `document` field.
- `photo` - Preview of an external photo, contained in the `photo` field.
- `profile` - Preview of an external author or profile page; clients typically render this with a small thumbnail (forced small media).
- `telegram_aicomposetone` - Preview of an [AI compose tone link »](/api/links.md#ai-compose-tone-links), shared when previewing a [custom AI composer tone »](/api/ai.md#ai-compose-tones). The `attributes` field contains a [webPageAttributeAiComposeTone](/constructor/webPageAttributeAiComposeTone.md) with the [custom emoji »](/api/custom-emoji.md) representing the tone; clients render a button that applies the shared tone.
- `telegram_album` - Preview of a [message link »](/api/links.md#message-links) pointing to a group of messages (album), rendered as a grouped media album rather than as a single-media preview. For this type the album media is **not** taken from the top-level `photo`/`document` fields: instead, a [cached\_page](#) ([instant view](https://instantview.telegram.org)) must be present, and clients render the items of its first [pageBlockCollage](/constructor/pageBlockCollage.md) or [pageBlockSlideshow](/constructor/pageBlockSlideshow.md) block. Each [pageBlockPhoto](/constructor/pageBlockPhoto.md)/[pageBlockVideo](/constructor/pageBlockVideo.md) item in that block references a photo or video by ID, resolved against the `photos` and `documents` of the `cached_page`. The instant view itself is not offered as a button (the album media replaces it).
- `telegram_auction` - Preview of an [auction link »](/api/links.md#auction-links) to a [collectible gift auction »](/api/auctions.md). The `attributes` field contains a [webPageAttributeStarGiftAuction](/constructor/webPageAttributeStarGiftAuction.md) with the auctioned gift and the auction end date; clients render a button to join the auction, or to view the results once the auction has ended.
- `telegram_background` - Preview of a [wallpaper deep link »](/api/links.md#wallpaper-links) to a [chat wallpaper »](/api/wallpapers.md). The wallpaper settings (background colors, gradient rotation, pattern intensity, blur/motion, etc.) are parsed from the deep link in the `url`, not from dedicated fields. Image wallpapers carry the wallpaper image in the `document` field. Pattern wallpapers also use the `document` field, with `application/x-tgwallpattern` or `image/png` as the pattern MIME type; the colors from the `url` are rendered as the pattern background and tint. Solid-color and gradient wallpapers carry no media and are rendered from the colors encoded in the `url`. No `photo` is present. Clients render a button to apply the background.
- `telegram_bot` - Preview of a [bot link »](/api/links.md#bot-links), rendered like a profile preview using the bot's avatar in the `photo` field.
- `telegram_botapp` - Preview of a [direct Mini App link »](/api/links.md#direct-mini-app-links) to a named bot Mini App: the `photo` is the app preview, and clients render a button that opens the Mini App.
- `telegram_call` - Preview of a [conference link »](/api/links.md#conference-links) to a [group call/conference call »](/api/group-calls.md); clients render a button to join the call (no `photo`/`document` is present).
- `telegram_channel` - Preview of a [public username link »](/api/links.md#public-username-links) to a channel, using the channel's avatar in the `photo` field; clients render a button to open/join the channel.
- `telegram_channel_boost` - Preview of a [boost link »](/api/links.md#boost-links) to [boost a channel »](/api/boost.md), using the channel avatar in the `photo` field; clients render a button to boost the channel.
- `telegram_channel_direct` - Preview of a [monoforum link »](/api/links.md#monoforum-links) to the direct messages of a channel, using the channel avatar in the `photo` field.
- `telegram_channel_request` - Preview of a [chat invite link »](/api/links.md#chat-invite-links) to a channel that has [join requests »](/api/invites.md#join-requests) enabled; clients render a "Request to join" button.
- `telegram_chat` - Preview of a [public username link »](/api/links.md#public-username-links) to a basic group, using the group avatar in the `photo` field; clients render a button to open/join the group.
- `telegram_chat_request` - Preview of a [chat invite link »](/api/links.md#chat-invite-links) to a group that has [join requests »](/api/invites.md#join-requests) enabled; clients render a "Request to join" button.
- `telegram_chatlist` - Preview of a [chat folder link »](/api/links.md#chat-folder-links) to a [shareable chat folder »](/api/folders.md#shared-folders) (no `photo`/`document` is present): clients use the `site_name`, `title` and `description` fields for the preview text, no [WebPageAttribute](/type/WebPageAttribute.md) is required, and the action button opens the deep link in `url` to import the folder.
- `telegram_collection` - Preview of a [gift collection link »](/api/links.md#gift-collection-links) to a [gift collection »](/api/gifts.md#gift-collections). The `attributes` field contains a [webPageAttributeStarGiftCollection](/constructor/webPageAttributeStarGiftCollection.md) with the collection's icon stickers; clients render a button to view the collection.
- `telegram_community` - Preview of a [chat folder link »](/api/links.md#chat-folder-links) to a [shareable chat folder »](/api/folders.md#shared-folders), rendered like `telegram_chatlist`.
- `telegram_giftcode` - Preview of a [premium giftcode link »](/api/links.md#premium-giftcode-links) to a [Telegram Premium gift code »](/api/giveaways.md); clients render a button to view/redeem the gift code (no `photo`/`document` is present).
- `telegram_group_boost` - Preview of a [boost link »](/api/links.md#boost-links) to [boost a supergroup »](/api/boost.md), using the supergroup avatar in the `photo` field; clients render a button to boost the supergroup.
- `telegram_livestream` - Preview of a [video chat/livestream link »](/api/links.md#video-chat-livestream-links) to a [live video stream »](/api/group-calls.md), rendered as a video chat preview marked as a livestream; clients render a button to watch the stream.
- `telegram_megagroup` - Preview of a [public username link »](/api/links.md#public-username-links) to a supergroup, using the supergroup avatar in the `photo` field; clients render a button to open/join the supergroup.
- `telegram_megagroup_request` - Preview of a [chat invite link »](/api/links.md#chat-invite-links) to a supergroup that has [join requests »](/api/invites.md#join-requests) enabled; clients render a "Request to join" button.
- `telegram_message` - Preview of a [message link »](/api/links.md#message-links) to a single message; clients render a button to open the message. Any `cached_page` instant view is ignored for this type.
- `telegram_newbot` - Preview of a [managed bot creation request link »](/api/links.md#managed-bot-creation-request-links) used to create a new bot; clients render a button to create/register the managed bot.
- `telegram_nft` - Preview of a [collectible gift link »](/api/links.md#collectible-gift-link) to a [collectible (unique) gift »](/api/gifts.md#collectible-gifts). The `attributes` field contains a [webPageAttributeUniqueStarGift](/constructor/webPageAttributeUniqueStarGift.md) with the unique gift; clients render a button to view the collectible.
- `telegram_stickerset` - Preview of a [stickerset link »](/api/links.md#stickerset-links) to a [sticker or custom emoji set »](/api/stickers.md). The `attributes` field contains a [webPageAttributeStickerSet](/constructor/webPageAttributeStickerSet.md) with a few preview stickers and the `emojis`/`text_color` flags; clients display the preview stickers and render a button to view the sticker set (or custom emoji set, if the `emojis` flag is set).
- `telegram_story` - Preview of a [story link »](/api/links.md#story-links) to a [story »](/api/stories.md). The `attributes` field contains a [webPageAttributeStory](/constructor/webPageAttributeStory.md) with the story's peer and ID (and optionally the embedded [storyItem](/constructor/storyItem.md)); the preview media and caption are taken from the story, and clients render a button to view it.
- `telegram_story_album` - Preview of a [story album link »](/api/links.md#story-album-links) to a [story album »](/api/stories.md): a `photo` (and optional video `document`) cover is present, and clients render a button to view the story album.
- `telegram_theme` - Preview of a [theme link »](/api/links.md#theme-links) to a [theme »](/api/themes.md). The `attributes` field contains a [webPageAttributeTheme](/constructor/webPageAttributeTheme.md) with the theme file(s) and theme settings; clients render a button to apply the theme.
- `telegram_user` - Preview of a [public username link »](/api/links.md#public-username-links) to a user, rendered like a profile preview using the user's avatar in the `photo` field.
- `telegram_videochat` - Preview of a [video chat/livestream link »](/api/links.md#video-chat-livestream-links) to a [video chat »](/api/group-calls.md), rendered as a video chat preview.
- `telegram_voicechat` - Preview of a [video chat/livestream link »](/api/links.md#video-chat-livestream-links) to a [voice chat »](/api/group-calls.md), rendered as a (non-video) video chat preview; clients render a button to join the voice chat.
- `video` - Preview of an external video. If `embed_url`+`embed_type` are set the video is rendered using an embedded player, otherwise the video is contained in the `document` field.

<!-- end_table webpage type -->

```tl
webPage#e89c45b2 flags:# has_large_media:flags.13?true video_cover_photo:flags.14?true id:long url:string display_url:string hash:int type:flags.0?string site_name:flags.1?string title:flags.2?string description:flags.3?string photo:flags.4?Photo embed_url:flags.5?string embed_type:flags.5?string embed_width:flags.6?int embed_height:flags.6?int duration:flags.7?int author:flags.8?string document:flags.9?Document cached_page:flags.10?Page attributes:flags.12?Vector<WebPageAttribute> = WebPage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **has\_large\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[true](/constructor/true.md) | Whether the size of the media in the preview can be changed. |
| **video\_cover\_photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[true](/constructor/true.md) | Represents a custom [video cover](/api/files.md#video-covers). |
| **id** | [long](/type/long.md) | Preview ID |
| **url** | [string](/type/string.md) | URL of previewed webpage |
| **display\_url** | [string](/type/string.md) | Webpage URL to be displayed to the user |
| **hash** | [int](/type/int.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |
| **type** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Type of the web page, which influences how the preview is rendered (i.e. which extra action button is offered, where the media is taken from, and which [WebPageAttribute](/type/WebPageAttribute.md) is present in the `attributes` field). See [above](#) for the list of possible values. |
| **site\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Short name of the site (e.g., Google Docs, App Store) |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Title of the content |
| **description** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | Content description |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[Photo](/type/Photo.md) | Image representing the content |
| **embed\_url** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[string](/type/string.md) | URL to show in the embedded preview |
| **embed\_type** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[string](/type/string.md) | MIME type of the embedded preview, (e.g., text/html or video/mp4) |
| **embed\_width** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[int](/type/int.md) | Width of the embedded preview |
| **embed\_height** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[int](/type/int.md) | Height of the embedded preview |
| **duration** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[int](/type/int.md) | Duration of the content, in seconds |
| **author** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[string](/type/string.md) | Author of the content |
| **document** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[Document](/type/Document.md) | Preview of the content as a media file |
| **cached\_page** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[Page](/type/Page.md) | Page contents in [instant view](https://instantview.telegram.org) format |
| **attributes** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[Vector](/type/Vector%20t)&lt;[WebPageAttribute](/type/WebPageAttribute.md)&gt; | Webpage attributes |

### Type
[WebPage](/type/WebPage.md)

### Related pages

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [WebPageAttribute](/type/WebPageAttribute.md)
Webpage attributes

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.

#### [webPageAttributeAiComposeTone](/constructor/webPageAttributeAiComposeTone.md)
[Webpage attribute](/type/WebPageAttribute.md) attached to a [webPage](/constructor/webPage.md) of type `telegram_aicomposetone`, generated when previewing a shared [AI composer tone »](/api/ai.md#ai-compose-tones) via an [AI compose tone link »](/api/links.md#ai-compose-tone-links).

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [pageBlockCollage](/constructor/pageBlockCollage.md)
Collage of media

#### [pageBlockSlideshow](/constructor/pageBlockSlideshow.md)
Slideshow

#### [pageBlockPhoto](/constructor/pageBlockPhoto.md)
A photo

#### [pageBlockVideo](/constructor/pageBlockVideo.md)
Video

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.

#### [webPageAttributeStarGiftAuction](/constructor/webPageAttributeStarGiftAuction.md)
Contains info about a [collectible gift auction »](/api/auctions.md) for a [webPage](/constructor/webPage.md) preview of an [auction »](/api/auctions.md) (the [webPage](/constructor/webPage.md) will have a `type` of `telegram_auction`).

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [webPageAttributeStarGiftCollection](/constructor/webPageAttributeStarGiftCollection.md)
Contains info about a [gift collection »](/api/gifts.md#gift-collections) for a [webPage](/constructor/webPage.md) preview of a [gift collection »](/api/gifts.md#gift-collections) (the [webPage](/constructor/webPage.md) will have a `type` of `telegram_collection`).

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.

#### [webPageAttributeUniqueStarGift](/constructor/webPageAttributeUniqueStarGift.md)
Contains info about [collectible gift »](/api/gifts.md#collectible-gifts) for a [webPage](/constructor/webPage.md) preview of a [collectible gift »](/api/gifts.md#collectible-gifts) (the [webPage](/constructor/webPage.md) will have a `type` of `telegram_nft`).

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.

#### [webPageAttributeStickerSet](/constructor/webPageAttributeStickerSet.md)
Contains info about a [stickerset »](/api/stickers.md), for a [webPage](/constructor/webPage.md) preview of a [stickerset deep link »](/api/links.md#stickerset-links) (the [webPage](/constructor/webPage.md) will have a `type` of `telegram_stickerset`).

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [webPageAttributeStory](/constructor/webPageAttributeStory.md)
Webpage preview of a Telegram story

#### [storyItem](/constructor/storyItem.md)
Represents a [story](/api/stories.md).

#### [Telegram themes](/api/themes.md)
Telegram apps support generating, sharing and synchronizing app themes.

#### [webPageAttributeTheme](/constructor/webPageAttributeTheme.md)
Page theme