# pageBlockTable

Table

```tl
pageBlockTable#bf4dea82 flags:# bordered:flags.0?true striped:flags.1?true title:RichText rows:Vector<PageTableRow> = PageBlock;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **bordered** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Does the table have a visible border? |
| **striped** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Is the table striped? |
| **title** | [RichText](/type/RichText.md) | Title |
| **rows** | [Vector](/type/Vector%20t)&lt;[PageTableRow](/type/PageTableRow.md)&gt; | Table rows |

### Type
[PageBlock](/type/PageBlock.md)