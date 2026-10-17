# stories.CanSendStoryCount

Contains the number of available active story slots (equal to the value of the [`story_expiring_limit_*` client configuration parameter](/api/config.md#story-expiring-limit-default) minus the number of currently active stories).

```tl
stories.canSendStoryCount#c387c04e count_remains:int = stories.CanSendStoryCount;

---functions---

stories.canSendStory#30eb63f0 peer:InputPeer = stories.CanSendStoryCount;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [stories.canSendStoryCount](/constructor/stories.canSendStoryCount.md) | Contains the number of available active story slots (equal to the value of the [`story_expiring_limit_*` client configuration parameter](/api/config.md#story-expiring-limit-default) minus the number of currently active stories). |

### Methods

| Method | Description |
| --- | --- |
| [stories.canSendStory](/method/stories.canSendStory.md) | Check whether we can post stories as the specified peer. |

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.