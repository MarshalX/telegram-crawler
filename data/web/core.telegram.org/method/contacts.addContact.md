# contacts.addContact

Add an existing telegram user as contact.

Use [contacts.importContacts](/method/contacts.importContacts.md) to add contacts by phone number, without knowing their Telegram ID.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
contacts.addContact#d9ba2e54 flags:# add_phone_privacy_exception:flags.0?true id:InputUser first_name:string last_name:string phone:string note:flags.1?TextWithEntities = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **add\_phone\_privacy\_exception** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Allow the other user to see our phone number? |
| **id** | [InputUser](/type/InputUser.md) | Telegram ID of the other user |
| **first\_name** | [string](/type/string.md) | First name |
| **last\_name** | [string](/type/string.md) | Last name |
| **phone** | [string](/type/string.md) | User's phone number, may be omitted to simply add the user to the contact list, without a phone number. |
| **note** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[TextWithEntities](/type/TextWithEntities.md) | A private note for this contact, only visible to us; see [here »](/api/contacts.md#private-notes-for-contacts) for more info on contact notes. |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CONTACT\_ID\_INVALID | The provided contact ID is invalid. |
| 400 | CONTACT\_NAME\_EMPTY | Contact name empty. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |

### Related pages

#### [Contact list](/api/contacts.md)
Working with contacts.

#### [contacts.importContacts](/method/contacts.importContacts.md)
Imports contacts: saves a full list on the server, adds already registered contacts to the contact list, returns added contacts and their info.

Use [contacts.addContact](/method/contacts.addContact.md) to add Telegram contacts without actually using their phone number.