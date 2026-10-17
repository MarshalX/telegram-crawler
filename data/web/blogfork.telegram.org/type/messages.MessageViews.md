# messages.MessageViews

View, forward counter + info about replies

```tl
messages.messageViews#b6c4f543 views:Vector<MessageViews> chats:Vector<Chat> users:Vector<User> = messages.MessageViews;

---functions---

messages.getMessagesViews#5784d3e1 peer:InputPeer id:Vector<int> increment:Bool = messages.MessageViews;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.messageViews](/constructor/messages.messageViews.md) | View, forward counter + info about replies |

### Methods

| Method | Description |
| --- | --- |
| [messages.getMessagesViews](/method/messages.getMessagesViews.md) | Get and increase the view counter of a message sent or forwarded from a [channel](/api/channel.md) |