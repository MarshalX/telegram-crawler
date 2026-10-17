# stickers.suggestShortName

Suggests a short name for a given stickerpack name

```tl
stickers.suggestedShortName#85fea03f short_name:string = stickers.SuggestedShortName;
---functions---
stickers.suggestShortName#4dafc503 title:string = stickers.SuggestedShortName;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **title** | [string](/type/string.md) | Sticker pack name |

### Result
[stickers.SuggestedShortName](/type/stickers.SuggestedShortName.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | TITLE\_INVALID | The specified stickerpack title is invalid. |