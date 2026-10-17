# contacts.getSponsoredPeers

Obtain a list of sponsored peer search results for a given query

```tl
contacts.sponsoredPeersEmpty#ea32b4b1 = contacts.SponsoredPeers;
contacts.sponsoredPeers#eb032884 peers:Vector<SponsoredPeer> chats:Vector<Chat> users:Vector<User> = contacts.SponsoredPeers;
---functions---
contacts.getSponsoredPeers#b6c8c393 q:string = contacts.SponsoredPeers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **q** | [string](/type/string.md) | The query |

### Result
[contacts.SponsoredPeers](/type/contacts.SponsoredPeers.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | SEARCH\_QUERY\_EMPTY | The search query is empty. |