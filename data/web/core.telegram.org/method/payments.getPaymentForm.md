# payments.getPaymentForm

Get a payment form

```tl
payments.paymentForm#a0058751 flags:# can_save_credentials:flags.2?true password_missing:flags.3?true form_id:long bot_id:long title:string description:string photo:flags.5?WebDocument invoice:Invoice provider_id:long url:string native_provider:flags.4?string native_params:flags.4?DataJSON additional_methods:flags.6?Vector<PaymentFormMethod> saved_info:flags.0?PaymentRequestedInfo saved_credentials:flags.1?Vector<PaymentSavedCredentials> users:Vector<User> = payments.PaymentForm;
payments.paymentFormStars#7bf6b15c flags:# form_id:long bot_id:long title:string description:string photo:flags.5?WebDocument invoice:Invoice users:Vector<User> = payments.PaymentForm;
payments.paymentFormStarGift#b425cfe1 form_id:long invoice:Invoice = payments.PaymentForm;
---functions---
payments.getPaymentForm#37148dbb flags:# invoice:InputInvoice theme_params:flags.0?DataJSON = payments.PaymentForm;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **invoice** | [InputInvoice](/type/InputInvoice.md) | Invoice |
| **theme\_params** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[DataJSON](/type/DataJSON.md) | [Theme parameters »](/api/bots/webapps.md#theme-parameters) |

### Result
[payments.PaymentForm](/type/payments.PaymentForm.md)

### Both users and bots can use this method

### This method can be invoked over a [business connection &raquo;](/api/bots/connected-business-bots.md)

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 406 | API\_GIFT\_RESTRICTED\_UPDATE\_APP | Please update the app to access the gift API. |
| 400 | BOOST\_PEER\_INVALID | The specified `boost_peer` is invalid. |
| 403 | BOT\_ACCESS\_FORBIDDEN | The specified method *can* be used over a [business connection](/api/bots/connected-business-bots.md) for some operations, but the specified query attempted an operation that is not allowed over a business connection. |
| 400 | BOT\_INVOICE\_INVALID | The specified invoice is invalid. |
| 400 | BUSINESS\_CONNECTION\_INVALID | The `connection_id` passed to the wrapping [invokeWithBusinessConnection](/api/business.md) call is invalid. |
| 400 | GIFT\_MONTHS\_INVALID | The value passed in invoice.inputInvoicePremiumGiftStars.months is invalid. |
| 400 | GIFT\_STARS\_INVALID | The specified amount of stars is invalid. |
| 400 | INVOICE\_INVALID | The specified invoice is invalid. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | MESSAGE\_TOO\_LONG | The provided message is too long. |
| 400 | MONTH\_INVALID | The number of months specified in inputInvoicePremiumGiftStars.months is invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | NO\_PAYMENT\_NEEDED | The upgrade/transfer of the specified gift was already paid for or is free. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | PREMIUM\_PURPOSE\_INVALID | The specified InputStorePaymentPurpose is invalid. |
| 400 | SLUG\_INVALID | The specified invoice slug is invalid. |
| 400 | STARGIFT\_ALREADY\_CONVERTED | The specified star gift was already converted to Stars. |
| 400 | STARGIFT\_ALREADY\_REFUNDED | The specified star gift was already refunded. |
| 400 | STARGIFT\_ALREADY\_UPGRADED | The specified gift was already upgraded to a collectible gift. |
| 406 | STARGIFT\_EXPORT\_IN\_PROGRESS | A gift export is in progress, a detailed and localized description for the error will be emitted via an [updateServiceNotification as specified here&nbsp;&raquo;](/api/errors.md#406-not-acceptable). |
| 400 | STARGIFT\_INVALID | The passed gift is invalid. |
| 400 | STARGIFT\_MESSAGE\_INVALID | The specified inputInvoiceStarGift.message is invalid. |
| 400 | STARGIFT\_NOT\_FOUND | The specified gift was not found. |
| 400 | STARGIFT\_NOT\_OWNER | You're not the owner of the gift you trying to transfer. |
| 400 | STARGIFT\_NOT\_UNIQUE | You can't transfer a non-collectible gift. |
| 400 | STARGIFT\_OWNER\_INVALID | You cannot transfer or sell a gift owned by another user. |
| 400 | STARGIFT\_PEER\_INVALID | The specified inputSavedStarGiftChat.peer is invalid. |
| 400 | STARGIFT\_RESELL\_CURRENCY\_NOT\_ALLOWED | You can't buy the gift using the specified currency (i.e. trying to pay in Stars for TON gifts). |
| 400 | STARGIFT\_RESELL\_TOO\_EARLY\_%d | You will be able to resell this gift in %d seconds. |
| 400 | STARGIFT\_SLUG\_INVALID | The specified gift slug is invalid. |
| 400 | STARGIFT\_TRANSFER\_TOO\_EARLY\_%d | You cannot transfer this gift yet, wait %d seconds. |
| 400 | STARGIFT\_UPGRADE\_UNAVAILABLE | A received gift can only be upgraded to a collectible gift if the [messageActionStarGift](/constructor/messageActionStarGift.md)/[savedStarGift](/constructor/savedStarGift.md).`can_upgrade` flag is set. |
| 406 | STARS\_FORM\_AMOUNT\_MISMATCH | The form amount has changed, please fetch the new form using [payments.getPaymentForm](/method/payments.getPaymentForm.md) and restart the process. |
| 400 | TO\_ID\_INVALID | The specified `to_id` of the passed inputInvoiceStarGiftResale or inputInvoiceStarGiftTransfer is invalid. |
| 400 | UNTIL\_DATE\_INVALID | Invalid until date provided. |
| 403 | USER\_DISALLOWED\_STARGIFTS | The recipient user has configured restrictions on which categories of star gifts they're willing to accept (unique, limited, or unlimited): the sender attempted to get a payment form for a gift that falls into a category the recipient has blocked. |

### Related pages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

#### [Error handling ](/api/errors.md)
How to handle API return errors correctly.

#### [messageActionStarGift](/constructor/messageActionStarGift.md)
You received a [gift, see here »](/api/gifts.md) for more info.

#### [savedStarGift](/constructor/savedStarGift.md)
Represents a [gift](/api/gifts.md) owned by a peer.

#### [payments.getPaymentForm](/method/payments.getPaymentForm.md)
Get a payment form