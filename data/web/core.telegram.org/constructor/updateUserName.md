# updateUserName

Changes the user's first name, last name and username.

```tl
updateUserName#a7848924 user_id:long first_name:string last_name:string usernames:Vector<Username> = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [long](/type/long.md) | User identifier |
| **first\_name** | [string](/type/string.md) | New first name. Corresponds to the new value of **real\_first\_name** field of the [userFull](/constructor/userFull.md) constructor. |
| **last\_name** | [string](/type/string.md) | New last name. Corresponds to the new value of **real\_last\_name** field of the [userFull](/constructor/userFull.md) constructor. |
| **usernames** | [Vector](/type/Vector%20t)&lt;[Username](/type/Username.md)&gt; | Usernames. |

### Type
[Update](/type/Update.md)

### Related pages

#### [userFull](/constructor/userFull.md)
Extended user info

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).