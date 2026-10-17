# messageActionNoForwardsToggle

Emitted only in private chats when enabling or disabling [content protection »](/api/content-protection.md#for-users).

```tl
messageActionNoForwardsToggle#bf7d6572 prev_value:Bool new_value:Bool = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **prev\_value** | [Bool](/type/Bool.md) | Previous protection status (if true, the chat was protected). May be equal to `new_value` when replying to requests, see [here »](/api/content-protection.md#for-users) for more info on the full flow. |
| **new\_value** | [Bool](/type/Bool.md) | New protection status. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Content protection](/api/content-protection.md)
Users and bots who want to keep their messages private, as well as Group and Channel owners who want to keep their content members-only can enable content protection, which prevents screenshots, copying, disables message forwards and limits the ability to save media from posts.