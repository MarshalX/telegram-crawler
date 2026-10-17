# reactionsNotifySettings

Reaction notification settings, see [here »](/api/reactions.md#notifications-about-reactions) for more info.

```tl
reactionsNotifySettings#71e4ea58 flags:# messages_notify_from:flags.0?ReactionNotificationsFrom stories_notify_from:flags.1?ReactionNotificationsFrom poll_votes_notify_from:flags.2?ReactionNotificationsFrom sound:NotificationSound show_previews:Bool = ReactionsNotifySettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **messages\_notify\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[ReactionNotificationsFrom](/type/ReactionNotificationsFrom.md) | Message reaction notification settings, if not set completely disables notifications/updates about message reactions. |
| **stories\_notify\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[ReactionNotificationsFrom](/type/ReactionNotificationsFrom.md) | Story reaction notification settings, if not set completely disables notifications/updates about reactions to stories. |
| **poll\_votes\_notify\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[ReactionNotificationsFrom](/type/ReactionNotificationsFrom.md) | [Non-anonymous poll vote »](/api/poll.md#unread-poll-votes) notification settings, if not set completely disables notifications/updates about votes cast in the user's non-anonymous polls. |
| **sound** | [NotificationSound](/type/NotificationSound.md) | [Notification sound for reactions »](/api/ringtones.md) |
| **show\_previews** | [Bool](/type/Bool.md) | If false, [push notifications »](/api/push-updates.md) about message/story reactions will only be of type `REACT_HIDDEN`/`REACT_STORY_HIDDEN`, without any information about the reacted-to story or the reaction itself. |

### Type
[ReactionsNotifySettings](/type/ReactionsNotifySettings.md)

### Related pages

#### [Polls and quizzes](/api/poll.md)
Telegram allows sending polls and quizzes, that can be voted on by thousands, if not millions of users in chats and channels.

#### [Notification sounds](/api/ringtones.md)
The API allows uploading and synchronizing notification sounds associated to a specific chat.

#### [Handling PUSH-notifications](/api/push-updates.md)
How to subscribe to and handle PUSH notifications

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.