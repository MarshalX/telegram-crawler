# inputInvoiceMessage

An invoice contained in a [messageMediaInvoice](/constructor/messageMediaInvoice.md) message or [paid media »](/api/paid-media.md).

```tl
inputInvoiceMessage#c5b56859 peer:InputPeer msg_id:int = InputInvoice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Chat where the invoice/paid media was sent |
| **msg\_id** | [int](/type/int.md) | Message ID |

### Type
[InputInvoice](/type/InputInvoice.md)

### Related pages

#### [messageMediaInvoice](/constructor/messageMediaInvoice.md)
Invoice

#### [Paid media](/api/paid-media.md)
Content creators can accept Stars by publishing paid photos or videos on their channels.  Subscribers will be allowed to view such posts only after paying the author to unlock them.