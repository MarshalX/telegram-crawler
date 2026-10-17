# contacts.search

Returns users found by username substring.

```tl
contacts.found#b3134d9d my_results:Vector<Peer> results:Vector<Peer> chats:Vector<Chat> users:Vector<User> = contacts.Found;
---functions---
contacts.search#11f812d8 q:string limit:int = contacts.Found;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **q** | [string](/type/string.md) | Target substring |
| **limit** | [int](/type/int.md) | Maximum number of users to be returned |

### Result
[contacts.Found](/type/contacts.Found.md)

### Notes

This method will exclude the current user's contacts from the search results. It is assumed that searches among the user's contacts can be handled locally by the client.

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | QUERY\_TOO\_SHORT | The query string is too short. |
| 400 | SEARCH\_QUERY\_EMPTY | The search query is empty. |