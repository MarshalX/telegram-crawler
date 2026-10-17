# DataJSON

Represent a JSON-encoded object

```tl
dataJSON#7d748d04 data:string = DataJSON;

---functions---

bots.sendCustomRequest#aa2769ed custom_method:string params:DataJSON = DataJSON;
phone.getCallConfig#55451fa9 = DataJSON;
bots.invokeWebViewCustomMethod#87fc5e7 bot:InputUser custom_method:string params:DataJSON = DataJSON;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [dataJSON](/constructor/dataJSON.md) | Represents a json-encoded object |

### Methods

| Method | Description |
| --- | --- |
| [bots.sendCustomRequest](/method/bots.sendCustomRequest.md) | Sends a custom request; for bots only |
| [bots.invokeWebViewCustomMethod](/method/bots.invokeWebViewCustomMethod.md) | Send a custom request from a [mini bot app](/api/bots/webapps.md), triggered by a [web\_app\_invoke\_custom\_method event »](/api/web-events.md#web-app-invoke-custom-method).\
\
The response should be sent using a [custom\_method\_invoked](/api/bots/webapps.md#custom-method-invoked) event, [see here »](/api/web-events.md#web-app-invoke-custom-method) for more info on the flow. |
| [phone.getCallConfig](/method/phone.getCallConfig.md) | DEPRECATED: Get phone call configuration to be passed to the libtgvoip (deprecated) shared config. |