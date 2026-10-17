# contacts.importContacts

Imports contacts: saves a full list on the server, adds already registered contacts to the contact list, returns added contacts and their info.

Use [contacts.addContact](/method/contacts.addContact.md) to add Telegram contacts without actually using their phone number.

```tl
contacts.importedContacts#77d01c3b imported:Vector<ImportedContact> popular_invites:Vector<PopularContact> retry_contacts:Vector<long> users:Vector<User> = contacts.ImportedContacts;
---functions---
contacts.importContacts#2c800be5 contacts:Vector<InputContact> = contacts.ImportedContacts;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **contacts** | [Vector](/type/Vector%20t)&lt;[InputContact](/type/InputContact.md)&gt; | List of contacts to import |

### Result
[contacts.ImportedContacts](/type/contacts.ImportedContacts.md)

### Only users can use this method

### Related pages

#### [contacts.addContact](/method/contacts.addContact.md)
Add an existing telegram user as contact.

Use [contacts.importContacts](/method/contacts.importContacts.md) to add contacts by phone number, without knowing their Telegram ID.