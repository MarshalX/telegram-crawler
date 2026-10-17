# webAuthorization

Represents a bot logged in using the [Telegram login widget](/widgets/login.md)

```tl
webAuthorization#a6f8f452 hash:long bot_id:long domain:string browser:string platform:string date_created:int date_active:int ip:string region:string = WebAuthorization;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | Authorization hash |
| **bot\_id** | [long](/type/long.md) | Bot ID |
| **domain** | [string](/type/string.md) | The domain name of the website on which the user has logged in. |
| **browser** | [string](/type/string.md) | Browser user-agent |
| **platform** | [string](/type/string.md) | Platform |
| **date\_created** | [int](/type/int.md) | When was the web session created |
| **date\_active** | [int](/type/int.md) | When was the web session last active |
| **ip** | [string](/type/string.md) | IP address |
| **region** | [string](/type/string.md) | Region, determined from IP address |

### Type
[WebAuthorization](/type/WebAuthorization.md)

### Related pages

#### [Telegram Login Widget](/widgets/login.md)