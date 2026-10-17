# storyView

[Story](/api/stories.md) view date and reaction information

```tl
storyView#b0bdeac5 flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true user_id:long date:int reaction:flags.2?Reaction = StoryView;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **blocked** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether we have [completely blocked](/api/block.md) this user, including from viewing more of our stories. |
| **blocked\_my\_stories\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether we have [blocked](/api/block.md) this user from viewing more of our stories. |
| **user\_id** | [long](/type/long.md) | The user that viewed the story |
| **date** | [int](/type/int.md) | When did the user view the story |
| **reaction** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Reaction](/type/Reaction.md) | If present, contains the reaction that the user left on the story |

### Type
[StoryView](/type/StoryView.md)

### Related pages

#### [Blocked users](/api/block.md)
Working with the blocklist.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.