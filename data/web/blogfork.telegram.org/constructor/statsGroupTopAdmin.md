# statsGroupTopAdmin

Information about an active admin in a supergroup

```tl
statsGroupTopAdmin#d7584c87 user_id:long deleted:int kicked:int banned:int = StatsGroupTopAdmin;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [long](/type/long.md) | User ID |
| **deleted** | [int](/type/int.md) | Number of deleted messages for [statistics](/api/stats.md) period in consideration |
| **kicked** | [int](/type/int.md) | Number of kicked users for [statistics](/api/stats.md) period in consideration |
| **banned** | [int](/type/int.md) | Number of banned users for [statistics](/api/stats.md) period in consideration |

### Type
[StatsGroupTopAdmin](/type/StatsGroupTopAdmin.md)

### Related pages

#### [Channel statistics](/api/stats.md)
Telegram offers detailed channel statistics for channels and supergroups.