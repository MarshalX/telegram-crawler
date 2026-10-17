# contacts.updateContactNote

Update the private note associated to a contact; see [here »](/api/contacts.md#private-notes-for-contacts) for more info.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
contacts.updateContactNote#139f63fb id:InputUser note:TextWithEntities = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [InputUser](/type/InputUser.md) | The contact. |
| **note** | [TextWithEntities](/type/TextWithEntities.md) | The note. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CONTACT\_ID\_INVALID | The provided contact ID is invalid. |
| 400 | CONTACT\_MISSING | The specified user is not a contact. |

### Related pages

#### [Contact list](/api/contacts.md)
Working with contacts.