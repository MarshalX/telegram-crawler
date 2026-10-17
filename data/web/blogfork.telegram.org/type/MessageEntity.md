# MessageEntity

Message entities, representing styled text in a message

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===45===
messageEntityBold#bd610bc9 offset:int length:int = MessageEntity;
messageEntityBotCommand#6cef8ac7 offset:int length:int = MessageEntity;
messageEntityCode#28a20571 offset:int length:int = MessageEntity;
messageEntityEmail#64e475c2 offset:int length:int = MessageEntity;
messageEntityHashtag#6f635b0d offset:int length:int = MessageEntity;
messageEntityItalic#826f8b60 offset:int length:int = MessageEntity;
messageEntityMention#fa04579d offset:int length:int = MessageEntity;
messageEntityPre#73924be0 offset:int length:int language:string = MessageEntity;
messageEntityTextUrl#76a6d327 offset:int length:int url:string = MessageEntity;
messageEntityUnknown#bb92ba95 offset:int length:int = MessageEntity;
messageEntityUrl#6ed02538 offset:int length:int = MessageEntity;

===101===
messageEntityBlockquote#020df5d0 offset:int length:int = MessageEntity;
messageEntityStrike#bf0693d4 offset:int length:int = MessageEntity;
messageEntityUnderline#9c4e7e8b offset:int length:int = MessageEntity;

