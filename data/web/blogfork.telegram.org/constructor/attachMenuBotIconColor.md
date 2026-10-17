# attachMenuBotIconColor

Represents an attachment menu icon color for [bot mini apps »](/api/bots/attach.md)

```tl
attachMenuBotIconColor#4576f3f0 name:string color:int = AttachMenuBotIconColor;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **name** | [string](/type/string.md) | One of the following values: \
`light_icon` - Color of the attachment menu icon (light mode) \
`light_text` - Color of the attachment menu label, once selected (light mode) \
`dark_icon` - Color of the attachment menu icon (dark mode) \
`dark_text` - Color of the attachment menu label, once selected (dark mode) |
| **color** | [int](/type/int.md) | Color in RGB24 format |

### Type
[AttachMenuBotIconColor](/type/AttachMenuBotIconColor.md)

### Related pages

#### [Bot attachment menu and side menu entries](/api/bots/attach.md)
Bots can install attachment menu and side menu entries, offering conveniently accessible, versatile web apps.