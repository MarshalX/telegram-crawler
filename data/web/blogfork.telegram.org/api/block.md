# Blocked users


Working with the blocklist.

Scheme:

    peerBlocked#e8fd8014 peer_id:Peer date:int = PeerBlocked;

    contacts.blocked#ade1591 blocked:Vector<PeerBlocked> chats:Vector<Chat> users:Vector<User> = contacts.Blocked;
    
    updatePeerBlocked#ebe07752 flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true peer_id:Peer = Update;

    ---functions---
    
    contacts.block#2e2e8734 flags:# my_stories_from:flags.0?true id:InputPeer = Bool;
    contacts.unblock#b550d328 flags:# my_stories_from:flags.0?true id:InputPeer = Bool;

    contacts.getBlocked#9a868f80 flags:# my_stories_from:flags.0?true offset:int limit:int = contacts.Blocked;
    contacts.setBlocked#94c65c76 flags:# my_stories_from:flags.0?true id:Vector<InputPeer> limit:int = Bool;
    

Use [contacts.block](/method/contacts.block.md) and [contacts.unblock](/method/contacts.unblock.md) to block and unblock peers.  

If the `my_stories_from` is set, peers will be added/removed only to/from the story blocklist; otherwise, they will be added/removed to/from the main blocklist.  

Peers in the story blocklist won't be able to view your [stories](/api/stories.md).  
Peers in the main blocklist won't be able to write messages to you, view your status, photo, and stories.  

Adding or removing a peer from a blocklist will emit an [updatePeerBlocked](/constructor/updatePeerBlocked.md) to all currently logged-in sessions (the peer we blocked/unblocked *won't* receive any update).  

Use [contacts.getBlocked](/method/contacts.getBlocked.md) to fetch the list of blocked peers; as usual, the `my_stories_from` flag can be used to fetch the story blocklist or the main blocklist, and the `offset`/`limit` parameters are used for [pagination&nbsp;&raquo;](/api/offsets.md).  

[contacts.setBlocked](/method/contacts.setBlocked.md) may also be used to completely replace the contents of an entire blocklist in bulk: just pass the blocklist type in `my_stories_from`, the full list of IDs to block in `id` and the length of the list passed to `id` in `limit`: the server will completely replace the specified blocklist.  