===144===
messageEntityCustomEmoji#c8cf05f8 offset:int length:int document_id:long = MessageEntity;
messageEntitySpoiler#32ca960f offset:int length:int = MessageEntity;
```

API schema:
<!-- /schema-blocks -->

```tl
messageEntityUnknown#bb92ba95 offset:int length:int = MessageEntity;
messageEntityMention#fa04579d offset:int length:int = MessageEntity;
messageEntityHashtag#6f635b0d offset:int length:int = MessageEntity;
messageEntityBotCommand#6cef8ac7 offset:int length:int = MessageEntity;
messageEntityUrl#6ed02538 offset:int length:int = MessageEntity;
messageEntityEmail#64e475c2 offset:int length:int = MessageEntity;
messageEntityBold#bd610bc9 offset:int length:int = MessageEntity;
messageEntityItalic#826f8b60 offset:int length:int = MessageEntity;
messageEntityCode#28a20571 offset:int length:int = MessageEntity;
messageEntityPre#73924be0 offset:int length:int language:string = MessageEntity;
messageEntityTextUrl#76a6d327 offset:int length:int url:string = MessageEntity;
messageEntityMentionName#dc7b1140 offset:int length:int user_id:long = MessageEntity;
inputMessageEntityMentionName#208e68c9 offset:int length:int user_id:InputUser = MessageEntity;
messageEntityPhone#9b69e34b offset:int length:int = MessageEntity;
messageEntityCashtag#4c4e743f offset:int length:int = MessageEntity;
messageEntityUnderline#9c4e7e8b offset:int length:int = MessageEntity;
messageEntityStrike#bf0693d4 offset:int length:int = MessageEntity;
messageEntityBankCard#761e6af4 offset:int length:int = MessageEntity;
messageEntitySpoiler#32ca960f offset:int length:int = MessageEntity;
messageEntityCustomEmoji#c8cf05f8 offset:int length:int document_id:long = MessageEntity;
messageEntityBlockquote#f1ccaaac flags:# collapsed:flags.0?true offset:int length:int = MessageEntity;
messageEntityFormattedDate#904ac7c7 flags:# relative:flags.0?true short_time:flags.1?true long_time:flags.2?true short_date:flags.3?true long_date:flags.4?true day_of_week:flags.5?true offset:int length:int date:int = MessageEntity;
messageEntityDiffInsert#71777116 offset:int length:int = MessageEntity;
messageEntityDiffReplace#c6c1e5a7 offset:int length:int old_text:string = MessageEntity;
messageEntityDiffDelete#652c1c5 offset:int length:int = MessageEntity;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messageEntityUnknown](/constructor/messageEntityUnknown.md) | Unknown message entity |
| [messageEntityMention](/constructor/messageEntityMention.md) | Message entity [mentioning](/api/mentions.md) a user by `@username`; [messageEntityMentionName](/constructor/messageEntityMentionName.md) can also be used to mention users by their ID. |
| [messageEntityHashtag](/constructor/messageEntityHashtag.md) | **\#hashtag** message entity |
| [messageEntityBotCommand](/constructor/messageEntityBotCommand.md) | Message entity representing a bot /command |
| [messageEntityUrl](/constructor/messageEntityUrl.md) | Message entity representing an in-text url: <https://google.com>; for [text urls](https://google.com), use [messageEntityTextUrl](/constructor/messageEntityTextUrl.md). |
| [messageEntityEmail](/constructor/messageEntityEmail.md) | Message entity representing an <email@example.com>. |
| [messageEntityBold](/constructor/messageEntityBold.md) | Message entity representing **bold text**. |
| [messageEntityItalic](/constructor/messageEntityItalic.md) | Message entity representing *italic text*. |
| [messageEntityCode](/constructor/messageEntityCode.md) | Message entity representing a `codeblock`. |
| [messageEntityPre](/constructor/messageEntityPre.md) | Message entity representing a preformatted `codeblock`, allowing the user to specify a programming language for the codeblock. |
| [messageEntityTextUrl](/constructor/messageEntityTextUrl.md) | Message entity representing a [text url](https://google.com): for in-text urls like <https://google.com> use [messageEntityUrl](/constructor/messageEntityUrl.md).\
\
Note that an additional confirmation popup with the full URL must be displayed to the user before opening this link, unless the domain satisfies the conditions specified in the [domain whitelist documentation »](/api/config.md#whitelisted-domains). |
| [messageEntityUnderline](/constructor/messageEntityUnderline.md) | Message entity representing underlined text. |
| [messageEntityStrike](/constructor/messageEntityStrike.md) | Message entity representing <del>strikethrough</del> text. |
| [messageEntityBlockquote](/constructor/messageEntityBlockquote.md) | Message entity representing a block quote. |
| [messageEntitySpoiler](/constructor/messageEntitySpoiler.md) | Message entity representing a spoiler |
| [messageEntityCustomEmoji](/constructor/messageEntityCustomEmoji.md) | Represents a custom emoji.  \
Note that this entity must wrap exactly one regular emoji (the one contained in [documentAttributeCustomEmoji](/constructor/documentAttributeCustomEmoji.md).`alt`) in the related text, otherwise the server will ignore it. |
| [messageEntityMentionName](/constructor/messageEntityMentionName.md) | Message entity representing a [user mention](/api/mentions.md): for *creating* a mention use [inputMessageEntityMentionName](/constructor/inputMessageEntityMentionName.md). |
| [inputMessageEntityMentionName](/constructor/inputMessageEntityMentionName.md) | Message entity that can be used to create a user [user mention](/api/mentions.md): received mentions use the [messageEntityMentionName](/constructor/messageEntityMentionName.md) constructor, instead. |
| [messageEntityPhone](/constructor/messageEntityPhone.md) | Message entity representing a phone number. |
| [messageEntityCashtag](/constructor/messageEntityCashtag.md) | Message entity representing a **$cashtag**. |
| [messageEntityBankCard](/constructor/messageEntityBankCard.md) | Indicates a credit card number |
| [messageEntityFormattedDate](/constructor/messageEntityFormattedDate.md) | Represents a specific point in time, rendered as specified [here »](/api/entities.md#date-entities)\
\
All flags are optional, with the following limitations:\
\
- `relative` cannot combined with any other flag\
- `short_time` and `long_time` cannot be combined with each other\
- `short_date` and `long_date` cannot be combined with each other\
\
If any of the flags are combined, their rendering order in the text is the following:\
\
- `day_of_week`\
- `short_time`/`long_time`\
- `short_date`/`long_date` |
| [messageEntityDiffInsert](/constructor/messageEntityDiffInsert.md) | Represents an diff addition: render it by simply <u>underlining</u> the specified section and coloring it in green, see [here »](/api/entities.md#diff-entities) for more info on how to render diff entities. |
| [messageEntityDiffReplace](/constructor/messageEntityDiffReplace.md) | Represents an diff replacement, render it as follows:\
\
- Insert `old_text` into the text at offset `offset`, <u>underline</u> it and color it in red: note that this insertion does not affect the offsets of entities that come after it.\
- <u>underline</u> the section delimited by `offset` and `limit` and color it in green.\
\
See [here »](/api/entities.md#diff-entities) for more info on how to render diff entities. |
| [messageEntityDiffDelete](/constructor/messageEntityDiffDelete.md) | Represents an diff deletion: render it by simply <u>underlining</u> the specified section and coloring it in red, see [here »](/api/entities.md#diff-entities) for more info on how to render diff entities. |