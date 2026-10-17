# bots.setBotMenuButton

Sets the [menu button action »](/api/bots/menu.md) for a given user or for all users

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
bots.setBotMenuButton#4504d54f user_id:InputUser button:BotMenuButton = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [InputUser](/type/InputUser.md) | User ID |
| **button** | [BotMenuButton](/type/BotMenuButton.md) | Bot menu button action |

### Result
[Bool](/type/Bool.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BUTTON\_INVALID | The specified button is invalid. |
| 400 | BUTTON\_TEXT\_INVALID | The specified button text is invalid. |
| 400 | BUTTON\_URL\_INVALID | Button URL invalid. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |

### Related pages

#### [Bot menu button](/api/bots/menu.md)
Bots can choose the behavior of the menu button shown next to the text input field.