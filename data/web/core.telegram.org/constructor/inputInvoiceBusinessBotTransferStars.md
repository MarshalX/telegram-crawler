# inputInvoiceBusinessBotTransferStars

Transfer stars from the balance of a user account [connected to a business bot](/api/bots/connected-business-bots.md), to the balance of the [business bot](/api/bots/connected-business-bots.md), see [here »](/api/stars.md#transferring-stars-from-a-business-account-to-the-business-bot) for more info on the full flow.

```tl
inputInvoiceBusinessBotTransferStars#f4997e42 bot:InputUser stars:long = InputInvoice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot** | [InputUser](/type/InputUser.md) | Always [inputUserSelf](/constructor/inputUserSelf.md). |
| **stars** | [long](/type/long.md) | The number of stars to transfer. |

### Type
[InputInvoice](/type/InputInvoice.md)

### Related pages

#### [inputUserSelf](/constructor/inputUserSelf.md)
Defines the current user.

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.