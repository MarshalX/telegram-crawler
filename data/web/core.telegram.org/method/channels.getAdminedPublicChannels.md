# channels.getAdminedPublicChannels

Get [channels/supergroups/geogroups](/api/channel.md) we're admin in. Usually called when the user exceeds the [limit](/constructor/config.md) for owned public [channels/supergroups/geogroups](/api/channel.md), and the user is given the choice to remove one of his channels/supergroups/geogroups.

```tl
messages.chats#64ff9fd5 chats:Vector<Chat> = messages.Chats;
messages.chatsSlice#9cd81144 count:int chats:Vector<Chat> = messages.Chats;
---functions---
channels.getAdminedPublicChannels#f8b036af flags:# by_location:flags.0?true check_limit:flags.1?true for_personal:flags.2?true = messages.Chats;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **by\_location** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Get geogroups |
| **check\_limit** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set and the user has reached the limit of owned public [channels/supergroups/geogroups](/api/channel.md), instead of returning the channel list one of the specified [errors](#possible-errors) will be returned.\
Useful to check if a new public channel can indeed be created, even before asking the user to enter a channel username to use in [channels.checkUsername](/method/channels.checkUsername.md)/[channels.updateUsername](/method/channels.updateUsername.md). |
| **for\_personal** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Set this flag to only fetch the full list of channels that may be passed to [account.updatePersonalChannel](/method/account.updatePersonalChannel.md) to [display them on our profile page](/api/profile.md#personal-channel). |

### Result
[messages.Chats](/type/messages.Chats.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNELS\_ADMIN\_LOCATED\_TOO\_MUCH | The user has reached the limit of public geogroups. |
| 400 | CHANNELS\_ADMIN\_PUBLIC\_TOO\_MUCH | You're admin of too many public channels, make some channels private to change the username of this channel. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [channels.checkUsername](/method/channels.checkUsername.md)
Check if a username is free and can be assigned to a channel/supergroup

#### [channels.updateUsername](/method/channels.updateUsername.md)
Change or remove the username of a supergroup/channel

#### [account.updatePersonalChannel](/method/account.updatePersonalChannel.md)
Associate (or remove) a personal [channel »](/api/channel.md), that will be listed on our personal [profile page »](/api/profile.md#personal-channel).

Changing it will emit an [updateUser](/constructor/updateUser.md) update.

#### [User profiles](/api/profile.md)
Telegram offers many customization options for your profile!

#### [config](/constructor/config.md)
Current configuration