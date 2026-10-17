# messages.deleteMessages

Deletes messages by their identifiers.

```tl
messages.affectedMessages#84d19185 pts:int pts_count:int = messages.AffectedMessages;
---functions---
messages.deleteMessages#e58e95d2 flags:# revoke:flags.0?true id:Vector<int> = messages.AffectedMessages;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **revoke** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to delete messages for all participants of the chat |
| **id** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | Message ID list |

### Result
[messages.AffectedMessages](/type/messages.AffectedMessages.md)

### Both users and bots can use this method

### This method can be invoked over a [business connection &raquo;](/api/bots/connected-business-bots.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | BOT\_ACCESS\_FORBIDDEN | The specified method *can* be used over a [business connection](/api/bots/connected-business-bots.md) for some operations, but the specified query attempted an operation that is not allowed over a business connection. |
| 400 | BUSINESS\_CONNECTION\_INVALID | The `connection_id` passed to the wrapping [invokeWithBusinessConnection](/api/business.md) call is invalid. |
| 403 | MESSAGE\_DELETE\_FORBIDDEN | You can't delete one of the messages you tried to delete, most likely because it is a service message. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | SELF\_DELETE\_RESTRICTED | Business bots can't delete messages just for the user, `revoke` **must** be set. |

### Related pages

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.