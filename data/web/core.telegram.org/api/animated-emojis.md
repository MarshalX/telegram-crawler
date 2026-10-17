# Animated Emojis


Graphical telegram clients should transform emojis into their respective animated version.  

### Animated emojis

    inputStickerSetAnimatedEmoji#28703c8 = InputStickerSet;
    
    messages.stickerSet#6e153f16 set:StickerSet packs:Vector<StickerPack> keywords:Vector<StickerKeyword> documents:Vector<Document> = messages.StickerSet;

    ---functions---

    messages.getStickerSet#c8a0ec74 stickerset:InputStickerSet hash:int = messages.StickerSet;

On startup, clients should fetch the animated emoji stickerset by calling the [messages.getStickerSet](/method/messages.getStickerSet.md) method, providing [inputStickerSetAnimatedEmoji](/constructor/inputStickerSetAnimatedEmoji.md) to the `stickerset` field.  
The returned stickerset will contain a set of animated stickers, one for each of the supported emojis.  

Clients should substitute messages containing only one instance of one of the allowed emojis with the respective animated sticker.  
Also, when receiving messages containing only one instance of a [custom emoji](/api/custom-emoji.md), instead of displaying a message bubble with a single small custom emoji inside, the scaled-up custom emoji should be displayed directly, like with normal stickers.  

Animated emojis should loop only once when first sent or received, or when clicked.  
For [supported emojis](#emoji-reactions), clients on both sides of private chats with users are supposed to show a reaction animation when any of the two users clicks on the animated emoji: [click here for more info&nbsp;&raquo;](#emoji-reactions).

For special [dice emojis](/api/dice.md) like 🎲, 🎯, or 🏀, clients are supposed to behave differently both when sending and receiving such emojis: [click here for more info&nbsp;&raquo;](/api/dice.md).

### Emojis with sounds

Certain animated emojis should play sound when clicked, as specified by [server-side configuration](/api/config.md#client-configuration).  

The returned JSON object will contain the following map, with a list of file IDs to download:

```
    "emojies_sounds": {
        "\ud83c\udf83": {
            "id": "4956223179606458539",
            "access_hash": "-2107001400913062971",
            "file_reference_base64": "AF-4ApC7ukC0UWEPZN0TeSJURe7T"
        },
        "\u26b0": {
            "id": "4956223179606458540",
            "access_hash": "-1498869544183595185",
            "file_reference_base64": "AF-4ApCLKMGt96WCvLm58kbqZHd3"
        },
        "\ud83e\udddf\u200d\u2642": {
            "id": "4960929110848176331",
            "access_hash": "3986395821757915468",
            "file_reference_base64": "AF-4ApAedNln3IMEHH-SUQuH8L9g"
        },
    }
```

The [file reference field](/api/file-references.md) should be base64-decoded before [downloading the file](/api/files.md).

### Emoji reactions

    inputStickerSetAnimatedEmojiAnimations#cde3739 = InputStickerSet;
    
    messages.stickerSet#6e153f16 set:StickerSet packs:Vector<StickerPack> keywords:Vector<StickerKeyword> documents:Vector<Document> = messages.StickerSet;

    stickerPack#12b299d4 emoticon:string documents:Vector<long> = StickerPack;
    
    sendMessageEmojiInteraction#25972bcb emoticon:string msg_id:int interaction:DataJSON = SendMessageAction;
    sendMessageEmojiInteractionSeen#b665902e emoticon:string = SendMessageAction;

    updateUserTyping#2a17bf5c flags:# user_id:long top_msg_id:flags.0?int action:SendMessageAction = Update;

    ---functions---

    messages.getStickerSet#c8a0ec74 stickerset:InputStickerSet hash:int = messages.StickerSet;

    messages.setTyping#58943ee2 flags:# peer:InputPeer top_msg_id:flags.0?int action:SendMessageAction = Bool;

Not to be confused with [message reactions&nbsp;&raquo;](/api/reactions.md).  

On startup, clients should fetch the animated reaction emoji stickerset by calling the [messages.getStickerSet](/method/messages.getStickerSet.md) method, providing [inputStickerSetAnimatedEmojiAnimations](/constructor/inputStickerSetAnimatedEmojiAnimations.md) to the `stickerset` field.  
The returned stickerset will contain a set of animated emoji reactions, _one or more_ for each of the supported emojis.  
If a set of reactions for the ❤ emoji is returned, the same reactions should also be assigned to the 🧡, 💛, 💚, 💙, 💜, 🖤, 🤍 and 🤎 emojis.  

Clients on both sides of private chats with users should overlay one of the appropriate reaction animations over the animated sticker when any of the two users clicks on a supported animated emoji.  
The same should happen for standalone [custom emojis](/api/custom-emoji.md) (single [custom emojis](/api/custom-emoji.md) are always displayed as standalone stickers) if the underlying normal emoji is supported (as above).  
The reaction animation for each separate tap should be chosen randomly from all the available reactions for a given emoji, and multiple taps should be aggregated and sent to the other user as follows:  

At each tap, clients should store all occurred taps in a local list.  
After 1 second has elapsed with no more taps, the local list should be cleared and stored taps should be sent using [messages.setTyping](/method/messages.setTyping.md), passing a [sendMessageEmojiInteraction](/constructor/sendMessageEmojiInteraction.md) constructor with the following fields:  

* `emoticon` - The emoji we're reacting to
* `msg_id` - Message ID of the animated emoji that was clicked
* `interaction` - A JSON object with interaction info, containing the following keys:
    * `v` - An integer indicating the object version, currently `1`
    * `a` - An array of JSON objects, each containing the following keys:
        * `t` - float, number of seconds that passed since the previous tap in the array, the first tap uses a value of `0.0`.
        * `i` - integer, 1-based index of the randomly chosen animation for the tap (equivalent to the index of a specific emoji-related animation in [stickerPack](/constructor/stickerPack.md) + 1).

1 second after the receiving user has seen the last reaction animation for a specific emoji, an acknowledgement must be sent using [messages.setTyping](/method/messages.setTyping.md), passing a [sendMessageEmojiInteractionSeen](/constructor/sendMessageEmojiInteractionSeen.md) with that emoji.
