# RequestPeerType

Filtering criteria to use for the peer selection list shown to the user.

```tl
requestPeerTypeUser#5f3b8a00 flags:# bot:flags.0?Bool premium:flags.1?Bool = RequestPeerType;
requestPeerTypeChat#c9f06e1b flags:# creator:flags.0?true bot_participant:flags.5?true has_username:flags.3?Bool forum:flags.4?Bool user_admin_rights:flags.1?ChatAdminRights bot_admin_rights:flags.2?ChatAdminRights = RequestPeerType;
requestPeerTypeBroadcast#339bef6c flags:# creator:flags.0?true has_username:flags.3?Bool user_admin_rights:flags.1?ChatAdminRights bot_admin_rights:flags.2?ChatAdminRights = RequestPeerType;
requestPeerTypeCreateBot#3e81e078 flags:# bot_managed:flags.0?true suggested_name:flags.1?string suggested_username:flags.2?string = RequestPeerType;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [requestPeerTypeUser](/constructor/requestPeerTypeUser.md) | Choose a user. |
| [requestPeerTypeChat](/constructor/requestPeerTypeChat.md) | Choose a chat or supergroup |
| [requestPeerTypeBroadcast](/constructor/requestPeerTypeBroadcast.md) | Choose a channel |
| [requestPeerTypeCreateBot](/constructor/requestPeerTypeCreateBot.md) | Used in a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) by a [manager bot](/api/bots/managed-bots.md) to ask a user to create a new [managed bot »](/api/bots/managed-bots.md), see [here »](/api/bots/buttons.md#requesting-a-managed-bot) for more info. |