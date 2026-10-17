# account.getReactionsNotifySettings

Get the current [reaction notification settings »](/api/reactions.md#notifications-about-reactions).

```tl
reactionsNotifySettings#71e4ea58 flags:# messages_notify_from:flags.0?ReactionNotificationsFrom stories_notify_from:flags.1?ReactionNotificationsFrom poll_votes_notify_from:flags.2?ReactionNotificationsFrom sound:NotificationSound show_previews:Bool = ReactionsNotifySettings;
---functions---
account.getReactionsNotifySettings#6dd654c = ReactionsNotifySettings;
```

### Parameters

This constructor does not require any parameters.

### Result
[ReactionsNotifySettings](/type/ReactionsNotifySettings.md)

### Only users can use this method

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.