# messageMediaContact

Attached contact.

```tl
messageMediaContact#70322949 phone_number:string first_name:string last_name:string vcard:string user_id:long = MessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **phone\_number** | [string](/type/string.md) | Phone number |
| **first\_name** | [string](/type/string.md) | Contact's first name |
| **last\_name** | [string](/type/string.md) | Contact's last name |
| **vcard** | [string](/type/string.md) | VCARD of contact |
| **user\_id** | [long](/type/long.md) | User identifier or `0`, if the user with the given phone number is not registered |

### Type
[MessageMedia](/type/MessageMedia.md)