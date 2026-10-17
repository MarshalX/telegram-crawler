# messages.getPinnedSavedDialogs

Get pinned [saved dialogs, see here »](/api/saved-messages.md) for more info.

```tl
messages.savedDialogs#f83ae221 dialogs:Vector<SavedDialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SavedDialogs;
messages.savedDialogsSlice#44ba9dd9 count:int dialogs:Vector<SavedDialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SavedDialogs;
messages.savedDialogsNotModified#c01f6fe8 count:int = messages.SavedDialogs;
---functions---
messages.getPinnedSavedDialogs#d63d94e0 = messages.SavedDialogs;
```

### Parameters

This constructor does not require any parameters.

### Result
[messages.SavedDialogs](/type/messages.SavedDialogs.md)

### Only users can use this method

### Related pages

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.