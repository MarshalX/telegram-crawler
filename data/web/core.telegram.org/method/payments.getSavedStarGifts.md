# payments.getSavedStarGifts

Fetch the full list of [gifts »](/api/gifts.md#list-all-received-gifts) owned, received or [hosted »](/api/gifts.md#hosted-collectible-gifts) by a peer.

Note that unlike what the name suggests, the method can be used to fetch both "saved" and "unsaved" gifts (aka gifts both pinned and not pinned) to the profile, depending on the passed flags.

```tl
payments.savedStarGifts#95f389b1 flags:# count:int chat_notifications_enabled:flags.1?Bool gifts:Vector<SavedStarGift> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = payments.SavedStarGifts;
---functions---
payments.getSavedStarGifts#a319e569 flags:# exclude_unsaved:flags.0?true exclude_saved:flags.1?true exclude_unlimited:flags.2?true exclude_unique:flags.4?true sort_by_value:flags.5?true exclude_upgradable:flags.7?true exclude_unupgradable:flags.8?true peer_color_available:flags.9?true exclude_hosted:flags.10?true peer:InputPeer collection_id:flags.6?int offset:string limit:int = payments.SavedStarGifts;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **exclude\_unsaved** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Exclude gifts not pinned on the profile. |
| **exclude\_saved** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Exclude gifts pinned on the profile. |
| **exclude\_unlimited** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Exclude gifts that do not have the [starGift](/constructor/starGift.md).`limited` flag set. |
| **exclude\_unique** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Exclude [collectible gifts »](/api/gifts.md#collectible-gifts). |
| **sort\_by\_value** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | If set, sorts the gifts by price instead of reception date. |
| **exclude\_upgradable** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Exclude gifts that can be [upgraded to collectible gifts »](/api/gifts.md#collectible-gifts). |
| **exclude\_unupgradable** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | Exclude gifts that cannot be [upgraded to collectible gifts »](/api/gifts.md#collectible-gifts). |
| **peer\_color\_available** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | If set, only returns [collectible gifts](/api/gifts.md#collectible-gifts) whose palette can be used as a [collectible message palette »](/api/colors.md#collectible-message-palettes). |
| **exclude\_hosted** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | If set, excludes [hosted collectible gifts »](/api/gifts.md#hosted-collectible-gifts), returning only gifts owned or received by `peer`. |
| **peer** | [InputPeer](/type/InputPeer.md) | Fetch only gifts owned, received or [hosted »](/api/gifts.md#hosted-collectible-gifts) by the specified peer, such as: a user, with peer=[inputPeerUser](/constructor/inputPeerUser.md); a channel, with peer=[inputPeerChannel](/constructor/inputPeerChannel.md); a [connected business user »](/api/bots/connected-business-bots.md) (when executing the method as a bot, over the business connection), with peer=[inputPeerUser](/constructor/inputPeerUser.md). |
| **collection\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[int](/type/int.md) | Only returns gifts within the specified [collection »](/api/gifts.md#gift-collections). |
| **offset** | [string](/type/string.md) | [Offset for pagination](/api/offsets.md). |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[payments.SavedStarGifts](/type/payments.SavedStarGifts.md)

### Both users and bots can use this method

### This method can be invoked over a [business connection &raquo;](/api/bots/connected-business-bots.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BUSINESS\_CONNECTION\_INVALID | The `connection_id` passed to the wrapping [invokeWithBusinessConnection](/api/business.md) call is invalid. |
| 400 | COLLECTION\_ID\_INVALID | The specified collection ID is invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [starGift](/constructor/starGift.md)
Represents a [star gift, see here »](/api/gifts.md) for more info.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [Accent colors](/api/colors.md)
Telegram users and channels can change the accent color and background pattern of their profile page and their messages!

#### [inputPeerUser](/constructor/inputPeerUser.md)
Defines a user for further interaction.

#### [inputPeerChannel](/constructor/inputPeerChannel.md)
Defines a channel for further interaction.

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.