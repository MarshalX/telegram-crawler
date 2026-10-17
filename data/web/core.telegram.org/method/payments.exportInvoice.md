# payments.exportInvoice

Generate an [invoice deep link](/api/links.md#invoice-links)

```tl
payments.exportedInvoice#aed0cbd9 url:string = payments.ExportedInvoice;
---functions---
payments.exportInvoice#f91b065 invoice_media:InputMedia = payments.ExportedInvoice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **invoice\_media** | [InputMedia](/type/InputMedia.md) | Invoice |

### Result
[payments.ExportedInvoice](/type/payments.ExportedInvoice.md)

### Only bots can use this method

### This method can be invoked over a [business connection &raquo;](/api/bots/connected-business-bots.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BUSINESS\_CONNECTION\_INVALID | The `connection_id` passed to the wrapping [invokeWithBusinessConnection](/api/business.md) call is invalid. |
| 400 | CURRENCY\_TOTAL\_AMOUNT\_INVALID | The total amount of all prices is invalid. |
| 400 | INVOICE\_PAYLOAD\_INVALID | The specified invoice payload is invalid. |
| 400 | MEDIA\_INVALID | Media invalid. |
| 400 | PAYMENT\_PROVIDER\_INVALID | The specified payment provider is invalid. |
| 400 | STARS\_INVOICE\_INVALID | The specified Telegram Star invoice is invalid. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |
| 400 | WEBDOCUMENT\_MIME\_INVALID | Invalid webdocument mime type provided. |
| 400 | WEBDOCUMENT\_URL\_EMPTY | The passed web document URL is empty. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.