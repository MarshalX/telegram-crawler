# pageTableCell

Table cell

```tl
pageTableCell#34566b6a flags:# header:flags.0?true align_center:flags.3?true align_right:flags.4?true valign_middle:flags.5?true valign_bottom:flags.6?true text:flags.7?RichText colspan:flags.1?int rowspan:flags.2?int = PageTableCell;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **header** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Is this element part of the column header |
| **align\_center** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Horizontally centered block |
| **align\_right** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Right-aligned block |
| **valign\_middle** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Vertically centered block |
| **valign\_bottom** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Block vertically-aligned to the bottom |
| **text** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[RichText](/type/RichText.md) | Content |
| **colspan** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | For how many columns should this cell extend |
| **rowspan** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | For how many rows should this cell extend |

### Type
[PageTableCell](/type/PageTableCell.md)