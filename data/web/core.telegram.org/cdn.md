# Encrypted CDNs for Speed and Security

Following the launch of version 4.2 of the official apps, Telegram client apps may be required to download popular files that were published in public channels with more than **100,000** members from secondary [Content Delivery Network](https://en.wikipedia.org/wiki/Content_delivery_network) data centers. These CDN DCs are located in regions with significant Telegram traffic where we wouldn't want to place Telegram servers for various reasons.

The CDN DCs are not a part of the Telegram cloud and should be considered enemy territory. For this reason, each file that is to be sent to these CDN DCs is encrypted with a unique key using AES-256-CTR encryption. The CDN **can't access the data** it stores because these keys are only accessible to the main MTProto server and to the authorized client.

> **See also:** [More about CDNs and governments in the Advanced FAQ](/techfaq.md#encrypted-cdns)

### How this works

When a file from a public channel with **~100,000** members becomes popular in a particular region, the Telegram server may encrypt this file with a unique AES-256-CTR key and send it to a relevant CDN DC for storage.

When a file is stored in a CDN DC close to the end user, the download speed will be much higher because the data needs to travel smaller distances and will likely avoid many bottlenecks that exist between regions.

This is secure because CDN DCs are treated the same way as internet providers / random third parties:

- CDN DCs don't have the keys to decrypt files that are stored there, so they can't access the data even if a DC becomes compromised.
- Encrypted file fragments are protected from tampering by their SHA-256 hash, which is checked on the client upon receipt.
- No private data is stored in or passed to the CDN DCs.
- The server only allows media from public channels with more than **100,000** subscribers to be cached in CDN DCs (this includes media forwarded from those channels and viral media that originated from other large public channels).

<div>
	<a href="/file/811140934/1815/aSQ-nSUHJzc.45662/40c2955965574cef80" target="_blank"><img src="/file/811140934/1815/aSQ-nSUHJzc.45662/40c2955965574cef80" title="CDNs explained"  class="dev_page_image" /></a>
</div>

CDNs are very limited when it comes to communication: the master data center only uploads encrypted files for storage and will accept no data from the CDN. The client apps only download encrypted files and accept no other updates. The client apps obtain the keys necessary to decrypt the file from the main Telegram server and verify the integrity of the file by its hash, which means that the CDN may only supply the correct file – anything different will be immediately discarded by the client.

CDN DCs do not store files on hard disks – only in memory. When a CDN server runs out of memory, a simple LRU algorithm is used to replace the least popular files with new ones.

### How CDN DCs are different from the master DCs

- **CDNs may not be trusted.**
- Client developers can use [help.getCdnConfig](/method/help.getCdnConfig.md) to obtain a list of public RSA keys for CDN DCs, which are different from public RSA keys of the master DCs.
- CDNs support only the following methods: [upload.getCdnFile](/method/upload.getCdnFile.md), [initConnection](/method/initConnection.md), [invokeWithLayer](/method/invokeWithLayer.md).
- When working with CDNs, client developers must remember that auth_key may be deleted at any given moment (resulting in a -404 error, in which case a new key must be generated).
- Client apps must not accept updates from CDN DCs (apps should only accept updates from their main connection to the master DC).
- Clients must not allow the CDN DCs to substitute replies to queries sent to other DCs.
- Clients must not send private user info that is passed in [initConnection](/method/initConnection.md) to the CDNs.

### Getting files from a CDN

The API may return the [upload.fileCdnRedirect](/constructor/upload.fileCdnRedirect.md) constructor after an [upload.getFile](/method/upload.getFile.md) query. In this case, the client must request the required file from a CDN DC. The *dc_id* in the response is the ID of the new CDN. The IP address for the connection will be available in [help.getConfig](/method/help.getConfig.md), as with the master DCs. The corresponding [dcOption](/constructor/dcOption.md) will have the flag *cdn:flags.3?true*.

Once a successful connection to the CDN DC identified by *dc_id* is established, the client must generate an auth_key (after confirming that the public RSA MTProto key of the CDN DC matches one from the list returned in [help.getCdnConfig](/method/help.getCdnConfig.md)). Then the client must perform an [upload.getCdnFile](/method/upload.getCdnFile.md) query for each *offset*. For files of unknown size, it is necessary to repeat the query until an empty reply is returned.

[upload.getCdnFile](/method/upload.getCdnFile.md) may return the [upload.cdnFileReuploadNeeded](/constructor/upload.cdnFileReuploadNeeded.md) constructor. In this case, the client needs to send an [upload.reuploadCdnFile](/method/upload.reuploadCdnFile.md) request to the DC that got the original [upload.getFile](/method/upload.getFile.md) request. Once [upload.reuploadCdnFile](/method/upload.reuploadCdnFile.md) is successful, the app needs to request the file from the CDN DC again.

The main DC for a file is the DC where its main copy is stored (not to be confused with the main DC of the user) – either *userProfilePhoto.dc_id*, *chatPhoto.dc_id*, *photo.dc_id*, or *document.dc_id*.

### Decrypting files

In [upload.fileCdnRedirect](/constructor/upload.fileCdnRedirect.md), the server sends a decryption key and IV for the file (the fields `encryption_key:bytes` and `encryption_iv:bytes` respectively).

Having received a portion of encrypted data from the CDN DC inside [upload.cdnFile](/constructor/upload.cdnFile.md), the client must decrypt this data using `AES-256-CTR`. For IV, it should use the value of `encryption_iv`, modified in the following manner: for each `offset`, replace the last 4 bytes of the `encryption_iv` with `offset / 16` in big-endian. This allows clients to decrypt a file efficiently and use random access to the file's content (e.g., for streaming).

### Verifying files

In order to confirm that the CDN DC passed an untampered file, clients must verify hashes for each downloaded part. [upload.fileCdnRedirect](/constructor/upload.fileCdnRedirect.md), [upload.reuploadCdnFile](/method/upload.reuploadCdnFile.md) and [upload.getCdnFileHashes](/method/upload.getCdnFileHashes.md) contain [FileHash](/type/FileHash.md) constructors. Each of these constructors contains the SHA-256 hash of a part of the file that starts with `offset` and takes `limit` bytes.

Before saving each portion of the data received from the CDN DC into the file, the client must confirm that its hash matches the hash that was received from the master DC. If a hash is missing for any file part, client developers must use the [upload.getCdnFileHashes](/method/upload.getCdnFileHashes.md) method to obtain the missing hash.

### Schema

	fileHash#f39b035c offset:long limit:int hash:bytes = FileHash;

	upload.fileCdnRedirect#f18cda44 dc_id:int file_token:bytes encryption_key:bytes encryption_iv:bytes file_hashes:Vector<FileHash> = upload.File;

	upload.cdnFileReuploadNeeded#eea8e46e request_token:bytes = upload.CdnFile;
	upload.cdnFile#a99fca4f bytes:bytes = upload.CdnFile;

    dcOption#18b7a10d flags:# ipv6:flags.0?true media_only:flags.1?true tcpo_only:flags.2?true cdn:flags.3?true static:flags.4?true this_port_only:flags.5?true id:int ip_address:string port:int secret:flags.10?bytes = DcOption;

	cdnPublicKey#c982eaba dc_id:int public_key:string = CdnPublicKey;

	cdnConfig#5725e40a public_keys:Vector<CdnPublicKey> = CdnConfig;

    ---functions---

    // CDN DC
    upload.getCdnFile#395f69da file_token:bytes offset:long limit:int = upload.CdnFile;

    // Master DC
    upload.reuploadCdnFile#9b2754a8 file_token:bytes request_token:bytes = Vector<FileHash>;
    upload.getCdnFileHashes#91dc3f31 file_token:bytes offset:long = Vector<FileHash>;
    
    help.getCdnConfig#52029342 = CdnConfig;

### Restrictions on upload.getFile and upload.getCdnFile parameters

- `offset` must be divisible by 4096 bytes
- `limit` must be divisible by 4096 bytes
- 1048576 (1MB) must be divisible by `limit`
- `offset / (1024 * 1024) == (offset + limit - 1) / (1024 * 1024)`
(file parts that are being downloaded must always be inside the same megabyte-sized fragment)

### Possible errors and their meanings

| Method | Error | Description |
| --- | --- | --- |
| upload.getCdnFile | FILE_TOKEN_INVALID | The CDN DC did not accept the `file_token` (e.g., the token has expired). Continue downloading the file from the master DC using `upload.getFile`. |
| upload.reuploadCdnFile | FILE_TOKEN_INVALID | The master DC did not accept the `file_token` (e.g., the token has expired). Continue downloading the file from the master DC using `upload.getFile`. |
| upload.reuploadCdnFile | REQUEST_TOKEN_INVALID | The master DC did not accept the `request_token` from the CDN DC. Continue downloading the file from the master DC using `upload.getFile`. |

### Testing CDN redirects

You may test CDN file redirects by logging into the [test DCs](/api/auth.md#test-accounts) with a DC 2 account (phone number `999662YYYY`, where YYYY are random numbers, login code `22222`), uploading and then redownloading the uploaded file.  

Make sure the chosen test account doesn't have a Telegram Premium test subscription, as CDN file downloads are disabled on the test DCs if a Telegram Premium test subscription is enabled (you can check this by making sure the [user](/constructor/user.md) returned by a [users.getUsers](/method/users.getUsers.md) call with [inputUserSelf](/constructor/inputUserSelf.md) does not have the `premium` flag set).
