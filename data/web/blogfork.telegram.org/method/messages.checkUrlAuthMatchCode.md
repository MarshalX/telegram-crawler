# messages.checkUrlAuthMatchCode

Validate the match code selected by the user against the code shown on the login page, as part of the [OAuth authorization flow »](/api/url-authorization.md#oauth-authorization).

Only usable when both `match_codes` and `match_codes_first` are set in the [urlAuthResultRequest](/constructor/urlAuthResultRequest.md) returned by [messages.requestUrlAuth](/method/messages.requestUrlAuth.md).  
If [boolTrue](/constructor/boolTrue.md) is returned, proceed with the login flow and pass the verified code to [messages.acceptUrlAuth](/method/messages.acceptUrlAuth.md).`match_code`.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.checkUrlAuthMatchCode#c9a47b0b url:string match_code:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **url** | [string](/type/string.md) | The OAuth deep link |
| **match\_code** | [string](/type/string.md) | The emoji or code selected by the user from the list in [urlAuthResultRequest](/constructor/urlAuthResultRequest.md).`match_codes` |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | URL\_INVALID | Invalid URL provided. |

### Related pages

#### [urlAuthResultRequest](/constructor/urlAuthResultRequest.md)
Details about the authorization request, for more info [click here »](/api/url-authorization.md)

#### [Seamless Telegram Login](/api/url-authorization.md)
Handle Seamless Telegram Login URL authorization requests.

#### [messages.requestUrlAuth](/method/messages.requestUrlAuth.md)
Get more info about a Seamless Telegram Login authorization request, for more info [click here »](/api/url-authorization.md)

#### [boolTrue](/constructor/boolTrue.md)
The constructor can be interpreted as a **boolean**`true` value.

#### [messages.acceptUrlAuth](/method/messages.acceptUrlAuth.md)
Use this to accept a Seamless Telegram Login authorization request, for more info [click here »](/api/url-authorization.md)