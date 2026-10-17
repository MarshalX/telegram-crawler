# todoItem

An item of a [todo list »](/api/todo.md).

```tl
todoItem#cba9a52f id:int title:TextWithEntities = TodoItem;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [int](/type/int.md) | ID of the item, a positive (non-zero) integer unique within the current list. |
| **title** | [TextWithEntities](/type/TextWithEntities.md) | Text of the item, maximum length equal to [todo\_item\_length\_max »](/api/config.md#todo-item-length-max). |

### Type
[TodoItem](/type/TodoItem.md)

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Checklists and to-do lists](/api/todo.md)
Premium users can now create collaborative checklists in any chat to track tasks and coordinate teams — or manage shopping and to-do lists.