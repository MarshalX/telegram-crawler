# urlAuthResultAccepted

Details about an accepted authorization request, for more info [click here »](/api/url-authorization.md)

```tl
urlAuthResultAccepted#623a8fa0 flags:# url:flags.0?string = UrlAuthResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **url** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | If present, the URL to open in the external browser (may use a custom scheme for direct switching to another app); if absent, the login succeeded and clients should simply show a confirmation toast. \
Always set for [bot button URL authorization](/api/url-authorization.md#bot-button-url-authorization) and [link URL authorization](/api/url-authorization.md#link-url-authorization). |

### Type
[UrlAuthResult](/type/UrlAuthResult.md)

### Related pages

#### [Seamless Telegram Login](/api/url-authorization.md)
Handle Seamless Telegram Login URL authorization requests.