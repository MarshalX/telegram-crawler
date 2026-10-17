# Styled text with message entities


Telegram supports styled text using [message entities](/type/MessageEntity.md).

A client that wants to send styled messages would simply have to integrate a [Markdown](https://en.wikipedia.org/wiki/Markdown)/[HTML](https://en.wikipedia.org/wiki/HTML) parser, and generate an array of message entities by iterating through the parsed tags.  

Nested entities are supported.

### Entity length

Special care must be taken to consider the length of strings when generating message entities as the number of [UTF-16](https://en.wikipedia.org/wiki/UTF-16) code units, even if the message itself must be encoded using UTF-8.  

Example implementations: [tdlib](https://github.com/tdlib/td/tree/master/td/telegram/MessageEntity.cpp), [MadelineProto](https://github.com/danog/telegram-entities/blob/master/src/Entities.php).

#### Unicode codepoints and encoding

A [Unicode](https://en.wikipedia.org/wiki/Unicode) [code point](https://en.wikipedia.org/wiki/Code_point) is a number ranging from `0x0` to `0x10FFFF`, usually represented using `U+0000` to `U+10FFFF` syntax.  
Unicode defines a codespace of 1,112,064 assignable code points within the `U+0000` to `U+10FFFF` range.  
Each of the assignable codepoints, once assigned by the Unicode consortium, maps to a specific character, emoji or control symbol.  

The Unicode codespace is further subdivided into 17 planes:
- Plane 1: `U+0000` to `U+FFFF`: Basic Multilingual Plane (BMP)
- Planes 2-17: `U+00000` to `U+10FFFF`: Multiple supplementary planes as specified [by the Unicode standard](https://en.wikipedia.org/wiki/Plane_(Unicode))

Since storing a 21-bit number for each letter would result in a waste of space, the Unicode consortium defines multiple encodings that allow storing a code point into a smaller _code unit_:  

#### UTF-8

[UTF-8&nbsp;&raquo;](https://en.wikipedia.org/wiki/UTF-8) is a Unicode encoding that allows storing a 21-bit Unicode code point into _code units_ as small as 8 bits.  
UTF-8 is used by the MTProto and Bot API when transmitting and receiving fields of type [string](/type/string.md).  

#### UTF-16

[UTF-16&nbsp;&raquo;](https://en.wikipedia.org/wiki/UTF-16) is a Unicode encoding that allows storing a 21-bit Unicode code point into one or two 16-bit _code units_.  

UTF-16 is used when computing the length and offsets of entities in the MTProto and bot APIs, by counting the number of UTF-16 code units (**not** code points).

#### Computing entity length

* Code points in the BMP (`U+0000` to `U+FFFF`) count as 1, because they are encoded into a single UTF-16 code unit
* Code points in all other planes count as 2, because they are encoded into two UTF-16 code units (also called surrogate pairs)

A simple, but not very efficient way of computing the entity length is converting the text to UTF-16, and then taking the byte length divided by 2 (=number of UTF-16 code units).

However, since UTF-8 encodes codepoints in non-BMP planes as a 32-bit code unit starting with `0b11110`, a more efficient way to compute the entity length without converting the message to UTF-16 is the following:  
* If the byte marks the beginning of a 32-bit UTF-8 code unit (all bytes starting with `0b11110`) increment the count by 2, otherwise
* If the byte marks the beginning of a UTF-8 code unit (all bytes not starting with `0b10`) increment the count by 1.

Example:  
```
length := 0
for byte in text {
    if (byte & 0xc0) != 0x80 {
        length += (byte >= 0xf0 ? 2 : 1)
    }
}
```

**Note**: the _length_ of an entity **must not** include the length of trailing newlines or whitespaces, `rtrim` entities before computing their length: however, the next _offset_ **must** include the length of newlines or whitespaces that precede it.  

Example implementations: [tdlib](https://github.com/tdlib/td/tree/master/td/telegram/MessageEntity.cpp), [MadelineProto](https://github.com/danog/telegram-entities/blob/master/src/Entities.php).

### Allowed entities

#### Manual entities

The following entities need to be manually specified by the user through formatting options.  

* [**messageEntityBold**](/constructor/messageEntityBold.md) => `<b>bold</b>`, `<strong>bold</strong>`, `**bold**`
* [*messageEntityItalic*](/constructor/messageEntityItalic.md) => `<i>italic</i>`, `<em>italic</em>` `*italic*`
* [`messageEntityCode`&nbsp;&raquo;](/constructor/messageEntityCode.md) => `<code>code</code>`, `` `code` ``
* [~~messageEntityStrike~~](/constructor/messageEntityStrike.md) => `<s>strike</s>`, `<strike>strike</strike>`, `<del>strike</del>`, `~~strike~~`
* [<u>messageEntityUnderline</u>](/constructor/messageEntityUnderline.md) => `<u>underline</u>`
* [messageEntityBlockquote](/constructor/messageEntityBlockquote.md) => 
  > Block quote
* [`messageEntityPre`&nbsp;&raquo;](/constructor/messageEntityPre.md) => `<pre language="c++">code</pre>`, 

    <pre>
    &#x60;&#x60;&#x60;c++
    code
    &#x60;&#x60;&#x60;
    </pre>
    
    Cannot be nested inside other entities.
* [messageEntitySpoiler](/constructor/messageEntitySpoiler.md) => Used to hide certain parts of a message behind an animated spoiler: the underlying text is revealed only by a manual click
* [inputMessageEntityMentionName](/constructor/inputMessageEntityMentionName.md)/[messageEntityMentionName](/constructor/messageEntityMentionName.md) => [Mention a user by ID/username](https://t.me/botfather)
* [messageEntityCustomEmoji](/constructor/messageEntityCustomEmoji.md) => used for [custom emojis&nbsp;&raquo;](/api/custom-emoji.md)
* [messageEntityFormattedDate](/constructor/messageEntityFormattedDate.md) => used to point at a specific point in time, rendered as specified [here &raquo;](/constructor/messageEntityFormattedDate.md); cannot be nested inside other entities.

##### Date entities

    messageEntityFormattedDate#904ac7c7 flags:# relative:flags.0?true short_time:flags.1?true long_time:flags.2?true short_date:flags.3?true long_date:flags.4?true day_of_week:flags.5?true offset:int length:int date:int = MessageEntity;

The [messageEntityFormattedDate](/constructor/messageEntityFormattedDate.md) entity represents a specific point in time.  

The `date` field must be populated with a UNIX timestamp, that can range from `0` to the current date plus 1098 days (`time()+1098*86400`).  

Clicking on this entity should bring up a context menu with three options:

- Copy the date (formatted using the `long_date` + `long_time` format, regardless of the value of the flags) to the clipboard
- Add the date to the system calendar
- Schedule a reminder, by scheduling the message to saved messages, invoking [messages.forwardMessages](/method/messages.forwardMessages.md) with the ID of the current message, `schedule_date` set to the date specified in this entity and `to_peer`=[inputPeerSelf](/constructor/inputPeerSelf.md)

If none of the optional flags are set, the selected text should be rendered as a link, without changes to the text itself.  

Otherwise, it should be rendered as a link, replacing the text with the date rendered using the current user's timezone and the format specified by the provided flags:  

- `relative`: if set, render a relative date, i.e. `In 1 second/minute/hour/day/week/month/year` or `1 second/minute/hour/day/week/month/year ago`.  
  Round down to the closest unit only, for example, depending on the value passed to `date`:
  
  - `time()+10` - `in 10 seconds`
  - `time()+60+10` - `in 1 minute`
  - `time()+3600+60+10` - `in 1 hour`
  - `time()+86400+60+10` - `in 1 day`
  - `time()+31*86400+86400+60+10` - `in 1 month`
  - `time()+365*86400+31*86400+86400+60+10` - `in 1 year`

  And the same for dates in the past:
  - `time()-10` - `10 seconds ago`
  - `time()-60-10` - `1 minute ago`
  - `time()-3600-60-10` - `1 hour ago`
  - `time()-86400-60-10` - `1 day ago`
  - `time()-31*86400-86400-60-10` - `1 month ago`
  - `time()-365*86400-31*86400-86400-60-10` - `1 year ago`

  The date must be updated in realtime by the client when the message is visible by the user, according to the current date.  
- `short_time`: renders the time in short format: hours and minutes, according to the user's locale settings
- `long_time`: renders the time in long format: hours, minutes, seconds and maybe timezone, according to the user's locale settings
- `short_date`: renders the time in short format: month, date, (and year, if different from the current one), all according the user's locale settings.
- `long_date`: renders the time in long format: always month, date and year, all according the user's locale settings.
- `day_of_week`: renders the day of the week according to the user's locale settings.

All flags are optional, with the following limitations:

- `relative` cannot combined with any other flag
- `short_time` and `long_time` cannot be combined with each other
- `short_date` and `long_date` cannot be combined with each other

If any of the flags are combined, their rendering order in the text is the following:

- `day_of_week`
- `short_time`/`long_time`
- `short_date`/`long_date`

The maximum text span that can be covered by a date entity is 31 UTF-16 code units if any of the date formatting flags is set, or 127 UTF-16 code units without.  

#### Autogenerated entities

The following entities are automatically generated by the server for URLs, hashtags, emails, bot commands, etc, simplifying the message rendering logic for clients (so they don't have to implement autolinking for URLs and other common clickable sections).  

These entities turn certain sections of the message blue and make them clickable, triggering a specific action:

* [messageEntityMention](/constructor/messageEntityMention.md) => Used to mention a user/channel/supergroup by @username, generated automatically server-side for @usernames in messages: when pressed, should bring up the target's profile.  
- [messageEntityHashtag](/constructor/messageEntityHashtag.md) => For `#hashtags`: when clicked, the client should [search for all messages with the specified hashtag in the current chat &raquo;](/api/search.md#hashtag-search)
- [messageEntityCashtag](/constructor/messageEntityCashtag.md) => For `$cashtags`: when clicked, the client should [search for all messages with the specified cashtag in the current chat &raquo;](/api/search.md#hashtag-search)
- [messageEntityBotCommand](/constructor/messageEntityBotCommand.md) => For bot `/commands`: when clicked in a group or private chat, the client should send the same command within the chat
- [messageEntityUrl](/constructor/messageEntityUrl.md) => For plain text URLs and [deep links](/api/links.md): when clicked, the client should open the link in the in-app browser.
- [messageEntityEmail](/constructor/messageEntityEmail.md) => For emails: when clicked, the client should invoke the default intent used to send emails, opening the preferred email client.
- [messageEntityBankCard](/constructor/messageEntityBankCard.md) => For bank card numbers: when long-pressed, should invoke [payments.getBankCardData](/method/payments.getBankCardData.md), passing the card number to `number`

Note that clients still have to manually add the entities specified above to messages when sending messages to [E2E secret chats &raquo;](/api/end-to-end.md), since the server cannot inspect and modify messages sent to E2E-encrypted secret chats.  

#### Diff entities

    messageEntityDiffInsert#71777116 offset:int length:int = MessageEntity;
    messageEntityDiffDelete#652c1c5 offset:int length:int = MessageEntity;
    messageEntityDiffReplace#c6c1e5a7 offset:int length:int old_text:string = MessageEntity;

    textWithEntities#751f3146 text:string entities:Vector<MessageEntity> = TextWithEntities;

Diff entities are currently only returned by the [AI composer &raquo;](/api/ai.md), and cannot be used in normal messages.  

Diff entities simplify the client-side logic, by letting the server pre-generate the diff between two texts.  

These entities are rendered only within the context of the containing [textWithEntities](/constructor/textWithEntities.md): no other information apart from `text` and `entities` is needed (i.e. no need to do any diffing manually).  

- [messageEntityDiffInsert](/constructor/messageEntityDiffInsert.md) - Represents an addition: render it by simply <u>underlining</u> the section delimited by `offset` and `limit` and coloring it in green.  
- [messageEntityDiffInsert](/constructor/messageEntityDiffInsert.md) - Represents a deletion: render it by simply <u>underlining</u> the section delimited by `offset` and `limit` and coloring it in red.  
- [messageEntityDiffReplace](/constructor/messageEntityDiffReplace.md) - Represents a replacement, render it by:
  - Inserting [messageEntityDiffReplace](/constructor/messageEntityDiffReplace.md).`old_text` into the text at offset `offset`, <u>underlining</u> it and coloring it in red: note that this insertion does not affect the offsets of entities that come after it.
  - <u>underlining</u> the section delimited by `offset` and `limit` and coloring it in green.

For example the following diff:

```json
{
    "_": "textWithEntities",
    "text": "Hi,\n\nCould you please please proofread this message and correct any mistakes?\n\nThanks thanks.",
    "entities": [
        {
            "_": "messageEntityDiffReplace",
            "offset": 5,
            "length": 1,
            "old_text": "c"
        },
        {
            "_": "messageEntityDiffDelete",
            "offset": 22,
            "length": 7
        },
        {
            "_": "messageEntityDiffInsert",
            "offset": 42,
            "length": 1
        },
        {
            "_": "messageEntityDiffReplace",
            "offset": 66,
            "length": 1,
            "old_text": "uuu"
        },
        {
            "_": "messageEntityDiffDelete",
            "offset": 85,
            "length": 7
        }
    ]
}
```

Is rendered like this:

<div>
  <a href="/file/400780400224/3/mT5D09bwVMk.26923.png/17ab4a219f971e78b0" target="_blank"><img src="/file/400780400224/3/mT5D09bwVMk.26923.png/17ab4a219f971e78b0" title="Diff entity render example"  class="dev_page_image" /></a>
</div>

Note how the final [messageEntityDiffDelete](/constructor/messageEntityDiffDelete.md)'s offset is not changed by the `uuu` inserted by the preceding [messageEntityDiffReplace](/constructor/messageEntityDiffReplace.md).  
