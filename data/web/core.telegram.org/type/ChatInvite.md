# ChatInvite

Chat invite

```tl
chatInviteAlready#5a686d7c chat:Chat = ChatInvite;
chatInvite#5c9d3702 flags:# channel:flags.0?true broadcast:flags.1?true public:flags.2?true megagroup:flags.3?true request_needed:flags.6?true verified:flags.7?true scam:flags.8?true fake:flags.9?true can_refulfill_subscription:flags.11?true title:string about:flags.5?string photo:Photo participants_count:int participants:flags.4?Vector<User> color:int subscription_pricing:flags.10?StarsSubscriptionPricing subscription_form_id:flags.12?long bot_verification:flags.13?BotVerification = ChatInvite;
chatInvitePeek#61695cb0 chat:Chat expires:int = ChatInvite;

---functions---

messages.checkChatInvite#3eadb1bb hash:string = ChatInvite;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [chatInviteAlready](/constructor/chatInviteAlready.md) | The user has already joined this chat |
| [chatInvite](/constructor/chatInvite.md) | Chat invite info |
| [chatInvitePeek](/constructor/chatInvitePeek.md) | A chat invitation that also allows peeking into the group to read messages without joining it. |

### Methods

| Method | Description |
| --- | --- |
| [messages.checkChatInvite](/method/messages.checkChatInvite.md) | Check the validity of a chat invite link and get basic info about it |