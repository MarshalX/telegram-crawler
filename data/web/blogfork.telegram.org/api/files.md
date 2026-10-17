# Uploading and Downloading Files


When working with the API, it is sometimes necessary to send a relatively large file to the server. For example, when sending a message with a photo/video attachment or when setting the current user's profile picture.

### Uploading files

There are a number of API methods to save files. The schema of the types and methods used is presented below:

    inputFile#f52ff27f id:long parts:int name:string md5_checksum:string = InputFile;
    inputFileBig#fa4f0bb5 id:long parts:int name:string = InputFile;

    inputEncryptedFileUploaded#64bd0306 id:long parts:int md5_checksum:string key_fingerprint:int = InputEncryptedFile;
    inputEncryptedFileBigUploaded#2dc173c8 id:long parts:int key_fingerprint:int = InputEncryptedFile;
    
    inputSecureFileUploaded#3334b0f0 id:long parts:int md5_checksum:string file_hash:bytes secret:bytes = InputSecureFile;
    inputSecureFile#5367e5be id:long access_hash:long = InputSecureFile;

    inputMediaUploadedPhoto#7d8375da flags:# spoiler:flags.2?true live_photo:flags.3?true file:InputFile stickers:flags.0?Vector<InputDocument> ttl_seconds:flags.1?int video:flags.3?InputDocument = InputMedia;
    inputMediaUploadedDocument#37c9330 flags:# nosound_video:flags.3?true force_file:flags.4?true spoiler:flags.5?true file:InputFile thumb:flags.2?InputFile mime_type:string attributes:Vector<DocumentAttribute> stickers:flags.0?Vector<InputDocument> video_cover:flags.6?InputPhoto video_timestamp:flags.7?int ttl_seconds:flags.1?int = InputMedia;
    
    inputChatUploadedPhoto#bdcdaec0 flags:# file:flags.0?InputFile video:flags.1?InputFile video_start_ts:flags.2?double video_emoji_markup:flags.3?VideoSize = InputChatPhoto;
    

    ---functions---
    
    messages.sendMedia#330e77f flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;
    messages.uploadMedia#14967978 flags:# business_connection_id:flags.0?string peer:InputPeer media:InputMedia = MessageMedia;
    messages.sendEncryptedFile#5559481d flags:# silent:flags.0?true peer:InputEncryptedChat random_id:long data:bytes file:InputEncryptedFile = messages.SentEncryptedMessage;
    
    photos.uploadProfilePhoto#388a3b5 flags:# fallback:flags.3?true bot:flags.5?InputUser file:flags.0?InputFile video:flags.1?InputFile video_start_ts:flags.2?double video_emoji_markup:flags.4?VideoSize = photos.Photo;    
    
    upload.saveFilePart#b304a621 file_id:long file_part:int bytes:bytes = Bool;
    upload.saveBigFilePart#de7b673d file_id:long file_part:int file_total_parts:int bytes:bytes = Bool;

Before transmitting the contents of the file itself, the file has to be assigned a unique 64-bit client identifier: **file_id**.

The file's binary content is then split into parts. All parts must have the same size (**part_size**) and the following conditions must be met:

* `part_size % 1024 = 0` (divisible by 1KB)
* `524288 % part_size = 0` (512KB must be evenly divisible by **part_size**)

The last part does not have to satisfy these conditions, provided its size is less than **part_size**.

