# contacts.getContactIDs

Get the telegram IDs of all contacts.  
Returns an array of Telegram user IDs for all contacts (0 if a contact does not have an associated Telegram account or have hidden their account using privacy settings).

```tl
---functions---
contacts.getContactIDs#7adc669d hash:long = Vector<int>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |

### Result
[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt;

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.