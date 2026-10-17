# messageActionSetMessagesTTL

The Time-To-Live of messages in this chat was changed.

```tl
messageActionSetMessagesTTL#3c134d7b flags:# period:int auto_setting_from:flags.0?long = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **period** | [int](/type/int.md) | New Time-To-Live of all messages sent in this chat; if 0, autodeletion was disabled. |
| **auto\_setting\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | If set, the chat TTL setting was set not due to a manual change by one of participants, but automatically because one of the participants has the [default TTL settings enabled »](/method/messages.setDefaultHistoryTTL.md). For example, when a user writes to us for the first time and we have set a default messages TTL of 1 week, this service message (with `auto_setting_from=our_userid`) will be emitted before our first message. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [messages.setDefaultHistoryTTL](/method/messages.setDefaultHistoryTTL.md)
Changes the default value of the Time-To-Live setting, applied to all new chats.