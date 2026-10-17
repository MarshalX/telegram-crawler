# urlAuthResultRequest

Details about the authorization request, for more info [click here »](/api/url-authorization.md)

```tl
urlAuthResultRequest#3cd623ec flags:# request_write_access:flags.0?true request_phone_number:flags.1?true match_codes_first:flags.5?true is_app:flags.6?true bot:User domain:string browser:flags.2?string platform:flags.2?string ip:flags.2?string region:flags.2?string match_codes:flags.3?Vector<string> user_id_hint:flags.4?long verified_app_name:flags.7?string = UrlAuthResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **request\_write\_access** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the bot would like to send messages to the user |
| **request\_phone\_number** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | The app/website is requesting the user's phone number; if the user consents, set `share_phone_number` when calling [messages.acceptUrlAuth](/method/messages.acceptUrlAuth.md) |
| **match\_codes\_first** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Can only be set if `match_codes` is also set; if set, clients must ask the user to select the matching code *before* showing the rest of the login confirmation UI, and must validate the selection with [messages.checkUrlAuthMatchCode](/method/messages.checkUrlAuthMatchCode.md) before proceeding |
| **is\_app** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Set if an OAuth request originated from an app rather than a website; when set, `domain` must be replaced in the confirmation prompt by `verified_app_name` (if present) or "Unverified App" |
| **bot** | [User](/type/User.md) | Username of a bot, which will be used for user authorization. If not specified, the current bot's username will be assumed. The url's domain must be the same as the domain linked with the bot. See [Linking your domain to the bot](/widgets/login.md#linking-your-domain-to-the-bot) for more details. |
| **domain** | [string](/type/string.md) | The domain name of the website on which the user will log in. |
| **browser** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | The browser the user used to make the OAuth request |
| **platform** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | The platform (operating system) of the user that made the OAuth request |
| **ip** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | The IP address of the user making the OAuth request |
| **region** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | The location of the user, inferred from the IP address |
| **match\_codes** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | A list of emojis or codes, one of which is currently being shown on the login page of the website/app; the user must select the matching one and pass it to [messages.acceptUrlAuth](/method/messages.acceptUrlAuth.md).`match_code` |
| **user\_id\_hint** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[long](/type/long.md) | May contain the ID of the account for which the login request was created; if it matches a logged-in account, clients should automatically switch to that account and re-invoke [messages.requestUrlAuth](/method/messages.requestUrlAuth.md) before showing the prompt |
| **verified\_app\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[string](/type/string.md) | Can only be set if `is_app` is set and the app is verified; must replace `domain` in the confirmation prompt when present |

### Type
[UrlAuthResult](/type/UrlAuthResult.md)

### Related pages

#### [messages.acceptUrlAuth](/method/messages.acceptUrlAuth.md)
Use this to accept a Seamless Telegram Login authorization request, for more info [click here »](/api/url-authorization.md)

#### [messages.checkUrlAuthMatchCode](/method/messages.checkUrlAuthMatchCode.md)
Validate the match code selected by the user against the code shown on the login page, as part of the [OAuth authorization flow »](/api/url-authorization.md#oauth-authorization).

Only usable when both `match_codes` and `match_codes_first` are set in the [urlAuthResultRequest](/constructor/urlAuthResultRequest.md) returned by [messages.requestUrlAuth](/method/messages.requestUrlAuth.md).  
If [boolTrue](/constructor/boolTrue.md) is returned, proceed with the login flow and pass the verified code to [messages.acceptUrlAuth](/method/messages.acceptUrlAuth.md).`match_code`.

#### [messages.requestUrlAuth](/method/messages.requestUrlAuth.md)
Get more info about a Seamless Telegram Login authorization request, for more info [click here »](/api/url-authorization.md)

#### [Seamless Telegram Login](/api/url-authorization.md)
Handle Seamless Telegram Login URL authorization requests.