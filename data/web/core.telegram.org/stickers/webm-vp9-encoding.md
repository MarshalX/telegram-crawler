# Encoding Video Stickers and Emoji with .WEBM and VP9

[.WEBM video format](https://telegram.org/blog/video-stickers-better-reactions) allows anyone to easily create **high-detail animations** for stickers and emoji that users can send and share instantly in Telegram.

### Video Requirements for Stickers and Emoji

- Video must be in **.WEBM** format, up to **30 FPS**.
- Video must be encoded with the **VP9 codec**.
- Video must have **no audio stream**.
- For stickers, one side must be **512 pixels** in size – the other side can be 512 pixels **or less**.
- For emoji, the resolution must be exactly **100x100 pixels**.
- Duration must not exceed **3 seconds**.
- Video should be looped for optimal user experience.
- Video size should not exceed **256 KB** after encoding. 

### Encoding Video Files
You can design your animation in your **preferred app** – but depending on the app’s export settings, you may need an **encoding program** to create the final file.

> Programs like [Handbrake](https://handbrake.fr/downloads.php) or [ffmpeg](https://www.ffmpeg.org/download.html) natively support .WEBM encoding with VP9.

#### Encoding with Adobe Media Encoder
Adobe’s Media Encoder requires a plug-in to support .WEBM encoding. Here is a modified version of a plug-in by [fnord software](https://fnord.com/) that you can install to render your videos with Media Encoder.

- [Windows WEBM plug-in](https://fnord.com/downloads/WebM_Premiere_v1.5.0.zip)

- [macOS WEBM plug-in](https://fnord.com/downloads/WebM_Premiere_v1.5.0.dmg)

After the plug-in is installed, .WEBM will appear in the list of formats in both **Adobe Media Encoder** and **Premiere Pro**.
> On macOS, you may need to go to Settings > Security & Privacy to approve installation.

#### Render Settings
If it’s your first time working with encoding software, here are some tips that might help:

- Make sure to check that **VP9** is selected in the codec settings – some apps may default to VP8.
- Make sure to **remove** any audio tracks (toggle ‘Audio’ off in Adobe programs).
- Make sure the frame rate is a **constant 30 FPS**.
- Use **Constant Quality** and a low (or lowest) quality setting, and enable **2-pass encoding**.
- If Constant Quality at 0 is **not enough** to reduce file size, change the method to **Variable Bitrate**.
- In **Media Encoder**, make sure your Renderer is set to ‘Software Only’.
- If your file fails to render, try importing it as a **PNG Sequence**.
> After Effects projects integrate directly with Media Encoder via File > Export > Add to Media Encoder Queue.

### Uploading Video Stickers and Emoji
The [@Stickers](https://t.me/Stickers) bot lets you quickly **publish** and **manage** your sticker and emoji packs. Start a chat with it on Telegram and it will walk you through the process. For **step-by-step instructions** and more information, see [this guide](/stickers.md#using-the-stickers-bot).
