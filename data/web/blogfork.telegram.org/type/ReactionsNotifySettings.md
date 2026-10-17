# ReactionsNotifySettings

Reaction notification settings, see [here »](/api/reactions.md#notifications-about-reactions) for more info.

```tl
reactionsNotifySettings#71e4ea58 flags:# messages_notify_from:flags.0?ReactionNotificationsFrom stories_notify_from:flags.1?ReactionNotificationsFrom poll_votes_notify_from:flags.2?ReactionNotificationsFrom sound:NotificationSound show_previews:Bool = ReactionsNotifySettings;

---functions---

account.getReactionsNotifySettings#6dd654c = ReactionsNotifySettings;
account.setReactionsNotifySettings#316ce548 settings:ReactionsNotifySettings = ReactionsNotifySettings;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [reactionsNotifySettings](/constructor/reactionsNotifySettings.md) | Reaction notification settings, see [here »](/api/reactions.md#notifications-about-reactions) for more info. |

### Methods

| Method | Description |
| --- | --- |
| [account.getReactionsNotifySettings](/method/account.getReactionsNotifySettings.md) | Get the current [reaction notification settings »](/api/reactions.md#notifications-about-reactions). |
| [account.setReactionsNotifySettings](/method/account.setReactionsNotifySettings.md) | Change the [reaction notification settings »](/api/reactions.md#notifications-about-reactions). |

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.