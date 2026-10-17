# Top peer rating

If [enabled](/method/contacts.toggleTopPeers.md), the rating of [top peers](/constructor/topPeer.md) indicates the relevance of a frequently used peer in a certain [category](/type/TopPeerCategory.md) (frequently messaged users, frequently used bots, inline bots, frequently visited channels and so on).

Schema: 

    topPeerCategoryBotsPM#ab661b5b = TopPeerCategory;
    topPeerCategoryBotsInline#148677e2 = TopPeerCategory;
    topPeerCategoryCorrespondents#637b7ed = TopPeerCategory;
    topPeerCategoryGroups#bd17a14a = TopPeerCategory;
    topPeerCategoryChannels#161d9628 = TopPeerCategory;
    topPeerCategoryPhoneCalls#1e76a78c = TopPeerCategory;
    topPeerCategoryForwardUsers#a8406ca9 = TopPeerCategory;
    topPeerCategoryForwardChats#fbeec0f0 = TopPeerCategory;
    topPeerCategoryBotsApp#fd9e7bec = TopPeerCategory;
    topPeerCategoryBotsGuestChat#6c24f3dd = TopPeerCategory;

    topPeer#edcdc05b peer:Peer rating:double = TopPeer;

    topPeerCategoryPeers#fb834291 category:TopPeerCategory count:int peers:Vector<TopPeer> = TopPeerCategoryPeers;

    contacts.topPeersNotModified#de266ef5 = contacts.TopPeers;
    contacts.topPeers#70b772a8 categories:Vector<TopPeerCategoryPeers> chats:Vector<Chat> users:Vector<User> = contacts.TopPeers;
    contacts.topPeersDisabled#b52c939d = contacts.TopPeers;

    ---functions---

    contacts.toggleTopPeers#8514bdda enabled:Bool = Bool;
    contacts.getTopPeers#973478b6 flags:# correspondents:flags.0?true bots_pm:flags.1?true bots_inline:flags.2?true phone_calls:flags.3?true forward_users:flags.4?true forward_chats:flags.5?true groups:flags.10?true channels:flags.15?true bots_app:flags.16?true bots_guestchat:flags.17?true offset:int limit:int hash:long = contacts.TopPeers;
    contacts.resetTopPeerRating#1ae373ac category:TopPeerCategory peer:InputPeer = Bool;

The rate delta is computed by taking the time delta between the last time the user used a certain peer and the last time the rating for that peer was received through [contacts.getTopPeers](/method/contacts.getTopPeers.md) and dividing it by the [exponential decay from config](/constructor/config.md).

Specifically, clients should:

1) On startup, invoke [contacts.getTopPeers](/method/contacts.getTopPeers.md) for all the required peer rate categories, fetching and storing the ratings for all top peers in a local database.  
2) Every time a user opens (for example) chat `123456789` the following operation must be done on the cached top peer info.  
  &nbsp;  
  `dateOpened` indicates when was the peer used.  
  `normalizeRate` is an arbitrary time in the recent past (when ratings are received from the server using [contacts.getTopPeers](/method/contacts.getTopPeers.md) and the schema described above, it is the time when they were received).  
  `config.rating_e_decay` is the [exponential decay from config](/constructor/config.md).  
  
  ```
  topPeer.rating += e^((dateOpened - normalizeRate) / config.rating_e_decay)
  ```
3) Every time the client needs to display a list of commonly used bots, users, mini apps, call destinations, etc (for example for the [global search tab](/api/search.md#global-search)), sort the peers by the `rating` for the specified category.  

Use [contacts.toggleTopPeers](/method/contacts.toggleTopPeers.md) to enable or disable top peer ratings.  
Use [contacts.resetTopPeerRating](/method/contacts.resetTopPeerRating.md) to reset the top peer rating of a certain peer, in a certain category.
