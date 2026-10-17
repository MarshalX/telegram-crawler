# attachMenuBot

Represents a [bot mini app that can be launched from the attachment/side menu »](/api/bots/attach.md)

At least one of the `show_in_attach_menu` or the `show_in_side_menu` flags will always be set.

```tl
attachMenuBot#d90d8dfe flags:# inactive:flags.0?true has_settings:flags.1?true request_write_access:flags.2?true show_in_attach_menu:flags.3?true show_in_side_menu:flags.4?true side_menu_disclaimer_needed:flags.5?true bot_id:long short_name:string peer_types:flags.3?Vector<AttachMenuPeerType> icons:Vector<AttachMenuBotIcon> = AttachMenuBot;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **inactive** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, before launching the mini app the client should ask the user to add the mini app to the attachment/side menu, and only if the user accepts, after invoking [messages.toggleBotInAttachMenu](/method/messages.toggleBotInAttachMenu.md) the app should be opened. |
| **has\_settings** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Deprecated flag, can be ignored. |
| **request\_write\_access** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether the bot would like to send messages to the user. |
| **show\_in\_attach\_menu** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether, when installed, an attachment menu entry should be shown for the Mini App. |
| **show\_in\_side\_menu** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether, when installed, an entry in the main view side menu should be shown for the Mini App. |
| **side\_menu\_disclaimer\_needed** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | If `inactive` if set and the user hasn't previously accepted the third-party mini apps [Terms of Service](https://telegram.org/tos/mini-apps) for this bot, when showing the mini app installation prompt, an additional mandatory checkbox to accept the [mini apps TOS](https://telegram.org/tos/mini-apps) and a disclaimer indicating that this Mini App is not affiliated to Telegram should be shown. |
| **bot\_id** | [long](/type/long.md) | Bot ID |
| **short\_name** | [string](/type/string.md) | Attachment menu item name |
| **peer\_types** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[AttachMenuPeerType](/type/AttachMenuPeerType.md)&gt; | List of dialog types where this attachment menu entry should be shown |
| **icons** | [Vector](/type/Vector%20t)&lt;[AttachMenuBotIcon](/type/AttachMenuBotIcon.md)&gt; | List of platform-specific static icons and animations to use for the attachment menu button |

### Type
[AttachMenuBot](/type/AttachMenuBot.md)

### Related pages

#### [messages.toggleBotInAttachMenu](/method/messages.toggleBotInAttachMenu.md)
Enable or disable [web bot attachment menu »](/api/bots/attach.md)

#### [Bot attachment menu and side menu entries](/api/bots/attach.md)
Bots can install attachment menu and side menu entries, offering conveniently accessible, versatile web apps.