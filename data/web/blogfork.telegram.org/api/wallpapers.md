# Chat wallpapers


Telegram apps support generating, sharing and synchronizing chat backgrounds.

Wallpapers must be rendered according to the instructions contained in the wallpaper constructors.  

### Wallpaper types

There are four main wallpaper types:

* [Image wallpapers](#image-wallpapers)
* [Pattern wallpapers](#pattern-wallpapers)
* [Fill wallpapers](#fill-wallpapers)
* [Channel and supergroup wallpapers](#channel-and-supergroup-wallpapers)

Fill and pattern wallpapers are generated using one of three [fill types](#fill-types).

#### Image wallpapers

    wallPaper#a437c3ed id:long flags:# creator:flags.0?true default:flags.1?true pattern:flags.3?true dark:flags.4?true access_hash:long slug:string document:Document settings:flags.2?WallPaperSettings = WallPaper;

    wallPaperSettings#372efcd0 flags:# blur:flags.1?true motion:flags.2?true background_color:flags.0?int second_background_color:flags.4?int third_background_color:flags.5?int fourth_background_color:flags.6?int intensity:flags.3?int rotation:flags.4?int emoticon:flags.7?string = WallPaperSettings;

Image wallpapers are wallpapers described by a [wallPaper](/constructor/wallPaperNoFile.md) constructor, containing a JPEG image in the `document` field.  
The `settings` field describes the transforms that should be applied to the image if the corresponding flags are set:  

* `settings.blur`: The image should be downscaled to fit in 450x450 square and then box-blurred with radius 12.
* `settings.motion`: The image needs to be slightly moved when device is tilted, allowing for a parallax effect.

All other `settings` flags should be ignored.  

#### Pattern wallpapers

    wallPaper#a437c3ed id:long flags:# creator:flags.0?true default:flags.1?true pattern:flags.3?true dark:flags.4?true access_hash:long slug:string document:Document settings:flags.2?WallPaperSettings = WallPaper;

    wallPaperSettings#372efcd0 flags:# blur:flags.1?true motion:flags.2?true background_color:flags.0?int second_background_color:flags.4?int third_background_color:flags.5?int fourth_background_color:flags.6?int intensity:flags.3?int rotation:flags.4?int emoticon:flags.7?string = WallPaperSettings;

Pattern wallpapers are wallpapers described by a [wallPaper](/constructor/wallPaperNoFile.md) constructor with the `pattern` flag set, combining the [color fill](#fill-types) specified by the `settings` field with the PNG or TGV (gzipped subset of SVG with MIME type "application/x-tgwallpattern") pattern image contained in the `document` field.  

The pattern image should be completely transparent, except for the pattern itself which should be shades of black.

The following flags in the `settings` field describe how should the pattern be combined with the color fill:

* `settings.intensity`: A value ranging from -100 to 100.
  * Values from 0 to 100 mean that the pattern should be overlaid on top of the [color fill](#fill-types) with the specified intensity (@ 100 the black pattern is fully visible on the background fill, @ 0 only the background fill is visible).  
  * Values from -1 to -100 mean that the pattern should be inverted (black background, transparent pattern) before overlaying on top of the [color fill](#fill-types) with the specified intensity (@ -100 the filled pattern is fully visible on a black background, @ -1 only black is visible).  
* `settings.motion`: The pattern needs to be slightly moved on top of the background when device is tilted, allowing for a parallax effect.

#### Fill wallpapers

    wallPaperNoFile#e0804116 id:long flags:# default:flags.1?true dark:flags.4?true settings:flags.2?WallPaperSettings = WallPaper;

Fill wallpapers are simple wallpapers described by the [wallPaperNoFile](/constructor/wallPaperNoFile.md) constructor, containing only the [fill](#fill-types) specified by the `settings` field.  

#### Channel and supergroup wallpapers

    wallPaperSettings#372efcd0 flags:# blur:flags.1?true motion:flags.2?true background_color:flags.0?int second_background_color:flags.4?int third_background_color:flags.5?int fourth_background_color:flags.6?int intensity:flags.3?int rotation:flags.4?int emoticon:flags.7?string = WallPaperSettings;

[Fill wallpapers](#fill-wallpapers) with an `emoticon` contained in the associated wallpaper `settings` indicate a channel/supergroup wallpaper, that can be [installed&nbsp;&raquo;](#installing-wallpapers-in-a-specific-chat-or-channel) in channels and supergroups that have enough boosts, [see here&nbsp;&raquo;](#installing-wallpapers-in-a-specific-chat-or-channel) for more info.  

The full list of channel/supergroup wallpapers can be fetched using [account.getChatThemes](/method/account.getChatThemes.md).  

Channels/supergroups may also set any custom wallpaper (not just the ones returned by [account.getChatThemes](/method/account.getChatThemes.md)) after reaching a higher boost level, [see here&nbsp;&raquo;](#installing-wallpapers-in-a-specific-chat-or-channel) for more info.  

### Fill types

Fill and pattern wallpapers are generated using one of three fill types:  

* [Solid fill](#solid-fill)
* [Gradient fill](#gradient-fill)
* [Freeform gradient fill](#freeform-gradient-fill)

#### Solid fill

    wallPaperSettings#372efcd0 flags:# blur:flags.1?true motion:flags.2?true background_color:flags.0?int second_background_color:flags.4?int third_background_color:flags.5?int fourth_background_color:flags.6?int intensity:flags.3?int rotation:flags.4?int emoticon:flags.7?string = WallPaperSettings;

If out of the `*_background_color` flags only `background_color` is set, the fill is made of just the specified RGB-24 color.

#### Gradient fill

    wallPaperSettings#372efcd0 flags:# blur:flags.1?true motion:flags.2?true background_color:flags.0?int second_background_color:flags.4?int third_background_color:flags.5?int fourth_background_color:flags.6?int intensity:flags.3?int rotation:flags.4?int emoticon:flags.7?string = WallPaperSettings;

If out of the `*_background_color` flags only `background_color` and `second_background_color` are set, the fill is made of a top-bottom (background-second_background) gradient of the specified RGB-24 colors.  
If set, `rotation` indicates clockwise rotation angle of the gradient, in degrees; 0-359. Must be always divisible by 45, default to 0 if not set.  

#### Freeform gradient fill

    wallPaperSettings#372efcd0 flags:# blur:flags.1?true motion:flags.2?true background_color:flags.0?int second_background_color:flags.4?int third_background_color:flags.5?int fourth_background_color:flags.6?int intensity:flags.3?int rotation:flags.4?int emoticon:flags.7?string = WallPaperSettings;

If the `background_color`, `second_background_color`, `third_background_color` and optionally `fourth_background_color` flags are set, the fill is made of a freeform gradient of the specified 3 or 4 RGB-24 colors.  

### Wallpaper API

#### Uploading wallpapers

    wallPaperSettings#372efcd0 flags:# blur:flags.1?true motion:flags.2?true background_color:flags.0?int second_background_color:flags.4?int third_background_color:flags.5?int fourth_background_color:flags.6?int intensity:flags.3?int rotation:flags.4?int emoticon:flags.7?string = WallPaperSettings;

    wallPaper#a437c3ed id:long flags:# creator:flags.0?true default:flags.1?true pattern:flags.3?true dark:flags.4?true access_hash:long slug:string document:Document settings:flags.2?WallPaperSettings = WallPaper;

    ---functions---

    account.uploadWallPaper#e39a8f03 flags:# for_chat:flags.0?true file:InputFile mime_type:string settings:WallPaperSettings = WallPaper;

[account.uploadWallPaper](/method/account.uploadWallPaper.md) is used to upload [image](#image-wallpapers) and [pattern](#pattern-wallpapers) wallpapers. The `for_chat` flag must be set when uploading wallpapers to be used with [messages.setChatWallPaper](/method/messages.setChatWallPaper.md).  
[Fill wallpapers](#fill-wallpapers) don't require uploading since they have no associated file, and a [wallPaper](/constructor/wallPaper.md) constructor can directly be generated client-side, specifying `id=0`.  

Wallpapers can then be shared using a [wallpaper deep link&nbsp;&raquo;](/api/links.md#wallpaper-links), and/or [installed as specified here (image and pattern wallpapers only)&nbsp;&raquo;](#installing-wallpapers).  

#### Installing wallpapers

    inputWallPaper#e630b979 id:long access_hash:long = InputWallPaper;
    inputWallPaperSlug#72091c80 slug:string = InputWallPaper;

    wallPaper#a437c3ed id:long flags:# creator:flags.0?true default:flags.1?true pattern:flags.3?true dark:flags.4?true access_hash:long slug:string document:Document settings:flags.2?WallPaperSettings = WallPaper;

    wallPaperSettings#372efcd0 flags:# blur:flags.1?true motion:flags.2?true background_color:flags.0?int second_background_color:flags.4?int third_background_color:flags.5?int fourth_background_color:flags.6?int intensity:flags.3?int rotation:flags.4?int emoticon:flags.7?string = WallPaperSettings;

    account.wallPapersNotModified#1c199183 = account.WallPapers;
    account.wallPapers#cdc3858c hash:long wallpapers:Vector<WallPaper> = account.WallPapers;

    ---functions---

    account.getWallPaper#fc8ddbea wallpaper:InputWallPaper = WallPaper;
    account.getMultiWallPapers#65ad71dc wallpapers:Vector<InputWallPaper> = Vector<WallPaper>;

    account.saveWallPaper#6c5a5b37 wallpaper:InputWallPaper unsave:Bool settings:WallPaperSettings = Bool;
    account.installWallPaper#feed5769 wallpaper:InputWallPaper settings:WallPaperSettings = Bool;
    account.getWallPapers#7967d36 hash:long = account.WallPapers;
    account.resetWallPapers#bb3b9804 = Bool;
    

Once you've [uploaded your wallpaper](#uploading-wallpapers) or received a [wallpaper deep link](/api/links.md#wallpaper-links), it can be installed as follows.  

_Note that [fill wallpapers](#fill-wallpapers) cannot be globally installed using [account.installWallPaper](/method/account.installWallPaper.md) or [account.saveWallPaper](/method/account.saveWallPaper.md), clients should install and keep track of them only locally, without synchronizing the wallpaper list or signaling installations._

The API keeps a list of wallpapers that the user can set as chat background, including some preinstalled ones.  
To fetch the list use [account.getWallPapers](/method/account.getWallPapers.md).  
To save a wallpaper to the list use [account.saveWallPaper](/method/account.saveWallPaper.md) with `unsave=false`.  
To remove a wallpaper (including preinstalled wallpapers) from the list use [account.saveWallPaper](/method/account.saveWallPaper.md) with `unsave=true`.  
To restore the default list, removing all installed wallpapers and reinstalling previously removed preinstalled wallpapers use [account.resetWallPapers](/method/account.resetWallPapers.md).  

When a client sets a wallpaper as the default chat background, call [account.installWallPaper](/method/account.installWallPaper.md) to signal this installation to the server.  
Note that calling this method will also automatically save the wallpaper, if it's not present in the saved wallpapers list.  

In all cases where an [InputWallPaper](/type/InputWallPaper.md) constructor is required, pass:  

* [inputWallPaperSlug](/constructor/inputWallPaperSlug.md) when working with [wallpaper deep links](/api/links.md#wallpaper-links).
* [inputWallPaper](/constructor/inputWallPaper.md) otherwise, using the ID and access hash fields of a full [wallPaper](/constructor/wallPaper.md).  
  As mentioned earlier, [fill wallpapers](#fill-wallpapers) can't be saved to the server using [account.installWallPaper](/method/account.installWallPaper.md) or [account.saveWallPaper](/method/account.saveWallPaper.md): an [inputWallPaperNoFile](/constructor/inputWallPaperNoFile.md) is available for fill wallpapers but can **only** be used when working with [themes&nbsp;&raquo;](/api/themes.md) or when using [messages.setChatWallPaper](/method/messages.setChatWallPaper.md) as follows.

#### Installing wallpapers in a specific chat or channel

    messageActionSetChatWallPaper#5060a3f4 flags:# same:flags.0?true for_both:flags.1?true wallpaper:WallPaper = MessageAction;
    
    updatePeerWallpaper#ae3f101d flags:# wallpaper_overridden:flags.1?true peer:Peer wallpaper:flags.0?WallPaper = Update;

    ---functions---

    messages.setChatWallPaper#8ffacae1 flags:# for_both:flags.3?true revert:flags.4?true peer:InputPeer wallpaper:flags.0?InputWallPaper settings:flags.2?WallPaperSettings id:flags.1?int = Updates;

Wallpapers can also be installed in a specific private chat, by using [messages.setChatWallPaper](/method/messages.setChatWallPaper.md): this will emit a [messageActionSetChatWallPaper](/constructor/messageActionSetChatWallPaper.md) service message, displaying the wallpaper in the UI along with an invitation for the other user to apply the same wallpaper.  

To `wallpaper`, pass an:  

* [inputWallPaperSlug](/constructor/inputWallPaperSlug.md) when working with [wallpaper deep links](/api/links.md#wallpaper-links).
* [inputWallPaperNoFile](/constructor/inputWallPaperNoFile.md) for [fill wallpapers](#fill-wallpapers).  
* [inputWallPaper](/constructor/inputWallPaper.md) otherwise, using the ID and access hash fields of a full [wallPaper](/constructor/wallPaper.md).  

If the other user decides to apply the same wallpaper to the chat, [messages.setChatWallPaper](/method/messages.setChatWallPaper.md) should be invoked passing the wallpaper `settings` received in the [messageActionSetChatWallPaper](/constructor/messageActionSetChatWallPaper.md) service message (or some different settings, if the user customized them before applying the wallpaper), along with the `id` of the [messageActionSetChatWallPaper](/constructor/messageActionSetChatWallPaper.md) service message, **without** the `wallpaper`: this way, the action will emit a [messageActionSetChatWallPaper](/constructor/messageActionSetChatWallPaper.md) **with the `same` flag set**, which should be displayed in the UI as a simple acknowledgment service message, without the full wallpaper and without an invitation for the other user to apply it (since both participants already just did that).  

However, if we have [Premium](/api/premium.md) subscription, we can change the other user's wallpaper without explicit confirmation from the other side: to do so, set the `for_both` flag when invoking [messages.setChatWallPaper](/method/messages.setChatWallPaper.md).  
This will change the wallpaper for both sides of the chat, without requiring confirmation; the [userFull](/constructor/userFull.md).`wallpaper_overridden` flag will also be set for the other user; the action will also emit a [messageActionSetChatWallPaper](/constructor/messageActionSetChatWallPaper.md) **with the `for_both` flag set**.  
If the other user does not like the new wallpaper we have chosen for them, they can re-set their previous wallpaper just on their side, by invoking [messages.setChatWallPaper](/method/messages.setChatWallPaper.md), providing only the `revert` flag (and obviously the `peer` parameter).  

Note that in order to pass [image](#image-wallpapers) or [pattern](#pattern-wallpapers) wallpapers to [messages.setChatWallPaper](/method/messages.setChatWallPaper.md), the `for_chat` flag must be set when [uploading them with account.uploadWallPaper](#uploading-wallpapers).  

Also note that unlike [account.installWallPaper](/method/account.installWallPaper.md) or [account.saveWallPaper](/method/account.saveWallPaper.md), [messages.setChatWallPaper](/method/messages.setChatWallPaper.md) accepts [fill wallpapers](#fill-wallpapers) as well.

Wallpaper changes will also emit an [updatePeerWallpaper](/constructor/updatePeerWallpaper.md) update.

After reaching at least the [boost level](/api/boost.md) specified in the [`channel_wallpaper_level_min` config parameter](/api/config.md#channel-wallpaper-level-min)/[`group_wallpaper_level_min` config parameter](/api/config.md#group-wallpaper-level-min), channels/groups gain the ability to set one of the [fill channel wallpapers returned by account.getChatThemes (see &raquo; for more info)](#channel-and-supergroup-wallpapers).  

After reaching at least the boost level specified in the [`channel_custom_wallpaper_level_min` config parameter](/api/config.md#channel-custom-wallpaper-level-min)/[`group_custom_wallpaper_level_min` config parameter](/api/config.md#group-custom-wallpaper-level-min), channels/supergroups gain the ability to set any custom [wallpaper](/api/wallpapers.md), not just fill channel wallpapers.  

When setting channel wallpapers, do **not** set the `for_both` flag.