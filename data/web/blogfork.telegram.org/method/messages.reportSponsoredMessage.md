# messages.reportSponsoredMessage

Report a [sponsored message »](/api/sponsored-messages.md), see [here »](/api/sponsored-messages.md#reporting-sponsored-messages) for more info on the full flow.

```tl
channels.sponsoredMessageReportResultChooseOption#846f9e42 title:string options:Vector<SponsoredMessageReportOption> = channels.SponsoredMessageReportResult;
channels.sponsoredMessageReportResultAdsHidden#3e3bcf2f = channels.SponsoredMessageReportResult;
channels.sponsoredMessageReportResultReported#ad798849 = channels.SponsoredMessageReportResult;
---functions---
messages.reportSponsoredMessage#12cbf0c4 random_id:bytes option:bytes = channels.SponsoredMessageReportResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **random\_id** | [bytes](/type/bytes.md) | The ad's unique ID. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **option** | [bytes](/type/bytes.md) | Chosen report option, initially an empty string, see [here »](/api/sponsored-messages.md#reporting-sponsored-messages) for more info on the full flow. |

### Result
[channels.SponsoredMessageReportResult](/type/channels.SponsoredMessageReportResult.md)

### Only users can use this method

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Sponsored messages](/api/sponsored-messages.md)
How clients should fetch, display and interact with sponsored messages.