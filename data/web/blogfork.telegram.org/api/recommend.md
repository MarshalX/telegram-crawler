# Similar channels and bots


The API offers a method to obtain a list of similarly themed public channels and bots, selected based on similarities in their **subscriber bases**.  

### Similar channels

Scheme:

    messages.chats#64ff9fd5 chats:Vector<Chat> = messages.Chats;
    messages.chatsSlice#9cd81144 count:int chats:Vector<Chat> = messages.Chats;

    ---functions---

    channels.getChannelRecommendations#25a71742 flags:# channel:flags.0?InputChannel = messages.Chats;

Clients should invoke [channels.getChannelRecommendations](/method/channels.getChannelRecommendations.md) after joining a [channel](/api/channel.md) (passing the channel's peer in `channel`), automatically displaying a popup with a list of similarly themed channels.  

The same method should also be invoked when opening a special "Similar channels" tab in the channel's profile (similar to the Media/Links/Gifs/etc tabs).  

The method should also be called *without* setting the `channel` flag in the "Similar channels" section of the "Channels" tab of global search, to return a *global* list of recommended channels, similar to the ones the current user has already joined, see [here&nbsp;&raquo;](/api/search.md#global-search) for more info.  

The maximum number of similar channels that can be recommended by [channels.getChannelRecommendations&raquo;](/method/channels.getChannelRecommendations.md) to [Premium](/api/premium.md)/non-[Premium](/api/premium.md) users is contained in the [recommended_channels_limit_premium](/api/config.md#recommended-channels-limit-premium)/[recommended_channels_limit_default](/api/config.md#recommended-channels-limit-default) app configuration keys.

Non-[Premium](/api/premium.md) users may get a reduced result set in the form of a [messages.chatsSlice](/constructor/messages.chatsSlice.md) where `count` > the number of results in `chats`: upgrading to a [Premium](/api/premium.md) account will return the full result set as a [messages.chatsSlice](/constructor/messages.chatsSlice.md).  

### Similar bots

    users.users#62d706b8 users:Vector<User> = users.Users;
    users.usersSlice#315a4974 count:int users:Vector<User> = users.Users;

    ---functions---

    bots.getBotRecommendations#a1b70815 bot:InputUser = users.Users;

The same method should also be invoked when opening a special "Similar bots" tab in the bot's profile (similar to the Media/Links/Gifs/etc tabs).  

Non-[Premium](/api/premium.md) users may get a reduced result set in the form of a [users.usersSlice](/constructor/users.usersSlice.md) where `count` > the number of results in `users`: upgrading to a [Premium](/api/premium.md) account will return the full result set as a [users.users](/constructor/users.users.md).  