# suggestedPost

Contains info about a [suggested post »](/api/suggested-posts.md).

```tl
suggestedPost#e8e37e5 flags:# accepted:flags.1?true rejected:flags.2?true price:flags.3?StarsAmount schedule_date:flags.0?int = SuggestedPost;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **accepted** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the suggested post was accepted. |
| **rejected** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether the suggested post was rejected. |
| **price** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[StarsAmount](/type/StarsAmount.md) | Price of the suggested post. |
| **schedule\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Scheduling date. |

### Type
[SuggestedPost](/type/SuggestedPost.md)

### Related pages

#### [Suggested posts](/api/suggested-posts.md)
Telegram offers a powerful monetization feature to channel administrators: suggested posts.