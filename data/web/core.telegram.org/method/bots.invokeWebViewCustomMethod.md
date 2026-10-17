# bots.invokeWebViewCustomMethod

Send a custom request from a [mini bot app](/api/bots/webapps.md), triggered by a [web\_app\_invoke\_custom\_method event »](/api/web-events.md#web-app-invoke-custom-method).

The response should be sent using a [custom\_method\_invoked](/api/bots/webapps.md#custom-method-invoked) event, [see here »](/api/web-events.md#web-app-invoke-custom-method) for more info on the flow.

```tl
dataJSON#7d748d04 data:string = DataJSON;
---functions---
bots.invokeWebViewCustomMethod#87fc5e7 bot:InputUser custom_method:string params:DataJSON = DataJSON;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot** | [InputUser](/type/InputUser.md) | Identifier of the bot associated to the [mini bot app](/api/bots/webapps.md) |
| **custom\_method** | [string](/type/string.md) | Identifier of the custom method to invoke |
| **params** | [DataJSON](/type/DataJSON.md) | Method parameters |

### Result
[DataJSON](/type/DataJSON.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | DATA\_JSON\_INVALID | The provided JSON data is invalid. |
| 400 | METHOD\_INVALID | The specified method is invalid. |

### Related pages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [Web events](/api/web-events.md)
How telegram apps interact with webpages