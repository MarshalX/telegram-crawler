# payments.sendStarsForm

Make a payment using [Telegram Stars, see here »](/api/stars.md#using-stars) for more info.

```tl
payments.paymentResult#4e5f810d updates:Updates = payments.PaymentResult;
payments.paymentVerificationNeeded#d8411139 url:string = payments.PaymentResult;
---functions---
payments.sendStarsForm#7998c914 form_id:long invoice:InputInvoice = payments.PaymentResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **form\_id** | [long](/type/long.md) | Payment form ID |
| **invoice** | [InputInvoice](/type/InputInvoice.md) | Invoice |

### Result
[payments.PaymentResult](/type/payments.PaymentResult.md)

### Both users and bots can use this method

### This method can be invoked over a [business connection &raquo;](/api/bots/connected-business-bots.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 406 | API\_GIFT\_RESTRICTED\_UPDATE\_APP | Please update the app to access the gift API. |
| 400 | BALANCE\_TOO\_LOW | The transaction cannot be completed because the current [Telegram Stars balance](/api/stars.md) is too low. |
| 403 | BOT\_ACCESS\_FORBIDDEN | The specified method *can* be used over a [business connection](/api/bots/connected-business-bots.md) for some operations, but the specified query attempted an operation that is not allowed over a business connection. |
| 400 | BOT\_INVOICE\_INVALID | The specified invoice is invalid. |
| 400 | BUSINESS\_CONNECTION\_INVALID | The `connection_id` passed to the wrapping [invokeWithBusinessConnection](/api/business.md) call is invalid. |
| 400 | FORM\_EXPIRED | The form was generated more than 10 minutes ago and has expired, please re-generate it using [payments.getPaymentForm](/method/payments.getPaymentForm.md) and pass the new `form_id`. |
| 400 | FORM\_ID\_EMPTY | The specified form ID is empty. |
| 400 | FORM\_SUBMIT\_DUPLICATE | The same payment form was already submitted.  . |
| 400 | FORM\_UNSUPPORTED | Please update your client. |
| 400 | GIFT\_STARS\_INVALID | The specified amount of stars is invalid. |
| 400 | MEDIA\_ALREADY\_PAID | You already paid for the specified media. |
| 400 | MONTH\_INVALID | The number of months specified in inputInvoicePremiumGiftStars.months is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 406 | PRECHECKOUT\_FAILED | Precheckout failed, a detailed and localized description for the error will be emitted via an [updateServiceNotification as specified here&nbsp;&raquo;](/api/errors.md#406-not-acceptable). |
| 400 | PURPOSE\_INVALID | The specified payment purpose is invalid. |
| 400 | STARGIFT\_ALREADY\_UPGRADED | The specified gift was already upgraded to a collectible gift. |
| 400 | STARGIFT\_NOT\_FOUND | The specified gift was not found. |
| 400 | STARGIFT\_OWNER\_INVALID | You cannot transfer or sell a gift owned by another user. |
| 400 | STARGIFT\_SLUG\_INVALID | The specified gift slug is invalid. |
| 400 | STARGIFT\_USAGE\_LIMITED | The gift is sold out. |
| 400 | STARGIFT\_USER\_USAGE\_LIMITED | You've reached the starGift.limited_per_user limit, you can't buy any more gifts of this type. |
| 406 | STARS\_FORM\_AMOUNT\_MISMATCH | The form amount has changed, please fetch the new form using [payments.getPaymentForm](/method/payments.getPaymentForm.md) and restart the process. |
| 400 | TO\_ID\_INVALID | The specified `to_id` of the passed inputInvoiceStarGiftResale or inputInvoiceStarGiftTransfer is invalid. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

#### [payments.getPaymentForm](/method/payments.getPaymentForm.md)
Get a payment form

#### [Error handling ](/api/errors.md)
How to handle API return errors correctly.