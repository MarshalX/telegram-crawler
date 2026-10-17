# messageMediaToDo

Represents a [todo list »](/api/todo.md).

```tl
messageMediaToDo#8a53b014 flags:# todo:TodoList completions:flags.0?Vector<TodoCompletion> = MessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **todo** | [TodoList](/type/TodoList.md) | The todo list. |
| **completions** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[TodoCompletion](/type/TodoCompletion.md)&gt; | Completed items. |

### Type
[MessageMedia](/type/MessageMedia.md)

### Related pages

#### [Checklists and to-do lists](/api/todo.md)
Premium users can now create collaborative checklists in any chat to track tasks and coordinate teams — or manage shopping and to-do lists.