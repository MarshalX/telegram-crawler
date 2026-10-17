# dialogFilter

Dialog filter AKA [folder](/api/folders.md)

```tl
dialogFilter#aa472651 flags:# contacts:flags.0?true non_contacts:flags.1?true groups:flags.2?true broadcasts:flags.3?true bots:flags.4?true exclude_muted:flags.11?true exclude_read:flags.12?true exclude_archived:flags.13?true title_noanimate:flags.28?true id:int title:TextWithEntities emoticon:flags.25?string color:flags.27?int pinned_peers:Vector<InputPeer> include_peers:Vector<InputPeer> exclude_peers:Vector<InputPeer> = DialogFilter;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **contacts** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to include all contacts in this [folder](/api/folders.md) |
| **non\_contacts** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether to include all non-contacts in this [folder](/api/folders.md) |
| **groups** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether to include all groups in this [folder](/api/folders.md) |
| **broadcasts** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether to include all channels in this [folder](/api/folders.md) |
| **bots** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether to include all bots in this [folder](/api/folders.md) |
| **exclude\_muted** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | Whether to exclude muted chats from this [folder](/api/folders.md) |
| **exclude\_read** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[true](/constructor/true.md) | Whether to exclude read chats from this [folder](/api/folders.md) |
| **exclude\_archived** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[true](/constructor/true.md) | Whether to exclude archived chats from this [folder](/api/folders.md) |
| **title\_noanimate** | [flags](/mtproto/TL-combinators.md#conditional-fields).28?[true](/constructor/true.md) | If set, any animated emojis present in `title` should not be animated and should be instead frozen on the first frame. |
| **id** | [int](/type/int.md) | [Folder](/api/folders.md) ID |
| **title** | [TextWithEntities](/type/TextWithEntities.md) | [Folder](/api/folders.md) name (max 12 UTF-8 chars) |
| **emoticon** | [flags](/mtproto/TL-combinators.md#conditional-fields).25?[string](/type/string.md) | Emoji to use as icon for the folder. |
| **color** | [flags](/mtproto/TL-combinators.md#conditional-fields).27?[int](/type/int.md) | A color ID for the [folder tag associated to this folder, see here »](/api/folders.md#folder-tags) for more info. |
| **pinned\_peers** | [Vector](/type/Vector%20t)&lt;[InputPeer](/type/InputPeer.md)&gt; | Pinned chats, [folders](/api/folders.md) can have unlimited pinned chats |
| **include\_peers** | [Vector](/type/Vector%20t)&lt;[InputPeer](/type/InputPeer.md)&gt; | Include the following chats in this [folder](/api/folders.md) |
| **exclude\_peers** | [Vector](/type/Vector%20t)&lt;[InputPeer](/type/InputPeer.md)&gt; | Exclude the following chats from this [folder](/api/folders.md) |

### Type
[DialogFilter](/type/DialogFilter.md)

### Related pages

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.