# MessagesFilter

Object describes message filter.

```tl
inputMessagesFilterEmpty#57e2f66c = MessagesFilter;
inputMessagesFilterPhotos#9609a51c = MessagesFilter;
inputMessagesFilterVideo#9fc00e65 = MessagesFilter;
inputMessagesFilterPhotoVideo#56e9f0e4 = MessagesFilter;
inputMessagesFilterDocument#9eddf188 = MessagesFilter;
inputMessagesFilterUrl#7ef0dd87 = MessagesFilter;
inputMessagesFilterGif#ffc86587 = MessagesFilter;
inputMessagesFilterVoice#50f5c392 = MessagesFilter;
inputMessagesFilterMusic#3751b49e = MessagesFilter;
inputMessagesFilterChatPhotos#3a20ecb8 = MessagesFilter;
inputMessagesFilterPhoneCalls#80c99768 flags:# missed:flags.0?true = MessagesFilter;
inputMessagesFilterRoundVoice#7a7c17a4 = MessagesFilter;
inputMessagesFilterRoundVideo#b549da53 = MessagesFilter;
inputMessagesFilterMyMentions#c1f8e69a = MessagesFilter;
inputMessagesFilterGeo#e7026d0d = MessagesFilter;
inputMessagesFilterContacts#e062db83 = MessagesFilter;
inputMessagesFilterPinned#1bb00451 = MessagesFilter;
inputMessagesFilterPoll#fa2bc90a = MessagesFilter;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputMessagesFilterEmpty](/constructor/inputMessagesFilterEmpty.md) | Filter is absent. |
| [inputMessagesFilterPhotos](/constructor/inputMessagesFilterPhotos.md) | Filter for messages containing photos. |
| [inputMessagesFilterVideo](/constructor/inputMessagesFilterVideo.md) | Filter for messages containing videos. |
| [inputMessagesFilterPhotoVideo](/constructor/inputMessagesFilterPhotoVideo.md) | Filter for messages containing photos or videos. |
| [inputMessagesFilterDocument](/constructor/inputMessagesFilterDocument.md) | Filter for messages containing documents. |
| [inputMessagesFilterUrl](/constructor/inputMessagesFilterUrl.md) | Return only messages containing URLs |
| [inputMessagesFilterGif](/constructor/inputMessagesFilterGif.md) | Return only messages containing gifs |
| [inputMessagesFilterVoice](/constructor/inputMessagesFilterVoice.md) | Return only messages containing voice notes |
| [inputMessagesFilterMusic](/constructor/inputMessagesFilterMusic.md) | Return only messages containing audio files |
| [inputMessagesFilterChatPhotos](/constructor/inputMessagesFilterChatPhotos.md) | Return only chat photo changes |
| [inputMessagesFilterPhoneCalls](/constructor/inputMessagesFilterPhoneCalls.md) | Return only phone calls |
| [inputMessagesFilterRoundVoice](/constructor/inputMessagesFilterRoundVoice.md) | Return only round videos and voice notes |
| [inputMessagesFilterRoundVideo](/constructor/inputMessagesFilterRoundVideo.md) | Return only round videos |
| [inputMessagesFilterMyMentions](/constructor/inputMessagesFilterMyMentions.md) | Return only messages where the current user was [mentioned](/api/mentions.md). |
| [inputMessagesFilterGeo](/constructor/inputMessagesFilterGeo.md) | Return only messages containing geolocations |
| [inputMessagesFilterContacts](/constructor/inputMessagesFilterContacts.md) | Return only messages containing contacts |
| [inputMessagesFilterPinned](/constructor/inputMessagesFilterPinned.md) | Fetch only pinned messages |
| [inputMessagesFilterPoll](/constructor/inputMessagesFilterPoll.md) | Filter for poll messages, see [searching for polls »](/api/poll.md#searching-for-polls) |