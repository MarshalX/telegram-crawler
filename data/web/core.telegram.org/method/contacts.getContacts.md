# contacts.getContacts

Returns the current user's contact list.

```tl
contacts.contactsNotModified#b74ba9d2 = contacts.Contacts;
contacts.contacts#eae87e42 contacts:Vector<Contact> saved_count:int users:Vector<User> = contacts.Contacts;
---functions---
contacts.getContacts#5dd69e12 hash:long = contacts.Contacts;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation).\
Note that the hash is computed [using the usual algorithm](/api/offsets.md#hash-generation), passing to the algorithm first the previously returned [contacts.contacts](/constructor/contacts.contacts.md).`saved_count` field, then max `100000` sorted user IDs from the contact list, including the ID of the currently logged in user if it is saved as a contact. \
Example: [tdlib implementation](https://github.com/tdlib/td/blob/73035e4a69ed26df563652de14aa9c4c86d23420/td/telegram/UserManager.cpp#L7865). |

### Result
[contacts.Contacts](/type/contacts.Contacts.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [contacts.contacts](/constructor/contacts.contacts.md)
The current user's contact list and info on users.