# inputInvoiceSlug

An invoice slug taken from an [invoice deep link](/api/links.md#invoice-links) or from the [`premium_invoice_slug` app config parameter »](/api/config.md#premium-invoice-slug)

```tl
inputInvoiceSlug#c326caef slug:string = InputInvoice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **slug** | [string](/type/string.md) | The invoice slug |

### Type
[InputInvoice](/type/InputInvoice.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.