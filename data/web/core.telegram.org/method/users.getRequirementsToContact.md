# users.getRequirementsToContact

Check whether we can write to the specified users, used to implement bulk checks for [Premium-only messages »](/api/privacy.md#require-premium-for-new-non-contact-users) and [paid messages »](/api/paid-messages.md).

For each input user, returns a [RequirementToContact](/type/RequirementToContact.md) constructor (at the same offset in the vector) containing requirements to contact them.

```tl
---functions---
users.getRequirementsToContact#d89a83a3 id:Vector<InputUser> = Vector<RequirementToContact>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [Vector](/type/Vector%20t)&lt;[InputUser](/type/InputUser.md)&gt; | Users to check. |

### Result
[Vector](/type/Vector%20t)&lt;[RequirementToContact](/type/RequirementToContact.md)&gt;

### Only users can use this method

### Related pages

#### [Privacy settings](/api/privacy.md)
Telegram allows users to specify granular privacy settings, choosing which users can or can't interact with them in certain ways.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.

#### [RequirementToContact](/type/RequirementToContact.md)
Specifies a requirement that must be satisfied in order to contact a user.