# messages.toggleBotInAttachMenu

Enable or disable [web bot attachment menu »](/api/bots/attach.md)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.toggleBotInAttachMenu#69f59d69 flags:# write_allowed:flags.0?true bot:InputUser enabled:Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **write\_allowed** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the user authorizes the bot to write messages to them, if requested by [attachMenuBot](/constructor/attachMenuBot.md).`request_write_access` |
| **bot** | [InputUser](/type/InputUser.md) | Bot ID |
| **enabled** | [Bool](/type/Bool.md) | Toggle |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |

### Related pages

#### [attachMenuBot](/constructor/attachMenuBot.md)
Represents a [bot mini app that can be launched from the attachment/side menu »](/api/bots/attach.md)

At least one of the `show_in_attach_menu` or the `show_in_side_menu` flags will always be set.

#### [Bot attachment menu and side menu entries](/api/bots/attach.md)
Bots can install attachment menu and side menu entries, offering conveniently accessible, versatile web apps.