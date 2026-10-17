# help.premiumPromo

Telegram Premium promotion information

Note that the `video_sections`+`videos` fields are a list of videos, and the corresponding premium feature identifiers.  
They're equivalent to a section =&gt; video dictionary, with keys from `video_section` and values from `videos`.  
The keys in `video_sections` correspond to a specific feature identifier, and the associated promotional video should be shown when the associated feature row is clicked.

```tl
help.premiumPromo#5334759c status_text:string status_entities:Vector<MessageEntity> video_sections:Vector<string> videos:Vector<Document> period_options:Vector<PremiumSubscriptionOption> users:Vector<User> = help.PremiumPromo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **status\_text** | [string](/type/string.md) | Description of the current state of the user's Telegram Premium subscription |
| **status\_entities** | [Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) |
| **video\_sections** | [Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | A list of [premium feature identifiers »](/api/premium.md), associated to each video |
| **videos** | [Vector](/type/Vector%20t)&lt;[Document](/type/Document.md)&gt; | A list of videos |
| **period\_options** | [Vector](/type/Vector%20t)&lt;[PremiumSubscriptionOption](/type/PremiumSubscriptionOption.md)&gt; | Telegram Premium subscription options |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Related user information |

### Type
[help.PremiumPromo](/type/help.PremiumPromo.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.