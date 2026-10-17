# invokeWithoutUpdates

Invoke a request without subscribing the used connection for [updates](/api/updates.md) (this is enabled by default for [file queries](/api/files.md)).

```tl
---functions---
invokeWithoutUpdates#bf9459b7 {X:Type} query:!X = X;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **query** | !X | The query |

### Result
Returns the type returned by the invoked method.

### Both users and bots can use this method

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.