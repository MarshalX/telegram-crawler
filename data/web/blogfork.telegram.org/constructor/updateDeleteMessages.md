# updateDeleteMessages

Messages were deleted.

```tl
updateDeleteMessages#a20db0e5 messages:Vector<int> pts:int pts_count:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **messages** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | List of identifiers of deleted messages |
| **pts** | [int](/type/int.md) | New quality of actions in a message box |
| **pts\_count** | [int](/type/int.md) | Number of generated [events](/api/updates.md) |

### Type
[Update](/type/Update.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.