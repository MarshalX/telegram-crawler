# inputPhoneContact

Phone contact.

```tl
inputPhoneContact#6a1dc4be flags:# client_id:long phone:string first_name:string last_name:string note:flags.0?TextWithEntities = InputContact;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **client\_id** | [long](/type/long.md) | An arbitrary 64-bit integer: it should be set, for example, to an incremental number when using [contacts.importContacts](/method/contacts.importContacts.md), in order to retry importing only the contacts that weren't imported successfully, according to the client\_ids returned in [contacts.importedContacts](/constructor/contacts.importedContacts.md).`retry_contacts`. |
| **phone** | [string](/type/string.md) | Phone number |
| **first\_name** | [string](/type/string.md) | Contact's first name |
| **last\_name** | [string](/type/string.md) | Contact's last name |
| **note** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[TextWithEntities](/type/TextWithEntities.md) | A private note for this contact, only visible to us; see [here »](/api/contacts.md#private-notes-for-contacts) for more info on contact notes. |

### Type
[InputContact](/type/InputContact.md)

### Related pages

#### [contacts.importContacts](/method/contacts.importContacts.md)
Imports contacts: saves a full list on the server, adds already registered contacts to the contact list, returns added contacts and their info.

Use [contacts.addContact](/method/contacts.addContact.md) to add Telegram contacts without actually using their phone number.

#### [contacts.importedContacts](/constructor/contacts.importedContacts.md)
Info on successfully imported contacts.

#### [Contact list](/api/contacts.md)
Working with contacts.