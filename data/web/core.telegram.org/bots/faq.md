# Bots FAQ

> If you are new to Telegram bots, we recommend checking out our [**Introduction to Bots**](/bots.md) first.
You may also find the **[Bot API Manual](/bots/api.md)** useful.

{contents_nav}

[**General**](#general-questions)

- [How do I create a bot?](#how-do-i-create-a-bot)
- [Where can I get some code examples?](#i-39m-a-developer-where-can-i-find-some-examples)
- [I have a feature request!](#will-you-add-x-to-the-bot-api)
- [What messages will my bot get?](#what-messages-will-my-bot-get)
- [Why doesn't my bot see messages from other bots?](#why-doesn-39t-my-bot-see-messages-from-other-bots)

[**Getting Updates**](#getting-updates)

- [How do I get updates?](#how-do-i-get-updates)
- [Long polling problems](#long-polling-gives-me-the-same-updates-again-and-again)
- [Webhook problems](#i-39m-having-problems-with-webhooks)
- [Using self-signed certificates](#i-39m-having-trouble-with-my-self-signed-certificate)
- [How can I make sure webhook requests come from Telegram?](#how-can-i-make-sure-that-webhook-requests-are-coming-from-telegr)

[**Handling Media**](#handling-media)

- [Downloading files](#how-do-i-download-files)
- [Uploading large files](#how-do-i-upload-a-large-file)
- [Can I count of file_ids to be persistent?](#can-i-count-on-file-ids-to-be-persistent)

[**Broadcasting to Users**](#broadcasting-to-users)

- [How do I avoid hitting limits?](#my-bot-is-hitting-limits-how-do-i-avoid-this)
- [How do I message all my subscribers?](#how-can-i-message-all-of-my-bot-39s-subscribers-at-once)
{/contents_nav}

_______________

### General Questions

#### How do I create a bot?

Creating Telegram bots is super-easy, but you will need at least some skills at computer programming. In order for a bot to work, set up a bot account with [@BotFather](https://telegram.me/botfather), then connect it to your backend server via our [API](/bots/api.md).

Unfortunately, there are no out-of-the-box ways to create a working bot if you are not a developer. But we're sure you'll soon find plenty of bots created by other people to play with.

#### I'm a developer. Where can I find some examples?
Here are two sample bots, both written in PHP:

* [Hello Bot](/bots/samples/hellobot.md) demonstrates the basics of the Telegram bot API.
* [Simple Poll bot](https://github.com/kolar/telegram-poll-bot) is a more complete example, it supports both long-polling and Webhooks for updates.

>Many members of our community are building bots and publishing sources.
We're collecting them on [**this page »**](/bots/samples.md)

Ping us on [@BotSupport](https://telegram.me/botsupport) if you've built a bot and would like to share it with others.

#### Will you add X to the Bot API?
The bot API is still pretty young. There are many potential features to consider and implement. We'll be studying what people do with their bots for a while to see which directions will be most important for the platform.

All bot developers are welcome to share ideas for our Bot API with our [**@BotSupport**](https://telegram.me/botsupport) account.

#### What messages will my bot get?

**1.** **All bots**, regardless of settings, will receive:

* All service messages.
* All messages from private chats with users.
* All messages from channels where they are a member.

**2.** **Bot admins** and bots with [privacy mode](/bots.md#privacy-mode) **disabled** will receive all messages except messages sent by other bots.

**3.** Bots with [privacy mode](/bots.md#privacy-mode) **enabled** will receive:

* Commands explicitly meant for them (e.g., /command@this_bot).
* General commands from users (e.g. /start) **if** the bot was the last bot to send a message to the group.
* Messages sent [via](/bots/api.md#inline-mode) this bot.
* Replies to any messages implicitly or explicitly meant for this bot.

**Note** that each particular message can only be available to **one** privacy-enabled bot at a time, i.e., a reply to bot A containing an explicit command for bot B or sent via bot C will only be available to bot A. Replies have the highest priority.

#### Why doesn't my bot see messages from other bots?
Bots talking to each other could potentially get stuck in unwelcome loops. To avoid this, we decided that bots will not be able to see messages from other bots regardless of mode.

### Getting Updates

#### How do I get updates?
There are currently two ways of getting updates. You can either use [long polling](/bots/api/methods/getupdates.md) or [Webhooks](/bots/api/methods/setwebhook.md). Please note that it's **not** possible to get updates via long polling while an outgoing Webhook is set.

#### Long polling gives me the same updates again and again!

The [getUpdates](/bots/api/methods/getupdates.md) method returns the earliest 100 unconfirmed updates. To confirm an update, use the *offset* parameter when calling getUpdates like this:

	offset = update_id of last processed update + 1

All updates with *update_id* less than or equal to *offset* will be marked as confirmed on the server and will no longer be returned.

#### I'm having problems with Webhooks.
If you've set up your webhook successfully, but are not getting any updates, please remember:

- You need a valid SSL certificate for webhooks to work.
- To use a self-signed certificate, you need to upload your public key certificate using the *certificate* parameter in [setWebhook](/bots/api/methods/setwebhook.md). Please upload as InputFile, sending a String will not work.
- Ports currently supported for Webhooks: **443**, **80**, **88**, **8443**.
- Wildcard certificates may not be supported.
- Redirects are not supported.
- CN must exactly match your domain.

>Please check out this new [**WEBHOOK GUIDE**](/bots/webhooks.md) to learn all there is to know about webhooks!

#### I'm having trouble with my self-signed certificate!
Please take a look at this [self-signed certificate guide](/bots/self-signed.md) we made just for you. If you've read it and still have a question, ping us on botsupport.

#### How can I make sure that Webhook requests are coming from Telegram?

If you'd like to make sure that the Webhook request comes from Telegram, we recommend using a secret path in the URL you give us, e.g. www.example.com/your_token. Since nobody else knows your bot's token, you can be pretty sure it's us.

#### How can I make requests in response to updates?

This is possible if you're using webhooks. The upside is that you need less requests, the downside — that in this case it's not possible to know that such a request was successful or get its result. 

Whenever you receive a webhook update, you have two options:

**1. Issue POST to https://api.telegram.org/bot<token>/method**

<div>
<a href="/file/811140979/3/5p52TWl9X2o/5c6d684ee0d6a4399d" target="_blank"><img src="/file/811140979/3/5p52TWl9X2o/5c6d684ee0d6a4399d" title="Confirm and request"  class="dev_page_image" style="width:500px;" /></a>
</div>

**2. Reply directly and give method as JSON payload in the reply**

<div>
	<a href="/file/811140266/2/vGxiVmENAos/6cffad00cbe72be7f2" target="_blank"><img src="/file/811140266/2/vGxiVmENAos/6cffad00cbe72be7f2" title="Reply with payload"  class="dev_page_image" style="width:500px;" /></a></div>

> You may also want to look at our sample [HelloBot](/bots/samples/hellobot.md), it offers a PHP implementation of this.

### Handling Media

#### How do I download files?
Use the [getFile](/bots/api/methods/getfile.md) method. Please note that this will only work with files of up to 20 MB in size.

#### How do I upload a large file?
Bots can currently send files of any type of up to 50 MB in size, so yes, very large files won't work for now. Sorry. This limit may be changed in the future.

#### Can I count on file_ids to be persistent?
Yes, file_ids can be treated as persistent.

### Broadcasting to Users

#### My bot is hitting limits, how do I avoid this?

By default, bots are able to message their users **at no cost** – but have limitations on the number of messages they can broadcast in a single interval:

- In a single chat, avoid sending more than one message per second. We may allow short bursts that go over this limit, but eventually you'll begin receiving 429 errors.
- In a group, bots are not be able to send more than 20 messages per minute.
- For bulk notifications, bots are not able to broadcast more than about 30 messages per second, unless they enable [paid broadcasts](/bots/faq.md#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) to increase the limit.

#### How can I message all of my bot's subscribers at once?

Enabling [paid broadcasts](/bots/api-changelog.md#october-31-2024) in [@BotFather](https://t.me/botfather) allows a bot to broadcast up to **1000 messages per second**. Each message broadcasted over the free amount of 30 per second incurs a cost of **0.1 Stars per message**, paid with [Telegram Stars](https://telegram.org/blog/telegram-stars) from the bot's balance. In order to enable this feature, a bot must have at least **100,000 Stars** on its balance and at least **100,000** monthly active users.

> Bots with increased limits are only charged for messages that are broadcasted successfully.

If you do not wish to enable paid broadcasts, consider spreading them over longer intervals (e.g. 8-12 hours) to avoid hitting the limit. The API will not allow bulk notifications to more than ~30 users per second – if you go over that, you'll start getting 429 errors.

_________________
> If you've got questions that are not answered on this page, ping us at [@BotSupport](https://telegram.me/botsupport) in Telegram.
We welcome any suggestions for the Bot Platform and API.