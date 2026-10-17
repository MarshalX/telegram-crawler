# contacts.importedContacts

Info on successfully imported contacts.

```tl
contacts.importedContacts#77d01c3b imported:Vector<ImportedContact> popular_invites:Vector<PopularContact> retry_contacts:Vector<long> users:Vector<User> = contacts.ImportedContacts;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **imported** | [Vector](/type/Vector%20t)&lt;[ImportedContact](/type/ImportedContact.md)&gt; | List of successfully imported contacts |
| **popular\_invites** | [Vector](/type/Vector%20t)&lt;[PopularContact](/type/PopularContact.md)&gt; | Popular contacts |
| **retry\_contacts** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | List of contact ids that could not be imported due to system limitation and will need to be imported at a later date. |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | List of users |

### Type
[contacts.ImportedContacts](/type/contacts.ImportedContacts.md)