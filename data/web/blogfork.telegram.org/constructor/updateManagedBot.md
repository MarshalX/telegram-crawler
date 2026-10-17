# updateManagedBot

[Manager bots](/api/bots/managed-bots.md) only: a bot managed by the currently logged in bot was created or updated.

```tl
updateManagedBot#4880ed9a user_id:long bot_id:long qts:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [long](/type/long.md) | The ID of the user that owns of the newly created or edited managed bot. |
| **bot\_id** | [long](/type/long.md) | The ID of the managed bot. |
| **qts** | [int](/type/int.md) | New **qts** value, see [updates »](/api/updates.md) for more info. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Managed bots](/api/bots/managed-bots.md)
Users can create **managed** bots (which are controlled by a specific manager bot) directly through the MTProto API, without interacting with [@BotFather](https://t.me/botfather).