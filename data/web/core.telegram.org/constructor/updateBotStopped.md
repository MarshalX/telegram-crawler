# updateBotStopped

A bot was stopped or re-started.

```tl
updateBotStopped#c4870a49 user_id:long date:int stopped:Bool qts:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [long](/type/long.md) | The user ID |
| **date** | [int](/type/int.md) | When did this action occur |
| **stopped** | [Bool](/type/Bool.md) | Whether the bot was stopped or started |
| **qts** | [int](/type/int.md) | New **qts** value, see [updates »](/api/updates.md) for more info. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.