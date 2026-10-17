# Payments API


You can accept payments from Telegram users via [Telegram Bots](/bots.md).

>Note: This article is intended for MTProto API developers. If you're looking for a general overview of Telegram Payments, check out the [Telegram blog](https://telegram.org/blog/payments) and the [bot API payment manual](/bots/payments.md).

### Introducing Payments

Telegram bots can accept payments for goods and services from users.
For more info on how payments work, check out the [Telegram Blog](https://telegram.org/blog/payments) and the [bot API payment manual](/bots/payments.md).

This page will elaborate on the actions required to work with payments using the **MTProto API**.

> A simplified version of the process is available only for bots using the [bot API](/bots/payments.md).

The first step for bots is [enable payments as described here&nbsp;&raquo;](/bots/payments.md#the-payments-api).

Then, we work with payments as follows.

### 1. Create Invoice

#### 1.1 Create Invoice Message

    inputWebDocument#9bed434d url:string size:int mime_type:string attributes:Vector<DocumentAttribute> = InputWebDocument;

    labeledPrice#cb296bf8 label:string amount:long = LabeledPrice;

    invoice#49ee584 flags:# test:flags.0?true name_requested:flags.1?true phone_requested:flags.2?true email_requested:flags.3?true shipping_address_requested:flags.4?true flexible:flags.5?true phone_to_provider:flags.6?true email_to_provider:flags.7?true recurring:flags.9?true currency:string prices:Vector<LabeledPrice> max_tip_amount:flags.8?long suggested_tip_amounts:flags.8?Vector<long> terms_url:flags.10?string subscription_period:flags.11?int = Invoice;

    inputMediaInvoice#405fef0d flags:# title:string description:string photo:flags.0?InputWebDocument invoice:Invoice payload:bytes provider:flags.3?string provider_data:DataJSON start_param:flags.1?string extended_media:flags.2?InputMedia = InputMedia;

    ---functions---

    messages.sendMedia#330e77f flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;

The user contacts the bot and requests to purchase something.
The bot forms an [inputMediaInvoice](/constructor/inputMediaInvoice.md) with an [invoice](/constructor/invoice.md) constructor with a description of the goods or service, amount to be paid, as well as requested shipping info.
The `provider` parameter of the [inputMediaInvoice](/constructor/inputMediaInvoice.md) constructor is where you put the token value that [you've obtained earlier via Botfather](/bots/payments.md#the-payments-api). It is possible for one merchant bot to use several different tokens for different users or different goods and services.

Use the [messages.sendMedia](/method/messages.sendMedia.md) method to send the [invoice](/constructor/invoice.md). 
You can also attach an inline keyboard to the message using the `reply_markup` field: if provided, the first button must be a [keyboardButtonBuy](/constructor/keyboardButtonBuy.md) button. Otherwise, an inline keyboard will be generated automatically, with a `Pay 'total price'` [keyboardButtonBuy](/constructor/keyboardButtonBuy.md) as only button.

An invoice message with a pay button can only be sent to a private chat with the user. Groups and channels are not supported.

#### 1.2 Create Invoice Link

    inputMediaInvoice#405fef0d flags:# title:string description:string photo:flags.0?InputWebDocument invoice:Invoice payload:bytes provider:flags.3?string provider_data:DataJSON start_param:flags.1?string extended_media:flags.2?InputMedia = InputMedia;
    
    payments.exportedInvoice#aed0cbd9 url:string = payments.ExportedInvoice;

    ---functions---

    payments.exportInvoice#f91b065 invoice_media:InputMedia = payments.ExportedInvoice;

Bots may also generate [invoice deep links](/api/links.md#invoice-links) using [payments.exportInvoice](/method/payments.exportInvoice.md).  

The returned [payments.exportedInvoice](/constructor/payments.exportedInvoice.md) will contain an [invoice deep link](/api/links.md#invoice-links) that can be shared directly, or sent in a bot mini app [`web_app_open_invoice` event](/api/web-events.md#web-app-open-invoice).

### 2. Order information

#### 2.1 Invoice

    keyboardButtonBuy#3fa53905 flags:# style:flags.10?KeyboardButtonStyle text:string = KeyboardButton;
    
    keyboardButtonRow#77608b83 buttons:Vector<KeyboardButton> = KeyboardButtonRow;
    replyInlineMarkup#48a30254 rows:Vector<KeyboardButtonRow> = ReplyMarkup;
    
    webDocument#1c570ed1 url:string access_hash:long size:int mime_type:string attributes:Vector<DocumentAttribute> = WebDocument;
    webDocumentNoProxy#f9c8bcc6 url:string size:int mime_type:string attributes:Vector<DocumentAttribute> = WebDocument;

    messageMediaInvoice#f6a548d3 flags:# shipping_address_requested:flags.1?true test:flags.3?true title:string description:string photo:flags.0?WebDocument receipt_msg_id:flags.2?int currency:string total_amount:long start_param:string extended_media:flags.4?MessageExtendedMedia = MessageMedia;
    
    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;

    updateNewMessage#1f2b0afd message:Message pts:int pts_count:int = Update;

The user receives an [invoice deep link](/api/links.md#invoice-links) or an [updateNewMessage](/constructor/updateNewMessage.md) constructor from the bot, containing a [messageMediaInvoice](/constructor/messageMediaInvoice.md) constructor with basic info about the product.

For invoice messages, the [message](/constructor/message.md) will also have a [replyInlineMarkup](/constructor/replyInlineMarkup.md) keyboard attached to it.
The first button of the keyboard will always be a [keyboardButtonBuy](/constructor/keyboardButtonBuy.md) button.

Pass `XTR` as `currency` to request payment in [Telegram Stars](/api/stars.md).  

#### 2.2 Getting invoice info about the product

    inputStorePaymentPremiumGiveaway#160544ca flags:# only_new_subscribers:flags.0?true winners_are_visible:flags.3?true boost_peer:InputPeer additional_peers:flags.1?Vector<InputPeer> countries_iso2:flags.2?Vector<string> prize_description:flags.4?string random_id:long until_date:int currency:string amount:long = InputStorePaymentPurpose;
    inputStorePaymentPremiumGiftCode#fb790393 flags:# users:Vector<InputUser> boost_peer:flags.0?InputPeer currency:string amount:long message:flags.1?TextWithEntities = InputStorePaymentPurpose;

    inputInvoiceMessage#c5b56859 peer:InputPeer msg_id:int = InputInvoice;
    inputInvoiceSlug#c326caef slug:string = InputInvoice;
    inputInvoicePremiumGiftCode#98986c0d purpose:InputStorePaymentPurpose option:PremiumGiftCodeOption = InputInvoice;
    inputInvoiceStars#65f00ce3 purpose:InputStorePaymentPurpose = InputInvoice;
    inputInvoiceChatInviteSubscription#34e793f1 hash:string = InputInvoice;
    inputInvoiceStarGift#e8625e92 flags:# hide_name:flags.0?true include_upgrade:flags.2?true peer:InputPeer gift_id:long message:flags.1?TextWithEntities = InputInvoice;
    inputInvoiceStarGiftUpgrade#4d818d5d flags:# keep_original_details:flags.0?true stargift:InputSavedStarGift = InputInvoice;
    inputInvoiceStarGiftPrepaidUpgrade#9a0b48b8 peer:InputPeer hash:string = InputInvoice;
    inputInvoiceStarGiftTransfer#4a5f5bd9 stargift:InputSavedStarGift to_id:InputPeer = InputInvoice;
    inputInvoicePremiumGiftStars#dabab2ef flags:# user_id:InputUser months:int message:flags.0?TextWithEntities = InputInvoice;
    inputInvoiceBusinessBotTransferStars#f4997e42 bot:InputUser stars:long = InputInvoice;
    inputInvoiceStarGiftResale#c39f5324 flags:# ton:flags.0?true slug:string to_id:InputPeer = InputInvoice;

    invoice#49ee584 flags:# test:flags.0?true name_requested:flags.1?true phone_requested:flags.2?true email_requested:flags.3?true shipping_address_requested:flags.4?true flexible:flags.5?true phone_to_provider:flags.6?true email_to_provider:flags.7?true recurring:flags.9?true currency:string prices:Vector<LabeledPrice> max_tip_amount:flags.8?long suggested_tip_amounts:flags.8?Vector<long> terms_url:flags.10?string subscription_period:flags.11?int = Invoice;

    paymentRequestedInfo#909c3f94 flags:# name:flags.0?string phone:flags.1?string email:flags.2?string shipping_address:flags.3?PostAddress = PaymentRequestedInfo;

    paymentSavedCredentialsCard#cdc27a1f id:string title:string = PaymentSavedCredentials;

    payments.paymentForm#a0058751 flags:# can_save_credentials:flags.2?true password_missing:flags.3?true form_id:long bot_id:long title:string description:string photo:flags.5?WebDocument invoice:Invoice provider_id:long url:string native_provider:flags.4?string native_params:flags.4?DataJSON additional_methods:flags.6?Vector<PaymentFormMethod> saved_info:flags.0?PaymentRequestedInfo saved_credentials:flags.1?Vector<PaymentSavedCredentials> users:Vector<User> = payments.PaymentForm;
    
    payments.paymentFormStars#7bf6b15c flags:# form_id:long bot_id:long title:string description:string photo:flags.5?WebDocument invoice:Invoice users:Vector<User> = payments.PaymentForm;
    payments.paymentFormStarGift#b425cfe1 form_id:long invoice:Invoice = payments.PaymentForm;

    ---functions---

    payments.getPaymentForm#37148dbb flags:# invoice:InputInvoice theme_params:flags.0?DataJSON = payments.PaymentForm;

[payments.getPaymentForm](/method/payments.getPaymentForm.md) is used to return a [payment form](/constructor/payments.paymentForm.md) from an invoice, providing the following `invoice` parameter:

* [inputInvoiceMessage](/constructor/inputInvoiceMessage.md), used:
  * If the user clicks on the [keyboardButtonBuy](/constructor/keyboardButtonBuy.md) button, contains the message ID of the invoice preview message.  
  * When [purchasing paid media&nbsp;&raquo;](/api/paid-media.md).
* [inputInvoiceSlug](/constructor/inputInvoiceSlug.md)
  * If the user opens an [invoice deep link](/api/links.md#invoice-links), contains the `slug` parameter
  * If the client has to process a [Telegram Premium](/api/premium.md) payment, contains the [`premium_invoice_slug` app config parameter »](/api/config.md#premium-invoice-slug)
* [inputInvoicePremiumGiftCode](/constructor/inputInvoicePremiumGiftCode.md) 
  * Used if the user wishes to start a channel [giveaway](/api/giveaways.md) or send some [giftcodes](/api/giveaways.md) to members of a channel, in exchange for [boosts](/api/boost.md).  
    The `purpose` field should be populated with [inputStorePaymentPremiumGiveaway](/constructor/inputStorePaymentPremiumGiveaway.md) for [giveaways](/api/giveaways.md) and [inputStorePaymentPremiumGiftCode](/constructor/inputStorePaymentPremiumGiftCode.md) for [gifts](/api/giveaways.md).  
    The `option` field should be populated with one of the giveaway options returned by [payments.getPremiumGiftCodeOptions](/method/payments.getPremiumGiftCodeOptions.md).  
    See the [giveaways&nbsp;&raquo;](/api/giveaways.md) documentation for more info.  
* [inputInvoiceStars](/constructor/inputInvoiceStars.md)
  * Used to [purchase Telegram Stars](/api/stars.md#buying-or-gifting-stars).
    The `option` field should be populated with one of the star topup options returned by [payments.getStarsTopupOptions](/method/payments.getStarsTopupOptions.md).  
    See the [stars&nbsp;&raquo;](/api/stars.md#buying-or-gifting-stars) documentation for more info.  
* [inputInvoiceChatInviteSubscription](/constructor/inputInvoiceChatInviteSubscription.md)
  * Used to implement bot and channel [subscriptions &raquo;](/api/subscriptions.md).  
    See the [subscriptions &raquo;](/api/subscriptions.md) documentation for more info.
* [inputInvoiceStarGift](/constructor/inputInvoiceStarGift.md)
  * Used to [purchase Telegram Star Gifts](/api/gifts.md).  
    See the [gifts&nbsp;&raquo;](/api/gifts.md) documentation for more info.  
* [inputInvoiceStarGiftUpgrade](/constructor/inputInvoiceStarGiftUpgrade.md)
  * Used to [pay to upgrade a Gift to a collectible gift](/api/gifts.md#upgrade-a-gift-to-a-collectible-gift).  
    See the [collectible gifts&nbsp;&raquo;](/api/gifts.md#collectible-gifts) documentation for more info.  
* [inputInvoiceStarGiftPrepaidUpgrade](/constructor/inputInvoiceStarGiftPrepaidUpgrade.md)
  * Used to [pay for someone to upgrade a Gift to a collectible gift](/api/gifts.md#prepaying-for-someone-elses-upgrade).  
    See the [collectible gifts&nbsp;&raquo;](/api/gifts.md#collectible-gifts) documentation for more info.  
* [inputInvoiceStarGiftTransfer](/constructor/inputInvoiceStarGiftTransfer.md)
  * Used to [pay to transfer a Gift to another peer](/api/gifts.md#transferring-collectible-gifts).  
    See the [gifts&nbsp;&raquo;](/api/gifts.md#transferring-collectible-gifts) documentation for more info.  
* [inputInvoiceStarGiftResale](/constructor/inputInvoiceStarGiftResale.md)
  * Used to [to buy a Gift on resale](/api/gifts.md#reselling-collectible-gifts).  
    See the [gifts&nbsp;&raquo;](/api/gifts.md#reselling-collectible-gifts) documentation for more info.  
* [inputInvoicePremiumGiftStars](/constructor/inputInvoicePremiumGiftStars.md)
  * Used to [gift a Premium subscription to another user, paying with Telegram Stars](/api/premium.md).  
    See the [Telegram Premium&nbsp;&raquo;](/api/premium.md) documentation for more info
* [inputInvoiceBusinessBotTransferStars](/constructor/inputInvoiceBusinessBotTransferStars.md)
  * Used to [transfer Telegram Stars from the balance of a user controlled by a business bot, to the bot's balance](/api/stars.md#transferring-stars-from-a-business-account-to-the-business-bot).  
    See the [Telegram Business&nbsp;&raquo;](/api/stars.md#transferring-stars-from-a-business-account-to-the-business-bot) documentation for more info.  

The returned form will contain fields that should be passed to the payment provider along with the full [invoice](/constructor/invoice.md).
The payment form also contains info about previously saved payment credentials and order information (name, phone number, email, shipping address & so on).

The full [invoice](/constructor/invoice.md) contains info about the information required for the order, the price and the currency, and whether this is a `test` order.
The `recurring` flag will be set for recurring payments, and `recurring_terms_url` will link to the terms of service of the recurring payment: the user must read and accept them before continuing.  

A [payments.paymentFormStars](/constructor/payments.paymentFormStars.md)/[payments.paymentFormStarGift](/constructor/payments.paymentFormStarGift.md) will be returned if the payment is to be made using [Telegram Stars, see here&nbsp;&raquo;](/api/stars.md) for more info (note that this constructor is used for payments in Telegram Stars to bots and peers, it will **not** be returned when *topping up* the Telegram Star balance of the current account using [inputInvoiceStars](/constructor/inputInvoiceStars.md)): the associated invoice will use `XTR` as `currency`.  

#### 2.3 Verifying information

    invoice#49ee584 flags:# test:flags.0?true name_requested:flags.1?true phone_requested:flags.2?true email_requested:flags.3?true shipping_address_requested:flags.4?true flexible:flags.5?true phone_to_provider:flags.6?true email_to_provider:flags.7?true recurring:flags.9?true currency:string prices:Vector<LabeledPrice> max_tip_amount:flags.8?long suggested_tip_amounts:flags.8?Vector<long> terms_url:flags.10?string subscription_period:flags.11?int = Invoice;
    
    postAddress#1e8caaeb street_line1:string street_line2:string city:string state:string country_iso2:string post_code:string = PostAddress;

    paymentRequestedInfo#909c3f94 flags:# name:flags.0?string phone:flags.1?string email:flags.2?string shipping_address:flags.3?PostAddress = PaymentRequestedInfo;

    payments.validatedRequestedInfo#d1451883 flags:# id:flags.0?string shipping_options:flags.1?Vector<ShippingOption> = payments.ValidatedRequestedInfo;
    
    ---functions---

    payments.validateRequestedInfo#b6c8f12b flags:# save:flags.0?true invoice:InputInvoice info:PaymentRequestedInfo = payments.ValidatedRequestedInfo;
    
If any data at all is requested by the [**invoice**](/constructor/invoice.md) (`name_requested`, `phone_requested`, `email_requested`, `shipping_address_requested`), the user must call [payments.validateRequestedInfo](/method/payments.validateRequestedInfo.md), providing the required data (as usual, `msg_id` is the ID of the invoice message).
The user can choose to save order information for future use by setting the `save` flag.
Data can be autofilled as described in [autofill](#231-autofill).

If no errors are found in the submitted info, the [response](/constructor/payments.validatedRequestedInfo.md) of the method will contain an `id` flag, to be used later to complete the payment.

If the `flexible` flag of the invoice is set, calling the [payments.validateRequestedInfo](/method/payments.validateRequestedInfo.md) method will send a [shipping query update](/constructor/updateBotShippingQuery.md) to the bot, to which the bot will reply with the available shipping options for the specified address [as described here&nbsp;&raquo;](#24-select-delivery-option).
The return value in this case will also contain a `shipping_options` field with the available shipping options.

If any errors are found in the submitted data, a [service notification](/constructor/updateServiceNotification.md) will be sent to the user, with a description of the error from the bot.

#### 2.3.1 Autofill

    payments.savedInfo#fb8fe43c flags:# has_saved_credentials:flags.1?true saved_info:flags.0?PaymentRequestedInfo = payments.SavedInfo;

    ---functions---

    payments.getSavedInfo#227d824b = payments.SavedInfo;
    payments.clearSavedInfo#d83d70c1 flags:# credentials:flags.0?true info:flags.1?true = Bool;

The requested fields can be autofilled with the info provided in the `saved_info` field of the [payment form](/constructor/payments.paymentForm.md), or with the info fetched manually using [payments.getSavedInfo](/method/payments.getSavedInfo.md).

Saved order information can also be cleared using [payments.clearSavedInfo](/method/payments.clearSavedInfo.md).

#### 2.4 Select delivery option

    labeledPrice#cb296bf8 label:string amount:long = LabeledPrice;

    shippingOption#b6213cdf id:string title:string prices:Vector<LabeledPrice> = ShippingOption;
    
    updateBotShippingQuery#b5aefd7d query_id:long user_id:long payload:bytes shipping_address:PostAddress = Update;
    
    ---functions---

    messages.setBotShippingResults#e5f672fa flags:# query_id:long error:flags.0?string shipping_options:flags.1?Vector<ShippingOption> = Bool;

If a shipping address was requested and the bot included the parameter `flexible`, when the user [validates order information](#23-verifying-information) the Telegram API will send an [updateBotShippingQuery](/constructor/updateBotShippingQuery.md) to the bot. 
The bot must respond using [messages.setBotShippingResults](/method/messages.setBotShippingResults.md) either with a list of possible delivery options and the relevant delivery prices, or with an error (for example, if delivery to the specified address is not possible).

The returned shipping options or the shipping error will be returned to the user while [validating order information](#23-verifying-information).

### 3. Payment

#### 3.1 Star payment

    payments.paymentFormStars#7bf6b15c flags:# form_id:long bot_id:long title:string description:string photo:flags.5?WebDocument invoice:Invoice users:Vector<User> = payments.PaymentForm;
    payments.paymentFormStarGift#b425cfe1 form_id:long invoice:Invoice = payments.PaymentForm;

    ---functions---

    payments.sendStarsForm#7998c914 form_id:long invoice:InputInvoice = payments.PaymentResult;

A [payments.paymentFormStars](/constructor/payments.paymentFormStars.md) or [payments.paymentFormStarGift](/constructor/payments.paymentFormStarGift.md) will be returned if the payment should be made using [Telegram Stars](/api/stars.md), invoking [payments.sendStarsForm](/method/payments.sendStarsForm.md) instead of [payments.sendPaymentForm](/method/payments.sendPaymentForm.md) at [step 4&nbsp;&raquo;](#4-pre-checkout).  

Calling [payments.sendStarsForm](/method/payments.sendStarsForm.md) twice with the same `form_id` will **not** repeat the transaction.  

Note that the returned form is only valid for 10 minutes, after which a call to [payments.sendStarsForm](/method/payments.sendStarsForm.md) will return a `400` `FORM_EXPIRED` error.  
When receiving this error, simply re-generate the form as specified in [step 2.2&nbsp;&raquo;](#22-getting-invoice-info-about-the-product) and re-call [payments.sendStarsForm](/method/payments.sendStarsForm.md).  

A `400` `BALANCE_TOO_LOW` error will be emitted by [payments.sendStarsForm](/method/payments.sendStarsForm.md) if the current Telegram Stars balance is not enough to complete the transaction: when receiving this error, the client should invite the user to [topup their Telegram Stars balance&nbsp;&raquo;](/api/stars.md#buying-or-gifting-stars), before re-invoking [payments.sendStarsForm](/method/payments.sendStarsForm.md).

#### 3.2 Web payment

    inputPaymentCredentials#3417d728 flags:# save:flags.0?true data:DataJSON = InputPaymentCredentials;
    
    payments.paymentForm#a0058751 flags:# can_save_credentials:flags.2?true password_missing:flags.3?true form_id:long bot_id:long title:string description:string photo:flags.5?WebDocument invoice:Invoice provider_id:long url:string native_provider:flags.4?string native_params:flags.4?DataJSON additional_methods:flags.6?Vector<PaymentFormMethod> saved_info:flags.0?PaymentRequestedInfo saved_credentials:flags.1?Vector<PaymentSavedCredentials> users:Vector<User> = payments.PaymentForm;

    paymentFormMethod#88f8f21b url:string title:string = PaymentFormMethod;

The user can choose to use either the main payment platform, using the `url` of the [payments.paymentForm](/constructor/payments.paymentForm.md), or any of the additional payment platforms, using the `url` of the chosen [paymentFormMethod](/constructor/paymentFormMethod.md).  
Payment takes place by opening the `url` of the chosen payment platform in the specified [payment form](/constructor/payments.paymentForm.md), which leads to a payment form on the website of the payment gateway.  
Once the user finishes entering their payment credentials, a [`payment_form_submit` web event](/api/web-events.md#payment-form-submit) is generated by the payment gateway, containing `credentials` and `title` JSON fields.

The `title` is used by the client app to represent the payment credentials (typically a censored version of credit card information).
The `credentials` are used to generate an [inputPaymentCredentials](/constructor/inputPaymentCredentials.md) constructor.
Eventually, you can set the `save` flag to save the credit card info for future use, only if [2FA](/api/srp.md) is enabled.

Telegram **does not** have access to your card information. Credit card details will be handled only by the payment system.

#### 3.3 Native payment

    inputPaymentCredentials#3417d728 flags:# save:flags.0?true data:DataJSON = InputPaymentCredentials;
    
    payments.paymentForm#a0058751 flags:# can_save_credentials:flags.2?true password_missing:flags.3?true form_id:long bot_id:long title:string description:string photo:flags.5?WebDocument invoice:Invoice provider_id:long url:string native_provider:flags.4?string native_params:flags.4?DataJSON additional_methods:flags.6?Vector<PaymentFormMethod> saved_info:flags.0?PaymentRequestedInfo saved_credentials:flags.1?Vector<PaymentSavedCredentials> users:Vector<User> = payments.PaymentForm;

Most telegram apps support working natively with the native APIs of some payment providers, without opening the website of the payment and receiving a JS event.

This is done using the JSON `native_params` parameters field of the [payments.paymentForm](/constructor/payments.paymentForm.md) constructor, which contains an object, which can contain one or more of the following fields:

- `publishable_key`: Stripe API publishable key
- `apple_pay_merchant_id`: Apple Pay merchant ID
- `android_pay_public_key`: Android Pay public key
- `android_pay_bgcolor`: Android Pay form background color
- `android_pay_inverse`: Whether to use the dark theme in the Android Pay form
- `need_country`: True, if the user country must be provided,
- `need_zip`: True, if the user ZIP/postal code must be provided,
- `need_cardholder_name`: True, if the cardholder name must be provided

The payment gateway to use is decided based on the value of the `native_provider` field.

##### 3.3.1 Stripe

    inputPaymentCredentials#3417d728 flags:# save:flags.0?true data:DataJSON = InputPaymentCredentials;
    
    payments.paymentForm#a0058751 flags:# can_save_credentials:flags.2?true password_missing:flags.3?true form_id:long bot_id:long title:string description:string photo:flags.5?WebDocument invoice:Invoice provider_id:long url:string native_provider:flags.4?string native_params:flags.4?DataJSON additional_methods:flags.6?Vector<PaymentFormMethod> saved_info:flags.0?PaymentRequestedInfo saved_credentials:flags.1?Vector<PaymentSavedCredentials> users:Vector<User> = payments.PaymentForm;

If the `native_provider` field is set and equal to `stripe`, the client can make use of the [native Stripe token APIs](https://stripe.com/docs/api/tokens/object) with the `publishable_key` from the `native_params` to add a payment method to Stripe, and then use the token `type` and `id` to generate a JSON object:

```
{"type":"token.type", "id":"token.id"}"
```

The generated JSON object can then be passed to the `data` field of the [inputPaymentCredentials](/constructor/inputPaymentCredentials.md).
Eventually, you can set the `save` flag to save the credit card info for future use, only if [2FA](/api/srp.md) is enabled.

Telegram **does not** have access to your card information. Credit card details will be handled only by the payment system.

Example implementation: [Telegram for Android](https://github.com/DrKLO/Telegram).

#### 3.4 Apple pay

    inputPaymentCredentialsApplePay#aa1c39f payment_data:DataJSON = InputPaymentCredentials;

On iOS devices, Apple Pay can be used to generate payment data, which is then sent using the [inputPaymentCredentialsApplePay](/constructor/inputPaymentCredentialsApplePay.md) constructor.

Example implementation: [Telegram for iOS](https://github.com/TelegramMessenger/Telegram-iOS/).

#### 3.5 Android pay

    inputPaymentCredentialsGooglePay#8ac32801 payment_token:DataJSON = InputPaymentCredentials;
    
On Android devices, Google Pay can be used to generate payment data, which is then sent using the [inputPaymentCredentialsGooglePay](/constructor/inputPaymentCredentialsApplePay.md) constructor.

Example implementation: [Telegram for Android](https://github.com/DrKLO/Telegram/blob/68d51749c4fcbaffa584829f23936565df55e08b/TMessagesProj/src/main/java/org/telegram/ui/PaymentFormActivity.java).

#### 3.6 Using saved payment credentials

    inputPaymentCredentialsSaved#c10eb2cf id:string tmp_password:bytes = InputPaymentCredentials;
    
    paymentSavedCredentialsCard#cdc27a1f id:string title:string = PaymentSavedCredentials;

    payments.paymentForm#a0058751 flags:# can_save_credentials:flags.2?true password_missing:flags.3?true form_id:long bot_id:long title:string description:string photo:flags.5?WebDocument invoice:Invoice provider_id:long url:string native_provider:flags.4?string native_params:flags.4?DataJSON additional_methods:flags.6?Vector<PaymentFormMethod> saved_info:flags.0?PaymentRequestedInfo saved_credentials:flags.1?Vector<PaymentSavedCredentials> users:Vector<User> = payments.PaymentForm;

    account.tmpPassword#db64fd34 tmp_password:bytes valid_until:int = account.TmpPassword;

    ---functions---
    
    account.getTmpPassword#449e0b51 password:InputCheckPasswordSRP period:int = account.TmpPassword;

To reuse saved payment methods, the `saved_credentials` field of the [payment form](/constructor/payments.paymentForm.md) is used.
The `title` of the [paymentSavedCredentialsCard](/constructor/paymentSavedCredentialsCard.md) can be used to preview a censored version of credit card info.
The `id` field is provided by the payment provider directly to the Telegram servers when saving the payment method, and identifies the payment method.
Full credit card info **is not** saved on Telegram Servers, and cannot be fetched by the user.

In order to **use** the saved payment method, [2FA](/api/srp.md) must be enabled: the user must verify their identity by entering their [2FA](/api/srp.md) password, which is then used as described in the [SRP docs](/api/srp.md) to generate SRP parameters which must be passed to [account.getTmpPassword](/method/account.getTmpPassword.md).

The generated temporary password can then be used to make payments using the saved credentials using the [inputPaymentCredentialsSaved](/constructor/inputPaymentCredentialsSaved.md) constructor.
* The `id` field is the [paymentSavedCredentialsCard](/constructor/paymentSavedCredentialsCard.md) `id`.
* The `tmp_password` is the temporary payment password generated by the server, if the user provided a correct [2FA password](/api/srp.md).

Example implementation: [Telegram for Android](https://github.com/DrKLO/Telegram).

### 4. Pre-Checkout

    inputPaymentCredentialsSaved#c10eb2cf id:string tmp_password:bytes = InputPaymentCredentials;
    inputPaymentCredentials#3417d728 flags:# save:flags.0?true data:DataJSON = InputPaymentCredentials;
    inputPaymentCredentialsApplePay#aa1c39f payment_data:DataJSON = InputPaymentCredentials;
    inputPaymentCredentialsGooglePay#8ac32801 payment_token:DataJSON = InputPaymentCredentials;

    payments.paymentResult#4e5f810d updates:Updates = payments.PaymentResult;
    payments.paymentVerificationNeeded#d8411139 url:string = payments.PaymentResult;

    ---functions---

    payments.sendPaymentForm#2d03522f flags:# form_id:long invoice:InputInvoice requested_info_id:flags.0?string shipping_option_id:flags.1?string credentials:InputPaymentCredentials tip_amount:flags.2?long = payments.PaymentResult;

    payments.sendStarsForm#7998c914 form_id:long invoice:InputInvoice = payments.PaymentResult;

After [verifying order information](#23-verifying-information), the final step for the client is to call [payments.sendPaymentForm](/method/payments.sendPaymentForm.md) or [payments.sendStarsForm](/method/payments.sendStarsForm.md) for [payments using Telegram Stars&nbsp;&raquo;](#31-star-payment), with the following parameters:

* The `form_id` is set to the ID of the form
* The `invoice` is set to the previously passed invoice
* `requested_info_id` is set to the `id` of the [verified order information](#23-verifying-information), if it was requested
* `shipping_option_id` is set to the [selected delivery option](#24-select-delivery-option), if shipping was requested.
* `credentials` are the payment credentials generated by the payment provider, required to complete the order.

Payment method info can also be saved to the Telegram Servers and reused, by setting the `save` flag of [inputPaymentCredentials](/constructor/inputPaymentCredentials.md) when sending the form.
This is only possible on accounts with [2FA](/api/srp.md) enabled.

The bot then [replies to the received precheckout query](#41-receiving-pre-checkout-query), finally the user [proceeds to checkout](#5-checkout).

Please note that if the result of the method is a [payments.paymentVerificationNeeded](/constructor/payments.paymentVerificationNeeded.md), before [proceeding to checkout](#5-checkout) the payment provider requires the user to verify their identity by opening the provided `url` and following instructions (ie 3-D Secure).  
Once the user finishes working with the webpage, the client can [proceed to checkout](#5-checkout).

Eventual errors are returned in the form of RPC errors (`rpc_error`), with the description of the error by the bot contained in additional [service updates](/constructor/updateServiceNotification.md) received separately, see [here](/api/errors.md#406-not-acceptable) for more info.  

Note that eventual payment errors will not be sent to the client via MTProto if they occur during additional verification (if a [payments.paymentVerificationNeeded](/constructor/payments.paymentVerificationNeeded.md) is returned and the user fails TOTP verification): such errors will only be displayed inside of the verification webview, no MTProto updates or RPC errors (`rpc_error`) will be received.  

#### 4.1 Receiving pre-checkout query

    paymentRequestedInfo#909c3f94 flags:# name:flags.0?string phone:flags.1?string email:flags.2?string shipping_address:flags.3?PostAddress = PaymentRequestedInfo;

    updateBotPrecheckoutQuery#8caa9a96 flags:# query_id:long user_id:long payload:bytes info:flags.0?PaymentRequestedInfo shipping_option_id:flags.1?string currency:string total_amount:long = Update;
    
    ---functions---
    
    messages.setBotPrecheckoutResults#9c2dd95 flags:# success:flags.1?true query_id:long error:flags.0?string = Bool;

The user enters their payment information as described above and presses the final pay button.
At this moment the Telegram API sends an [updateBotPrecheckoutQuery](/constructor/updateBotPrecheckoutQuery.md) constructor that contains all the available information about the order to the bot. 
The bot must reply using [messages.setBotPrecheckoutResults](/method/messages.setBotPrecheckoutResults.md) **within 10 seconds** after receiving this update or the transaction is canceled.

The bot may return an error if it can't process the order for any reason. We highly recommend specifying a reason for failure to complete the order in human readable form (e.g. "Sorry, we're all out of rubber ducks! Would you be interested in a steel bear instead?"). Telegram will display this reason to the user.

### 5. Checkout

    keyboardButtonBuy#3fa53905 flags:# style:flags.10?KeyboardButtonStyle text:string = KeyboardButton;
    
    keyboardButtonRow#77608b83 buttons:Vector<KeyboardButton> = KeyboardButtonRow;
    replyInlineMarkup#48a30254 rows:Vector<KeyboardButtonRow> = ReplyMarkup;
    
    messageMediaInvoice#f6a548d3 flags:# shipping_address_requested:flags.1?true test:flags.3?true title:string description:string photo:flags.0?WebDocument receipt_msg_id:flags.2?int currency:string total_amount:long start_param:string extended_media:flags.4?MessageExtendedMedia = MessageMedia;
    
    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;

    updateNewMessage#1f2b0afd message:Message pts:int pts_count:int = Update;
    
	payments.paymentReceipt#70c4fe03 flags:# date:int bot_id:long provider_id:long title:string description:string photo:flags.2?WebDocument invoice:Invoice info:flags.0?PaymentRequestedInfo shipping:flags.1?ShippingOption tip_amount:flags.3?long currency:string total_amount:long credentials_title:string users:Vector<User> = payments.PaymentReceipt;

    payments.paymentReceiptStars#dabbf83a flags:# date:int bot_id:long title:string description:string photo:flags.2?WebDocument invoice:Invoice currency:string total_amount:long transaction_id:string users:Vector<User> = payments.PaymentReceipt;

    ---functions---

	payments.getPaymentReceipt#2478d1cc peer:InputPeer msg_id:int = payments.PaymentReceipt;

In case the bot confirms the order, Telegram requests the payment provider to complete the transaction. If the payment information was entered correctly and the payment goes through, the Telegram API will modify the invoice message and send a service message as described below. Once your bot receives this message, it should proceed with delivering the goods or services purchased by the user.

If all is OK, the user receives a [payments.paymentResult](/constructor/payments.paymentResult.md) in reply to the [payments.sendPaymentForm](/method/payments.sendPaymentForm.md) query, containing info about the updated invoice message in the form of an [updateEditMessage](/constructor/updateEditMessage.md).

The invoice message will be updated as follows: the attached [messageMediaInvoice](/constructor/messageMediaInvoice.md) will now have a `receipt_msg_id` field.
Clients should treat invoice messages with a `receipt_msg_id` field as receipt messages, **locally** modifying the label of the [keyboardButtonBuy](/constructor/keyboardButtonBuy.md) button to a localized version of the word `Receipt`.
From this point, clicking on the `Receipt` button should trigger a call to [payments.getPaymentReceipt](/method/payments.getPaymentReceipt.md), providing the `receipt_msg_id` to the `msg_id` field, which will return info about the transaction.

The payment will also generate one service message of type [messageActionPaymentSent](/constructor/messageActionPaymentSent.md) or [messageActionPaymentSentMe](/constructor/messageActionPaymentSentMe.md), replying to the invoice.
For bots, the service message will be of type [messageActionPaymentSentMe](/constructor/messageActionPaymentSentMe.md), for users it will be a [messageActionPaymentSent](/constructor/messageActionPaymentSent.md).  
The `recurring_init` flag will be set if this payment also enables future recurring payments.  
Further recurring payments will automatically send [messageActionPaymentSentMe](/constructor/messageActionPaymentSentMe.md) and [messageActionPaymentSent](/constructor/messageActionPaymentSent.md) messages with the `recurring_used` flag set.  

    messageActionPaymentSentMe#ffa00ccc flags:# recurring_init:flags.2?true recurring_used:flags.3?true currency:string total_amount:long payload:bytes info:flags.0?PaymentRequestedInfo shipping_option_id:flags.1?string charge:PaymentCharge subscription_until_date:flags.4?int = MessageAction;
    messageActionPaymentSent#c624b16e flags:# recurring_init:flags.2?true recurring_used:flags.3?true currency:string total_amount:long invoice_slug:flags.0?string subscription_until_date:flags.4?int = MessageAction;

### 6. Refunds

    paymentCharge#ea02c27e id:string provider_charge_id:string = PaymentCharge;

    messageActionPaymentSentMe#ffa00ccc flags:# recurring_init:flags.2?true recurring_used:flags.3?true currency:string total_amount:long payload:bytes info:flags.0?PaymentRequestedInfo shipping_option_id:flags.1?string charge:PaymentCharge subscription_until_date:flags.4?int = MessageAction;

    messageActionPaymentRefunded#41b3e202 flags:# peer:Peer currency:string total_amount:long payload:flags.0?bytes charge:PaymentCharge = MessageAction;

    ---functions---

    payments.refundStarsCharge#25ae8f4a user_id:InputUser charge_id:string = Updates;

Payments made using [Telegram Stars&nbsp;&raquo;](/api/stars.md) may be refunded *by the user/bot that received them* by invoking [payments.refundStarsCharge](/method/payments.refundStarsCharge.md), passing to `user_id` the ID of the user that did the payment, and to `charge_id` the `provider_charge_id` from the [messageActionPaymentSentMe](/constructor/messageActionPaymentSentMe.md) service message action of the incoming payment.  

This will emit a [messageActionPaymentRefunded](/constructor/messageActionPaymentRefunded.md) service message.

