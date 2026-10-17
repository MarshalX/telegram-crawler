# premium.getUserBoosts

Returns the lists of boost that were applied to a channel/supergroup by a specific user (admins only)

```tl
premium.boostsList#86f8613c flags:# count:int boosts:Vector<Boost> next_offset:flags.0?string users:Vector<User> = premium.BoostsList;
---functions---
premium.getUserBoosts#39854d1f peer:InputPeer user_id:InputUser = premium.BoostsList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The channel/supergroup |
| **user\_id** | [InputUser](/type/InputUser.md) | The user |

### Result
[premium.BoostsList](/type/premium.BoostsList.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |