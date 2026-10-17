# stories.canSendStory

Check whether we can post stories as the specified peer.

```tl
stories.canSendStoryCount#c387c04e count_remains:int = stories.CanSendStoryCount;
---functions---
stories.canSendStory#30eb63f0 peer:InputPeer = stories.CanSendStoryCount;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer from which we wish to post stories. |

### Result
[stories.CanSendStoryCount](/type/stories.CanSendStoryCount.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOOSTS\_REQUIRED | The specified channel must first be [boosted by its users](/api/boost.md) in order to perform this action. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |
| 400 | STORIES\_TOO\_MUCH | You have hit the maximum active stories limit as specified by the [`story_expiring_limit_*` client configuration parameters](/api/config.md#story-expiring-limit-default): you should buy a [Premium](/api/premium.md) subscription, delete an active story, or wait for the oldest story to expire. |
| 400 | STORY\_SEND\_FLOOD\_MONTHLY\_%d | You've hit the monthly story limit as specified by the [`stories_sent_monthly_limit_*` client configuration parameters](/api/config.md#stories-sent-monthly-limit-default): wait %d seconds before posting a new story. |
| 400 | STORY\_SEND\_FLOOD\_WEEKLY\_%d | You've hit the weekly story limit as specified by the [`stories_sent_weekly_limit_*` client configuration parameters](/api/config.md#stories-sent-weekly-limit-default): wait for %d seconds before posting a new story. |

### Related pages

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.