# botVerifierSettings

Info about the current [verifier bot »](/api/bots/verification.md).

```tl
botVerifierSettings#b0cd6617 flags:# can_modify_custom_description:flags.1?true icon:long company:string custom_description:flags.0?string = BotVerifierSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **can\_modify\_custom\_description** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Indicates whether the bot is allowed to set a custom description field for individual verified peers, different from the `custom_description` provided here. |
| **icon** | [long](/type/long.md) | Verification icon |
| **company** | [string](/type/string.md) | The name of the organization that provides the verification |
| **custom\_description** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | An optional default description for the verification |

### Type
[BotVerifierSettings](/type/BotVerifierSettings.md)

### Related pages

#### [Third-party verification](/api/bots/verification.md)
To further improve transparency on Telegram, official third-party services are able to assign extra verification icons to user accounts and chats — in order to prevent scams and reduce misinformation.