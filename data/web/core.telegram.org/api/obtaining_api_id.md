# Creating your Telegram Application

We welcome all developers to use our [API](/api.md#telegram-api) and source code to create Telegram-like messaging applications on our platform free of charge.

>In order to ensure consistency and security across the Telegram ecosystem,
**all third-party client apps** must comply with the [**API Terms of Service**](/api/terms.md).

### Obtaining api_id

In order to obtain an **API id** and develop your own application using the Telegram API you need to do the following:

* Sign up for Telegram using an official application.
* Log in to your Telegram core: [https://my.telegram.org](https://my.telegram.org).
* Go to ["API development tools"](https://my.telegram.org/apps) and fill out the form.
* You will get basic addresses as well as the **api_id** and **api_hash** parameters required for user authorization.
* For the moment each number can only have one api_id connected to it.

We will be sending important developer notifications to the phone number that you use in this process, so please use an up-to-date number connected to your active Telegram account.

### Using the api_id

Before using the MTProto Telegram API, please note that all API client libraries are strictly monitored to prevent abuse.

If you use the Telegram API for flooding, spamming, faking subscriber and view counters of channels, you **will be banned forever**.  

Due to excessive abuse of the Telegram API, **all accounts** that log in using unofficial Telegram API clients are automatically put **under observation** to avoid violations of the [Terms of Service](/api/terms.md).  

If you didn't violate the Terms of Service but your account does get banned after using the API, write to [recover@telegram.org](mailto:recover@telegram.org) explaining what you intend to do with the API, asking to unban your account.  
Please note that emails are checked by a human, so automatically generated emails will be detected and banned.

### Using Telegram's open source code

Everyone is welcome to use our open source code. We have included a sample API id with the code. This API id is limited on the server side and is not suitable for apps released to end-users — using it for anything but testing purposes will result in the API_ID_PUBLISHED_FLOOD error for your users. It is necessary that you obtain your **own API id** before you publish your app.

> Please remember to publish your code as well in order to comply with the GNU GPL licenses.
