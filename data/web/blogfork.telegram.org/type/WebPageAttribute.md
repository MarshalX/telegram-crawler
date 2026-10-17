# WebPageAttribute

Webpage attributes

```tl
webPageAttributeTheme#54b56617 flags:# documents:flags.0?Vector<Document> settings:flags.1?ThemeSettings = WebPageAttribute;
webPageAttributeStory#2e94c3e7 flags:# peer:Peer id:int story:flags.0?StoryItem = WebPageAttribute;
webPageAttributeStickerSet#50cc03d3 flags:# emojis:flags.0?true text_color:flags.1?true stickers:Vector<Document> = WebPageAttribute;
webPageAttributeUniqueStarGift#cf6f6db8 gift:StarGift = WebPageAttribute;
webPageAttributeStarGiftCollection#31cad303 icons:Vector<Document> = WebPageAttribute;
webPageAttributeStarGiftAuction#1c641c2 gift:StarGift end_date:int = WebPageAttribute;
webPageAttributeAiComposeTone#7781fe18 emoji_id:long = WebPageAttribute;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [webPageAttributeTheme](/constructor/webPageAttributeTheme.md) | Page theme |
| [webPageAttributeStory](/constructor/webPageAttributeStory.md) | Webpage preview of a Telegram story |
| [webPageAttributeStickerSet](/constructor/webPageAttributeStickerSet.md) | Contains info about a [stickerset »](/api/stickers.md), for a [webPage](/constructor/webPage.md) preview of a [stickerset deep link »](/api/links.md#stickerset-links) (the [webPage](/constructor/webPage.md) will have a `type` of `telegram_stickerset`). |
| [webPageAttributeUniqueStarGift](/constructor/webPageAttributeUniqueStarGift.md) | Contains info about [collectible gift »](/api/gifts.md#collectible-gifts) for a [webPage](/constructor/webPage.md) preview of a [collectible gift »](/api/gifts.md#collectible-gifts) (the [webPage](/constructor/webPage.md) will have a `type` of `telegram_nft`). |
| [webPageAttributeStarGiftCollection](/constructor/webPageAttributeStarGiftCollection.md) | Contains info about a [gift collection »](/api/gifts.md#gift-collections) for a [webPage](/constructor/webPage.md) preview of a [gift collection »](/api/gifts.md#gift-collections) (the [webPage](/constructor/webPage.md) will have a `type` of `telegram_collection`). |
| [webPageAttributeStarGiftAuction](/constructor/webPageAttributeStarGiftAuction.md) | Contains info about a [collectible gift auction »](/api/auctions.md) for a [webPage](/constructor/webPage.md) preview of an [auction »](/api/auctions.md) (the [webPage](/constructor/webPage.md) will have a `type` of `telegram_auction`). |
| [webPageAttributeAiComposeTone](/constructor/webPageAttributeAiComposeTone.md) | [Webpage attribute](/type/WebPageAttribute.md) attached to a [webPage](/constructor/webPage.md) of type `telegram_aicomposetone`, generated when previewing a shared [AI composer tone »](/api/ai.md#ai-compose-tones) via an [AI compose tone link »](/api/links.md#ai-compose-tone-links). |