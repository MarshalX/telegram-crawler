# pageBlockDetails

A collapsible details block

```tl
pageBlockDetails#76768bed flags:# open:flags.0?true blocks:Vector<PageBlock> title:RichText = PageBlock;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **open** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the block is open by default |
| **blocks** | [Vector](/type/Vector%20t)&lt;[PageBlock](/type/PageBlock.md)&gt; | Block contents |
| **title** | [RichText](/type/RichText.md) | Always visible heading for the block |

### Type
[PageBlock](/type/PageBlock.md)