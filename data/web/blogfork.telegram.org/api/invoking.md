# Calling API Methods


### Layers

Versioning in the API is supported by so-called TL layers.

The need to add a new object constructor or to add/remove a field in a constructor creates a backwards compatibility problem for previous versions of API clients.  After all, simply changing a constructor in a schema also changes its number. To address this problem, each schema update is separated into a layer.

A layer is a collection of updated methods or constructors in a TL schema. Each layer is numbered with sequentially increasing numbers starting with 2. The first layer is the base layer -- the TL schema without any changes.

There is a helper method to let the API know that a client supports the Layer `layer`:

    ---functions---
    
    invokeWithLayer#da9b0d0d {X:Type} layer:int query:!X = X;

The helper method **[invokeWithLayer](/method/invokeWithLayer.md)** can be used only together with [initConnection](/method/initConnection.md): the present layer will be saved with all other parameters of the client and any future requests will be using this saved value. [See more below](#saving-client-info).

**Note**: in some cases such as updates from big channels, the API may return constructors from older layers, different from the connection's current layer.  

Clients should treat this as a `500` server error, and handle it by closing and reopening the TCP socket, re-initializing the session with [initConnection](/method/initConnection.md) and invoking [getDifference](/api/updates.md).

#### [List of Available Layers](/api/layers.md)

### Saving Client Info

It is possible to save information about the current client on the server in conjunction with an authorization key. This may help eliminate client-side problems with certain releases on certain devices or with certain localizations, as well as eliminate the need for sending layer information in each request.

The helper method **[initConnection](/method/initConnection.md)** accepts client parameters. This method must be called when first calling the API after the application has restarted or in case the value of one of the parameters could have changed.

**initConnection** must also be called after each [auth.bindTempAuthKey](/method/auth.bindTempAuthKey.md).

When calling this method, the current layer used by the client is also saved (the layer in which [initConnection](/method/initConnection.md) was wrapped is used). After a successful call to [initConnection](/method/initConnection.md) it is no longer necessary to wrap each API call in **invokeWithLayerN**.

### Disabling updates

    ---functions---

    invokeWithoutUpdates#bf9459b7 {X:Type} query:!X = X;
    
[invokeWithoutUpdates](/method/invokeWithoutUpdates.md) can be used to invoke a request without subscribing the used connection for [updates](/api/updates.md) (this is enabled by default for [file queries](/api/files.md)).

### Sequential Requests

By default, the server processes parallel requests in arbitrary order. Two helper methods exist for cases when the client needs certain requests to be processed in a certain order and intends to send a new request before the previous one is completed.  
These methods allow reducing the latency for calls which require strict ordering, since the client doesn't have to wait for the result of the previous method call before sending the next one in the queue, and can just send them all together, (for example) each wrapped in an `invokeAfterMsg` with the `msg_id` of the previous request.  

    ---functions---

    invokeAfterMsg#cb9f372d {X:Type} msg_id:long query:!X = X;
    invokeAfterMsgs#3dc4b4f0 {X:Type} msg_ids:Vector<long> query:!X = X;

They may be used, for example, when a client attempts to send messages that accumulated while waiting for the Internet connection to be restored for a long time. In this case, the 32-bit number `0xcb9f372d` must be added before the method number in each request, followed by a 64-bit message identifier, msg_id, which contains the previous request in the queue. 

The second method is similar, except it takes several messages that must be successfully processed before the current one.

If the waiting period exceeds 0.5 seconds (this value may change in the future) and no result has appeared, the method will return the `MSG_WAIT_TIMEOUT` error: handle this error by resending the request, still wrapped in the same `invokeAfterMsg`/`invokeAfterMsgs` constructor with the same `id`/`ids`.  

If any of the previous queries mentioned in `msg_ids` or `msg_id` fails (i.e. an RPC error is emitted by a query, including `FLOOD_WAIT_` errors), a `MSG_WAIT_FAILED` error will be returned for the current request: the simplest way to handle it is to simply enforce local synchronization, by waiting for a response from all previous `msg_ids`/`msg_id` before resending the request.  

If and only if any of the previous requests also failed with `MSG_WAIT_FAILED`/`MSG_WAIT_TIMEOUT` errors and require resending, wrap the current request in another `invokeAfterMsg`/`invokeAfterMsgs` constructor with the new IDs of the previous requests, resent along with the current one.  

#### Scenario 1

To clarify, assume the following sequence of queries:

1) msg_id=1; `messages.sendMessage message=a`
2) msg_id=2; `invokeAfterMsg msg_id=1 (messages.sendMessage message=b)`
3) msg_id=3; `invokeAfterMsg msg_id=2 (messages.sendMessage message=c)`

