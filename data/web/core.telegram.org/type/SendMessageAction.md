# SendMessageAction

User actions. Use this to provide users with detailed info about their chat partner's actions: typing or sending attachments of all kinds.

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===17===
sendMessageCancelAction#fd5ec8f5 = SendMessageAction;
sendMessageChooseContactAction#628cbc6f = SendMessageAction;
sendMessageGeoLocationAction#176f8ba1 = SendMessageAction;
sendMessageRecordAudioAction#d52f73f7 = SendMessageAction;
sendMessageRecordVideoAction#a187d66f = SendMessageAction;
sendMessageTypingAction#16bf744e = SendMessageAction;
sendMessageUploadAudioAction#e6ac8a6f = SendMessageAction;
sendMessageUploadDocumentAction#8faee98e = SendMessageAction;
sendMessageUploadPhotoAction#990a3c1a = SendMessageAction;
sendMessageUploadVideoAction#92042ff7 = SendMessageAction;

===66===
sendMessageRecordRoundAction#88f27fbc = SendMessageAction;
sendMessageUploadRoundAction#bb718624 = SendMessageAction;
```

API schema:
<!-- /schema-blocks -->

```tl
sendMessageTypingAction#16bf744e = SendMessageAction;
sendMessageCancelAction#fd5ec8f5 = SendMessageAction;
sendMessageRecordVideoAction#a187d66f = SendMessageAction;
sendMessageUploadVideoAction#e9763aec progress:int = SendMessageAction;
sendMessageRecordAudioAction#d52f73f7 = SendMessageAction;
sendMessageUploadAudioAction#f351d7ab progress:int = SendMessageAction;
sendMessageUploadPhotoAction#d1d34a26 progress:int = SendMessageAction;
sendMessageUploadDocumentAction#aa0cd9e4 progress:int = SendMessageAction;
sendMessageGeoLocationAction#176f8ba1 = SendMessageAction;
sendMessageChooseContactAction#628cbc6f = SendMessageAction;
sendMessageGamePlayAction#dd6a8f48 = SendMessageAction;
sendMessageRecordRoundAction#88f27fbc = SendMessageAction;
sendMessageUploadRoundAction#243e1c66 progress:int = SendMessageAction;
speakingInGroupCallAction#d92c2285 = SendMessageAction;
sendMessageHistoryImportAction#dbda9246 progress:int = SendMessageAction;
sendMessageChooseStickerAction#b05ac6b1 = SendMessageAction;
sendMessageEmojiInteraction#25972bcb emoticon:string msg_id:int interaction:DataJSON = SendMessageAction;
sendMessageEmojiInteractionSeen#b665902e emoticon:string = SendMessageAction;
sendMessageTextDraftAction#376d975c random_id:long text:TextWithEntities = SendMessageAction;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [sendMessageTypingAction](/constructor/sendMessageTypingAction.md) | User is typing. |
| [sendMessageCancelAction](/constructor/sendMessageCancelAction.md) | Invalidate all previous action updates. E.g. when user deletes entered text or aborts a video upload. |
| [sendMessageRecordVideoAction](/constructor/sendMessageRecordVideoAction.md) | User is recording a video. |
| [sendMessageUploadVideoAction](/constructor/sendMessageUploadVideoAction.md) | User is uploading a video. |
| [sendMessageRecordAudioAction](/constructor/sendMessageRecordAudioAction.md) | User is recording a voice message. |
| [sendMessageUploadAudioAction](/constructor/sendMessageUploadAudioAction.md) | User is uploading a voice message. |
| [sendMessageUploadPhotoAction](/constructor/sendMessageUploadPhotoAction.md) | User is uploading a photo. |
| [sendMessageUploadDocumentAction](/constructor/sendMessageUploadDocumentAction.md) | User is uploading a file. |
| [sendMessageGeoLocationAction](/constructor/sendMessageGeoLocationAction.md) | User is selecting a location to share. |
| [sendMessageChooseContactAction](/constructor/sendMessageChooseContactAction.md) | User is selecting a contact to share. |
| [sendMessageRecordRoundAction](/constructor/sendMessageRecordRoundAction.md) | User is recording a round video to share |
| [sendMessageUploadRoundAction](/constructor/sendMessageUploadRoundAction.md) | User is uploading a round video |
| [sendMessageGamePlayAction](/constructor/sendMessageGamePlayAction.md) | User is playing a game |
| [speakingInGroupCallAction](/constructor/speakingInGroupCallAction.md) | User is currently speaking in the group call |
| [sendMessageHistoryImportAction](/constructor/sendMessageHistoryImportAction.md) | Chat history is being imported |
| [sendMessageChooseStickerAction](/constructor/sendMessageChooseStickerAction.md) | User is choosing a sticker |
| [sendMessageEmojiInteraction](/constructor/sendMessageEmojiInteraction.md) | User has clicked on an animated emoji triggering a [reaction, click here for more info »](/api/animated-emojis.md#emoji-reactions). |
| [sendMessageEmojiInteractionSeen](/constructor/sendMessageEmojiInteractionSeen.md) | User is watching an animated emoji reaction triggered by another user, [click here for more info »](/api/animated-emojis.md#emoji-reactions). |
| [sendMessageTextDraftAction](/constructor/sendMessageTextDraftAction.md) | Used by bots to implement [live message streaming »](/api/bots/ai.md#live-response-streaming). |