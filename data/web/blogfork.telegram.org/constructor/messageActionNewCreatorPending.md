# messageActionNewCreatorPending

Service message: emitted to a supergroup when the [group/channel creator leaves the group »](/api/channel.md#leaving-groups-channels), indicating that ownership transfer is pending. The `new_creator_id` user will become the new owner after 7 days if the old owner does not rejoin.

Sent from the user ID of the old owner.

```tl
messageActionNewCreatorPending#b07ed085 new_creator_id:long = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **new\_creator\_id** | [long](/type/long.md) | The ID of the user who will become the new owner of the group/channel after 7 days if the old owner does not rejoin. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.