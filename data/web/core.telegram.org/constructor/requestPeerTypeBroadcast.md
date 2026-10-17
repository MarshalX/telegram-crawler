# requestPeerTypeBroadcast

Choose a channel

```tl
requestPeerTypeBroadcast#339bef6c flags:# creator:flags.0?true has_username:flags.3?Bool user_admin_rights:flags.1?ChatAdminRights bot_admin_rights:flags.2?ChatAdminRights = RequestPeerType;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **creator** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to allow only choosing channels that were created by the current user. |
| **has\_username** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Bool](/type/Bool.md) | If specified, allows only choosing channels with or without a username, according to the value of [Bool](/type/Bool.md). |
| **user\_admin\_rights** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[ChatAdminRights](/type/ChatAdminRights.md) | If specified, allows only choosing channels where the current user is an admin with at least the specified admin rights. |
| **bot\_admin\_rights** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[ChatAdminRights](/type/ChatAdminRights.md) | If specified, allows only choosing channels where the bot is an admin with at least the specified admin rights. |

### Type
[RequestPeerType](/type/RequestPeerType.md)

### Related pages

#### [Bool](/type/Bool.md)
Boolean type.