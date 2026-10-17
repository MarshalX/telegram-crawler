# messageActionNoForwardsRequest

Emitted only in private chats if the other side requested to disable [content protection »](/api/content-protection.md#for-users).

```tl
messageActionNoForwardsRequest#3e2793ba flags:# expired:flags.0?true prev_value:Bool new_value:Bool = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **expired** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, this request was accepted or rejected by the other user and thus cannot be used anymore. |
| **prev\_value** | [Bool](/type/Bool.md) | Previous protection status. |
| **new\_value** | [Bool](/type/Bool.md) | New requested protection status. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Content protection](/api/content-protection.md)
Users and bots who want to keep their messages private, as well as Group and Channel owners who want to keep their content members-only can enable content protection, which prevents screenshots, copying, disables message forwards and limits the ability to save media from posts.