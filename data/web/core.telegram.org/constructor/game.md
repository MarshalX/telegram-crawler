# game

Indicates an already sent game

```tl
game#bdf9653b flags:# id:long access_hash:long short_name:string title:string description:string photo:Photo document:flags.0?Document = Game;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **id** | [long](/type/long.md) | ID of the game |
| **access\_hash** | [long](/type/long.md) | Access hash of the game |
| **short\_name** | [string](/type/string.md) | Short name for the game |
| **title** | [string](/type/string.md) | Title of the game |
| **description** | [string](/type/string.md) | Game description |
| **photo** | [Photo](/type/Photo.md) | Game preview |
| **document** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Document](/type/Document.md) | Optional attached document |

### Type
[Game](/type/Game.md)