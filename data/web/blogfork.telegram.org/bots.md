# Bots: An introduction for developers


Bots are **small applications** that run entirely within the Telegram app. Users interact with bots through **flexible interfaces** that can support **any kind of task or service**. For more information, see:

- [Detailed Guide to Bot Features](/bots/features.md)
- [Full API Reference for Developers](/bots/api.md)
- [Basic Tutorial: From @BotFather to 'Hello World'](/bots/tutorial.md)

The **Telegram Bot Platform** hosts more than **10 million** bots and is **free** for both users and developers.

### What Can You Do with Bots?

- [Replace Entire Websites](#replace-entire-websites)
- [Natively Integrate AI Agents and Chatbots](#natively-integrate-ai-agents-and-chatbots)
- [Manage Your Business](#manage-your-business)
- [Receive Payments](#receive-payments)
- [Create Custom Tools](#create-custom-tools)
- [Integrate with Services and Devices](#integrate-with-services-and-devices)
- [Host Games](#host-games)
- [Build Social Networks](#build-social-networks)
- [Monetize Your Service](#monetize-your-service)
- [Promote Your Project](#promote-your-project)
- [Anything Else!](#anything-else)

#### Replace Entire Websites

Telegram bots can host [Mini Apps](/bots/webapps.md) built with *JavaScript*. This allows for **infinitely flexible** interfaces that can power everything from online stores to arcade games. Unlike websites, bots support [seamless authorization](/api/url-authorization.md) and notifications through Telegram out of the box.

<div class="blog_video_player_wrap" style="max-width: 600px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/464001434/100bf/eWprjdgzEbE.100386/644bbea83084f44c8f" style="max-width: 600px;" title="" alt="Bot Revolution">
  <source src="/file/464001679/11aa9/KQx_BlPVXRo.4922145.mp4/c65433c8ac11a347a8" type="video/mp4">
 </video>
</div>

>Try [@DurgerKingBot](https://t.me/durgerkingbot) – or check out the [dedicated guide to Mini Apps](/bots/webapps.md) to build your own.

#### Natively Integrate AI Agents and Chatbots 

On Telegram, [AI bots](/bots/features.md#ai-agents) can natively [meet, chat and compete](/bots/features.md#bot-to-bot-communication): users can [summon assistants](/bots/features.md#guest-bots) into the same chat, watch their [responses stream in real time](/bots/features.md#streaming-replies), coordinate multiple agents at once or have them [manage their whole account](/bots/features.md#business-bots).

Bots also support [threaded conversations](bots/features#topics-in-private-chats) to manage several different topics in parallel — letting users easily access information from previous chats.

<div class="blog_video_player_wrap" style="max-width: 600px; margin: 20px auto 20px;">
 <div><video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400227/2/btvhtJcqT_A.76194.jpg/b56e1d38cc2e92e2aa" style="max-width: 600px;" alt="">
  <source src="/file/400780400658/2/zyAsgGtzdvg.5107918.mp4/413b3825ef972abc2a" type="video/mp4">
 </video></div>
</div>

> See [here](/bots/features.md#ai-agents) to check out more tools and integrations available for AI-powered bots on Telegram.

#### Manage Your Business
[Telegram Business](https://telegram.org/blog/telegram-business) users can connect Telegram bots to process and answer messages **on their behalf**, via their personal account. This allows businesses to **seamlessly integrate** any existing tools and workflows, or add new AI assistants to **increase productivity**.

As we continue to expand the set of **free tools** [available to bots](/bots.md) through this integration, we encourage all developers to **innovate** and **develop** useful applications and services for **businesses** on Telegram.

<div class="blog_video_player_wrap" style="max-width: 600px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400238/1/x875tPT245w.58064/1b426d3eda0a923c03" style="max-width: 600px;" title="" alt="">
  <source src="/file/400780400382/1/BVN6m4W5a6w.4289566.mp4/9dc47caab261eaade4" type="video/mp4">
 </video>
</div>

> Developers can turn on [Business Mode](/bots/features.md#business-bots) in [@BotFather](https://t.me/BotFather) if their bot supports [integration](/bots/api/types/businessconnection.md) with Telegram Business accounts.

##### Receive Payments

Bots can sell all kinds of goods and services on Telegram – to anyone in the world. [Telegram Stars](https://telegram.org/blog/telegram-stars) allow users to securely and effortlessly buy **digital products** via in-app purchases. In addition, **physical products** can be easily purchased through [third-party providers](/bots/payments.md#payments-for-physical-products) that support integration with Mini Apps.

<div class="blog_video_player_wrap" style="max-width: 600px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400936/3/oM0NSZq-c-U.70843/aabc7c9f3196368434" style="max-width: 600px;" title="" alt="">
  <source src="/file/400780400194/6/alSNP8Zj18E.7354629.mp4/96b4d26b22e610c8bd" type="video/mp4">
 </video>
</div>

> Try [@ShopBot](https://t.me/shopbot) – or check out our dedicated guides for [digital](/bots/payments-stars.md) and [physical](/bots/payments.md) products to build your own.

#### Create Custom Tools

Increase your productivity by creating bots for **specific tasks** – like converting files, managing chats or fetching today’s forecast. Users can chat directly with bots, or add them to groups and channels to introduce extra features.

<div class="blog_video_player_wrap" style="max-width: 600px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/464001084/12c1d/eNLdXm8moqA.134736/e28dd8ea6d49eee57d" style="max-width: 600px;" title="" alt="">
  <source src="/file/464001127/10a99/GC0dSHYQTb0.3621529.mp4/75439f14147e13b6fb" type="video/mp4">
 </video>
</div>

> Mini apps can generate media and files – that users can effortlessly share to [other chats](webapps#sharing-media) or a post [as a story](webapps#sharing-from-mini-apps-to-stories).

#### Integrate with Services and Devices

Mini apps can **seamlessly integrate** with third-party services, APIs and devices to instantly process and update information – like changing a user's [emoji status](webapps#setting-emoji-status) when they start a game 🎮 or get in a taxi 🚕.

<div class="blog_video_player_wrap" style="max-width: 600px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400471/4/NxjzOa07Eyc.38651/62c7f445e0e06a4452" style="max-width: 600px;" title="">
  <source src="/file/400780400995/4/5X1SreBoHEY.1731682.mp4/0e2f79c91e61b21b58" type="video/mp4">
 </video>
</div>

> By default, Mini Apps seamlessly integrate with Android and iOS, allowing users to add [direct shortcuts](https://telegram.org/blog/fullscreen-miniapps-and-more#home-screen-shortcuts) to their device’s home screen.

Likewise, many popular platforms already have official Telegram bots, which allow users to comfortably access content in one app – or perform quick searches using [inline mode](/bots/inline.md).

<div style="max-width: 600px; margin: 20px auto 20px;">
  <a href="/file/464001186/11e04/7XO37b9iccE.133932/a29f8bf593af567fcc" target="_blank"><img src="/file/464001186/11e04/7XO37b9iccE.133932/a29f8bf593af567fcc" title=""  class="dev_page_image" style="max-width: 600px;" /></a>
</div>

> Try [@GMailBot](https://t.me/gmailbot), [@GitHubBot](https://t.me/githubbot), [@Bing](https://t.me/bing), [@YouTube](https://t.me/youtube), [@wiki](https://t.me/wiki) and more.

#### Host Games

Developers can create both lightweight [HTML5 Games](/bots/games.md) and immersive **full-screen modern games** with support for [detailed motion controls](webapps#accelerometer), location-based [points of interest](webapps#locationmanager) and dynamic [hardware optimizations](webapps#additional-data-in-user-agent).

<div class="blog_video_player_wrap" style="max-width: 600px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400417/2/RaXcGRNXC0g.97571/e112d0d114f083f9b7" style="max-width: 600px;" title="" alt="">
  <source src="/file/400780400950/2/822tco9D7ig.4744195.mp4/7581b18200d67c56a6" type="video/mp4">
 </video>
</div>

> Try some of the games in the [@Gamee](https://t.me/gamee) library – or check out the [HTML5](/bots/games.md) and [Mini App](/bots/webapps.md) manuals to build your own. 

#### Build Social Networks

Bots can serve as an intermediary to connect users based on shared interests, location, and more. Coordinate meetups, show local services, or help people sell second-hand items.

<div class="blog_video_player_wrap" style="max-width: 600px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/464001041/10ebf/BPN6BLcuS8I.137509/fd81647baa51b928a2" style="max-width: 600px;" title="" alt="">
  <source src="/file/464001262/106bf/TVxoe4U0kIY.2116862.mp4/db7dfd397afbe2a61c" type="video/mp4">
 </video>
</div>

> Users can place [direct shortcuts](https://telegram.org/blog/fullscreen-miniapps-and-more#home-screen-shortcuts) to specific mini apps on the **home screen** of their devices – accessing services in **one tap**.

#### Monetize Your Service
Telegram offers a **robust ecosystem** of monetization features, allowing any bot to support its development with **multiple revenue streams**. Popular bots can passively earn income through [Revenue Sharing](https://telegram.org/blog/dynamic-video-quality-and-more#telegram-ads-in-bots) from Telegram Ads, implement [subscription plans](https://telegram.org/blog/fullscreen-miniapps-and-more#subscription-plans) for users – or offer [paid content](https://telegram.org/blog/superchannels-star-reactions-subscriptions#paid-media-for-bots) and [digital products](https://telegram.org/blog/telegram-stars#telegram-stars) for [Telegram Stars](https://telegram.org/blog/telegram-stars).

<div class="blog_video_player_wrap" style="max-width: 600px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file//file/400780400439/3/fsIQBVDv8iM.42498/fb93eac0593624c6ff" style="max-width: 600px;" title="">
  <source src="/file/400780400502/3/yVyvz2IBzwk.3397983.mp4/b34526a4a87a0e18cc" type="video/mp4">
 </video>
</div>

> Telegram Stars in your bot's balance can be used to [increase message limits](https://telegram.org/blog/dynamic-video-quality-and-more#increased-message-limits-for-bots), [send gifts](/bots/api/methods/sendgift.md) to users or [accept rewards](https://telegram.org/blog/monetization-for-channels) in Toncoin.

#### Promote Your Project

Bots can host [affiliate marketing programs](https://telegram.org/blog/affiliate-programs-ai-sticker-search) – giving developers a **transparent way** to quickly scale with organic growth from **user referrals**.

Affiliate Programs support custom **revenue sharing rates** and variable **commission periods**, allowing you to customize your offers and update your campaign over time.

<div class="blog_video_player_wrap" style="max-width: 600px; margin: 20px auto 20px;">
 <div><video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400209/2/UigaD6Pz68M.72033/af1fed81c89f95706a" style="max-width: 600px;" alt="">
  <source src="/file/400780400791/6/ww5N6gn59aU.8177383.mp4/d2249aa1ba07a15a9a" type="video/mp4">
 </video></div>
</div>

> To learn more and get started in just a few taps, check out our [dedicated guide](https://telegram.org/tour/affiliate-programs).

#### Anything Else
The possibilities for bots are endless – from simple scripts to complex mini apps. Whether you’re a beginner or professional programmer, you can create personalized tools with the help of the [Bot Platform](/bots/api.md).

> All Mini Apps you build on Telegram can be **highly customized** to fit your brand identity, including by uploading high-quality [media demos](/bots/features.md#mini-app-previews) and setting a custom [Loading Screen](/bots/features.md#customizable-loading-screens) with your own logo and color palette

-----

### How Do Bots Work?

> For a detailed explanation of Bot Features, see [this guide](/bots/features.md) 

Telegram bots are special accounts that do not need a phone number to set up. Bots are connected to their owner’s server, which processes inputs and requests from users.

Telegram’s intermediary server handles all encryption and communication with the Telegram API. Developers communicate with this server via an easy HTTPS-interface with a simplified version of the [Telegram API](/api.md) – known as the [Bot API](/bots/api.md).

#### How Are Bots Different from Users?

Bots are able to process inputs and requests in ways that user accounts can’t, but there are several differences between a bot and a normal user.

- Bots don’t have ‘last seen’ or online statuses – instead they show a ‘bot’ label in the chat.
- Bots have limited cloud storage – older messages may be removed by the server shortly after they have been processed.
- Bots can't start conversations with users. A user must either add them to a group or send them a message first. People can search for your bot’s username or start a chat via its unique t.me/bot_username link.
- By default, bots added to groups **only see relevant messages** in the chat (see [Privacy Mode](/bots/features.md#privacy-mode)).
- Bots never eat, sleep or complain (unless expressly programmed otherwise).

#### Bot Links

Bot usernames normally require a ‘bot’ suffix, but some bots don’t have them – such as [@stickers](https://t.me/stickers), [@gif](https://t.me/gif), [@wiki](https://t.me/wiki) or [@bing](https://t.me/bing). 

Anyone can [assign collectible usernames](https://telegram.org/blog/shareable-folders-custom-wallpapers#bot-links-and-telegram-premium-on-fragment) to bots, including those without the 'bot' suffix.

### How Do I Create a Bot?

Creating Telegram bots is super-easy, but you will need at least some skills in **computer programming**. 

Creating a bot is streamlined by Telegram’s Bot API, which gives the tools and framework required to integrate your code. To get started, message [@BotFather](https://t.me/botfather) on Telegram to register your bot and receive its authentication token.

> Your **bot token** is its unique identifier – store it in a **secure place**, and only share it with people who need direct access to the bot. Everyone who has your token will have **full control** over your bot.

#### What Next?

We recommend that you check out our guide to [Bot Features](/bots/features.md) to see what you can teach your bot to do:

- [Detailed Guide to Bot Features](/bots/features.md)
- [Full API Reference for Developers](/bots/api.md)
- [Basic Tutorial: From @BotFather to 'Hello World'](/bots/tutorial.md)
- [Code Examples](/bots/samples.md)
