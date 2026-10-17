# Pagination in the API


Lots of Telegram API methods provide access to potentially large lists of objects, which requires pagination.

In order to fetch only relevant subset of results for each request there is a number of available input parameters. Here is a list in order how they are applied in API.

Typically, results are returned in reverse chronological order with descending object ID values.

### `limit` parameter

A limit on the number of objects to be returned, typically between 1 and 100. When 0 is provided the limit will often default to an intermediate value like ~20.

### `offset`-based pagination

For a few methods with mostly static data this parameter allows to skip `offset` elements from the beginning of list; negative values are allowed in some cases.

### `offset_id`-based pagination

For most methods where results are real-time data (e.g. any chat history) `offset` value is not passed directly. Instead it is calculated from the passed `offset_id` and `add_offset` parameter values as `offsetFromID(offset_id) + add_offset`, where `offsetFromID(offset_id)` is a number of results from the beginning of list up to the result with ID `offset_id`, inclusive.

Sample use cases:

* Loading 20 messages, older than message with ID `MSGID`:

	messages.getHistory({offset_id: MSGID, add_offset: 0, limit: 20})

* Loading 20 messages, newer than message with ID `MSGID`:

	messages.getHistory({offset_id: MSGID, add_offset: -20, limit: 20})
    

* Loading 20 messages around message with ID `MSGID`:

	messages.getHistory({offset_id: MSGID, add_offset: -10, limit: 20})

### Additional filtering

There is a number of parameters, which are applied to the list after slicing with offset and limit, to reduce the result subset even more:

* **max_id**: Can be used to only return results with ID strictly smaller than `max_id` (e.g. message ID)
* **min_id**: Can be used to only return results with ID strictly greater than `min_id`(e.g. message ID)
* **max_date**: Can be used to only return results that are older than `max_date`:
* **min_date**: Can be used to only return results with are newer than `min_date`:
* **hash**: See below.

### Hash generation

To further reduce the result subset, there is a mechanism to avoid fetching data if the resulting list hasn't changed from the one stored on client, similar to [ETag](https://en.wikipedia.org/wiki/HTTP_ETag).

When the client has cached results for API request, it can calculate the `hash` value for it by taking the result IDs (message IDs or other fields with name `id`, or some extra fields in some cases) and using them to compute a 64-bit hash with the following algorithm:

```
# Here, ^ indicates a bitwise XOR

hash = 0
for id in ids:
    hash = hash ^ (hash >> 21)
    hash = hash ^ (hash << 35)
    hash = hash ^ (hash >> 4)
	hash = hash + id
```

The `>>` operator is the unsigned right shift operator.  

Note: in some cases, the `ids` array passed to the algorithm must contain strings (i.e. the shortcut name in business shortcuts, and so on...), in which case they must be transformed to longs by taking the first 8 bytes of the MD5 hash of the string (**not** in hex form) and treating it as a big-endian 64-bit long.  

In some cases, if the result container already has a `hash` field, that can be used instead.  

When the client passes a correct and up to date value, the API will return one of `*NotModified` constructors, e.g. [messages.messagesNotModified](/constructor/messages.messagesNotModified.md) instead of the actual results.

### Example methods

* [messages.getHistory](/method/messages.getHistory.md) supports all result navigation parameters including message ID hashes and except filters
* [channels.getParticipants](/method/channels.getParticipants.md) supports simple navigation using **limit** and **offset**, along with filtering and `hash` reducing using the user IDs of returned participants
