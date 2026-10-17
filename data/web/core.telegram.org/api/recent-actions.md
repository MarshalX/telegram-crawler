# Admin log


Both supergroups and channels offer a so-called [admin log](https://telegram.org/blog/admin-revolution), a log of recent relevant supergroup and channel actions, like the modification of group/channel settings or information on behalf of an admin, user kicks and bans, and more.  

    channelAdminLogEvent#1fad68cd id:long date:int user_id:long action:ChannelAdminLogEventAction = ChannelAdminLogEvent;

    channels.adminLogResults#ed8af74d events:Vector<ChannelAdminLogEvent> chats:Vector<Chat> users:Vector<User> = channels.AdminLogResults;

    channelAdminLogEventsFilter#ea107ae4 flags:# join:flags.0?true leave:flags.1?true invite:flags.2?true ban:flags.3?true unban:flags.4?true kick:flags.5?true unkick:flags.6?true promote:flags.7?true demote:flags.8?true info:flags.9?true settings:flags.10?true pinned:flags.11?true edit:flags.12?true delete:flags.13?true group_call:flags.14?true invites:flags.15?true send:flags.16?true forums:flags.17?true sub_extend:flags.18?true edit_rank:flags.19?true = ChannelAdminLogEventsFilter;

    ---functions---

    channels.getAdminLog#33ddf480 flags:# channel:InputChannel q:string events_filter:flags.0?ChannelAdminLogEventsFilter admins:flags.1?Vector<InputUser> max_id:long min_id:long limit:int = channels.AdminLogResults;

[channels.getAdminLog](/method/channels.getAdminLog.md) can be used to list recent admin activity.  
A [channelAdminLogEventsFilter](/constructor/channelAdminLogEventsFilter.md) can be used to filter out actions of a certain type, and the `admins` field can be used to show only actions by certain admins.  
`q` can also be used to filter only logs matching a query string.  

See [the type page &raquo;](/type/ChannelAdminLogEventAction.md) for the full list of available events.  
