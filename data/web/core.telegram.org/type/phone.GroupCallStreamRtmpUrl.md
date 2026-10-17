# phone.GroupCallStreamRtmpUrl

RTMP URL and stream key to be used in streaming software

```tl
phone.groupCallStreamRtmpUrl#2dbf3432 url:string key:string = phone.GroupCallStreamRtmpUrl;

---functions---

phone.getGroupCallStreamRtmpUrl#5af4c73a flags:# live_story:flags.0?true peer:InputPeer revoke:Bool = phone.GroupCallStreamRtmpUrl;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [phone.groupCallStreamRtmpUrl](/constructor/phone.groupCallStreamRtmpUrl.md) | Contains the RTMP publishing URL and secret stream key, see [creating and publishing an RTMP livestream »](/api/group-calls.md#creating-and-publishing-an-rtmp-livestream). |

### Methods

| Method | Description |
| --- | --- |
| [phone.getGroupCallStreamRtmpUrl](/method/phone.getGroupCallStreamRtmpUrl.md) | Get the RTMP URL and stream key used by the single external streamer that publishes all audio and video for an RTMP-mode video chat, livestream or live story.\
\
See [here »](/api/group-calls.md#creating-and-publishing-an-rtmp-livestream) for the full flow. |