##### Scenario 1.1

If the first messages.sendMessage query with `msg_id=1` fails, both queries with `msg_id=2` and `msg_id=3` will fail with a `MSG_WAIT_FAILED` and will have to be resent as follows.    
To recover the call queue, send the following new sequence of queries:

1) msg_id=4; `messages.sendMessage message=b` (resending the old query with `msg_id=2`)
2) msg_id=5; `invokeAfterMsg msg_id=4 (messages.sendMessage message=c)` (resending the old query with `msg_id=3`)

##### Scenario 1.2

If the first messages.sendMessage query with `msg_id=1` succeeds but the second with `msg_id=2` fails, the query with `msg_id=3` will fail with a `MSG_WAIT_FAILED` and will have to be resent as follows.  
To recover the call queue, send the following new sequence of queries:

1) msg_id=4; `messages.sendMessage message=c` (resending the old query with `msg_id=3`)

#### Scenario 2

Now assume the following, different sequence of queries:

1) msg_id=1; `messages.sendMessage message=a`
2) msg_id=2; `messages.sendMessage message=b`
3) msg_id=3; `invokeAfterMsgs msg_ids=[1, 2] (messages.sendMessage message=c)`

If either or both of the messages.sendMessage queries with `msg_id=1` and/or `msg_id=2` fail, the query with `msg_id=3` will also fail with a `MSG_WAIT_FAILED` and will have to be resent as follows.    

To recover the call queue, first of all wait for a response from the queries with `msg_id=1` and `msg_id=2`.  

Note how this is different from scenario 1, where we don't have to wait for a response from the previous queries: this is because in scenario 1, each `invokeAfterMsg` query was directly waiting for just one previous query, and any new query in the queue is chained to the previous `invokeAfterMsg`, thus any failure of any query with `msg_id=N` in the chain immediately blocked execution of all queries with `msg_id <= N`.  
In this case, however, we're waiting for two messages at the same time, and the failure of the query with `msg_id=1` does not prevent execution of the query with `msg_id=2`, and vice versa; thus when resending the query with `msg_id=3` we have to either:

* Wait for replies (errors or successes) for **all** of the queries mentioned in `msg_ids`, and then send the following new query:  

  * msg_id=4; `messages.sendMessage message=c` (resending the old query with `msg_id=3`)
* OR Wait for receipt of an RPC error for any of the queries mentioned in `msg_ids`, and then send the following new query:

  * msg_id=4; `invokeAfterMsgs msg_ids=([1, 2] - [$errId]) (messages.sendMessage message=c)` (resending the old query with `msg_id=3`)

  I.e. resend the `invokeAfterMsgs` with all the initial `msg_ids` except for the one that failed.  
  It may be required to repeat the process if the newly sent `invokeAfterMsgs` also fails because the remaining query mentioned in `msg_ids` also failed (i.e. if queries `1` and `2` both fail at slightly different times).  

  Obviously the first option (waiting for replies (errors or successes) for **all** of the queries mentioned before proceeding) is the simplest.

An even simpler option is to always follow [Scenario 1](#scenario-1), never using `invokeAfterMsgs` and only using chained `invokeAfterMsg` calls, thus avoiding the use of this slightly more complicated recovery logic.

#### Helper Method Sequence

**Important:** if the helper methods **invokeAfterMsg** / **invokeAfterMsgs** are used together with **invokeWithLayerN** or other helper methods, **invokeAfterMsg** / **invokeAfterMsgs** must always be the outermost wrapper.

### Data Compression
We recommend using gzip compression when calling methods to reduce the amount of network traffic.

The schema and constructor information are given in the [protocol documentation](/mtproto/service_messages.md#packed-object).

#### Data Compression when Making a Request
Before transmitting a query, the string containing the entire body of the serialized high-level query (starting with the method number) must be compressed using gzip. If the resulting string is smaller than the original, it makes sense to transmit the [gzip_packed](/mtproto/service_messages.md#packed-object) constructor.

There is no point in doing the above when transmitting binary multimedia data (photos, videos) or small messages (up to 255 bytes).

#### Decompressing Data

By default, the server can compress the response to any request as well as [updates](/api/updates.md), in accordance with the rules stated above. If the [gzip_packed](/mtproto/service_messages.md#packed-object) constructor is received as a response in rpc_result, then the string that follows must be extracted and uncompressed. Processing then continues on the resulting new string.

