# RecentMeUrl

Recent t.me urls

```tl
recentMeUrlUnknown#46e1d13d url:string = RecentMeUrl;
recentMeUrlUser#b92c09e2 url:string user_id:long = RecentMeUrl;
recentMeUrlChat#b2da71d2 url:string chat_id:long = RecentMeUrl;
recentMeUrlChatInvite#eb49081d url:string chat_invite:ChatInvite = RecentMeUrl;
recentMeUrlStickerSet#bc0a57dc url:string set:StickerSetCovered = RecentMeUrl;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [recentMeUrlUnknown](/constructor/recentMeUrlUnknown.md) | Unknown t.me url |
| [recentMeUrlUser](/constructor/recentMeUrlUser.md) | Recent t.me link to a user |
| [recentMeUrlChat](/constructor/recentMeUrlChat.md) | Recent t.me link to a chat |
| [recentMeUrlChatInvite](/constructor/recentMeUrlChatInvite.md) | Recent t.me invite link to a chat |
| [recentMeUrlStickerSet](/constructor/recentMeUrlStickerSet.md) | Recent t.me stickerset installation URL |