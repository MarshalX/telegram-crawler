# Channels.AdminLogResults

Admin log events

```tl
channels.adminLogResults#ed8af74d events:Vector<ChannelAdminLogEvent> chats:Vector<Chat> users:Vector<User> = channels.AdminLogResults;

---functions---

channels.getAdminLog#33ddf480 flags:# channel:InputChannel q:string events_filter:flags.0?ChannelAdminLogEventsFilter admins:flags.1?Vector<InputUser> max_id:long min_id:long limit:int = channels.AdminLogResults;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [channels.adminLogResults](/constructor/channels.adminLogResults.md) | Admin log events |

### Methods

| Method | Description |
| --- | --- |
| [channels.getAdminLog](/method/channels.getAdminLog.md) | Get the admin log of a [channel/supergroup](/api/channel.md) |