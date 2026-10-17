# messages.requestUrlAuth

Get more info about a Seamless Telegram Login authorization request, for more info [click here »](/api/url-authorization.md)

```tl
urlAuthResultRequest#3cd623ec flags:# request_write_access:flags.0?true request_phone_number:flags.1?true match_codes_first:flags.5?true is_app:flags.6?true bot:User domain:string browser:flags.2?string platform:flags.2?string ip:flags.2?string region:flags.2?string match_codes:flags.3?Vector<string> user_id_hint:flags.4?long verified_app_name:flags.7?string = UrlAuthResult;
urlAuthResultAccepted#623a8fa0 flags:# url:flags.0?string = UrlAuthResult;
urlAuthResultDefault#a9d6db1f = UrlAuthResult;
---functions---
messages.requestUrlAuth#894cc99c flags:# peer:flags.1?InputPeer msg_id:flags.1?int button_id:flags.1?int url:flags.2?string in_app_origin:flags.3?string = UrlAuthResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputPeer](/type/InputPeer.md) | Peer where the message is located |
| **msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | The message |
| **button\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | The ID of the button with the authorization request |
| **url** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | URL used for [link URL authorization, click here for more info »](/api/url-authorization.md#link-url-authorization) |
| **in\_app\_origin** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | For [OAuth authorization from mini apps »](/api/url-authorization.md#oauth-authorization-for-mini-apps): the origin of the webview that originated the OAuth request, in the format `scheme://host` (or `scheme://host:port` for non-default ports) |

### Result
[UrlAuthResult](/type/UrlAuthResult.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 500 | OAUTH\_REQUEST\_INVALID | The specified OAuth request is invalid. |
| 400 | URL\_EXPIRED | The specified OAuth request has expired. |
| 400 | URL\_INVALID | Invalid URL provided. |

### Related pages

#### [Seamless Telegram Login](/api/url-authorization.md)
Handle Seamless Telegram Login URL authorization requests.