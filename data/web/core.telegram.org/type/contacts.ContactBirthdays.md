# contacts.ContactBirthdays

Birthday information of our contacts.

```tl
contacts.contactBirthdays#114ff30d contacts:Vector<ContactBirthday> users:Vector<User> = contacts.ContactBirthdays;

---functions---

contacts.getBirthdays#daeda864 = contacts.ContactBirthdays;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [contacts.contactBirthdays](/constructor/contacts.contactBirthdays.md) | Birthday information of our contacts. |

### Methods

| Method | Description |
| --- | --- |
| [contacts.getBirthdays](/method/contacts.getBirthdays.md) | Fetch all users with birthdays that fall within +1/-1 days, relative to the current day: this method should be invoked by clients every 6-8 hours, and if the result is non-empty, it should be used to appropriately update locally cached birthday information in [user](/constructor/user.md).`birthday`.\
\
[See here »](/api/profile.md#birthday) for more info. |