# attachMenuBotIcon

Represents an attachment menu icon for [bot mini apps »](/api/bots/attach.md)

```tl
attachMenuBotIcon#b2a7386b flags:# name:string icon:Document colors:flags.0?Vector<AttachMenuBotIconColor> = AttachMenuBotIcon;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **name** | [string](/type/string.md) | One of the following values: note that animated icons must be played when the user clicks on the button, activating the bot mini app. \
\
`default_static` - Default attachment menu icon in SVG format \
`placeholder_static` - Default placeholder for opened Web Apps in SVG format \
`ios_static` - Attachment menu icon in SVG format for the official iOS app \
`ios_animated` - Animated attachment menu icon in TGS format for the official iOS app \
`android_animated` - Animated attachment menu icon in TGS format for the official Android app \
`macos_animated` - Animated attachment menu icon in TGS format for the official native Mac OS app \
`ios_side_menu_static` - Side menu icon in PNG format for the official iOS app \
`android_side_menu_static` - Side menu icon in SVG format for the official android app \
`macos_side_menu_static` - Side menu icon in PNG format for the official native Mac OS app |
| **icon** | [Document](/type/Document.md) | The actual icon file. |
| **colors** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[AttachMenuBotIconColor](/type/AttachMenuBotIconColor.md)&gt; | Attachment menu icon colors. |

### Type
[AttachMenuBotIcon](/type/AttachMenuBotIcon.md)

### Related pages

#### [Bot attachment menu and side menu entries](/api/bots/attach.md)
Bots can install attachment menu and side menu entries, offering conveniently accessible, versatile web apps.