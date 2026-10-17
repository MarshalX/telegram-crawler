# phone.groupCallStars

Contains a live story's total donations and top donors, see [paid live story donations »](/api/group-calls.md#paid-live-story-donations).

```tl
phone.groupCallStars#9d1dbd26 total_stars:long top_donors:Vector<GroupCallDonor> chats:Vector<Chat> users:Vector<User> = phone.GroupCallStars;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **total\_stars** | [long](/type/long.md) | Total Stars donated to the live story |
| **top\_donors** | [Vector](/type/Vector%20t)&lt;[GroupCallDonor](/type/GroupCallDonor.md)&gt; | Top donors |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chats mentioned in `top_donors` |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users mentioned in `top_donors` |

### Type
[phone.GroupCallStars](/type/phone.GroupCallStars.md)

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.