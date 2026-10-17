# peerNotifySettings

Notification settings.

```tl
peerNotifySettings#99622c0c flags:# show_previews:flags.0?Bool silent:flags.1?Bool mute_until:flags.2?int ios_sound:flags.3?NotificationSound android_sound:flags.4?NotificationSound other_sound:flags.5?NotificationSound stories_muted:flags.6?Bool stories_hide_sender:flags.7?Bool stories_ios_sound:flags.8?NotificationSound stories_android_sound:flags.9?NotificationSound stories_other_sound:flags.10?NotificationSound = PeerNotifySettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **show\_previews** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Bool](/type/Bool.md) | (Ternary value) If set, indicates whether or not to display previews of messages in notifications; otherwise the default behavior should be used. |
| **silent** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Bool](/type/Bool.md) | (Ternary value) If set, indicates whether to mute or unmute the peer; otherwise the default behavior should be used. |
| **mute\_until** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Mute all notifications until this date |
| **ios\_sound** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[NotificationSound](/type/NotificationSound.md) | Notification sound for the official iOS application |
| **android\_sound** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[NotificationSound](/type/NotificationSound.md) | Notification sound for the official android application |
| **other\_sound** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[NotificationSound](/type/NotificationSound.md) | Notification sound for other applications |
| **stories\_muted** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[Bool](/type/Bool.md) | Whether story notifications should be disabled. |
| **stories\_hide\_sender** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[Bool](/type/Bool.md) | Whether the sender name should be displayed in story notifications. |
| **stories\_ios\_sound** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[NotificationSound](/type/NotificationSound.md) | Sound for story notifications on the official iOS application |
| **stories\_android\_sound** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[NotificationSound](/type/NotificationSound.md) | Sound for story notifications on the official Android application |
| **stories\_other\_sound** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[NotificationSound](/type/NotificationSound.md) | Sound for story notifications on other applications |

### Type
[PeerNotifySettings](/type/PeerNotifySettings.md)

### Event flags (events_mask)

|     |     |
| --- | --- |
| `0x00000001` | Profile photo update notification |