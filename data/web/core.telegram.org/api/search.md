# Search and filters


Telegram allows applying detailed message filters while looking for messages in chats.

### Search filters

    inputMessagesFilterEmpty#57e2f66c = MessagesFilter;
    inputMessagesFilterPhotos#9609a51c = MessagesFilter;
    inputMessagesFilterVideo#9fc00e65 = MessagesFilter;
    inputMessagesFilterPhotoVideo#56e9f0e4 = MessagesFilter;
    inputMessagesFilterDocument#9eddf188 = MessagesFilter;
    inputMessagesFilterUrl#7ef0dd87 = MessagesFilter;
    inputMessagesFilterGif#ffc86587 = MessagesFilter;
    inputMessagesFilterVoice#50f5c392 = MessagesFilter;
    inputMessagesFilterMusic#3751b49e = MessagesFilter;
    inputMessagesFilterChatPhotos#3a20ecb8 = MessagesFilter;
    inputMessagesFilterPhoneCalls#80c99768 flags:# missed:flags.0?true = MessagesFilter;
    inputMessagesFilterRoundVoice#7a7c17a4 = MessagesFilter;
    inputMessagesFilterRoundVideo#b549da53 = MessagesFilter;
    inputMessagesFilterMyMentions#c1f8e69a = MessagesFilter;
    inputMessagesFilterGeo#e7026d0d = MessagesFilter;
    inputMessagesFilterContacts#e062db83 = MessagesFilter;
    inputMessagesFilterPinned#1bb00451 = MessagesFilter;

    messages.messages#1d73e7ea messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
    messages.messagesSlice#5f206716 flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int search_flood:flags.3?SearchPostsFlood messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
    messages.channelMessages#c776ba4e flags:# inexact:flags.1?true pts:int count:int offset_id_offset:flags.2?int messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
    messages.messagesNotModified#74535f21 count:int = messages.Messages;

    ---functions---

    messages.search#29ee847a flags:# peer:InputPeer q:string from_id:flags.0?InputPeer saved_peer_id:flags.2?InputPeer saved_reaction:flags.3?Vector<Reaction> top_msg_id:flags.1?int filter:MessagesFilter min_date:int max_date:int offset_id:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;

    messages.searchGlobal#4bc6589a flags:# broadcasts_only:flags.1?true groups_only:flags.2?true users_only:flags.3?true folder_id:flags.0?int q:string filter:MessagesFilter min_date:int max_date:int offset_rate:int offset_peer:InputPeer offset_id:int limit:int = messages.Messages;

When using [messages.search](/method/messages.search.md) or [messages.searchGlobal](/method/messages.searchGlobal.md), a certain message filter may be applied.  
This allows the server to filter messages based on a text query, and even on their type, and this feature is often used by graphical clients to implement features like the chat gallery, chat profile pictures and more.
Available filters:

* [inputMessagesFilterPhotos](/constructor/inputMessagesFilterPhotos.md) - Returns only photos, used for implementing the chat photo gallery, and when scrolling left or right while viewing a photo
* [inputMessagesFilterVideo](/constructor/inputMessagesFilterVideo.md) - Returns only videos, used for implementing the chat video gallery, and when scrolling left or right while viewing a video
* [inputMessagesFilterPhotoVideo](/constructor/inputMessagesFilterPhotoVideo.md) - Return only videos and photos, used for implementing the chat media gallery
* [inputMessagesFilterDocument](/constructor/inputMessagesFilterDocument.md) - Return only videos and photos, used for implementing the chat document gallery
* [inputMessagesFilterUrl](/constructor/inputMessagesFilterUrl.md) - Return only messages with links, used for implementing the chat link gallery
* [inputMessagesFilterGif](/constructor/inputMessagesFilterGif.md) - Return only GIFs, used for implementing the chat GIF gallery
* [inputMessagesFilterVoice](/constructor/inputMessagesFilterVoice.md) - Return only voice messages, used for implementing the chat voice message gallery, and to consecutively play voice messages in a chat
* [inputMessagesFilterMusic](/constructor/inputMessagesFilterMusic.md) - Return only music files, used for implementing the chat music gallery
* [inputMessagesFilterChatPhotos](/constructor/inputMessagesFilterChatPhotos.md) - Return only chat photos, used to allow scrolling through the profile picture history of a group
* [inputMessagesFilterPhoneCalls](/constructor/inputMessagesFilterPhoneCalls.md) - Return only phone calls, used with [messages.searchGlobal](/method/messages.searchGlobal.md) to implement the call tab, with the phone call history
* [inputMessagesFilterRoundVoice](/constructor/inputMessagesFilterRoundVoice.md) - Return only round videos and voice messages, used to consecutively play round videos and voice messages in a chat
* [inputMessagesFilterRoundVideo](/constructor/inputMessagesFilterRoundVideo.md) - Return only round videos, used to consecutively play round videos in a chat
* [inputMessagesFilterMyMentions](/constructor/inputMessagesFilterMyMentions.md) - Return only messages mentioning me, can be used to display the [mention history](/api/mentions.md) or, combined with another filter or query, return only messages that satisfy a certain criteria, and contain a mention.
* [inputMessagesFilterGeo](/constructor/inputMessagesFilterGeo.md) - Return only geolocations, is used to fetch all recent valid [geolocations or live locations](/api/live-location.md) sent in a group, to display them all in a single map
* [inputMessagesFilterContacts](/constructor/inputMessagesFilterContacts.md) - Return only contacts
* [inputMessagesFilterPinned](/constructor/inputMessagesFilterPinned.md) - Returns only [pinned messages](/api/pin.md), used for implementing the pinned message list

