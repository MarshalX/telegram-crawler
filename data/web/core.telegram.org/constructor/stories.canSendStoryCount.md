# stories.canSendStoryCount

Contains the number of available active story slots (equal to the value of the [`story_expiring_limit_*` client configuration parameter](/api/config.md#story-expiring-limit-default) minus the number of currently active stories).

```tl
stories.canSendStoryCount#c387c04e count_remains:int = stories.CanSendStoryCount;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **count\_remains** | [int](/type/int.md) | Remaining active story slots. |

### Type
[stories.CanSendStoryCount](/type/stories.CanSendStoryCount.md)

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.