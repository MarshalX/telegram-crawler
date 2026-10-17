# inputPeerNotifySettings

Notification settings.

```tl
inputPeerNotifySettings#cacb6ae2 flags:# show_previews:flags.0?Bool silent:flags.1?Bool mute_until:flags.2?int sound:flags.3?NotificationSound stories_muted:flags.6?Bool stories_hide_sender:flags.7?Bool stories_sound:flags.8?NotificationSound = InputPeerNotifySettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **show\_previews** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Bool](/type/Bool.md) | If the text of the message shall be displayed in notification |
| **silent** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Bool](/type/Bool.md) | Peer was muted? |
| **mute\_until** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Date until which all notifications shall be switched off |
| **sound** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[NotificationSound](/type/NotificationSound.md) | Identifier of an audio file to play for notifications. |
| **stories\_muted** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[Bool](/type/Bool.md) | Whether story notifications should be disabled. |
| **stories\_hide\_sender** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[Bool](/type/Bool.md) | Whether the sender name should be displayed in story notifications. |
| **stories\_sound** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[NotificationSound](/type/NotificationSound.md) | Identifier of an audio file to play for story notifications. |

### Type
[InputPeerNotifySettings](/type/InputPeerNotifySettings.md)