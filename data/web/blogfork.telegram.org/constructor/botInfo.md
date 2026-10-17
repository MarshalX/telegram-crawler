# botInfo

Info about bots (available bot commands, etc)

```tl
botInfo#4d8a0299 flags:# has_preview_medias:flags.6?true user_id:flags.0?long description:flags.1?string description_photo:flags.4?Photo description_document:flags.5?Document commands:flags.2?Vector<BotCommand> menu_button:flags.3?BotMenuButton privacy_policy_url:flags.7?string app_settings:flags.8?BotAppSettings verifier_settings:flags.9?BotVerifierSettings = BotInfo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **has\_preview\_medias** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | If set, the bot has some [preview medias for the configured Main Mini App, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info on Main Mini App preview medias. |
| **user\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | ID of the bot |
| **description** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Description of the bot |
| **description\_photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[Photo](/type/Photo.md) | Description photo |
| **description\_document** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[Document](/type/Document.md) | Description animation in MPEG4 format |
| **commands** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Vector](/type/Vector%20t)&lt;[BotCommand](/type/BotCommand.md)&gt; | Bot commands that can be used in the chat |
| **menu\_button** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[BotMenuButton](/type/BotMenuButton.md) | Indicates the action to execute when pressing the in-UI menu button for bots |
| **privacy\_policy\_url** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[string](/type/string.md) | The HTTP link to the privacy policy of the bot. If not set, then the `/privacy` command must be used, if supported by the bot (i.e. if it's present in the `commands` vector). If it isn't supported, then <https://telegram.org/privacy-tpa> must be opened, instead. |
| **app\_settings** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[BotAppSettings](/type/BotAppSettings.md) | [Mini app »](/api/bots/webapps.md) settings\
 |
| **verifier\_settings** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[BotVerifierSettings](/type/BotVerifierSettings.md) | This bot can [verify peers](/api/bots/verification.md): this field contains more info about the verification the bot can assign to peers. |

### Type
[BotInfo](/type/BotInfo.md)

### Related pages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [Third-party verification](/api/bots/verification.md)
To further improve transparency on Telegram, official third-party services are able to assign extra verification icons to user accounts and chats — in order to prevent scams and reduce misinformation.