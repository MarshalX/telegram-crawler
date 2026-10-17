# ChannelMessagesFilter

Filter for fetching only certain types of channel messages

```tl
channelMessagesFilterEmpty#94d42ee7 = ChannelMessagesFilter;
channelMessagesFilter#cd77d957 flags:# exclude_new_messages:flags.1?true ranges:Vector<MessageRange> = ChannelMessagesFilter;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [channelMessagesFilterEmpty](/constructor/channelMessagesFilterEmpty.md) | No filter |
| [channelMessagesFilter](/constructor/channelMessagesFilter.md) | Filter for getting only certain types of channel messages.\
\
This filter cannot be used to fetch messages older than the channel message box size. |