# Creating Animated Stickers

Telegram apps support [animated stickers](https://telegram.org/blog/animated-stickers) as of version **5.9**. All artists are welcome to create and upload new packs of animated stickers.

###Required Tools

To create animated stickers for the Telegram platform, you will need the following:

1. Any vector graphics editor that allows exporting vector objects to Adobe After Effects for turning them into animations.
2. Adobe After Effects.
3. The [Bodymovin-TG](https://github.com/TelegramMessenger/bodymovin-extension) plugin, a fork of Bodymovin for Adobe After Effects that can be used to export animations to **.TGS**, the Telegram animated sticker format.

###Technical Requirements

- Sticker/canvas size must be **512х512 pixels**. 
- Sticker objects must not leave the canvas.
- Animation length must not exceed **3 seconds**.
- All animations must be looped.
- Sticker size must not exceed **64 KB** after rendering in Bodymovin.
- All animations must run at **60 Frames Per Second**.
- You **must not** use the following Adobe After Effects functionality when animating your stickers: Auto-bezier keys, Expressions, Masks, Layer Effects, Images, Solids, Texts, 3D Layers, Merge Paths, Star Shapes, Gradient Strokes, Repeaters, Time Stretching, Time Remapping, Auto-Oriented Layers.

<!--Using any of these tools will make it impossible to export your animation with Bodymovin-TG.-->

###Uploading Stickers

Once your stickers are ready, send the `/newanimated` command to the [@stickers](https://t.me/stickers) bot – then send it the **.TGS** files.

Your set will need an icon. Icons for animated sticker sets must be **100x100 pixels**, with a looped animation not exceeding 3 seconds.