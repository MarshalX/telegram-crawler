# todoList

Represents a [todo list »](/api/todo.md).

```tl
todoList#49b92a26 flags:# others_can_append:flags.0?true others_can_complete:flags.1?true title:TextWithEntities list:Vector<TodoItem> = TodoList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **others\_can\_append** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, users different from the creator of the list can append items to the list. |
| **others\_can\_complete** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, users different from the creator of the list can complete items in the list. |
| **title** | [TextWithEntities](/type/TextWithEntities.md) | Title of the todo list, maximum length equal to [todo\_title\_length\_max »](/api/config.md#todo-title-length-max). |
| **list** | [Vector](/type/Vector%20t)&lt;[TodoItem](/type/TodoItem.md)&gt; | Items of the list. |

### Type
[TodoList](/type/TodoList.md)

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Checklists and to-do lists](/api/todo.md)
Premium users can now create collaborative checklists in any chat to track tasks and coordinate teams — or manage shopping and to-do lists.