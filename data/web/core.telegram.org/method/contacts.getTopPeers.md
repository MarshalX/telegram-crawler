# contacts.getTopPeers

Get most used peers

```tl
contacts.topPeersNotModified#de266ef5 = contacts.TopPeers;
contacts.topPeers#70b772a8 categories:Vector<TopPeerCategoryPeers> chats:Vector<Chat> users:Vector<User> = contacts.TopPeers;
contacts.topPeersDisabled#b52c939d = contacts.TopPeers;
---functions---
contacts.getTopPeers#973478b6 flags:# correspondents:flags.0?true bots_pm:flags.1?true bots_inline:flags.2?true phone_calls:flags.3?true forward_users:flags.4?true forward_chats:flags.5?true groups:flags.10?true channels:flags.15?true bots_app:flags.16?true bots_guestchat:flags.17?true offset:int limit:int hash:long = contacts.TopPeers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **correspondents** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Users we've chatted most frequently with |
| **bots\_pm** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Most used bots |
| **bots\_inline** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Most used inline bots |
| **phone\_calls** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Most frequently called users |
| **forward\_users** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Users to which the users often forwards messages to |
| **forward\_chats** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Chats to which the users often forwards messages to |
| **groups** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | Often-opened groups and supergroups |
| **channels** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[true](/constructor/true.md) | Most frequently visited channels |
| **bots\_app** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[true](/constructor/true.md) | Most frequently used [Main Mini Bot Apps](/api/bots/webapps.md#main-mini-apps). |
| **bots\_guestchat** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[true](/constructor/true.md) | Most frequently used [guest bots »](/api/bots/guest-mode.md) |
| **offset** | [int](/type/int.md) | Offset for [pagination](/api/offsets.md) |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |

### Result
[contacts.TopPeers](/type/contacts.TopPeers.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | TYPES\_EMPTY | No top peer type was provided. |

### Related pages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [Guest mode for bots](/api/bots/guest-mode.md)
Guest bots can be queried by username from **any** non-secret private chat, group and supergroup (except for groups/supergroups with [content protection &raquo;](/api/content-protection.md#for-groups-and-channels) enabled), posting their results directly into the chat, even if they're not a member.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.