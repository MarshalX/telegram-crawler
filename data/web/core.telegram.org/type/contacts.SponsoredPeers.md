# contacts.SponsoredPeers

A list of sponsored peers.

```tl
contacts.sponsoredPeersEmpty#ea32b4b1 = contacts.SponsoredPeers;
contacts.sponsoredPeers#eb032884 peers:Vector<SponsoredPeer> chats:Vector<Chat> users:Vector<User> = contacts.SponsoredPeers;

---functions---

contacts.getSponsoredPeers#b6c8c393 q:string = contacts.SponsoredPeers;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [contacts.sponsoredPeersEmpty](/constructor/contacts.sponsoredPeersEmpty.md) | There are no sponsored peers for this query. |
| [contacts.sponsoredPeers](/constructor/contacts.sponsoredPeers.md) | Sponsored peers. |

### Methods

| Method | Description |
| --- | --- |
| [contacts.getSponsoredPeers](/method/contacts.getSponsoredPeers.md) | Obtain a list of sponsored peer search results for a given query |