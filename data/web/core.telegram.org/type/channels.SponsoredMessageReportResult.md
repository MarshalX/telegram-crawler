# channels.SponsoredMessageReportResult

Status of the method call used to report a [sponsored message »](/api/sponsored-messages.md).

```tl
channels.sponsoredMessageReportResultChooseOption#846f9e42 title:string options:Vector<SponsoredMessageReportOption> = channels.SponsoredMessageReportResult;
channels.sponsoredMessageReportResultAdsHidden#3e3bcf2f = channels.SponsoredMessageReportResult;
channels.sponsoredMessageReportResultReported#ad798849 = channels.SponsoredMessageReportResult;

---functions---

messages.reportSponsoredMessage#12cbf0c4 random_id:bytes option:bytes = channels.SponsoredMessageReportResult;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [channels.sponsoredMessageReportResultChooseOption](/constructor/channels.sponsoredMessageReportResultChooseOption.md) | The user must choose a report option from the localized options available in `options`, and after selection, [messages.reportSponsoredMessage](/method/messages.reportSponsoredMessage.md) must be invoked again, passing the option's `option` field to the `option` param of the method. |
| [channels.sponsoredMessageReportResultAdsHidden](/constructor/channels.sponsoredMessageReportResultAdsHidden.md) | Sponsored messages were hidden for the user in all chats. |
| [channels.sponsoredMessageReportResultReported](/constructor/channels.sponsoredMessageReportResultReported.md) | The sponsored message was reported successfully. |

### Methods

| Method | Description |
| --- | --- |
| [messages.reportSponsoredMessage](/method/messages.reportSponsoredMessage.md) | Report a [sponsored message »](/api/sponsored-messages.md), see [here »](/api/sponsored-messages.md#reporting-sponsored-messages) for more info on the full flow. |

### Related pages

#### [Sponsored messages](/api/sponsored-messages.md)
How clients should fetch, display and interact with sponsored messages.