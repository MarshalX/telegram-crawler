# requestPeerTypeUser

Choose a user.

```tl
requestPeerTypeUser#5f3b8a00 flags:# bot:flags.0?Bool premium:flags.1?Bool = RequestPeerType;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **bot** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Bool](/type/Bool.md) | Whether to allow choosing only bots. |
| **premium** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Bool](/type/Bool.md) | Whether to allow choosing only [Premium](/api/premium.md) users. |

### Type
[RequestPeerType](/type/RequestPeerType.md)

### Related pages

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.