# Premium.BoostsList

List of [boosts](/api/boost.md) that were applied to a peer by multiple users.

```tl
premium.boostsList#86f8613c flags:# count:int boosts:Vector<Boost> next_offset:flags.0?string users:Vector<User> = premium.BoostsList;

---functions---

premium.getBoostsList#60f67660 flags:# gifts:flags.0?true peer:InputPeer offset:string limit:int = premium.BoostsList;
premium.getUserBoosts#39854d1f peer:InputPeer user_id:InputUser = premium.BoostsList;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [premium.boostsList](/constructor/premium.boostsList.md) | List of [boosts](/api/boost.md) that were applied to a peer by multiple users. |

### Methods

| Method | Description |
| --- | --- |
| [premium.getBoostsList](/method/premium.getBoostsList.md) | Obtains info about the boosts that were applied to a certain channel or supergroup (admins only) |
| [premium.getUserBoosts](/method/premium.getUserBoosts.md) | Returns the lists of boost that were applied to a channel/supergroup by a specific user (admins only) |

### Related pages

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.