# Help.PeerColors

Contains info about multiple [color palettes »](/api/colors.md).

```tl
help.peerColorsNotModified#2ba1f5ce = help.PeerColors;
help.peerColors#f8ed08 hash:int colors:Vector<help.PeerColorOption> = help.PeerColors;

---functions---

help.getPeerColors#da80f42f hash:int = help.PeerColors;
help.getPeerProfileColors#abcfa9fd hash:int = help.PeerColors;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [help.peerColorsNotModified](/constructor/help.peerColorsNotModified.md) | The list of color palettes has not changed. |
| [help.peerColors](/constructor/help.peerColors.md) | Contains info about multiple [color palettes »](/api/colors.md). |

### Methods

| Method | Description |
| --- | --- |
| [help.getPeerColors](/method/help.getPeerColors.md) | Get the set of [accent color palettes »](/api/colors.md) that can be used for message accents. |
| [help.getPeerProfileColors](/method/help.getPeerProfileColors.md) | Get the set of [accent color palettes »](/api/colors.md) that can be used in profile page backgrounds. |

### Related pages

#### [Accent colors](/api/colors.md)
Telegram users and channels can change the accent color and background pattern of their profile page and their messages!