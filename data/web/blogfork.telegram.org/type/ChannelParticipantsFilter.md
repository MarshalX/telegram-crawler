# ChannelParticipantsFilter

Filter for fetching channel participants

```tl
channelParticipantsRecent#de3f3c79 = ChannelParticipantsFilter;
channelParticipantsAdmins#b4608969 = ChannelParticipantsFilter;
channelParticipantsKicked#a3b54985 q:string = ChannelParticipantsFilter;
channelParticipantsBots#b0d1865b = ChannelParticipantsFilter;
channelParticipantsBanned#1427a5e1 q:string = ChannelParticipantsFilter;
channelParticipantsSearch#656ac4b q:string = ChannelParticipantsFilter;
channelParticipantsContacts#bb6ae88d q:string = ChannelParticipantsFilter;
channelParticipantsMentions#e04b5ceb flags:# q:flags.0?string top_msg_id:flags.1?int = ChannelParticipantsFilter;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [channelParticipantsRecent](/constructor/channelParticipantsRecent.md) | Fetch only recent participants |
| [channelParticipantsAdmins](/constructor/channelParticipantsAdmins.md) | Fetch only admin participants |
| [channelParticipantsKicked](/constructor/channelParticipantsKicked.md) | Fetch only kicked participants |
| [channelParticipantsBots](/constructor/channelParticipantsBots.md) | Fetch only bot participants |
| [channelParticipantsBanned](/constructor/channelParticipantsBanned.md) | Fetch only banned participants |
| [channelParticipantsSearch](/constructor/channelParticipantsSearch.md) | Query participants by name |
| [channelParticipantsContacts](/constructor/channelParticipantsContacts.md) | Fetch only participants that are also contacts |
| [channelParticipantsMentions](/constructor/channelParticipantsMentions.md) | This filter is used when looking for supergroup members to mention.  \
This filter will automatically remove anonymous admins, and return even non-participant users that replied to a specific [thread](/api/threads.md) through the [comment section](/api/threads.md#channel-comments) of a channel. |