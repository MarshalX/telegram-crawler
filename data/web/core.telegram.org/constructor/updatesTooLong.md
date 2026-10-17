# updatesTooLong

The number of queued updates in the common message box is too large to be delivered passively through the socket, invoke [updates.getDifference](/method/updates.getDifference.md) to fetch the difference as specified in the [documentation »](/api/updates.md).

Does **not** necessarily indicate the [message box size limit was reached](/api/updates.md#recovering-gaps-for-very-old-messages), it simply indicates that the number of queued updates in a message box is too large to be delivered passively through the socket.

```tl
updatesTooLong#e317af7e = Updates;
```

### Parameters

This constructor does not require any parameters.

### Type
[Updates](/type/Updates.md)

### Related pages

#### [updates.getDifference](/method/updates.getDifference.md)
Get new [updates](/api/updates.md).

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.