# updateMessageExtendedMedia

You [bought a paid media »](/api/paid-media.md): this update contains the revealed media.

```tl
updateMessageExtendedMedia#d5a41724 peer:Peer msg_id:int extended_media:Vector<MessageExtendedMedia> = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [Peer](/type/Peer.md) | Peer where the paid media was posted |
| **msg\_id** | [int](/type/int.md) | ID of the message containing the paid media |
| **extended\_media** | [Vector](/type/Vector%20t)&lt;[MessageExtendedMedia](/type/MessageExtendedMedia.md)&gt; | Revealed media, contains only [messageExtendedMedia](/constructor/messageExtendedMedia.md) constructors. |

### Type
[Update](/type/Update.md)

### Related pages

#### [messageExtendedMedia](/constructor/messageExtendedMedia.md)
Already purchased paid media, [see here »](/api/paid-media.md) for more info.

#### [Paid media](/api/paid-media.md)
Content creators can accept Stars by publishing paid photos or videos on their channels.  Subscribers will be allowed to view such posts only after paying the author to unlock them.