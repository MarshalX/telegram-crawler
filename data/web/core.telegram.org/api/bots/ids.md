# Bot API dialog IDs


The `id` field of [peers&nbsp;&raquo;](/api/peers.md) (i.e. users, chats, channels, secret chats) contains four distinct sequences of unique 64-bit IDs used to identify a specific user, chat, channel or secret chat.  

The ID sequences of users, chats, channels and secret chats **overlap**, so it is a good idea to transform the peer IDs to bot API dialog IDs as specified below.  

A bot API dialog ID is a single, unique 64-bit peer ID sequence derived from the user, chat, channel and secret chat ID sequences, maintaining uniqueness across all of them.  
Bot API dialog IDs are already used in the [bot API](/bots/api.md) and in the underlying [tdlib](https://github.com/tdlib/td) library to identify peers.  

As specified above, a bot API dialog ID may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But, thanks to the ranges of the underlying MTProto IDs (specified below), it has at most 52 significant bits, so a 64-bit integer or even a double-precision float type are safe for storing this identifier.  

More specifically, a bot API dialog ID ranges from `-4000000000000` to `1099511627775`.  

It's a good idea to transform peer IDs to bot dialog API IDs even if you do decide to use separate databases to [store info about peers](/api/peers.md), as it will make IDs more visually recognizable both for you and your users, as well as guarantee compatibility with the bot API, and allow your client to easily identify the type of a peer just by using its ID, thanks to the range checks specified below.

Example implementation: [tdlib (bot API)](https://github.com/tdlib/td/blob/c19deb1c9fb6d1ecd37db8f4d8148666bbdbb79d/td/telegram/DialogId.cpp), [MadelineProto](https://github.com/danog/tg-dialog-id).  

### User IDs

[User](/constructor/user.md) IDs in the MTProto API range from `1` to `0xffffffffff` (inclusive).  

MTProto user IDs are equal to bot API user dialog IDs and vice versa, you don't have to do anything to convert them, except validate that they fall within the range specified above.  

```
$botApiUserId = $userId;
$userId = $botApiUserId;
```

### Chat IDs

[Chat](/constructor/chat.md) IDs in the MTProto API range from `1` to `999999999999` (inclusive).  

To convert MTProto chat IDs to bot API chat dialog IDs, make them negative (and vice versa).  

Before conversion, always validate that they fall within the range specified above (and vice versa, the transformed range for bot API chat dialog IDs is `-999999999999` to `-1` inclusively).  

```
$botApiChatId = -$chatId;
$chatId = -$botApiChatId;
```

### Supergroup/channel IDs

[Supergroup/channel](/constructor/channel.md) IDs share the same sequence in the MTProto API, and they range from `1` to `997852516352` (inclusive).  

To convert MTProto channel IDs to bot API channel dialog IDs, add `1000000000000` and make them negative (and vice versa).  

Before conversion, always validate that they fall within the range specified above (and vice versa, the transformed range for bot API channel dialog IDs is `-1997852516352` to `-1000000000001` inclusively).  

```
$botApiChannelId = -(1000000000000 + $channelId);
$channelId = -$botApiChannelId - 1000000000000;
```

**Note**: the above range does **not** apply to [monoforums &raquo;](/api/monoforum.md), which are a special kind of forum used for direct channel messages, represented by [channel](/constructor/channel.md) constructors with the `monoforum` flag set: see [here &raquo;](#monoforum-ids) for the range used by monoforums.  

### Monoforum IDs

[Monoforums &raquo;](/api/monoforum.md) are a special kind of forum used for direct channel messages, represented by [channel](/constructor/channel.md) constructors with the `monoforum` flag set.  

The MTProto IDs of monoforums range from `1002147483649` to `3000000000000`.  

To convert MTProto monoforum IDs to bot API monoforum IDs, add `1000000000000` and make them negative (and vice versa): this procedure is the same used for [supergroup/channel IDs](#supergroup-channel-ids), the only change is the source MTProto range.  

Before conversion, always validate that they fall within the range specified above (and vice versa, the transformed range for bot API monoforum dialog IDs is `-2002147483649` to `-4000000000000` inclusively).  

```
$botApiMonoForumId = -(1000000000000 + $monoForumId);
$monoForumId = -$botApiMonoForumId - 1000000000000;
```

### Secret chat IDs

[Secret chat IDs](/api/end-to-end.md) in the MTProto API range from `-2147483648` to `2147483647` (inclusive, treat the secret chat ID as a signed little-endian 32-bit integer).  

To convert MTProto chat IDs to bot API chat secret chat IDs, subtract `2000000000000`.  

Before conversion, always validate that they fall within the range specified above (and vice versa, the transformed range for bot API secret chat dialog IDs is `-2002147483648` to `-1997852516353` inclusively).  

```
$botApiSecretChatId = $secretChatId - 2000000000000;
$secretChatId = $botApiSecretChatId + 2000000000000;
```

Note: while the official instance of the bot API does not support secret chats, the underlying [tdlib](https://github.com/tdlib/td/) library does support them, and uses the format mentioned above for secret chat IDs.
