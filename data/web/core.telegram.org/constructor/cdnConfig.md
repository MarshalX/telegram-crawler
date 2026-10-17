# cdnConfig

Configuration for [CDN](/cdn.md) file downloads.

```tl
cdnConfig#5725e40a public_keys:Vector<CdnPublicKey> = CdnConfig;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **public\_keys** | [Vector](/type/Vector%20t)&lt;[CdnPublicKey](/type/CdnPublicKey.md)&gt; | Vector of public keys to use **only** during handshakes to [CDN](/cdn.md) DCs. |

### Type
[CdnConfig](/type/CdnConfig.md)

### Related pages

#### [Encrypted CDNs for Speed and Security](/cdn.md)
How client apps download popular public files from secondary CDN data centers.