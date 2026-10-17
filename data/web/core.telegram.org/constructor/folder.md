# folder

Folder

```tl
folder#ff544e65 flags:# autofill_new_broadcasts:flags.0?true autofill_public_groups:flags.1?true autofill_new_correspondents:flags.2?true id:int title:string photo:flags.3?ChatPhoto = Folder;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **autofill\_new\_broadcasts** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Automatically add new channels to this folder |
| **autofill\_public\_groups** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Automatically add joined new public supergroups to this folder |
| **autofill\_new\_correspondents** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Automatically add new private chats to this folder |
| **id** | [int](/type/int.md) | Folder ID |
| **title** | [string](/type/string.md) | Folder title |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[ChatPhoto](/type/ChatPhoto.md) | Folder picture |

### Type
[Folder](/type/Folder.md)