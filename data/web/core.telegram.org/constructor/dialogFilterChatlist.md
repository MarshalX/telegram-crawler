# dialogFilterChatlist

A folder imported using a [chat folder deep link »](/api/links.md#chat-folder-links).

```tl
dialogFilterChatlist#96537bd7 flags:# has_my_invites:flags.26?true title_noanimate:flags.28?true id:int title:TextWithEntities emoticon:flags.25?string color:flags.27?int pinned_peers:Vector<InputPeer> include_peers:Vector<InputPeer> = DialogFilter;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **has\_my\_invites** | [flags](/mtproto/TL-combinators.md#conditional-fields).26?[true](/constructor/true.md) | Whether the current user has created some [chat folder deep links »](/api/links.md#chat-folder-links) to share the folder as well. |
| **title\_noanimate** | [flags](/mtproto/TL-combinators.md#conditional-fields).28?[true](/constructor/true.md) | If set, any animated emojis present in `title` should not be animated and should be instead frozen on the first frame. |
| **id** | [int](/type/int.md) | ID of the folder |
| **title** | [TextWithEntities](/type/TextWithEntities.md) | Name of the folder (max 12 UTF-8 chars) |
| **emoticon** | [flags](/mtproto/TL-combinators.md#conditional-fields).25?[string](/type/string.md) | Emoji to use as icon for the folder. |
| **color** | [flags](/mtproto/TL-combinators.md#conditional-fields).27?[int](/type/int.md) | A color ID for the [folder tag associated to this folder, see here »](/api/folders.md#folder-tags) for more info. |
| **pinned\_peers** | [Vector](/type/Vector%20t)&lt;[InputPeer](/type/InputPeer.md)&gt; | Pinned chats, [folders](/api/folders.md) can have unlimited pinned chats |
| **include\_peers** | [Vector](/type/Vector%20t)&lt;[InputPeer](/type/InputPeer.md)&gt; | Chats to include in the folder |

### Type
[DialogFilter](/type/DialogFilter.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.