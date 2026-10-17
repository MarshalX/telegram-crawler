# messageActionChangeCreator

Service message: emitted to a supergroup when [ownership transfer completes after the old owner left the group »](/api/channel.md#leaving-groups-channels) (7 days after the old owner left without rejoining), indicating that ownership has been transferred to a new owner.

Sent from the user ID of the old owner.

```tl
messageActionChangeCreator#e188503b new_creator_id:long = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **new\_creator\_id** | [long](/type/long.md) | The ID of the user who became the new owner of the group/channel. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.