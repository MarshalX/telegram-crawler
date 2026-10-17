# updateChatDefaultBannedRights

Default banned rights in a [basic group](/api/channel.md#basic-groups) were updated

```tl
updateChatDefaultBannedRights#54c01850 peer:Peer default_banned_rights:ChatBannedRights version:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [Peer](/type/Peer.md) | The chat |
| **default\_banned\_rights** | [ChatBannedRights](/type/ChatBannedRights.md) | New default banned rights |
| **version** | [int](/type/int.md) | Used similarly to `pts` values to deduplicate/update outdated chat information as specified [here »](/api/peers.md#basic-group-updates). |

### Type
[Update](/type/Update.md)

### Related pages

#### [Peer database](/api/peers.md)
Many constructors in the API need to be stored in a local database upon reception and should only ever be updated reactively (passively) when received via updates or by other means (as specified in the documentation), to avoid overloading the server by continuously requesting changes for the same unchanged information.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.