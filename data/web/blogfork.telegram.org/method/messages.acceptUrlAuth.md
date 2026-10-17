# messages.acceptUrlAuth

Use this to accept a Seamless Telegram Login authorization request, for more info [click here »](/api/url-authorization.md)

```tl
urlAuthResultRequest#3cd623ec flags:# request_write_access:flags.0?true request_phone_number:flags.1?true match_codes_first:flags.5?true is_app:flags.6?true bot:User domain:string browser:flags.2?string platform:flags.2?string ip:flags.2?string region:flags.2?string match_codes:flags.3?Vector<string> user_id_hint:flags.4?long verified_app_name:flags.7?string = UrlAuthResult;
urlAuthResultAccepted#623a8fa0 flags:# url:flags.0?string = UrlAuthResult;
urlAuthResultDefault#a9d6db1f = UrlAuthResult;
---functions---
messages.acceptUrlAuth#67a3f0de flags:# write_allowed:flags.0?true share_phone_number:flags.3?true peer:flags.1?InputPeer msg_id:flags.1?int button_id:flags.1?int url:flags.2?string match_code:flags.4?string = UrlAuthResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **write\_allowed** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Set this flag to allow the bot to send messages to you (if requested) |
| **share\_phone\_number** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Set this flag to share the user's phone number with the bot (if requested via [urlAuthResultRequest](/constructor/urlAuthResultRequest.md).`request_phone_number` and consented to by the user) |
| **peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputPeer](/type/InputPeer.md) | The location of the message |
| **msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Message ID of the message with the login button |
| **button\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | ID of the login button |
| **url** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | URL used for [link URL authorization, click here for more info »](/api/url-authorization.md#link-url-authorization) |
| **match\_code** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[string](/type/string.md) | If [urlAuthResultRequest](/constructor/urlAuthResultRequest.md).`match_codes` was set, the emoji or code selected by the user from the provided list; must always be provided when `match_codes` is set, even if `match_codes_first` was set and the code was already validated via [messages.checkUrlAuthMatchCode](/method/messages.checkUrlAuthMatchCode.md) |

### Result
[UrlAuthResult](/type/UrlAuthResult.md)

### Only users can use this method

### Related pages

#### [urlAuthResultRequest](/constructor/urlAuthResultRequest.md)
Details about the authorization request, for more info [click here »](/api/url-authorization.md)

#### [Seamless Telegram Login](/api/url-authorization.md)
Handle Seamless Telegram Login URL authorization requests.

#### [messages.checkUrlAuthMatchCode](/method/messages.checkUrlAuthMatchCode.md)
Validate the match code selected by the user against the code shown on the login page, as part of the [OAuth authorization flow »](/api/url-authorization.md#oauth-authorization).

Only usable when both `match_codes` and `match_codes_first` are set in the [urlAuthResultRequest](/constructor/urlAuthResultRequest.md) returned by [messages.requestUrlAuth](/method/messages.requestUrlAuth.md).  
If [boolTrue](/constructor/boolTrue.md) is returned, proceed with the login flow and pass the verified code to [messages.acceptUrlAuth](/method/messages.acceptUrlAuth.md).`match_code`.