# stories.getChatsToSend

Obtain a list of channels where the user can post [stories](/api/stories.md)

```tl
messages.chats#64ff9fd5 chats:Vector<Chat> = messages.Chats;
messages.chatsSlice#9cd81144 count:int chats:Vector<Chat> = messages.Chats;
---functions---
stories.getChatsToSend#a56a8b60 = messages.Chats;
```

### Parameters

This constructor does not require any parameters.

### Result
[messages.Chats](/type/messages.Chats.md)

### Only users can use this method

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.