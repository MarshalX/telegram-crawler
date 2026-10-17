# inputUserFromMessage

Defines a [min](/api/min.md) user that was seen in a certain message of a certain chat.

```tl
inputUserFromMessage#1da448e2 peer:InputPeer msg_id:int user_id:long = InputUser;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The chat where the user was seen |
| **msg\_id** | [int](/type/int.md) | The message ID |
| **user\_id** | [long](/type/long.md) | The identifier of the user that was seen |

### Type
[InputUser](/type/InputUser.md)

### Related pages

#### [Min constructors](/api/min.md)
In some situations user and channel constructors have reduced set of fields present (although id is always there) and min flag set.