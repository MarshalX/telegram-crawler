# storyItem

Represents a [story](/api/stories.md).

```tl
storyItem#16a4b93c flags:# pinned:flags.5?true public:flags.7?true close_friends:flags.8?true min:flags.9?true noforwards:flags.10?true edited:flags.11?true contacts:flags.12?true selected_contacts:flags.13?true out:flags.16?true id:int date:int from_id:flags.18?Peer fwd_from:flags.17?StoryFwdHeader expire_date:int caption:flags.0?string entities:flags.1?Vector<MessageEntity> media:MessageMedia media_areas:flags.14?Vector<MediaArea> privacy:flags.2?Vector<PrivacyRule> views:flags.3?StoryViews sent_reaction:flags.15?Reaction albums:flags.19?Vector<int> music:flags.20?Document = StoryItem;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **pinned** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether this story is pinned on the user's profile |
| **public** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Whether this story is public and can be viewed by everyone |
| **close\_friends** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | Whether this story can only be viewed by [our close friends, see here »](/api/privacy.md) for more info |
| **min** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | Full information about this story was omitted for space and performance reasons; use [stories.getStoriesByID](/method/stories.getStoriesByID.md) to fetch full info about this story when and if needed. |
| **noforwards** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | Whether this story is [protected](https://telegram.org/blog/content-protection-delete-by-date-and-more) and thus cannot be forwarded; clients should also prevent users from saving attached media (i.e. videos should only be streamed, photos should be kept in RAM, et cetera). |
| **edited** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | Indicates whether the story was edited. |
| **contacts** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[true](/constructor/true.md) | Whether this story can only be viewed by our contacts |
| **selected\_contacts** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[true](/constructor/true.md) | Whether this story can only be viewed by a select list of our contacts |
| **out** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[true](/constructor/true.md) | indicates whether we sent this story. |
| **id** | [int](/type/int.md) | ID of the story. |
| **date** | [int](/type/int.md) | When was the story posted. |
| **from\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[Peer](/type/Peer.md) | Sender of the story. |
| **fwd\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[StoryFwdHeader](/type/StoryFwdHeader.md) | For [reposted stories »](/api/stories.md#reposting-stories), contains info about the original story. |
| **expire\_date** | [int](/type/int.md) | When does the story expire. |
| **caption** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Story caption. |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) |
| **media** | [MessageMedia](/type/MessageMedia.md) | Story media. |
| **media\_areas** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[Vector](/type/Vector%20t)&lt;[MediaArea](/type/MediaArea.md)&gt; | List of media areas, see [here »](/api/stories.md#media-areas) for more info on media areas. |
| **privacy** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Vector](/type/Vector%20t)&lt;[PrivacyRule](/type/PrivacyRule.md)&gt; | [Privacy rules](/api/privacy.md) indicating who can and can't view this story |
| **views** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[StoryViews](/type/StoryViews.md) | View date and reaction information |
| **sent\_reaction** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[Reaction](/type/Reaction.md) | The reaction we sent. |
| **albums** | [flags](/mtproto/TL-combinators.md#conditional-fields).19?[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | [Albums](/api/stories.md#story-albums) this story is part of. |
| **music** | [flags](/mtproto/TL-combinators.md#conditional-fields).20?[Document](/type/Document.md) | If set, the audio track played as background music for the story. |

### Type
[StoryItem](/type/StoryItem.md)

### Related pages

#### [Privacy settings](/api/privacy.md)
Telegram allows users to specify granular privacy settings, choosing which users can or can't interact with them in certain ways.

#### [stories.getStoriesByID](/method/stories.getStoriesByID.md)
Obtain full info about a set of [stories](/api/stories.md) by their IDs.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities