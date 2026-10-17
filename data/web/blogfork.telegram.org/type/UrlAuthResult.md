# UrlAuthResult

URL authorization result

```tl
urlAuthResultRequest#3cd623ec flags:# request_write_access:flags.0?true request_phone_number:flags.1?true match_codes_first:flags.5?true is_app:flags.6?true bot:User domain:string browser:flags.2?string platform:flags.2?string ip:flags.2?string region:flags.2?string match_codes:flags.3?Vector<string> user_id_hint:flags.4?long verified_app_name:flags.7?string = UrlAuthResult;
urlAuthResultAccepted#623a8fa0 flags:# url:flags.0?string = UrlAuthResult;
urlAuthResultDefault#a9d6db1f = UrlAuthResult;

---functions---

messages.requestUrlAuth#894cc99c flags:# peer:flags.1?InputPeer msg_id:flags.1?int button_id:flags.1?int url:flags.2?string in_app_origin:flags.3?string = UrlAuthResult;
messages.acceptUrlAuth#67a3f0de flags:# write_allowed:flags.0?true share_phone_number:flags.3?true peer:flags.1?InputPeer msg_id:flags.1?int button_id:flags.1?int url:flags.2?string match_code:flags.4?string = UrlAuthResult;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [urlAuthResultRequest](/constructor/urlAuthResultRequest.md) | Details about the authorization request, for more info [click here »](/api/url-authorization.md) |
| [urlAuthResultAccepted](/constructor/urlAuthResultAccepted.md) | Details about an accepted authorization request, for more info [click here »](/api/url-authorization.md) |
| [urlAuthResultDefault](/constructor/urlAuthResultDefault.md) | Details about an accepted authorization request, for more info [click here »](/api/url-authorization.md) |

### Methods

| Method | Description |
| --- | --- |
| [messages.requestUrlAuth](/method/messages.requestUrlAuth.md) | Get more info about a Seamless Telegram Login authorization request, for more info [click here »](/api/url-authorization.md) |
| [messages.acceptUrlAuth](/method/messages.acceptUrlAuth.md) | Use this to accept a Seamless Telegram Login authorization request, for more info [click here »](/api/url-authorization.md) |