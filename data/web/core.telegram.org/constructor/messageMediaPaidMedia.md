# messageMediaPaidMedia

[Paid media, see here »](/api/paid-media.md) for more info.

```tl
messageMediaPaidMedia#a8852491 stars_amount:long extended_media:Vector<MessageExtendedMedia> = MessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **stars\_amount** | [long](/type/long.md) | The price of the media in [Telegram Stars](/api/stars.md). |
| **extended\_media** | [Vector](/type/Vector%20t)&lt;[MessageExtendedMedia](/type/MessageExtendedMedia.md)&gt; | Either the paid-for media, or super low resolution media previews if the media wasn't purchased yet, [see here »](/api/paid-media.md#viewing-paid-media) for more info. |

### Type
[MessageMedia](/type/MessageMedia.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Paid media](/api/paid-media.md)
Content creators can accept Stars by publishing paid photos or videos on their channels.  Subscribers will be allowed to view such posts only after paying the author to unlock them.