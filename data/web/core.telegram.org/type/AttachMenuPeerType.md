# AttachMenuPeerType

Indicates a supported peer type for a [bot mini app attachment menu](/bots/webapps.md#launching-mini-apps-from-the-attachment-menu)

```tl
attachMenuPeerTypeSameBotPM#7d6be90e = AttachMenuPeerType;
attachMenuPeerTypeBotPM#c32bfa1a = AttachMenuPeerType;
attachMenuPeerTypePM#f146d31f = AttachMenuPeerType;
attachMenuPeerTypeChat#509113f = AttachMenuPeerType;
attachMenuPeerTypeBroadcast#7bfbdefc = AttachMenuPeerType;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [attachMenuPeerTypeSameBotPM](/constructor/attachMenuPeerTypeSameBotPM.md) | The bot attachment menu entry is available in the chat with the bot that offers it |
| [attachMenuPeerTypeBotPM](/constructor/attachMenuPeerTypeBotPM.md) | The bot attachment menu entry is available in private chats with other bots (excluding the bot that offers the current attachment menu) |
| [attachMenuPeerTypePM](/constructor/attachMenuPeerTypePM.md) | The bot attachment menu entry is available in private chats with other users (not bots) |
| [attachMenuPeerTypeChat](/constructor/attachMenuPeerTypeChat.md) | The bot attachment menu entry is available in [groups and supergroups](/api/channel.md) |
| [attachMenuPeerTypeBroadcast](/constructor/attachMenuPeerTypeBroadcast.md) | The bot attachment menu entry is available in channels |

### Related pages

#### [Telegram Mini Apps](/bots/webapps.md)