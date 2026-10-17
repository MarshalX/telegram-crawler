# Refresh actions


Full list of actions used to refresh all [file source types &raquo;](/api/file-references/sources.md), contained by the current [file reference map file &raquo;](/api/file-references.md#map-file).  

See [here &raquo;](/api/file-references.md) for more info on the file reference database.  

<!-- start refresh_actions -->

- fileSourceMessage - <pre><code>[getMessageOp](/api/file-references.md#getmessageop)(peer: getInputPeerByIdOp(peer), id: copyOp(id), quick_reply_shortcut_id: copyOp(quick_reply_shortcut_id))</code></pre>
- fileSourceScheduledMessage - <pre><code><a href='/method/messages.getScheduledMessages'>messages.getScheduledMessages</a>(peer: getInputPeerByIdOp(peer), id: [copyOp(id)])</code></pre>
- fileSourceStory - <pre><code><a href='/method/stories.getStoriesByID'>stories.getStoriesByID</a>(id: [copyOp(id)], peer: getInputPeerByIdOp(peer))</code></pre>
- fileSourceWebPage - <pre><code><a href='/method/messages.getWebPage'>messages.getWebPage</a>(url: copyOp(url), hash: 0)</code></pre>
- fileSourceBotApp - <pre><code><a href='/method/messages.getBotApp'>messages.getBotApp</a>(app: <a href='/constructor/inputBotAppID'>inputBotAppID</a>{id: copyOp(id), access_hash: copyOp(access_hash)}, hash: 0)</code></pre>
- fileSourceUserFull - <pre><code><a href='/method/users.getFullUser'>users.getFullUser</a>(id: getInputUserByIdOp(id))</code></pre>
- fileSourceAdminLog - <pre><code><a href='/method/channels.getAdminLog'>channels.getAdminLog</a>(channel: getInputChannelByIdOp(channel), max_id: copyOp(max_id), min_id: copyOp(max_id), limit: 1, q: "")</code></pre>
- fileSourceStoryAlbum - <pre><code><a href='/method/stories.getAlbums'>stories.getAlbums</a>(peer: getInputPeerByIdOp(peer), hash: 0)</code></pre>
- fileSourceBotPreviewMedia - <pre><code><a href='/method/bots.getPreviewMedias'>bots.getPreviewMedias</a>(bot: getInputUserByIdOp(bot))</code></pre>
- fileSourceBotPreviewInfo - <pre><code><a href='/method/bots.getPreviewInfo'>bots.getPreviewInfo</a>(bot: getInputUserByIdOp(bot), lang_code: copyOp(lang_code))</code></pre>
- fileSourcePaidMedia - <pre><code><a href='/method/messages.getExtendedMedia'>messages.getExtendedMedia</a>(id: [copyOp(id)], peer: getInputPeerByIdOp(peer))</code></pre>
- fileSourceSavedMusic - <pre><code><a href='/method/users.getSavedMusicByID'>users.getSavedMusicByID</a>(id: getInputUserByIdOp(user_id), documents: [<a href='/constructor/inputDocument'>inputDocument</a>{id: copyOp(id), access_hash: copyOp(access_hash), file_reference: base64_decode("")}])</code></pre>
- fileSourceChatFull - <pre><code><a href='/method/messages.getFullChat'>messages.getFullChat</a>(chat_id: copyOp(chat_id))</code></pre>
- fileSourceChannelFull - <pre><code><a href='/method/channels.getFullChannel'>channels.getFullChannel</a>(channel: getInputChannelByIdOp(channel))</code></pre>
- fileSourcePremiumPromo - <pre><code><a href='/method/help.getPremiumPromo'>help.getPremiumPromo</a>()</code></pre>
- fileSourceStarsTransaction - <pre><code><a href='/method/payments.getStarsTransactionsByID'>payments.getStarsTransactionsByID</a>(peer: getInputPeerByIdOp(peer), ton: copyOp(ton), id: [<a href='/constructor/inputStarsTransaction'>inputStarsTransaction</a>{id: copyOp(id), refund: copyOp(refund)}])</code></pre>
- fileSourceAttachMenuBot - <pre><code><a href='/method/messages.getAttachMenuBot'>messages.getAttachMenuBot</a>(bot: getInputUserByIdOp(bot))</code></pre>
- fileSourceTheme - <pre><code><a href='/method/account.getTheme'>account.getTheme</a>(theme: <a href='/constructor/inputTheme'>inputTheme</a>{id: copyOp(id), access_hash: copyOp(access_hash)}, format: $themeFormat)</code></pre>
- fileSourceWallPaper - <pre><code><a href='/method/account.getWallPaper'>account.getWallPaper</a>(wallpaper: <a href='/constructor/inputWallPaper'>inputWallPaper</a>{id: copyOp(id), access_hash: copyOp(access_hash)})</code></pre>
- fileSourceStickerSet - <pre><code><a href='/method/messages.getStickerSet'>messages.getStickerSet</a>(stickerset: copyOp(stickerset), hash: 0)</code></pre>
- fileSourceSavedGifs - <pre><code><a href='/method/messages.getSavedGifs'>messages.getSavedGifs</a>(hash: 0)</code></pre>
- fileSourceSavedRingtones - <pre><code><a href='/method/account.getSavedRingtones'>account.getSavedRingtones</a>(hash: 0)</code></pre>
- fileSourceAvailableEffects - <pre><code><a href='/method/messages.getAvailableEffects'>messages.getAvailableEffects</a>(hash: 0)</code></pre>
- fileSourceAvailableReactions - <pre><code><a href='/method/messages.getAvailableReactions'>messages.getAvailableReactions</a>(hash: 0)</code></pre>
- fileSourceUserProfilePhoto - <pre><code><a href='/method/photos.getUserPhotos'>photos.getUserPhotos</a>(user_id: getInputUserByIdOp(user_id), offset: -1, max_id: copyOp(max_id), limit: 1)</code></pre>
- fileSourceDocumentByHash - <pre><code><a href='/method/messages.getDocumentByHash'>messages.getDocumentByHash</a>(sha256: copyOp(sha256), size: copyOp(size), mime_type: copyOp(mime_type))</code></pre>

<!-- end refresh_actions -->

