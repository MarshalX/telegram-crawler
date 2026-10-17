# botMenuButton

[Bot menu button](/api/bots/menu.md) that opens a [web app](/api/bots/webapps.md) when clicked.

```tl
botMenuButton#c7b57ce6 text:string url:string = BotMenuButton;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **text** | [string](/type/string.md) | Title to be displayed on the menu button instead of 'Menu' |
| **url** | [string](/type/string.md) | URL of a [web app](/api/bots/webapps.md) to open when the user clicks on the button |

### Type
[BotMenuButton](/type/BotMenuButton.md)

### Related pages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [Bot menu button](/api/bots/menu.md)
Bots can choose the behavior of the menu button shown next to the text input field.