The returned [messages.Messages](/type/messages.Messages.md) constructors contain parameters for [pagination](/api/offsets.md), the messages themselves and two `offset_id_offset`/`count` parameters that can be used to display a `progress/total` counter like `photo 134 of 200`.  
For example, when displaying the chat photo gallery, we could display a `photo ${offset_id_offset} of ${count}` indicator on top.

#### Search counters

    messages.searchCounter#e844ebff flags:# inexact:flags.1?true filter:MessagesFilter count:int = messages.SearchCounter;
    
    ---functions---
    
    messages.getSearchCounters#1bbcf300 flags:# peer:InputPeer saved_peer_id:flags.2?InputPeer top_msg_id:flags.0?int filters:Vector<MessagesFilter> = Vector<messages.SearchCounter>;

Chat counters with filters can also be returned without fetching the actual messages, as seen in the schema above.

### Global search

The global search view should be split into multiple tabs:

* [Chats tab](#chats-tab)
* [Channels tab](#channels-tab)
* [Apps tab](#apps-tab)
* [Media tab](#media-tab)
* [Downloads tab](#downloads-tab)
* [Links tab](#links-tab)
* [Files tab](#files-tab)
* [Music tab](#music-tab)
* [Voice messages tab](#voice-messages-tab)

#### Chats tab

    topPeerCategoryCorrespondents#637b7ed = TopPeerCategory;
    topPeerCategoryBotsPM#ab661b5b = TopPeerCategory;
    topPeerCategoryGroups#bd17a14a = TopPeerCategory;
    topPeerCategoryChannels#161d9628 = TopPeerCategory;

    contacts.topPeers#70b772a8 categories:Vector<TopPeerCategoryPeers> chats:Vector<Chat> users:Vector<User> = contacts.TopPeers;

    messages.messages#1d73e7ea messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
    messages.messagesSlice#5f206716 flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int search_flood:flags.3?SearchPostsFlood messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
    messages.channelMessages#c776ba4e flags:# inexact:flags.1?true pts:int count:int offset_id_offset:flags.2?int messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
    messages.messagesNotModified#74535f21 count:int = messages.Messages;

    ---functions---

    contacts.getTopPeers#973478b6 flags:# correspondents:flags.0?true bots_pm:flags.1?true bots_inline:flags.2?true phone_calls:flags.3?true forward_users:flags.4?true forward_chats:flags.5?true groups:flags.10?true channels:flags.15?true bots_app:flags.16?true bots_guestchat:flags.17?true offset:int limit:int hash:long = contacts.TopPeers;

    messages.searchGlobal#4bc6589a flags:# broadcasts_only:flags.1?true groups_only:flags.2?true users_only:flags.3?true folder_id:flags.0?int q:string filter:MessagesFilter min_date:int max_date:int offset_rate:int offset_peer:InputPeer offset_id:int limit:int = messages.Messages;

Contains results (peers and messages) from all private/secret chats, private/public groups, private/public channels, split in the following sections:

* `Frequent contacts`: Contains avatars and names of the most frequently used users, sorted [as specified here&nbsp;&raquo;](/api/top-rating.md) ([topPeerCategoryCorrespondents](/constructor/topPeerCategoryCorrespondents.md) category).  
* `Recent`: Contains avatars and names of the most frequently used peers (users+chats+channels), sorted [as specified here&nbsp;&raquo;](/api/top-rating.md) ([topPeerCategoryCorrespondents](/constructor/topPeerCategoryCorrespondents.md), [topPeerCategoryBotsPM](/constructor/topPeerCategoryBotsPM.md), [topPeerCategoryGroups](/constructor/topPeerCategoryGroups.md), [topPeerCategoryChannels](/constructor/topPeerCategoryChannels.md) categories).  

Searching when in the "Chats" tab should invoke [messages.searchGlobal](/method/messages.searchGlobal.md), replacing the previously mentioned sections with a list of peers (avatar+name) and messages (max one message per peer).  

#### Channels tab

    topPeerCategoryChannels#161d9628 = TopPeerCategory;

    contacts.topPeers#70b772a8 categories:Vector<TopPeerCategoryPeers> chats:Vector<Chat> users:Vector<User> = contacts.TopPeers;

    messages.chats#64ff9fd5 chats:Vector<Chat> = messages.Chats;

    messages.messages#1d73e7ea messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
    messages.messagesSlice#5f206716 flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int search_flood:flags.3?SearchPostsFlood messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
    messages.channelMessages#c776ba4e flags:# inexact:flags.1?true pts:int count:int offset_id_offset:flags.2?int messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
    messages.messagesNotModified#74535f21 count:int = messages.Messages;

    ---functions---
    
    contacts.getTopPeers#973478b6 flags:# correspondents:flags.0?true bots_pm:flags.1?true bots_inline:flags.2?true phone_calls:flags.3?true forward_users:flags.4?true forward_chats:flags.5?true groups:flags.10?true channels:flags.15?true bots_app:flags.16?true bots_guestchat:flags.17?true offset:int limit:int hash:long = contacts.TopPeers;

    channels.getChannelRecommendations#25a71742 flags:# channel:flags.0?InputChannel = messages.Chats;

    messages.searchGlobal#4bc6589a flags:# broadcasts_only:flags.1?true groups_only:flags.2?true users_only:flags.3?true folder_id:flags.0?int q:string filter:MessagesFilter min_date:int max_date:int offset_rate:int offset_peer:InputPeer offset_id:int limit:int = messages.Messages;

    bots.getPopularAppBots#c2510192 offset:string limit:int = bots.PopularAppBots;

Contains results from private/public channels only, split in the following sections:

* `Channels you joined`: Contains avatars and names of the most frequently used channels, sorted [as specified here&nbsp;&raquo;](/api/top-rating.md) ([topPeerCategoryChannels](/constructor/topPeerCategoryChannels.md) category).
* `Similar channels`: Contains avatars and names of recommended public channels, similar to the ones the current user has already joined, fetched using [channels.getChannelRecommendations](/method/channels.getChannelRecommendations.md) without setting the `channel` flag, see [here&nbsp;&raquo;](/api/recommend.md) for more info.  

Searching when in the "Channels" tab should invoke [messages.searchGlobal](/method/messages.searchGlobal.md) with the `broadcasts_only` flag set, replacing the previously mentioned sections with a list of peers (avatar+name+returned message, max one row per peer).  

#### Apps tab

    topPeerCategoryBotsApp#fd9e7bec = TopPeerCategory;

    contacts.topPeers#70b772a8 categories:Vector<TopPeerCategoryPeers> chats:Vector<Chat> users:Vector<User> = contacts.TopPeers;

    bots.popularAppBots#1991b13b flags:# next_offset:flags.0?string users:Vector<User> = bots.PopularAppBots;

    // Parse only the `users` field of the following constructors (ignoring messages.channelMessages)
    messages.messages#1d73e7ea messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
    messages.messagesSlice#5f206716 flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int search_flood:flags.3?SearchPostsFlood messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
    messages.messagesNotModified#74535f21 count:int = messages.Messages;
    messages.channelMessages#c776ba4e flags:# inexact:flags.1?true pts:int count:int offset_id_offset:flags.2?int messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;

    ---functions---

    contacts.getTopPeers#973478b6 flags:# correspondents:flags.0?true bots_pm:flags.1?true bots_inline:flags.2?true phone_calls:flags.3?true forward_users:flags.4?true forward_chats:flags.5?true groups:flags.10?true channels:flags.15?true bots_app:flags.16?true bots_guestchat:flags.17?true offset:int limit:int hash:long = contacts.TopPeers;

    bots.getPopularAppBots#c2510192 offset:string limit:int = bots.PopularAppBots;

    messages.searchGlobal#4bc6589a flags:# broadcasts_only:flags.1?true groups_only:flags.2?true users_only:flags.3?true folder_id:flags.0?int q:string filter:MessagesFilter min_date:int max_date:int offset_rate:int offset_peer:InputPeer offset_id:int limit:int = messages.Messages;

Used to implement the [Mini App Store](https://telegram.org/blog/w3-browser-mini-app-store#mini-app-store).  

Only contains bots with an associated [Main Mini App](/api/bots/webapps.md#main-mini-apps) (i.e. those with the [user](/constructor/user.md).`bot_has_main_app` flag set), split in the following sections:

* `Apps you use`: Contains avatars, names and MAU counters (from [user](/constructor/user.md).`bot_active_users`) for [Main Mini Apps](/api/bots/webapps.md#main-mini-apps) of bots most frequently used by the user, sorted [as specified here&nbsp;&raquo;](/api/top-rating.md) ([topPeerCategoryBotsApp](/constructor/topPeerCategoryBotsApp.md) category).  
* `Popular apps`: Contains avatars, names and MAU counters of the [Main Mini Apps](/api/bots/webapps.md#main-mini-apps) of the bots returned by [bots.getPopularAppBots](/method/bots.getPopularAppBots.md).  

Searching when in the "Apps" tab should invoke [messages.searchGlobal](/method/messages.searchGlobal.md), replacing the previously mentioned sections with a list of avatars, names and MAU counters (from [user](/constructor/user.md).`bot_active_users`) for [Main Mini Apps](/api/bots/webapps.md#main-mini-apps) of the returned bots (clients should only use the returned `users` field, filtering for bots with the [user](/constructor/user.md).`bot_has_main_app` flag set).  

#### Posts tab

    searchPostsFlood#3e0b5b6a flags:# query_is_free:flags.0?true total_daily:int remains:int wait_till:flags.1?int stars_amount:long = SearchPostsFlood;

    messages.messagesSlice#5f206716 flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int search_flood:flags.3?SearchPostsFlood messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;

    ---functions---
    
    channels.checkSearchPostsFlood#22567115 flags:# query:flags.0?string = SearchPostsFlood;

    channels.searchPosts#f2c4f24d flags:# hashtag:flags.0?string query:flags.1?string offset_rate:int offset_peer:InputPeer offset_id:int limit:int allow_paid_stars:flags.2?long = messages.Messages;

[channels.searchPosts](/method/channels.searchPosts.md), when invoked with the `query` flag set, searches for the specified query string globally in all public channels.  

Global post searches are paid: [Premium](/api/premium.md) users get a free amount of searches, after which each search costs a certain amount of stars.  
This means that searches should be manually initiated by the user by pressing a separate button after entering a query in the input field, as opposed to other searches, which are pretty much real-time (with some debounce) as the user enters the query in the input field. 

Before invoking the [channels.searchPosts](/method/channels.searchPosts.md) method, invoke [channels.checkSearchPostsFlood](/method/channels.checkSearchPostsFlood.md) to fetch the total ([searchPostsFlood](/constructor/searchPostsFlood.md).`total_daily`) and remaining ([searchPostsFlood](/constructor/searchPostsFlood.md).`remains`) number of daily free search slots, as well as the unixtime when more free search slots will be available to the user ([searchPostsFlood](/constructor/searchPostsFlood.md).`wait_till`).  

Additionally, the [searchPostsFlood](/constructor/searchPostsFlood.md).`query_is_free` flag will be set for some queries if the specified search is free and will **not** use up free search slots (i.e. it was cached by the server, or for some other server-side reason).  

[channels.searchPosts](/method/channels.searchPosts.md) will always return a [messages.messagesSlice](/constructor/messages.messagesSlice.md) with the `search_flood` flag possibly set (can be absent if it hasn't changed), containing the new value for [searchPostsFlood](/constructor/searchPostsFlood.md) (`query_is_free` is related to the current call only, not to the next paginated call, and all subsequent pagination calls will always be free).  

If the user has used all free search slots and the user decides to pay [searchPostsFlood](/constructor/searchPostsFlood.md).`stars_amount` stars for the search instead of waiting until [searchPostsFlood](/constructor/searchPostsFlood.md).`wait_till`, pass `stars_amount` to the `allow_paid_stars` parameter of [channels.searchPosts](/method/channels.searchPosts.md) to authorize payment of the specified amount of [Telegram Stars](/api/stars.md) to execute the search.  

#### Media tab

Searches for photo+video messages.  

Searching should invoke [messages.searchGlobal](/method/messages.searchGlobal.md) with the [inputMessagesFilterPhotoVideo](/constructor/inputMessagesFilterPhotoVideo.md) filter, rendering the results as specified in the [chats tab](#chats-tab).  

Initially, the tab should be populated with the results returned by passing an empty string in `q`.  

#### Downloads tab

Contains a locally generated list of recently downloaded media (of any kind) from all peers.  

Searching should locally search within this list.  

#### Links tab

Searches for messages with links.  

Searching should invoke [messages.searchGlobal](/method/messages.searchGlobal.md) with the [inputMessagesFilterUrl](/constructor/inputMessagesFilterUrl.md) filter, rendering the results as specified in the [chats tab](#chats-tab).  

Initially, the tab should be populated with the results returned by passing an empty string in `q`.  

#### Files tab

Searches for messages with files.  

Searching should invoke [messages.searchGlobal](/method/messages.searchGlobal.md) with the [inputMessagesFilterDocument](/constructor/inputMessagesFilterDocument.md) filter, rendering the results as specified in the [chats tab](#chats-tab).  

Initially, the tab should be populated with the results returned by passing an empty string in `q`.  

#### Music tab

Searches for music files.  

Searching should invoke [messages.searchGlobal](/method/messages.searchGlobal.md) with the [inputMessagesFilterMusic](/constructor/inputMessagesFilterMusic.md) filter, rendering the results as specified in the [chats tab](#chats-tab).  

Initially, the tab should be populated with the results returned by passing an empty string in `q`.  

Clients may additionally offer music search through the dedicated [inline bot](/api/bots/inline.md) whose username is specified by the [`music_search_username` &raquo;](/api/config.md#music-search-username) configuration parameter.  

#### Voice messages tab

Searches for voice messages.  

Searching should invoke [messages.searchGlobal](/method/messages.searchGlobal.md) with the [inputMessagesFilterVoice](/constructor/inputMessagesFilterVoice.md) filter, rendering the results as specified in the [chats tab](#chats-tab).  

Initially, the tab should be populated with the results returned by passing an empty string in `q`.  

### Hashtag search
    
    messageEntityHashtag#6f635b0d offset:int length:int = MessageEntity;

    ---functions---

    messages.search#29ee847a flags:# peer:InputPeer q:string from_id:flags.0?InputPeer saved_peer_id:flags.2?InputPeer saved_reaction:flags.3?Vector<Reaction> top_msg_id:flags.1?int filter:MessagesFilter min_date:int max_date:int offset_id:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;

Clicking on a [messageEntityHashtag](/constructor/messageEntityHashtag.md)/[messageEntityCashtag](/constructor/messageEntityCashtag.md) hashtag/cashtag [entity &raquo;](/api/entities.md) should bring up the search UI, triggering a call to [messages.search](/method/messages.search.md) within the current chat, passing the `#hashtag`/`$cashtag` to `q`, looking up all messages with the same hashtag/cashtag within the current chat.  

### Global hashtag search

    ---functions---

    channels.searchPosts#f2c4f24d flags:# hashtag:flags.0?string query:flags.1?string offset_rate:int offset_peer:InputPeer offset_id:int limit:int allow_paid_stars:flags.2?long = messages.Messages;

The special [channels.searchPosts](/method/channels.searchPosts.md) method may be used to globally search for posts from public channels (*including* those we aren't a member of) and stories from public users, channels and groups (*including* non-contacts and peers we've never seen before), containing a specific hashtag (which should be passed in the `hashtag` field without the `#`): in this case, the `query` flag must **not** be set (this flag is used for [global post searches, instead &raquo;](#posts-tab)).  

Also, see [here&nbsp;&raquo;](/api/stories.md#searching-stories) for more info on global search for *stories* (which should *not* be triggered when using the global search bar, but rather only when clicking on story hashtags and location tags).
