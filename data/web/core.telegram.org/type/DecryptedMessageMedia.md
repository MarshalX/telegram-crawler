# DecryptedMessageMedia

Object describes media contents of an encrypted message.

```tl
===8===
decryptedMessageMediaEmpty#89f5c4a = DecryptedMessageMedia;
decryptedMessageMediaPhoto#32798a8c thumb:bytes thumb_w:int thumb_h:int w:int h:int size:int key:bytes iv:bytes = DecryptedMessageMedia;
decryptedMessageMediaVideo#4cee6ef3 thumb:bytes thumb_w:int thumb_h:int duration:int w:int h:int size:int key:bytes iv:bytes = DecryptedMessageMedia;
decryptedMessageMediaGeoPoint#35480a59 lat:double long:double = DecryptedMessageMedia;
decryptedMessageMediaContact#588a0a97 phone_number:string first_name:string last_name:string user_id:int = DecryptedMessageMedia;
decryptedMessageMediaDocument#b095434b thumb:bytes thumb_w:int thumb_h:int file_name:string mime_type:string size:int key:bytes iv:bytes = DecryptedMessageMedia;
decryptedMessageMediaAudio#6080758f duration:int size:int key:bytes iv:bytes = DecryptedMessageMedia;

===17===
decryptedMessageMediaVideo#524a415d thumb:bytes thumb_w:int thumb_h:int duration:int mime_type:string w:int h:int size:int key:bytes iv:bytes = DecryptedMessageMedia;
decryptedMessageMediaAudio#57e0a9cb duration:int mime_type:string size:int key:bytes iv:bytes = DecryptedMessageMedia;

===23===
decryptedMessageMediaExternalDocument#fa95b0dd id:long access_hash:long date:int mime_type:string size:int thumb:PhotoSize dc_id:int attributes:Vector<DocumentAttribute> = DecryptedMessageMedia;

===45===
decryptedMessageMediaPhoto#f1fa8d78 thumb:bytes thumb_w:int thumb_h:int w:int h:int size:int key:bytes iv:bytes caption:string = DecryptedMessageMedia;
decryptedMessageMediaVideo#970c8c0e thumb:bytes thumb_w:int thumb_h:int duration:int mime_type:string w:int h:int size:int key:bytes iv:bytes caption:string = DecryptedMessageMedia;
decryptedMessageMediaDocument#7afe8ae2 thumb:bytes thumb_w:int thumb_h:int mime_type:string size:int key:bytes iv:bytes attributes:Vector<DocumentAttribute> caption:string = DecryptedMessageMedia;
decryptedMessageMediaVenue#8a0df56f lat:double long:double title:string address:string provider:string venue_id:string = DecryptedMessageMedia;
decryptedMessageMediaWebPage#e50511d8 url:string = DecryptedMessageMedia;

===143===
decryptedMessageMediaDocument#6abd9782 thumb:bytes thumb_w:int thumb_h:int mime_type:string size:long key:bytes iv:bytes attributes:Vector<DocumentAttribute> caption:string = DecryptedMessageMedia;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [decryptedMessageMediaEmpty](/constructor/decryptedMessageMediaEmpty.md) | Empty constructor, no media content. |
| [decryptedMessageMediaPhoto](/constructor/decryptedMessageMediaPhoto.md) | Photo attached to an encrypted message. |
| [decryptedMessageMediaVideo](/constructor/decryptedMessageMediaVideo.md) | Video attached to an encrypted message. |
| [decryptedMessageMediaGeoPoint](/constructor/decryptedMessageMediaGeoPoint.md) | GeoPoint attached to an encrypted message. |
| [decryptedMessageMediaContact](/constructor/decryptedMessageMediaContact.md) | Contact attached to an encrypted message. |
| [decryptedMessageMediaDocument](/constructor/decryptedMessageMediaDocument.md) | Document attached to a message in a secret chat. |
| [decryptedMessageMediaAudio](/constructor/decryptedMessageMediaAudio.md) | Audio file attached to a secret chat message. |
| [decryptedMessageMediaExternalDocument](/constructor/decryptedMessageMediaExternalDocument.md) | Non-e2e documented forwarded from non-secret chat |
| [decryptedMessageMediaVenue](/constructor/decryptedMessageMediaVenue.md) | Venue |
| [decryptedMessageMediaWebPage](/constructor/decryptedMessageMediaWebPage.md) | Webpage preview |