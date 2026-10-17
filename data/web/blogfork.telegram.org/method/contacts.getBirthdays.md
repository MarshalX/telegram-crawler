# contacts.getBirthdays

Fetch all users with birthdays that fall within +1/-1 days, relative to the current day: this method should be invoked by clients every 6-8 hours, and if the result is non-empty, it should be used to appropriately update locally cached birthday information in [user](/constructor/user.md).`birthday`.

[See here »](/api/profile.md#birthday) for more info.

```tl
contacts.contactBirthdays#114ff30d contacts:Vector<ContactBirthday> users:Vector<User> = contacts.ContactBirthdays;
---functions---
contacts.getBirthdays#daeda864 = contacts.ContactBirthdays;
```

### Parameters

This constructor does not require any parameters.

### Result
[contacts.ContactBirthdays](/type/contacts.ContactBirthdays.md)

### Only users can use this method

### Related pages

#### [user](/constructor/user.md)
Indicates info about a certain user.

Unless specified otherwise, when updating the [local peer database](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

See [here »](https://github.com/tdlib/td/blob/73035e4a69ed26df563652de14aa9c4c86d23420/td/telegram/UserManager.cpp#L3106) for an implementation of the logic to use when updating the [local user peer database](/api/peers.md).

#### [User profiles](/api/profile.md)
Telegram offers many customization options for your profile!