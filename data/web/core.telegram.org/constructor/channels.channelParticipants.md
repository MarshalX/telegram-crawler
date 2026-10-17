# channels.channelParticipants

Represents multiple channel participants

```tl
channels.channelParticipants#9ab0feaf count:int participants:Vector<ChannelParticipant> chats:Vector<Chat> users:Vector<User> = channels.ChannelParticipants;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **count** | [int](/type/int.md) | Total number of participants that correspond to the given query |
| **participants** | [Vector](/type/Vector%20t)&lt;[ChannelParticipant](/type/ChannelParticipant.md)&gt; | Participants |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users mentioned in participant info |

### Type
[channels.ChannelParticipants](/type/channels.ChannelParticipants.md)