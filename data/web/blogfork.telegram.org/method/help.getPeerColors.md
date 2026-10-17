# help.getPeerColors

Get the set of [accent color palettes »](/api/colors.md) that can be used for message accents.

```tl
help.peerColorsNotModified#2ba1f5ce = help.PeerColors;
help.peerColors#f8ed08 hash:int colors:Vector<help.PeerColorOption> = help.PeerColors;
---functions---
help.getPeerColors#da80f42f hash:int = help.PeerColors;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [int](/type/int.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). |

### Result
[help.PeerColors](/type/help.PeerColors.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Accent colors](/api/colors.md)
Telegram users and channels can change the accent color and background pattern of their profile page and their messages!