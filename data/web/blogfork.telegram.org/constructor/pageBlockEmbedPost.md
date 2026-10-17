# pageBlockEmbedPost

An embedded post

```tl
pageBlockEmbedPost#f259a80b url:string webpage_id:long author_photo_id:long author:string date:int blocks:Vector<PageBlock> caption:PageCaption = PageBlock;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **url** | [string](/type/string.md) | Web page URL |
| **webpage\_id** | [long](/type/long.md) | ID of generated webpage preview |
| **author\_photo\_id** | [long](/type/long.md) | ID of the author's photo |
| **author** | [string](/type/string.md) | Author name |
| **date** | [int](/type/int.md) | Creation date |
| **blocks** | [Vector](/type/Vector%20t)&lt;[PageBlock](/type/PageBlock.md)&gt; | Post contents |
| **caption** | [PageCaption](/type/PageCaption.md) | Caption |

### Type
[PageBlock](/type/PageBlock.md)