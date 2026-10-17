# cdnPublicKey

Public key to use **only** during handshakes to [CDN](/cdn.md) DCs.

```tl
cdnPublicKey#c982eaba dc_id:int public_key:string = CdnPublicKey;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **dc\_id** | [int](/type/int.md) | [CDN DC](/cdn.md) ID |
| **public\_key** | [string](/type/string.md) | RSA public key |

### Type
[CdnPublicKey](/type/CdnPublicKey.md)

### Related pages

#### [Encrypted CDNs for Speed and Security](/cdn.md)
How client apps download popular public files from secondary CDN data centers.