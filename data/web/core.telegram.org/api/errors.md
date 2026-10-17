# Error handling 

There will be errors when working with the API, and they must be correctly handled on the client.  
An error is characterized by several parameters:

#### Error Code
Numerical value similar to HTTP status. Contains information on the type of error that occurred: for example, a data input error, privacy error, or server error. This is a required parameter.

#### Error Type
A string literal in the form of `/[A-Z_0-9]+/`, which summarizes the problem. For example, `AUTH_KEY_UNREGISTERED`. This is an optional parameter.

#### Error Database

A full human-readable JSON list of RPC errors that can be returned by all methods in the API can be found at the permalink [/api/errors.json&nbsp;&raquo;](/api/errors.json.md), what follows is a description of its fields:  

* `errors` - All error messages and codes for each method (object).
  * Keys: Error codes as strings (numeric strings)
  * Values: All error messages for each method (object)
    * Keys: Error messages (string)
    * Values: An array of methods which may emit this error (array of strings, may be empty for errors that can be emitted by any method)
* `descriptions` - Descriptions for every error mentioned in `errors` (and a few other errors not related to a specific method)
  * Keys: Error messages
  * Values: Error descriptions
* `user_only` - The full list of methods that can only be used by users, **not** bots.
* `bot_only` - The full list of methods that can only be used by bots, **not** users.
* `business_supported` - The full list of methods that can be used by bots over a [business connection with invokeWithBusinessConnection](/api/bots/connected-business-bots.md).
* `unauthed_allowed` - The full list of methods that can be used by not yet logged in connections.
* `layer` - Layer number (integer).

Error messages and error descriptions may contain `printf` placeholders in key positions, for now only `%d` is used to map durations contained in error messages to error descriptions.

Example:
```json
{
    "errors": {
        "420": {
            "2FA_CONFIRM_WAIT_%d": [
                "account.deleteAccount"
            ],
            "SLOWMODE_WAIT_%d": [
                "messages.forwardMessages",
                "messages.sendInlineBotResult",
                "messages.sendMedia",
                "messages.sendMessage",
                "messages.sendMultiMedia"
            ]
        }
    },
    "descriptions": {
        "2FA_CONFIRM_WAIT_%d": "Since this account is active and protected by a 2FA password, we will delete it in 1 week for security purposes. You can cancel this process at any time, you'll be able to reset your account in %d seconds.",
        "SLOWMODE_WAIT_%d": "Slowmode is enabled in this chat: wait %d seconds before sending another message to this chat.",
        "FLOOD_WAIT_%d": "Please wait %d seconds before repeating the action."
    },
    "user_only": [
        "account.deleteAccount"
    ],
    "bot_only": [
        "messages.setInlineBotResults"
    ],
    "business_supported": [
        "messages.sendMessage"
    ],
    "unauthed_allowed": [
        "auth.sendCode"
    ],
    "layer": 224
}
```

### Quality of life checks

Note the following: [peer information](/api/peers.md) and other locally cached information is also used for quality-of-life improvements, i.e. to directly prevent the user from doing an operation that is denied by the peer information, instead of allowing the operation and then showing an error.  

These improvements should be implemented by all clients, however, the server will also always prevent the user from doing illegal operations, by emitting an appropriate [RPC error](/api/errors.md), as sometimes it is still possible to make an illegal operation, even if a local check *is* implemented (see below).  

Along with preventing users from doing illegal operations on the client side, clients should always provide localized versions of errors returned by the server (as listed in the JSON file downloadable from the [RPC error page](/api/errors.md)), to inform the user as to why an attempted operation has failed.  

In other words, if the client didn't prevent the failed method call locally because:

* It does not implement a local check for simplicity or
* It *does* implement a local check, but:
  * Outdated peer info indicated that the action is legal, but actually it isn't legal anymore
  * An update was sent by the server for the peer info, but it wasn't applied in time due to an (unavoidable!) race condition between the server sending the update and the client sending the query.
  * Other unspecified reasons (a new check introduced in a future layer by a new feature, etc...)

