# sponsoredMessageReportOption

A [report option for a sponsored message »](/api/sponsored-messages.md#reporting-sponsored-messages).

```tl
sponsoredMessageReportOption#430d3150 text:string option:bytes = SponsoredMessageReportOption;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **text** | [string](/type/string.md) | Localized description of the option. |
| **option** | [bytes](/type/bytes.md) | Option identifier to pass to [messages.reportSponsoredMessage](/method/messages.reportSponsoredMessage.md). |

### Type
[SponsoredMessageReportOption](/type/SponsoredMessageReportOption.md)

### Related pages

#### [messages.reportSponsoredMessage](/method/messages.reportSponsoredMessage.md)
Report a [sponsored message »](/api/sponsored-messages.md), see [here »](/api/sponsored-messages.md#reporting-sponsored-messages) for more info on the full flow.

#### [Sponsored messages](/api/sponsored-messages.md)
How clients should fetch, display and interact with sponsored messages.