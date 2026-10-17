# messages.declineUrlAuth

Decline an incoming [OAuth authorization request »](/api/url-authorization.md#oauth-authorization), notifying the server that the user refused the login request.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.declineUrlAuth#35436bbc url:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **url** | [string](/type/string.md) | The OAuth deep link from the [OAUTH\_REQUEST push notification](/api/push-updates.md#oauth-request) or the [`oauth_request` web event](/api/web-events.md#oauth-request) |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | URL\_INVALID | Invalid URL provided. |

### Related pages

#### [Handling PUSH-notifications](/api/push-updates.md)
How to subscribe to and handle PUSH notifications

#### [Web events](/api/web-events.md)
How telegram apps interact with webpages

#### [Seamless Telegram Login](/api/url-authorization.md)
Handle Seamless Telegram Login URL authorization requests.