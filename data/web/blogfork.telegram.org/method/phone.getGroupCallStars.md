# phone.getGroupCallStars

Fetch a live story's total donations and top donors, see [paid live story donations »](/api/group-calls.md#paid-live-story-donations).

```tl
phone.groupCallStars#9d1dbd26 total_stars:long top_donors:Vector<GroupCallDonor> chats:Vector<Chat> users:Vector<User> = phone.GroupCallStars;
---functions---
phone.getGroupCallStars#6f636302 call:InputGroupCall = phone.GroupCallStars;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Live story group call |

### Result
[phone.GroupCallStars](/type/phone.GroupCallStars.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | GROUPCALL\_INVALID | The specified group call is invalid. |

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.