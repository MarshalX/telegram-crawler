# sendMessageTextDraftAction

Used by bots to implement [live message streaming »](/api/bots/ai.md#live-response-streaming).

```tl
sendMessageTextDraftAction#376d975c random_id:long text:TextWithEntities = SendMessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **random\_id** | [long](/type/long.md) | Live draft ID: used by graphical clients to slightly change the rendering behavior, see [here »](/api/bots/ai.md#live-response-streaming) for more info. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **text** | [TextWithEntities](/type/TextWithEntities.md) | The contents of the live draft. |

### Type
[SendMessageAction](/type/SendMessageAction.md)

### Related pages

#### [AI features for bots](/api/bots/ai.md)
Telegram bots offer a number of features for AI chatbots.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.