The following [appConfig fields](/api/config.md#client-configuration) specify the maximum number of uploadable file parts:  

* [upload\_max\_fileparts\_default »](/api/config.md#upload-max-fileparts-default) - Maximum number of file parts uploadable by non-Premium users.  
* [upload\_max\_fileparts\_premium »](/api/config.md#upload-max-fileparts-premium) - Maximum number of file parts uploadable by Premium users.  

Note that the limit of uploadable file parts does not account for the **part_size**: thus the total file size limit can only be reached with the biggest possible **part_size** of 512KB, which is actually the recommended **part_size** to avoid excessive protocol overhead.  

Each part should have a sequence number, **file_part**, with a value ranging from 0 to the value of the appropriate config parameter minus 1.  

After the file has been partitioned you need to choose a method for saving it on the server. Use [upload.saveBigFilePart](/method/upload.saveBigFilePart.md) in case the full size of the file is more than **10 MB** and [upload.saveFilePart](/method/upload.saveFilePart.md) for smaller files.

Each call saves a portion of the data in a temporary location on the server to be used later. The storage life of each portion of data is between several minutes and several hours (depending on how busy the storage area is). After this time, the file part will become unavailable.  

To increase the time efficiency of a file save operation, we recommend using a (local, i.e. **not** with invokeAfterMsgs) call queue, so X pieces of the file are being saved at any given moment in time. Each successful operation to save a part invokes the method call to save the next part. The value of X can be tuned to achieve maximum performance.

To further increase performance, multiple parallel call queues (i.e. a tunable number Y of queues) linked to separate TCP connections to the datacenters can be used to upload multiple chunks in parallel.  

When using one of the methods mentioned above to save file parts, one of the following [data input errors](/api/errors.md#400-bad-request) may be returned:

* FILE_PARTS_INVALID - Invalid number of parts. The value is not between `1..upload_max_fileparts_*`
* FILE_PART_INVALID: The file part number is invalid. The value is not between `0` and `upload_max_fileparts_*-1`.
* FILE_PART_TOO_BIG: The size limit (512 KB) for the content of the file part has been exceeded
* FILE_PART_EMPTY: The file part sent is empty
* FILE_PART_SIZE_INVALID - 512KB cannot be evenly divided by **part_size**
* FILE_PART_SIZE_CHANGED - The part size is different from the size of one of the previous parts in the same file
* FLOOD_PREMIUM_WAIT_X: Indicates that upload speed is limited because the current account does not have a [Premium](/api/premium.md) subscription, and that the query must be automatically repeated by the client after X seconds.  
  When receiving this error, clients should display the [Telegram Premium subscription modal](/api/premium.md), offering the user to purchase a Premium subscription to increase upload speed [upload_premium_speedup_upload&nbsp;&raquo;](/api/config.md#upload-premium-speedup-upload) times.  
  Note that this modal should only be displayed if the file that is being uploaded is currently visible to the user; if it isn't, the modal should be displayed once the loading/already loaded media becomes visible.  
  Also, this modal should only be shown **at most** every [upload_premium_speedup_notify_period&nbsp;&raquo;](/api/config.md#upload-premium-speedup-notify-period), to avoid bombarding the user with this popup for every file whose upload is slowed down.  
  This error can only be received when the user has uploaded tens of gigabytes or more.  

While the parts are being uploaded, an [MD5 hash](https://en.wikipedia.org/wiki/MD5) of the file contents can also be computed to be used later as the **md5_checksum** parameter in the [inputFile](/constructor/inputFile.md) constructor (since it is checked only by the server, for encrypted secret chat files it must be generated from the encrypted file).  
After the entire file is successfully saved, the final method may be called and passed the generated [inputFile](/type/InputFile.md) object. In case the [upload.saveBigFilePart](/method/upload.saveBigFilePart.md) method is used, the [inputFileBig](/constructor/inputFileBig.md) constructor must be passed, in other cases use [inputFile](/constructor/inputFile.md).

* [messages.sendMedia](/method/messages.sendMedia.md) - Sends a media file to a chat
* [messages.uploadMedia](/method/messages.uploadMedia.md) - Uploads a media file to a chat, without sending it, returning only a [MessageMedia](/type/MessageMedia.md) constructor that can be used to later send the file to multiple chats, without reuploading it every time.  
* [photos.uploadProfilePhoto](/method/photos.uploadProfilePhoto.md) - Used to set a [profile or chat picture or video](#uploading-profile-or-chat-pictures)

The file save operation may return one of the following [data input errors](/api/errors.md#400-bad-request):

* FILE_PARTS_INVALID: The number of file parts is invalid The value is not between 1 and `upload_max_fileparts_*`.
* FILE_PART_X_MISSING: Part X (where X is a number) of the file is missing from storage. Try repeating the method call to resave the part.
* MD5_CHECKSUM_INVALID: The file's MD5 checksum did not match the **md5_checksum** parameter

#### Resending existing files

    inputMediaPhoto#e3af4434 flags:# spoiler:flags.1?true live_photo:flags.2?true id:InputPhoto ttl_seconds:flags.0?int video:flags.2?InputDocument = InputMedia;
    inputMediaDocument#a8763ab5 flags:# spoiler:flags.2?true id:InputDocument video_cover:flags.3?InputPhoto video_timestamp:flags.4?int ttl_seconds:flags.0?int query:flags.1?string = InputMedia;

    ---functions---
    
    messages.sendMedia#330e77f flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;

    messages.sendMultiMedia#1bf89d74 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo multi_media:Vector<InputSingleMedia> schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long = Updates;

Non-protected media (i.e. media from [message](/constructor/message.md)s **without** the `noforwards` flag) may be resent to other chats, without reuploading it: simply pass to [messages.sendMedia](/method/messages.sendMedia.md) or [messages.sendMultiMedia](/method/messages.sendMultiMedia.md) an [inputMediaPhoto](/constructor/inputMediaPhoto.md) constructor for photos or an [inputMediaDocument](/constructor/inputMediaDocument.md) constructor for every other kind of media, appropriately generated from an existing [photo](/constructor/photo.md) or [document](/constructor/document.md).  

All the flags in [inputMediaPhoto](/constructor/inputMediaPhoto.md) and [inputMediaDocument](/constructor/inputMediaDocument.md) may be modified to modify some of the media file's attributes.  

When resending existing media, [messages.sendMedia](/method/messages.sendMedia.md) may return a `FILE_REFERENCE_EXPIRED` error (or a `FILE_REFERENCE_INVALID`, which should be treated in the same way), in this case, the `file_reference` field of the input location must be [refreshed as specified here &raquo;](/api/file-references.md).  

[messages.sendMultiMedia](/method/messages.sendMultiMedia.md) may also return file reference errors in a slightly different form, as `FILE_REFERENCE_%d_EXPIRED` errors (or a `FILE_REFERENCE_%d_INVALID`, which should be treated in the same way): in this case, the media with the file reference to refresh will be located at index `%d` of the passed `multi_media` vector.  

The same `FILE_REFERENCE_%d_INVALID` error may also be emitted by [messages.sendMedia](/method/messages.sendMedia.md) or other methods requiring a single [InputMedia](/type/InputMedia.md) constructor, when an [inputMediaPaidMedia](/constructor/inputMediaPaidMedia.md) is provided with an array of `extended_media` media files.  

#### Editing uploaded files

    inputMediaPhoto#e3af4434 flags:# spoiler:flags.1?true live_photo:flags.2?true id:InputPhoto ttl_seconds:flags.0?int video:flags.2?InputDocument = InputMedia;
    inputMediaDocument#a8763ab5 flags:# spoiler:flags.2?true id:InputDocument video_cover:flags.3?InputPhoto video_timestamp:flags.4?int ttl_seconds:flags.0?int query:flags.1?string = InputMedia;

    inputMediaUploadedPhoto#7d8375da flags:# spoiler:flags.2?true live_photo:flags.3?true file:InputFile stickers:flags.0?Vector<InputDocument> ttl_seconds:flags.1?int video:flags.3?InputDocument = InputMedia;
    inputMediaUploadedDocument#37c9330 flags:# nosound_video:flags.3?true force_file:flags.4?true spoiler:flags.5?true file:InputFile thumb:flags.2?InputFile mime_type:string attributes:Vector<DocumentAttribute> stickers:flags.0?Vector<InputDocument> video_cover:flags.6?InputPhoto video_timestamp:flags.7?int ttl_seconds:flags.1?int = InputMedia;

    ---functions---
    
    messages.editMessage#51e842e1 flags:# no_webpage:flags.1?true invert_media:flags.16?true peer:InputPeer id:int message:flags.11?string media:flags.14?InputMedia reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.15?int schedule_repeat_period:flags.18?int quick_reply_shortcut_id:flags.17?int = Updates;

Use [messages.editMessage](/method/messages.editMessage.md) to edit or replace a media file sent using [messages.sendMedia](/method/messages.sendMedia.md) and [messages.sendMultiMedia](/method/messages.sendMultiMedia.md).  

If one wishes to edit only the `spoiler`, `ttl_seconds` or `query` attributes of the media, this may be done without reuploading the entire media file, by simply passing the old media to the `id` parameter of [inputMediaPhoto](/constructor/inputMediaPhoto.md), [inputMediaDocument](/constructor/inputMediaDocument.md) and updating the values of the `spoiler`/`ttl_seconds`/`query` attributes as needed.  

If one wishes to edit any other attribute (for example, the file name specified in [documentAttributeFilename](/constructor/documentAttributeFilename.md), any other [DocumentAttribute](/type/DocumentAttribute.md) or any flag different from `spoiler`/`ttl_seconds`/`query`/`video_cover`/`video_timestamp`) **a full reupload of the file is required**, in order to be able to specify the new attributes in [inputMediaUploadedPhoto](/constructor/inputMediaUploadedPhoto.md)/[inputMediaUploadedDocument](/constructor/inputMediaUploadedDocument.md).  

The only exception to the above rule is when editing the [documentAttributeVideo](/constructor/documentAttributeVideo.md).`video_start_ts` attribute of video [stories](/api/stories.md), in which case [inputMediaDocument](/constructor/inputMediaDocument.md) may still be used with [inputFileStoryDocument](/constructor/inputFileStoryDocument.md) instead of [inputFile](/constructor/inputFile.md) without reuploading the entire story video, see [here&nbsp;&raquo;](/api/stories.md#editing-stories) for more info on the full flow.

#### Streamed uploads

The API also supports streamed uploads, in cases where the length of the file is not known before starting the upload.  

This is useful for example when converting a video, to avoid buffering the entire converted video on the filesystem, each part is uploaded immediately as soon as it is produced by the encoder.  

Everything works similarly to [normal uploads](#uploading-files), with a few key differences:

- The client buffers `part_size` bytes (or less if the stream ends) before immediately uploading the part as described [in the previous section](#uploading-files).
- A `total_stream_size` variable must be used to keep track of the total number of bytes read from the stream.
- [upload.saveBigFilePart](/method/upload.saveBigFilePart.md) must always be used, even if the stream turns out to be smaller than 10MB.  
- The `file_total_parts` field must be set to `-1` for all parts except for the last one, using the following logic:
  - If the stream ends and the length of the buffered part is bigger than 0, upload it, setting `file_total_parts=ceil(total_stream_size/part_size)` (like for normal uploads)
  - If the stream ends and the length of the buffered part is equal to 0, upload it anyway (upload one last empty part), setting `file_total_parts=ceil(total_stream_size/part_size)` (like for normal uploads)

Note that streamed uploads cannot be used when uploading photos with [inputMediaUploadedPhoto](/constructor/inputMediaUploadedPhoto.md).  

#### Video qualities

    messageMediaDocument#52d8ccd9 flags:# nopremium:flags.3?true spoiler:flags.4?true video:flags.6?true round:flags.7?true voice:flags.8?true document:flags.0?Document alt_documents:flags.5?Vector<Document> video_cover:flags.9?Photo video_timestamp:flags.10?int ttl_seconds:flags.2?int = MessageMedia;

    updateNewScheduledMessage#39a51dfb message:Message = Update;
    updateDeleteScheduledMessages#f2a71983 flags:# peer:Peer messages:Vector<int> sent_messages:flags.0?Vector<int> = Update;

When sending videos to big channels, Telegram will automatically convert them, generating multiple versions in multiple qualities and formats, available to users in the `alt_documents` vector of the sent [messageMediaDocument](/constructor/messageMediaDocument.md).  

Note that if the [video_ignore_alt_documents client configuration flag &raquo;](/api/config.md#video-ignore-alt-documents) set and equal to true, the [messageMediaDocument](/constructor/messageMediaDocument.md).`alt_documents` field must be ignored by clients.

Since server-side processing takes some time, videos sent to big channels will not be sent immediately after invoking sendMedia/sendMultiMedia: instead, they will be added to the schedule queue similarly to [scheduled messages &raquo;](/api/scheduled-messages.md), with schedule date equal to the approximated server-side conversion date:

* Immediately after invoking sendMedia an [updateNewScheduledMessage](/constructor/updateNewScheduledMessage.md) will be returned, containing a [message](/constructor/message.md) with ID equal to the ID of the message in the schedule queue for the current chat (each PM, chat, supergroup and channel has its own schedule queue and ID sequence), **the `video_processing_pending` flag set** and `date` equal to the **estimated conversion date** (not the schedule date).  
* Approximately at `date`, an [updateNewMessage](/constructor/updateNewMessage.md) or [updateNewChannelMessage](/constructor/updateNewChannelMessage.md) with the `from_scheduled` flag set, indicating to the sender that the specified message with pending video processing was sent.  
* Approximately at `date`, an [updateDeleteScheduledMessages](/constructor/updateDeleteScheduledMessages.md), indicating that the message was flushed from the schedule queue.  
  The `messages` field will contain the scheduled message IDs for the sent messages (initially returned in [updateNewScheduledMessage](/constructor/updateNewScheduledMessage.md)), and `sent_messages` will contain the real message IDs for the sent messages.  
  The scheduled and real message ID for a given message will be at the same vector index, in `messages` and `sent_messages` respectively.  

In other words, these messages should be treated similarly to [scheduled messages &raquo;](/api/scheduled-messages.md).  

#### Video covers

    inputMediaUploadedDocument#37c9330 flags:# nosound_video:flags.3?true force_file:flags.4?true spoiler:flags.5?true file:InputFile thumb:flags.2?InputFile mime_type:string attributes:Vector<DocumentAttribute> stickers:flags.0?Vector<InputDocument> video_cover:flags.6?InputPhoto video_timestamp:flags.7?int ttl_seconds:flags.1?int = InputMedia;
    inputMediaDocumentExternal#779600f9 flags:# spoiler:flags.1?true url:string ttl_seconds:flags.0?int video_cover:flags.2?InputPhoto video_timestamp:flags.3?int = InputMedia;
    inputMediaDocument#a8763ab5 flags:# spoiler:flags.2?true id:InputDocument video_cover:flags.3?InputPhoto video_timestamp:flags.4?int ttl_seconds:flags.0?int query:flags.1?string = InputMedia;

    messageMediaDocument#52d8ccd9 flags:# nopremium:flags.3?true spoiler:flags.4?true video:flags.6?true round:flags.7?true voice:flags.8?true document:flags.0?Document alt_documents:flags.5?Vector<Document> video_cover:flags.9?Photo video_timestamp:flags.10?int ttl_seconds:flags.2?int = MessageMedia;

Custom video covers can be provided by separately, including when resending existing videos with [inputMediaDocument](/constructor/inputMediaDocument.md), by populating the `video_cover` field, using a photo (if necessary uploaded using [messages.uploadMedia](/method/messages.uploadMedia.md)).  

The cover will then be available in [messageMediaDocument](/constructor/messageMediaDocument.md).`video_cover`.  

Custom video covers aren't supported in self-destructing messages, and aren't yet supported in secret chats.

#### Start video at timestamp

    inputMediaUploadedDocument#37c9330 flags:# nosound_video:flags.3?true force_file:flags.4?true spoiler:flags.5?true file:InputFile thumb:flags.2?InputFile mime_type:string attributes:Vector<DocumentAttribute> stickers:flags.0?Vector<InputDocument> video_cover:flags.6?InputPhoto video_timestamp:flags.7?int ttl_seconds:flags.1?int = InputMedia;
    inputMediaDocumentExternal#779600f9 flags:# spoiler:flags.1?true url:string ttl_seconds:flags.0?int video_cover:flags.2?InputPhoto video_timestamp:flags.3?int = InputMedia;
    inputMediaDocument#a8763ab5 flags:# spoiler:flags.2?true id:InputDocument video_cover:flags.3?InputPhoto video_timestamp:flags.4?int ttl_seconds:flags.0?int query:flags.1?string = InputMedia;

    messageMediaDocument#52d8ccd9 flags:# nopremium:flags.3?true spoiler:flags.4?true video:flags.6?true round:flags.7?true voice:flags.8?true document:flags.0?Document alt_documents:flags.5?Vector<Document> video_cover:flags.9?Photo video_timestamp:flags.10?int ttl_seconds:flags.2?int = MessageMedia;

    ---functions---

    messages.forwardMessages#13704a7c flags:# silent:flags.5?true background:flags.6?true with_my_score:flags.8?true drop_author:flags.11?true drop_media_captions:flags.12?true noforwards:flags.14?true allow_paid_floodskip:flags.19?true from_peer:InputPeer id:Vector<int> random_id:Vector<long> to_peer:InputPeer top_msg_id:flags.9?int reply_to:flags.22?InputReplyTo schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long video_timestamp:flags.20?int allow_paid_stars:flags.21?long suggested_post:flags.23?SuggestedPost = Updates;

The timestamp from which a video will start playing can be customized by populating the `video_timestamp` field, when uploading videos with [inputMediaUploadedDocument](/constructor/inputMediaUploadedDocument.md).`video_timestamp`, resending existing videos with [inputMediaDocument](/constructor/inputMediaDocument.md).`video_timestamp` and when forwarding them with [messages.forwardMessages](/method/messages.forwardMessages.md).`video_timestamp`.   

The starting timestamp will be available in [messageMediaDocument](/constructor/messageMediaDocument.md).`video_timestamp`.  

#### Albums, grouped media

    inputMediaUploadedPhoto#7d8375da flags:# spoiler:flags.2?true live_photo:flags.3?true file:InputFile stickers:flags.0?Vector<InputDocument> ttl_seconds:flags.1?int video:flags.3?InputDocument = InputMedia;
    inputMediaUploadedDocument#37c9330 flags:# nosound_video:flags.3?true force_file:flags.4?true spoiler:flags.5?true file:InputFile thumb:flags.2?InputFile mime_type:string attributes:Vector<DocumentAttribute> stickers:flags.0?Vector<InputDocument> video_cover:flags.6?InputPhoto video_timestamp:flags.7?int ttl_seconds:flags.1?int = InputMedia;
        
    inputSingleMedia#1cc6e91f flags:# media:InputMedia random_id:long message:string entities:flags.0?Vector<MessageEntity> = InputSingleMedia;

    ---functions---

    messages.sendMultiMedia#1bf89d74 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo multi_media:Vector<InputSingleMedia> schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long = Updates;

Telegram allows grouping photos into [albums](https://telegram.org/blog/albums-saved-messages) and generic files (audio, documents) into media groups.  

To do this, [messages.sendMultiMedia](/method/messages.sendMultiMedia.md) is used, wrapping each [InputMedia](/type/InputMedia.md) constructor (uploaded or pre-existing, maximum 10 per media group) into an [inputSingleMedia](/constructor/inputSingleMedia.md) constructor, optionally providing a custom per-file caption in `message`.  

For photo albums, clients should display an album caption only if exactly one photo in the group has a caption, otherwise no album caption should be displayed, and only when viewing in detail a specific photo of the group the caption should be shown.  
Other grouped media can display a caption under each file.  

#### Uploading by hash
    
    document#8fd4c4d8 flags:# id:long access_hash:long file_reference:bytes date:int mime_type:string size:long thumbs:flags.0?Vector<PhotoSize> video_thumbs:flags.1?Vector<VideoSize> dc_id:int attributes:Vector<DocumentAttribute> = Document;
    
    ---functions---
    
    messages.getDocumentByHash#b1f2061f sha256:bytes size:long mime_type:string = Document;

For some types of documents like GIFs, [messages.getDocumentByHash](/method/messages.getDocumentByHash.md) can be used to search for the document on Telegram servers.
The SHA256 hash of the file is computed, and it is passed along with the file's mime type and size to the method: if the file type is correct and the file is found, a [document](/constructor/document.md) is returned.

### Uploading profile or chat pictures

    photo#fb197a65 flags:# has_stickers:flags.0?true id:long access_hash:long file_reference:bytes date:int sizes:Vector<PhotoSize> video_sizes:flags.1?Vector<VideoSize> dc_id:int = Photo;

    photos.photo#20212ca8 photo:Photo users:Vector<User> = photos.Photo;
    
    inputPhoto#3bb3b94a id:long access_hash:long file_reference:bytes = InputPhoto;

    inputFile#f52ff27f id:long parts:int name:string md5_checksum:string = InputFile;
    
    videoSizeEmojiMarkup#f85c413c emoji_id:long background_colors:Vector<int> = VideoSize;
    videoSizeStickerMarkup#da082fe stickerset:InputStickerSet sticker_id:long background_colors:Vector<int> = VideoSize;

    inputChatUploadedPhoto#bdcdaec0 flags:# file:flags.0?InputFile video:flags.1?InputFile video_start_ts:flags.2?double video_emoji_markup:flags.3?VideoSize = InputChatPhoto;
    inputChatPhoto#8953ad37 id:InputPhoto = InputChatPhoto;

    emojiListNotModified#481eadfa = EmojiList;
    emojiList#7a1e11d1 hash:long document_id:Vector<long> = EmojiList;
    
    ---functions---
    
    photos.updateProfilePhoto#9e82039 flags:# fallback:flags.0?true bot:flags.1?InputUser id:InputPhoto = photos.Photo;
    photos.uploadProfilePhoto#388a3b5 flags:# fallback:flags.3?true bot:flags.5?InputUser file:flags.0?InputFile video:flags.1?InputFile video_start_ts:flags.2?double video_emoji_markup:flags.4?VideoSize = photos.Photo;
    
    messages.editChatPhoto#35ddd674 chat_id:long photo:InputChatPhoto = Updates;
    
    channels.editPhoto#f12e57c9 channel:InputChannel photo:InputChatPhoto = Updates;

    account.getDefaultProfilePhotoEmojis#e2750328 hash:long = EmojiList;
    account.getDefaultGroupPhotoEmojis#915860ae hash:long = EmojiList;

User profile pictures can be uploaded using the [photos.uploadProfilePhoto](/method/photos.updateProfilePhoto.md) method: the actual profile picture has to be [uploaded as for normal files](#uploading-files).  
[photos.uploadProfilePhoto](/method/photos.updateProfilePhoto.md) can also be used to reupload previously uploaded profile pictures.  

The optional `bot` flag can contain info of a [bot](/api/bots.md) we own, to change the profile photo of that bot, instead of the current user.

#### Animated profile pictures

Animated profile pictures are also supported, by populating the `video` flag: square MPEG4 videos up to `1080x1080` are supported, `800x800` is the recommended resolution.  
The `video_start_ts` is a floating point UNIX timestamp in seconds, indicating the frame of the video that should be used as static preview.  

[Chat, channel and supergroup](/api/channel.md) profile photos and videos can be uploaded using [messages.editChatPhoto](/method/messages.editChatPhoto.md) ([basic groups](/api/channel.md#basic-groups)) or [channels.editPhoto](/method/channels.editPhoto.md) ([channels, supergroups](/api/channel.md)).  
Use the [inputChatPhoto](/constructor/inputChatPhoto.md) to reuse previously uploaded profile pictures.  

#### Sticker profile pictures

[Sticker](/api/stickers.md) and [custom emoji sticker](/api/custom-emoji.md)-based profile pictures are also supported, by populating the `video_emoji_markup` flag with either a [videoSizeStickerMarkup](/constructor/videoSizeStickerMarkup.md) or a [videoSizeEmojiMarkup](/constructor/videoSizeEmojiMarkup.md) constructor.  

The profile picture should be rendered by placing the sticker at the center of a square canvas, in such a way that it occupies at most 67% of it. The background of the canvas is generated from `background_colors`, which contains a vector of 1, 2, 3 or 4 RGB-24 colors used to generate a solid (1), gradient (2) or freeform gradient (3, 4) background, similar to how [fill wallpapers](/api/wallpapers.md#fill-types) are generated. The rotation angle for gradient backgrounds is 0.  
If animated or video stickers/custom emojis are used, the `video_start_ts` flag can contain a floating point UNIX timestamp in seconds, indicating the frame of the profile picture that should be used as static preview.  

[account.getDefaultProfilePhotoEmojis](/method/account.getDefaultProfilePhotoEmojis.md) may be used to fetch a list of suggested [custom emojis](/api/custom-emoji.md) that can be used as profile pictures even by non-premium accounts; [account.getDefaultGroupPhotoEmojis](/method/account.getDefaultGroupPhotoEmojis.md) is the counterpart for group profile pictures.

The custom emoji selection UI should offer a list of categories to quickly filter results by a (list of) emojis, or by some other criteria, see [here&nbsp;&raquo;](/api/emoji-categories.md) for more info.  

### Downloading files

There are methods available to download files which have been successfully uploaded. The schema of the types and methods used is presented below:
    
    upload.file#96a18d5 type:storage.FileType mtime:int bytes:bytes = upload.File;
    upload.fileCdnRedirect#f18cda44 dc_id:int file_token:bytes encryption_key:bytes encryption_iv:bytes file_hashes:Vector<FileHash> = upload.File;

    storage.fileUnknown#aa963b05 = storage.FileType;
    storage.fileJpeg#7efe0e = storage.FileType;
    storage.fileGif#cae1aadf = storage.FileType;
    storage.filePng#a4f63c0 = storage.FileType;
    storage.fileMp3#528a0677 = storage.FileType;
    storage.fileMov#4b09ebbc = storage.FileType;
    storage.filePartial#40bc6f52 = storage.FileType;
    storage.fileMp4#b3cea0e4 = storage.FileType;
    storage.fileWebp#1081464c = storage.FileType;

    ---functions---

    upload.getFile#be5335be flags:# precise:flags.0?true cdn_supported:flags.1?true location:InputFileLocation offset:long limit:int = upload.File;

Any file can be downloaded by calling [upload.getFile](/method/upload.getFile.md). 
The data for the input parameter of the [InputFileLocation](/type/InputFileLocation.md) type is generated as follows:

    inputFileLocation#dfdaabe1 volume_id:long local_id:int secret:long file_reference:bytes = InputFileLocation;
    inputEncryptedFileLocation#f5235d55 id:long access_hash:long = InputFileLocation;
    inputDocumentFileLocation#bad07584 id:long access_hash:long file_reference:bytes thumb_size:string = InputFileLocation;
    inputSecureFileLocation#cbc7ee28 id:long access_hash:long = InputFileLocation;
    inputTakeoutFileLocation#29be5899 = InputFileLocation;
    inputPhotoFileLocation#40181ffe id:long access_hash:long file_reference:bytes thumb_size:string = InputFileLocation;
    inputPhotoLegacyFileLocation#d83466f3 id:long access_hash:long file_reference:bytes volume_id:long local_id:int secret:long = InputFileLocation;
    inputPeerPhotoFileLocation#37257e99 flags:# big:flags.0?true peer:InputPeer photo_id:long = InputFileLocation;
    inputStickerSetThumb#9d84f3db stickerset:InputStickerSet thumb_version:int = InputFileLocation;
    inputGroupCallStream#598a92a flags:# call:InputGroupCall time_ms:long scale:int video_channel:flags.0?int video_quality:flags.0?int = InputFileLocation;
    
    inputStickerSetEmpty#ffb62b95 = InputStickerSet;
    inputStickerSetID#9de7a269 id:long access_hash:long = InputStickerSet;
    inputStickerSetShortName#861cc8a0 short_name:string = InputStickerSet;
    inputStickerSetAnimatedEmoji#28703c8 = InputStickerSet;
    inputStickerSetDice#e67f520e emoticon:string = InputStickerSet;
    inputStickerSetAnimatedEmojiAnimations#cde3739 = InputStickerSet;

    inputPeerSelf#7da07ec9 = InputPeer;
    inputPeerChat#35a95cb9 chat_id:long = InputPeer;
    inputPeerUser#dde8a54c user_id:long access_hash:long = InputPeer;
    inputPeerChannel#27bcbbfc channel_id:long access_hash:long = InputPeer;

    photo#fb197a65 flags:# has_stickers:flags.0?true id:long access_hash:long file_reference:bytes date:int sizes:Vector<PhotoSize> video_sizes:flags.1?Vector<VideoSize> dc_id:int = Photo;
    document#8fd4c4d8 flags:# id:long access_hash:long file_reference:bytes date:int mime_type:string size:long thumbs:flags.0?Vector<PhotoSize> video_thumbs:flags.1?Vector<VideoSize> dc_id:int attributes:Vector<DocumentAttribute> = Document;
    
    photoSize#75c78e60 type:string w:int h:int size:int = PhotoSize;
    photoCachedSize#21e1ad6 type:string w:int h:int bytes:bytes = PhotoSize;

    chatPhoto#1c6e1c11 flags:# has_video:flags.0?true photo_id:long stripped_thumb:flags.1?bytes dc_id:int = ChatPhoto;
    userProfilePhoto#82d1f706 flags:# has_video:flags.0?true personal:flags.2?true photo_id:long stripped_thumb:flags.1?bytes dc_id:int = UserProfilePhoto;
    
* For photos, [inputPhotoFileLocation](/constructor/inputPhotoFileLocation.md) is used:
  * `id`, `file_reference` and `access_hash` taken from the [photo](/constructor/photo.md) constructor
  * `thumb_size` taken from the `type` field of the desired [PhotoSize](/type/PhotoSize.md)/[VideoSize](/type/VideoSize.md) of the [photo](/constructor/photo.md)
  
* For profile pictures of users, channels, supergroups and groups, [inputPeerPhotoFileLocation](/constructor/inputPeerPhotoFileLocation.md) has to be used:
  * `peer` is the identifier of the peer whose photo we want to download
  * `big` is used to choose whether to download the full-resolution picture, or just the thumbnail
  * `photo_id` is extracted from the [chatPhoto](/constructor/chatPhoto.md) or [userProfilePhoto](/constructor/userProfilePhoto.md) of the desired profile photo
  
* For documents, [inputDocumentFileLocation](/constructor/inputDocumentFileLocation.md) is used:
  * `id`, `file_reference` and `access_hash` taken from the [document](/constructor/document.md) constructor
  * If downloading the thumbnail of a document or a [premium sticker effect](/api/stickers.md#premium-animated-sticker-effects), `thumb_size` should be taken from the `type` field of the desired [PhotoSize](/type/PhotoSize.md)/[VideoSize](/type/VideoSize.md) of the [photo](/constructor/photo.md); otherwise, provide an empty string.

* For previews of sticker sets, [inputStickerSetThumb](/constructor/inputStickerSetThumb.md) is used (note: to download stickers and previews of stickers use the document method described above for documents):
  * `stickerset` is set to the [InputStickerSet](/type/InputStickerSet.md) constructor generated from [stickerSet](/constructor/stickerSet.md)
  * `thumb_version` is copied from the same field in [stickerSet](/constructor/stickerSet.md)

* For encrypted secret chat and telegram passport documents, respectively [inputEncryptedFileLocation](/constructor/inputEncryptedFileLocation.md) and [inputSecureFileLocation](/constructor/inputSecureFileLocation.md) have to be used, with parameters extracted from [encryptedFile](/constructor/encryptedFile.md) and [secureFile](/constructor/secureFile.md) ([passport docs](/passport.md)).

* For livestream chunks, [inputGroupCallStream](/constructor/inputGroupCallStream.md) is used:
  * `call` contains the related group call ID+access hash, taken from the [groupCall](/constructor/groupCall.md) constructor.
  * `time_ms` specifies the timestamp to fetch
  * `scale` specifies the duration of the media segment to fetch. To obtain this value in milliseconds, bitshift `1000` to the right `scale` times: `duration_ms := 1000 >> scale`.
  * `video_channel` specifies the video channel to fetch
  * `video_quality` specifies the selected video quality (0 = lowest, 1 = medium, 2 = best)
  
  See [here &raquo;](/api/group-calls.md#downloading-media-chunks) for more info.   
  
* For old **deprecated** photos, if the client has cached some old fileLocations with the **deprecated** `secret` identifier, [inputFileLocation](/constructor/inputFileLocation.md) or [inputPhotoLegacyFileLocation](/constructor/inputPhotoLegacyFileLocation.md) is used (this is mainly used for backwards compatibility with bot API file IDs, all user clients must use the modern [inputPhotoFileLocation](/constructor/inputPhotoFileLocation.md) file IDs): 
  * All fields are taken from the previously cached fileLocation except for `file_reference`, `access_hash` and `id`, which are taken from the [photo](/constructor/photo.md) constructor (the last two fields are used only if available, in which case [inputPhotoLegacyFileLocation](/constructor/inputPhotoLegacyFileLocation.md) is used instead of [inputFileLocation](/constructor/inputFileLocation.md)).

The size of each file in bytes is available, which makes it possible to download the file in parts using the parameters **offset** and **limit**, similar to the way files are uploaded.

If **precise** flag is not specified, then 

* The parameter **offset** must be divisible by 4 KB.
* The parameter **limit** must be divisible by 4 KB.
* 1048576 (1 MB) must be divisible by **limit**.

If **precise** is specified, then

* The parameter **offset** must be divisible by 1 KB.
* The parameter **limit** must be divisible by 1 KB.
* **limit** must not exceed 1048576 (1 MB).

In any case the requested part should be within one 1 MB chunk from the beginning of the file, i. e.

* **offset** / (1024 \* 1024) == \(**offset** + **limit** - 1) / (1024 \* 1024).

When downloading multiple files in parallel from the same DC, clients should limit the parallelism to download at most `small_queue_max_active_operations_count`/`large_queue_max_active_operations_count` files in parallel when downloading files smaller/bigger than 20MB ([client configuration parameters&nbsp;&raquo;](/api/config.md#client-configuration)).  

The file download operation may return an [upload.fileCdnRedirect](/constructor/upload.fileCdnRedirect.md) constructor: in this case, [these](/cdn.md) instructions must be followed for downloading CDN files.
The file download operation may also return one of the following [data input errors](/api/errors.md#400-bad-request):

* FILE_REFERENCE_EXPIRED: The `file_reference` field of the input location must be [refreshed as specified here &raquo;](/api/file-references.md).  
* FILE_REFERENCE_INVALID: The `file_reference` field of the input location is invalid and must be [refreshed as specified here &raquo;](/api/file-references.md).  
* FILE_ID_INVALID: The file address is invalid
* OFFSET_INVALID: The **offset** value is invalid
* LIMIT_INVALID: The **limit** value is invalid
* FILE_MIGRATE_X: The file is in the datacenter No. X
* FLOOD_WAIT_X: Repeat the query after X seconds
* FLOOD_PREMIUM_WAIT_X: Indicates that download speed is limited because the current account does not have a [Premium](/api/premium.md) subscription, and that the query must be automatically repeated by the client after X seconds.  
  When receiving this error, clients should display the [Telegram Premium subscription modal](/api/premium.md), offering the user to purchase a Premium subscription to increase download speed [upload_premium_speedup_download&nbsp;&raquo;](/api/config.md#upload-premium-speedup-download) times.  
  Note that this modal should only be displayed if the file that is being downloaded is currently visible to the user; if it isn't, the modal should be displayed once the loading/already loaded media becomes visible.  
  Also, this modal should only be shown **at most** every [upload_premium_speedup_notify_period&nbsp;&raquo;](/api/config.md#upload-premium-speedup-notify-period), to avoid bombarding the user with this popup for every file whose download is slowed down.  
  This error can only be received when the user has uploaded tens of gigabytes or more.  

#### Verifying downloaded chunks
    
    fileHash#f39b035c offset:long limit:int hash:bytes = FileHash;

    ---functions---
    
    upload.getFileHashes#9156982a location:InputFileLocation offset:long = Vector<FileHash>;
    

In order to confirm the integrity of the downloaded file, clients are recommended to verify hashes for each downloaded part, as for [CDN DCs](/cdn.md). 
[upload.getFileHashes](/method/upload.getFileHashes.md) contain [FileHash](/type/FileHash.md) constructors. Each of these constructors contains the SHA-256 hash of a part of the file that starts with `offset` and takes `limit` bytes.

Before saving each portion of the data received from the DC into the file, the client can confirm that its hash matches the hash that was received from the master DC. If missing a hash for any file part, client developers must use the [upload.getFileHashes](/method/upload.getFileHashes.md) method to obtain the missing hash.

#### Handling audio, video and vector previews

Schema:

    photoSizeEmpty#e17e23c type:string = PhotoSize;
    photoSize#75c78e60 type:string w:int h:int size:int = PhotoSize;
    photoCachedSize#21e1ad6 type:string w:int h:int bytes:bytes = PhotoSize;
    photoStrippedSize#e0b0bc2e type:string bytes:bytes = PhotoSize;
    photoSizeProgressive#fa3efb95 type:string w:int h:int sizes:Vector<int> = PhotoSize;
    photoPathSize#d8214d41 type:string bytes:bytes = PhotoSize;

    videoSize#de33b094 flags:# type:string w:int h:int size:int video_start_ts:flags.0?double = VideoSize;
    
    document#8fd4c4d8 flags:# id:long access_hash:long file_reference:bytes date:int mime_type:string size:long thumbs:flags.0?Vector<PhotoSize> video_thumbs:flags.1?Vector<VideoSize> dc_id:int attributes:Vector<DocumentAttribute> = Document;
    photo#fb197a65 flags:# has_stickers:flags.0?true id:long access_hash:long file_reference:bytes date:int sizes:Vector<PhotoSize> video_sizes:flags.1?Vector<VideoSize> dc_id:int = Photo;
    
    photo#fb197a65 flags:# has_stickers:flags.0?true id:long access_hash:long file_reference:bytes date:int sizes:Vector<PhotoSize> video_sizes:flags.1?Vector<VideoSize> dc_id:int = Photo;

Telegram attaches a vector of thumbnails with reduced resolution to all uploaded media.  
The server also generates a trimmed and scaled down video preview for videos, GIFs and animated profile pictures.  

#### `PhotoSize.type` values

Each [PhotoSize](/type/PhotoSize.md) constructor has a `type` field, indicating the resolution and image transform that was applied server-side.  

<!-- start PhotoSize.type values -->

- `s` - Server-side resized image, bounded by 100x100 pixels.
- `m` - Server-side resized image, bounded by 320x320 pixels.
- `x` - Server-side resized image, bounded by 800x800 pixels.
- `y` - Server-side resized image, bounded by 1280x1280 pixels.
- `w` - Server-side resized image, bounded by 2560x2560 pixels.
- `a` - Server-side cropped image, 160x160 pixels.
- `b` - Server-side cropped image, 320x320 pixels.
- `c` - Server-side cropped image, 640x640 pixels.
- `d` - Server-side cropped image, 1280x1280 pixels.
- `i` - Stripped thumbnail, see [stripped thumbnails &raquo;](#stripped-thumbnails).
- `j` - Vector outline thumbnail, see [vector thumbnails &raquo;](#vector-thumbnails).

<!-- end PhotoSize.type values -->

#### Stripped thumbnails

    photoStrippedSize#e0b0bc2e type:string bytes:bytes = PhotoSize;

A [photoStrippedSize](/constructor/photoStrippedSize.md) (with type `i`) is an extremely low-res thumbnail, embedded directly inside media location objects.  
It should be shown to the user in chat message previews, or while still downloading the most appropriately sized [photoSize](/constructor/photoSize.md) through the media DCs as [described above](#downloading-files).  

The stripped `bytes` payload should be inflated to a JPG payload as seen [here&nbsp;&raquo;](https://github.com/desktop-app/lib_ui/blob/742640cb626f05350d6dd73b043bbf470daff5ec/ui/image/image_prepare.cpp#L1395).

#### Vector thumbnails

    photoPathSize#d8214d41 type:string bytes:bytes = PhotoSize;

Messages with [animated](/api/stickers.md#animated-stickers), [video](/api/stickers.md#video-stickers), [static](/api/stickers.md#static-stickers) stickers can have a compressed svg (&lt; 300 bytes) to show the outline of the sticker before fetching the actual sticker.
Sticker outlines will have a `j` type [photoPathSize](/constructor/photoPathSize.md) thumbnail.  

This specific vector thumbnail consists of an [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths), specially encoded to save space.  
This path will be the outline of the animated sticker, and should be shown to the user while downloading the actual sticker.  

The payload should be inflated using the following algorithm:

```
encoded := photoPathSize.bytes

lookup := "AACAAAAHAAALMAAAQASTAVAAAZaacaaaahaaalmaaaqastava.az0123456789-,"

path := "M"

len := strlen(encoded)
for (i = 0; i < len; i++) {
  num := ord(encoded[i])
  if (num >= 128 + 64) {
    path += lookup[num - 128 - 64]
  } else {
    if (num >= 128) {
      path += ','
    } else if (num >= 64) {
      path += '-'
    }
    path += itoa(num & 63)
  }
}
path += "z"
```

`path` will contain the actual SVG path that can be directly inserted in the `d` attribute of an [svg &lt;path&gt; element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path):  

```
<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
   viewBox="0 0 512 512" xml:space="preserve">
<path d="{$path}"/>
</svg>
```

#### `videoSize.type` values

    videoSize#de33b094 flags:# type:string w:int h:int size:int video_start_ts:flags.0?double = VideoSize;

A [videoSize](/constructor/videoSize.md) constructor is typically used for [animated profile pictures](#animated-profile-pictures), video previews and [premium sticker effects&nbsp;&raquo;](/api/stickers.md#premium-animated-sticker-effects).

<!-- start videoSize.type values -->

- `p` - Small animated profile picture preview, in MPEG4 format.
- `u` - Animated profile picture, in MPEG4 format.
- `v` - Video preview, in MPEG4 format.
- `f` - [Premium sticker effect&nbsp;&raquo;](/api/stickers.md#premium-animated-sticker-effects), in [TGS&nbsp;&raquo;](/api/stickers.md#animated-stickers) format.

<!-- end videoSize.type values -->

### Downloading webfiles

Remote HTTP files sent by inline bots [in response to inline queries](/type/BotInlineResult.md) and in other places are represented by [WebDocument](/type/WebDocument.md) constructors.
When forwarding such remote HTTP files, they should be sent using [external InputMedia constructors](/type/InputMedia.md).
Remote HTTP files can only be downloaded directly by the client if contained in a [webDocumentNoProxy](/constructor/webDocumentNoProxy.md) constructor: in this case, the file is deemed safe to download (this is the case for HTTPS files from certain trusted domains).

However, if the remote file is contained in a [webDocument](/constructor/webDocument.md), to avoid leaking sensitive information the file must be downloaded through Telegram's servers.
This can be done in a manner similar to [normal files](#downloading-files), with the difference that [upload.getWebFile](/method/upload.getWebFile.md) must be used, instead.  

The [upload.getWebFile](/method/upload.getWebFile.md) method is also used to generate preview pictures for maps and download music file covers, as follows.  

**Note**: the [upload.getWebFile](/method/upload.getWebFile.md) query must be sent to the DC specified in the `webfile_dc_id` [MTProto configuration field](/api/config.md#mtproto-configuration).  

    upload.webFile#21e753bc size:int mime_type:string file_type:storage.FileType mtime:int bytes:bytes = upload.WebFile;

    storage.fileUnknown#aa963b05 = storage.FileType;
    storage.fileJpeg#7efe0e = storage.FileType;
    storage.fileGif#cae1aadf = storage.FileType;
    storage.filePng#a4f63c0 = storage.FileType;
    storage.fileMp3#528a0677 = storage.FileType;
    storage.fileMov#4b09ebbc = storage.FileType;
    storage.filePartial#40bc6f52 = storage.FileType;
    storage.fileMp4#b3cea0e4 = storage.FileType;
    storage.fileWebp#1081464c = storage.FileType;
    
     ---functions---

    upload.getWebFile#24e6818d location:InputWebFileLocation offset:int limit:int = upload.WebFile;

The [InputWebFileLocation](/type/InputWebFileLocation.md) constructor is generated as follows.

    inputWebFileLocation#c239d686 url:string access_hash:long = InputWebFileLocation;
    inputWebFileGeoPointLocation#9f2221c9 geo_point:InputGeoPoint access_hash:long w:int h:int zoom:int scale:int = InputWebFileLocation;
    inputWebFileAudioAlbumThumbLocation#f46fe924 flags:# small:flags.2?true document:flags.0?InputDocument title:flags.1?string performer:flags.1?string = InputWebFileLocation;

    webDocument#1c570ed1 url:string access_hash:long size:int mime_type:string attributes:Vector<DocumentAttribute> = WebDocument;

    inputGeoPoint#48222faf flags:# lat:double long:double accuracy_radius:flags.0?int = InputGeoPoint;

    geoPoint#b2a2f663 flags:# long:double lat:double access_hash:long accuracy_radius:flags.0?int = GeoPoint;

* [inputWebFileLocation](/constructor/inputWebFileLocation.md) is simply generated by taking the `url` and `access_hash` fields of the [webDocument](/constructor/webDocument.md) constructor.
* [inputWebFileGeoPointLocation](/constructor/inputWebFileGeoPointLocation.md) is used to download a server-generated image with the map preview from a [geoPoint](/constructor/geoPoint.md).
  * `geo_point` is generated from the `lat`, `long` `accuracy_radius` parameters of the [geoPoint](/constructor/geoPoint.md)
  * `access_hash` is the access hash of the [geoPoint](/constructor/geoPoint.md)
  * `w` - Map width in pixels before applying scale; 16-1024
  * `h` - Map height in pixels before applying scale; 16-1024
  * `zoom` - Map zoom level; 13-20
  * `scale` - Map scale; 1-3
* [inputWebFileAudioAlbumThumbLocation](/constructor/inputWebFileAudioAlbumThumbLocation.md) is used to download an album cover with `600x600` resolution for any music file missing embedded album art.
  Note that the `document` field containing the music file must NOT be provided in secret chats: the locally extracted `title` and `performer` fields should be provided, instead.  
  In normal chats `document` should always be provided instead of `title` and `performer`, as it has more lax flood limits.  
  * `small` if set, downloads a `100x100` thumbnail instead.
  * `document` contains the music file: MUST NOT be provided in secret chats.
  * `title` contains the song title: should only be provided in secret chats.
  * `performer` contains the song performer: should only be provided in secret chats.

### General Considerations

    dcOption#18b7a10d flags:# ipv6:flags.0?true media_only:flags.1?true tcpo_only:flags.2?true cdn:flags.3?true static:flags.4?true this_port_only:flags.5?true id:int ip_address:string port:int secret:flags.10?bytes = DcOption;

It is recommended that large queries ([upload.getFile](/method/upload.getFile.md), [upload.saveFilePart](/method/upload.saveFilePart.md), [upload.getWebFile](/method/upload.getWebFile.md)) be handled through one or more separate sessions and separate connections, in which no methods other than these should be executed.  
This way, data transfer will cause less interference with [getting updates](/api/updates.md) and other method calls.  
If a media DC with the required DC ID is available ([dcOption](/constructor/dcOption.md) will have the `media` flag set), queries must be sent to that DC.  

These dedicated file transfer sessions are one of the two uses of running [multiple parallel sessions over a single authorization key&nbsp;&raquo;](/api/datacenter.md#parallel-sessions): each is just an extra [session_id](/mtproto/description.md#session) over the same `auth_key_id`, never carries [updates](/api/updates.md#subscribing-to-updates), and can be opened without any re-authorization.
The other use — running several parallel sessions on the **main** connection to increase RPC throughput — is controlled by the server through the `tmp_sessions` field, see [parallel sessions&nbsp;&raquo;](/api/datacenter.md#parallel-sessions).  

### Related articles 

#### [Handling file references](/api/file-references.md)
How to handle file references.
