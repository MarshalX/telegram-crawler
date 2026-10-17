# account.registerDevice

Register device to receive [PUSH notifications](/api/push-updates.md)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.registerDevice#ec86017a flags:# no_muted:flags.0?true token_type:int token:string app_sandbox:Bool secret:bytes other_uids:Vector<long> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **no\_muted** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Avoid receiving (silent and invisible background) notifications. Useful to save battery. |
| **token\_type** | [int](/type/int.md) | Device token type, see [PUSH updates](/api/push-updates.md#subscribing-to-notifications) for the possible values. |
| **token** | [string](/type/string.md) | Device token, see [PUSH updates](/api/push-updates.md#subscribing-to-notifications) for the possible values. |
| **app\_sandbox** | [Bool](/type/Bool.md) | If [(boolTrue)](/constructor/boolTrue.md) is transmitted, a sandbox-certificate will be used during transmission. |
| **secret** | [bytes](/type/bytes.md) | For FCM and APNS VoIP, optional encryption key used to encrypt push notifications |
| **other\_uids** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | List of user identifiers of other users currently using the client |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | TOKEN\_EMPTY | The specified token is empty. |
| 400 | TOKEN\_INVALID | The provided token is invalid. |
| 400 | TOKEN\_TYPE\_INVALID | The specified token type is invalid. |
| 400 | WEBPUSH\_AUTH\_INVALID | The specified web push authentication secret is invalid. |
| 400 | WEBPUSH\_KEY\_INVALID | The specified web push elliptic curve Diffie-Hellman public key is invalid. |
| 400 | WEBPUSH\_TOKEN\_INVALID | The specified web push token is invalid. |

### Related pages

#### [Handling PUSH-notifications](/api/push-updates.md)
How to subscribe to and handle PUSH notifications

#### [boolTrue](/constructor/boolTrue.md)
The constructor can be interpreted as a **boolean**`true` value.