...it should still let the user know *why* the query failed, based on the description of the RPC error (if available in the [JSON error database](#error-database), otherwise by showing the RPC error itself).  

----------

#### Error Constructors
There should be a way to handle errors that are returned in [rpc_error](/mtproto/service_messages.md#rpc-error) constructors.

Below is a list of error codes and their meanings:

### 303 SEE_OTHER

The request must be repeated, but directed to a different data center.

#### Examples of Errors:

* FILE_MIGRATE_X: the file to be accessed is currently stored in a different data center.
* PHONE_MIGRATE_X: the phone number a user is trying to use for authorization is associated with a different data center.
* NETWORK_MIGRATE_X: the source IP address is associated with a different data center (for registration)
* USER_MIGRATE_X: the user whose identity is being used to execute queries is associated with a different data center (for registration)

In all these cases, the error description's string literal contains the number of the data center (instead of the X) to which the repeated query must be sent.
[More information about redirects between data centers »](/api/datacenter.md)

### 400 BAD_REQUEST

The query contains errors. In the event that a request was created using a form and contains user generated data, the user should be notified that the data must be corrected before the query is repeated.

#### Examples of Errors:

* FIRSTNAME_INVALID: The first name is invalid
* LASTNAME_INVALID: The last name is invalid
* PHONE_NUMBER_INVALID: The phone number is invalid
* PHONE_CODE_HASH_EMPTY: phone_code_hash is missing
* PHONE_CODE_EMPTY: phone_code is missing
* PHONE_CODE_EXPIRED: The confirmation code has expired
* API_ID_INVALID: The api_id/api_hash combination is invalid
* PHONE_NUMBER_OCCUPIED: The phone number is already in use
* PHONE_NUMBER_UNOCCUPIED: The phone number is not yet being used
* USERS_TOO_FEW: Not enough users (to create a chat, for example)
* USERS_TOO_MUCH: The maximum number of users has been exceeded (to create a chat, for example)
* TYPE_CONSTRUCTOR_INVALID: The type constructor is invalid
* FILE_PART_INVALID: The file part number is invalid
* FILE_PARTS_INVALID: The number of file parts is invalid
* FILE_PART_X_MISSING: Part X (where X is a number) of the file is missing from storage
* MD5_CHECKSUM_INVALID: The MD5 checksums do not match
* PHOTO_INVALID_DIMENSIONS: The photo dimensions are invalid
* FIELD_NAME_INVALID: The field with the name FIELD_NAME is invalid
* FIELD_NAME_EMPTY: The field with the name FIELD_NAME is missing

### 401 UNAUTHORIZED

There was an unauthorized attempt to use functionality available only to authorized users.

#### Examples of Errors:

* AUTH_KEY_UNREGISTERED: The key is not registered in the system
* AUTH_KEY_INVALID: The key is invalid
* USER_DEACTIVATED: The user has been deleted/deactivated
* SESSION_REVOKED: The authorization has been invalidated, because of the user terminating all sessions
* SESSION_EXPIRED: The authorization has expired
* AUTH_KEY_PERM_EMPTY: The method is unavailable for temporary authorization key, not bound to permanent

### 403 FORBIDDEN

Privacy violation. For example, an attempt to write a message to someone who has blacklisted the current user.

### 404 NOT_FOUND

An attempt to invoke a non-existent object, such as a method.

### 406 NOT_ACCEPTABLE

Similar to [400 BAD_REQUEST](#400-bad-request), but the app must display the error to the user a bit differently.  
Do not display any visible error to the user when receiving the `rpc_error` constructor: instead, wait for an [updateServiceNotification](/constructor/updateServiceNotification.md) update, and handle it as usual.  
Basically, an [updateServiceNotification](/constructor/updateServiceNotification.md) `popup` update will be emitted independently (ie NOT as an [Updates](/type/Updates.md) constructor inside `rpc_result` but as a normal update) immediately after emission of a 406 `rpc_error`: the update will contain the actual localized error message to show to the user with a UI popup.  

An exception to this is the `AUTH_KEY_DUPLICATED` error, which is only emitted if any of the non-media DC detects that an authorized session is sending requests in parallel from two separate TCP connections, from the same or different IP addresses.  
Note that parallel connections are still allowed and actually recommended for media DCs.  
Also note that by session we mean a logged-in session identified by an [authorization](/constructor/authorization.md) constructor, fetchable using [account.getAuthorizations](/method/account.getAuthorizations.md), not an MTProto session.  

In other words, the **main** connection to a non-media DC normally permits only a **single** [MTProto session](/api/datacenter.md#parallel-sessions): opening additional parallel main sessions (i.e. multiple [session_id](/mtproto/description.md#session)s over the same authorization key, or multiple TCP connections to the main DC) is what triggers this error.  
The server may however explicitly grant permission to run several parallel main sessions, by advertising a `tmp_sessions` value greater than `1` in the [config](/constructor/config.md)/[auth.authorization](/constructor/auth.authorization.md) constructors ([see parallel sessions&nbsp;&raquo;](/api/datacenter.md#parallel-sessions)); only up to that many parallel main sessions may then be opened without triggering `AUTH_KEY_DUPLICATED`. When `tmp_sessions` is absent or `≤ 1`, a single main session must be used.  
Dedicated [file transfer sessions](/api/files.md#general-considerations) on media DCs are exempt and may always be opened in parallel.  

If the client receives an `AUTH_KEY_DUPLICATED` error, the session was already invalidated by the server and the user must generate a new auth key and login again.  

### 420 FLOOD

The maximum allowed number of attempts to invoke the given method with the given input parameters has been exceeded. For example, in an attempt to request a large number of text messages (SMS) for the same phone number.

#### Error Example: 

* FLOOD_WAIT_X: A wait of X seconds is required (where X is a number)
* FLOOD_PREMIUM_WAIT_X: A wait of X seconds is required (where X is a number); the user may also purchase a [Telegram Premium subscription](/api/premium.md) to remove this limitation. See [here&nbsp;&raquo;](/api/files.md) for more info on how to handle this error.  

### 500 INTERNAL

An internal server error occurred while a request was being processed; for example, there was a disruption while accessing a database or file storage.

If a client receives a 500 error, or you believe this error should not have occurred, please collect as much information as possible about the query and error and send it to the developers.

### Other Error Codes

If a server returns an error with a code other than the ones listed above, it may be considered the same as a 500 error and treated as an [internal server error](#500-internal).

<!-- updated fb7304a7f7e66a6750f9ca842dd1406ed3798eebd6f4f2d993924135848ee82e -->
