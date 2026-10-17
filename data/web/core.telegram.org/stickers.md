# Telegram Stickers

All users can create, send and **share custom artwork** using Telegram's **open platform** for stickers and [emoji](#custom-emoji). The built-in [Sticker Editor](#creating-stickers-in-telegram) lets everyday users **seamlessly create** stickers in the Telegram app **with their own photos** to share in chats.

Artists and content creators can make [vector animations](#animated-stickers-and-emoji), [video files](#video-stickers-and-emoji) and [static images](#static-stickers-and-emoji) in their **preferred apps** – then upload them with the [@Stickers](#stickers-mini-app) mini app to share their artwork with **over 1 billion** users.

To start building your own custom sets, click below:

- **[Creating Stickers in Telegram](#creating-stickers-in-telegram)**
  - [In-App Sticker Maker](#in-app-sticker-maker)
  - [@Stickers Mini App](#stickers-mini-app)
- **[Creating Stickers with Software](#creating-stickers-with-software)**
  - [Animated](#animated-stickers-and-emoji)
  - [Video](#video-stickers-and-emoji)
  - [Static](#static-stickers-and-emoji)
  - [Custom Emoji](#custom-emoji)
- **[Importing Stickers from Other Apps](#importing-stickers-from-other-apps)**
  - [For Developers](#for-developers)
  - [For Users](#for-users)

### Creating Stickers in Telegram
Any Telegram user can create **custom stickers** in any Telegram chat – transforming photos into **creative artwork** that can be saved and shared everywhere.

#### In-App Sticker Maker
You can quickly turn **any photo** on your device into a **custom sticker** with added **text**, **drawings**, **emoji** and more using the built-in [Sticker Editor](https://telegram.org/blog/sticker-maker). This allows anyone to easily make their own stickers **without special software** – right in the chat. 

<div class="blog_video_player_wrap" style="max-width: 600px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" loop="" muted="" poster="/file/400780400092/3/De_kw7Y6soc.42920/d7985249c460031b98" style="max-width: 600px;" title="Creating Stickers in Telegram" alt="Making Stickers" vindex="1" preload="auto">
  <source src="/file/400780400575/1/RiTI5hhBHxs.5364408.mp4/fc4535d49ea0d8c0ec" type="video/mp4">
 </video>
</div>

The sticker editor also allows you to **create packs** of custom stickers to share with friends and family.

<div class="blog_video_player_wrap" style="max-width: 600px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" loop="" muted="" poster="/file/400780400919/2/U2lYVUqrgYM.165093/a8638b8845cbf51a81" style="max-width: 600px;" title="" alt="Adding a Sticker to a Set" vindex="2" preload="metadata">
  <source src="/file/400780400593/8/DvM7H4axK64.4832881.mp4/9f58afe487f6d2f42f" type="video/mp4">
 </video>
</div>

> To access the Sticker Editor, open the sticker panel from your input field in any chat and tap the (+) button.

#### @Stickers Mini App
The [@Stickers](https://t.me/stickers?startapp) allows anyone to **create and manage packs** of both stickers and emoji, **access detailed usage statistics** and more – all from one intuitive interface.

<div class="blog_video_player_wrap" style="max-width: 600px; margin: 20px auto 20px;">
 <div><video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" loop="" muted="" poster="/file/400780400143/5/Btdndg1boYs.43831.jpg/b65fb2fc3dc332129f" style="max-width: 600px;" alt="Stickers Mini App" vindex="8" preload="metadata">
  <source src="/file/400780400068/2/6OBw2ri5e4s.1888273.mp4/15dd76bc41116b2906" type="video/mp4">
 </video></div>
</div>

> The functions of the [@Stickers](https://t.me/Stickers) bot can also be accessed via **text commands**.

-----
### Creating Stickers with Software
Artists and content creators can make stickers in **multiple formats** using their **preferred editing apps** – and upload the final [animation](#animated-stickers-and-emoji), [video](#video-stickers-and-emoji) or [image](#static-stickers-and-emoji) files as both **stickers and emoji**.

#### Animated Stickers and Emoji
Telegram stickers and emoji can move with smooth **60 FPS animations** to bring your characters to life in high resolution.

> Animations require Telegram's unique **.TGS format** – click [here](#video-stickers-and-emoji) for **Video Stickers and Emoji** made in **.WEBM format**.

**Creating Animations**

To create vector-animated stickers and emoji you will need the following:

1. Any vector graphics editor that allows exporting vector objects to Adobe After Effects to turn them into animations.
2. Adobe After Effects.
3. The [Bodymovin-TG](https://github.com/TelegramMessenger/bodymovin-extension) plugin, a fork of Bodymovin for Adobe After Effects that can be used to export animations to Telegram's **.TGS format**.

> The Lottie-based .TGS format allows for incredibly detailed animations that are **less than 30 KB** in size – six times smaller than the average photo.

**Animation Requirements**

- The canvas size must be **512х512 pixels**.
- Objects must not leave the canvas.
- Animation length must not exceed **3 seconds**.
- All animations must be looped.
- Final file size must not exceed **64 KB** after rendering in Bodymovin.
- All animations must run at **60 Frames Per Second**.
- You **must not** use the following Adobe After Effects functionality when animating your artwork: *Auto-bezier keys, Expressions, Masks, Layer Effects, Images, Solids, Texts, 3D Layers, Merge Paths, Star Shapes, Gradient Strokes, Repeaters, Time Stretching, Time Remapping, Auto-Oriented Layers*.
-----

#### Video Stickers and Emoji

Stickers and emoji can also be built with **.WEBM** – an open-source format that is compatible with many graphics editors to create high-detail images. Requires [Telegram 8.5](https://telegram.org/apps) or higher.

<!--
> This format also allows you to [import custom stickers](/import-stickers.md) to Telegram from other apps.
-->

**Creating Videos**

To create stickers and emoji from video files, you only need [editing software](/stickers/webm-vp9-encoding.md) that lets you export your project as a **.WEBM video file**.

**Video Requirements**

>See this [Encoding .WEBM with VP9 Guide](/stickers/webm-vp9-encoding.md) for details 

- For stickers, one side must be exactly **512 pixels** in size – the other side can be 512 pixels **or less**.
- For emoji, the video must be exactly **100x100 pixels** in size
- Video duration must not exceed **3 seconds**.
- Frame rate can be up to **30 FPS**.
- Video should be looped for optimal user experience.
- Video size should not exceed **256 KB**. 
- Video must be in .WEBM format encoded with the **VP9 codec**.
- Video must have **no audio stream**.

-----

#### Static Stickers and Emoji
Turn your favorite drawings and memes into packs of images that are easily to share and access on any device.

**Creating Images**
To create static stickers and emoji for Telegram, you only need an image editor that lets you export in **.PNG** or **.WEBP** format.

**Image Requirements**

- For stickers, one side must be exactly **512 pixels** in size – the other side can be 512 pixels **or less**.
- For emoji, images must be exactly **100x100 pixels** in size.
- The image file must be in either .PNG or .WEBP format.

> Tip: a transparent background, white stroke and black shadow effect will make your sticker stand out.

#### Custom Emoji
As of version 8.9 released in August 2022, Telegram apps support [custom emoji](https://telegram.org/blog/custom-emoji).
Emoji use the same technology as stickers, making it very easy to convert your art to **both formats**. Check out the [video](#video-requirements) and [image](#image-requirements) sections for details on the different size requirements.

> Everyone can create new custom emoji, however, adding and using custom sets is currently an exclusive [feature](https://t.me/premium) of [Telegram Premium](https://telegram.org/blog/700-million-and-premium) users.

#### Adaptive Emoji

If you intend to create a set of **simple icons** with **solid colors** that change their color based on where they are used, you can send the command `/adaptive` when creating your emoji set.

When used as emoji statuses and topic icons, such emoji will match the **accent color** of the user's theme. When in a message, they will match the **text color** in that message.

<div>
  <a href="/file/400780400573/3/qdOfJMeSZIg.197837/18645b86150901e026" target="_blank"><img src="/file/400780400573/3/qdOfJMeSZIg.197837/18645b86150901e026" title="" width="480" class="dev_page_image" /></a>
</div>

----

### Importing Stickers From Other Apps
Developers can build apps to [automate importing stickers](/import-stickers.md) using Telegram’s API. With these tools, users can instantly bring their favorite stickers to Telegram.

#### For Users
Users can find apps that allow them to import stickers or quickly **generate their own**. They can also easily [publish custom stickers](#publishing-a-sticker-pack) with the [@Stickers](https://t.me/Stickers) bot using [.PNG](#static-stickers-and-emoji), [.WEBP](#static-stickers-and-emoji) or [.WEBM](#video-stickers-and-emoji) files for stickers from other apps.

#### For Developers
As of version 7.8, Telegram apps support a simple API for importing stickers. Developers can use this to **build apps** or **add tools** to apps that let users instantly transfer stickers to Telegram – or create custom stickers from photos or videos.

> Click [here](/import-stickers.md#sticker-formats) for more information about developing apps for importing stickers.