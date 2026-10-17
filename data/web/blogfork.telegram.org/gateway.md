# Telegram Gateway – Fast, Affordable, and Secure User Verification

Telegram Gateway is a **cost-effective** and **privacy-focused** solution for user authentication, allowing businesses to verify their customers’ phone numbers through Telegram at a fraction of traditional SMS costs.

#### Save Big on Verification Costs
- Authenticate users for just **$0.01 per verification code** -- up to **50x cheaper** than SMS.
- **Automatic refunds** for undelivered codes, ensuring **you only pay for successful verifications**.

#### Secure & Reliable
- Uses **Telegram’s trusted infrastructure** to deliver codes quickly and safely.
- Helps apps **avoid outdated and expensive verification methods**.

#### Developer-Friendly
- **Easy integration** with a [clear API](/gateway/api.md).
- **Free testing environment** -- try it out before committing.

Start verifying users smarter -- **read the full guide and integrate Telegram Gateway today!**

<div class="blog_video_player_wrap" style="max-width: 600px; margin: 20px auto 20px;">
 <div><video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400519/2/lNZQaAkJ9QM.37203/8f106e392d786abf8d" style="max-width: 600px;" alt="Verification platform">
  <source src="/file/400780400123/3/z0SrtopuptI.1065086.mp4/0afe2583ac58fd6a35" type="video/mp4">
 </video></div>
</div>

This page will walk you through the main benefits and features of the **Telegram Gateway**.
For more information, see:

* [FAQ](#faq)
* [**Quick-Start Guide**](/gateway/verification-tutorial.md)
* [Full Gateway API Reference for Developers](/gateway/api.md)
* [Gateway API Terms of Service](https://telegram.org/tos/gateway)

### What can you do with Telegram Gateway?
* [Authenticate Users Anywhere](#authenticate-users-anywhere)
* [Reduce Acquisition Costs](#reduce-acquisition-costs)
* [Access Detailed Statistics](#access-detailed-statistics)
* [Deliver Messages Securely](#deliver-messages-securely)
* [Build an Audience](#build-an-audience)

#### Authenticate Users Anywhere
To access Telegram, registered users only need an internet connection. Thanks to the **Telegram Verification Platform**, accessible by developers via the [Gateway API](/gateway/api.md), users can conveniently receive your message on **mobile** or **desktop**, without needing an active SMS plan from their provider.

<div class="blog_image_wrap blog_wide_image_wrap">
  <a href="/file/400780400656/3/9iBg_m8EjJs.349165/64ba1e8722d15e124d" target="_blank"><img src="/file/400780400056/4/dJCmmM9Kytg.150900/c5553bdb185c273b8f" title="" alt="Costs Per Message" srcset="/file/400780400656/3/9iBg_m8EjJs.349165/64ba1e8722d15e124d , 2x" /></a>
</div>

#### Reduce Acquisition Costs
Verification via Telegram costs **$0.01** per delivered code – greatly reducing operating costs for your service. By comparison, SMS verification can cost up to **50 times more** per code.

You **only** pay for codes that are **delivered within the time you specify** which helps reduce costs even further!

<div class="blog_image_wrap blog_wide_image_wrap">
  <a href="/file/400780400658/1/KzqXYJ29JGs.45959/e1be634e32ae8b8f00" target="_blank"><img src="/file/400780400658/1/KzqXYJ29JGs.45959/e1be634e32ae8b8f00" title="" alt="Costs Per Message" srcset="/file/400780400658/1/KzqXYJ29JGs.45959/e1be634e32ae8b8f00 , 2x" /></a>
</div>

The Telegram Verification Platform also **ensures instant delivery** of your messages – unlike SMS, which can take several minutes to arrive and have failure rates as high as 5%.

#### Access Detailed Statistics
The Telegram Verification Platform shows **detailed statistics** to help you manage your budget and **track message volume** – allowing you to **analyze user growth** and conversion rates.
<div class="blog_image_wrap blog_wide_image_wrap">
  <a href="/file/400780400146/1/3uChLsddQE4.79753/a4051359d04719de58" target="_blank"><img src="/file/400780400146/1/3uChLsddQE4.79753/a4051359d04719de58" title="" alt="Detailed Statistics" srcset="/file/400780400146/1/3uChLsddQE4.79753/a4051359d04719de58 , 2x" /></a>
</div>

#### Deliver Messages Securely
Telegram offers a proven encryption protocol and open-source, verifiable apps. In contrast, traditional SMS methods are not encrypted (anyone can read them!) and susceptible to vulnerabilities – such as carrier trust issues, sender forgery, and SIM swap attacks.

By using Telegram, you can significantly **enhance security** and guarantee a more **robust**, **encrypted**, and **reliable** authorization process.

#### Build an Audience
Telegram is one of the **top 5 most-downloaded apps** in the world, with over 950 million users and robust features for companies and content creators – giving you the tools to scale your business in new markets.
<div class="blog_image_wrap blog_wide_image_wrap">
  <a href="/file/400780400031/4/O9Jsl42ber0.98383/bfc2ac7805965d98a0" target="_blank"><img src="/file/400780400031/4/O9Jsl42ber0.98383/bfc2ac7805965d98a0" title="" alt="Telegram User Base Growth" srcset="/file/400780400031/4/O9Jsl42ber0.98383/bfc2ac7805965d98a0 , 2x" /></a>
</div>

Messages you send with the Gateway API can be signed by a [verified](https://telegram.org/verify) channel on Telegram, helping users find updates and support.

#### FAQ

##### Q: Who provides the contact number for users?
Services using the Gateway API must provide the relevant phone number for each message they send. All phone numbers they use must be from users who **voluntarily shared their number** with the service in order to receive messages to their registered Telegram account.

> Telegram **does not disclose user phone numbers** to services that utilize the Telegram Verification Platform.

##### Q: Do my users need to opt-in to receive my messages?
Yes. The registered phone numbers of Telegram users are **always private** – so users must **voluntarily opt-in** by sharing their phone number with your service and agreeing to receive your messages on Telegram.

##### Q: What phone number format should I use?
All phone numbers should be provided in [E.164 format](https://en.wikipedia.org/wiki/E.164).

##### Q: How can I test my authorization flow?
To test the Gateway API, you can simply send codes to your own phone number on Telegram – all messages to yourself are **free of charge**.

##### Q: Can I transfer funds between Gateway accounts?
No, transferring funds between Verification Platform accounts is currently not supported. All funds transferred to your account constitute advance-paid credits and cannot be transferred or withdrawn.

> For more information, please reference [Section 3.1.](https://telegram.org/tos/gateway#3-1-balance) of the [Verification Platform Terms of Service](https://telegram.org/tos/gateway).

##### Q: How do I check if a user can receive my messages on Telegram?
You can use the [checkSendAbility](/gateway/api.md#checksendability) method to check if a user can receive your messages on Telegram. If they cannot, your request will be free of charge.

> More details on how pricing works for checks and actual requests are available [in the documentation](/gateway/api.md#checksendability).
<div>

##### Q: I just received a message in the 'Verification Codes' chat, what is this?

This means that a service is utilizing Telegram Gateway to send a verification code to your phone number. More information is available in the [Telegram FAQ](https://telegram.org/faq#q-does-telegram-send-verification-codes-for-other-apps).
