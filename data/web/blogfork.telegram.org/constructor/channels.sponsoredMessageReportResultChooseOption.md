# channels.sponsoredMessageReportResultChooseOption

The user must choose a report option from the localized options available in `options`, and after selection, [messages.reportSponsoredMessage](/method/messages.reportSponsoredMessage.md) must be invoked again, passing the option's `option` field to the `option` param of the method.

```tl
channels.sponsoredMessageReportResultChooseOption#846f9e42 title:string options:Vector<SponsoredMessageReportOption> = channels.SponsoredMessageReportResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **title** | [string](/type/string.md) | Title of the option selection popup. |
| **options** | [Vector](/type/Vector%20t)&lt;[SponsoredMessageReportOption](/type/SponsoredMessageReportOption.md)&gt; | Localized list of options. |

### Type
[channels.SponsoredMessageReportResult](/type/channels.SponsoredMessageReportResult.md)

### Related pages

#### [messages.reportSponsoredMessage](/method/messages.reportSponsoredMessage.md)
Report a [sponsored message »](/api/sponsored-messages.md), see [here »](/api/sponsored-messages.md#reporting-sponsored-messages) for more info on the full flow.