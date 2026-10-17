# Telegram Gateway API


> The Gateway API is an HTTP-based interface created for developers looking to deliver automated messages, such as verification codes, to users who registered their phone number on Telegram. 

> This page outlines the full API documentation for developers. For more information on the API and the features it offers, see our [Verification Platform Overview](/gateway.md) and [Gateway API Tutorial](/gateway/verification-tutorial.md).

### Recent changes

#### February 26, 2025

- Updated the possible values for *ttl* in [sendVerificationMessage](#sendverificationmessage). The supported range is now 30 to 3600 seconds.
- Clarified the behavior of *ttl*:
  - If a message is **not** delivered within the specified *ttl*, the request **fee will be refunded** automatically.
  - If a message is successfully delivered within the *ttl*, it will not be refunded.
  - If you were already using *ttl* before this update, you do not need to change anything to receive refunds.
- Updated [revokeVerificationMessage](#revokeverificationmessage) to specify that a message will not be removed if it has already been delivered or read.
- Added the optional field *is_refunded* to [RequestStatus](#requeststatus), which indicates whether the request fee was refunded.
- Added new possible statuses **delivered** and **expired** to the field *status* in [DeliveryStatus](#deliverystatus).

### Making requests

All queries to the Telegram Gateway API must be served over HTTPS and need to be presented in this form: `https://gatewayapi.telegram.org/METHOD_NAME`. Like this for example:

    https://gatewayapi.telegram.org/sendVerificationMessage

We support **GET** and **POST** HTTP methods. We support three ways of passing parameters in Gateway API requests:

- [URL query string](https://en.wikipedia.org/wiki/Query_string)
- application/x-www-form-urlencoded
- application/json

The response contains a JSON object, which always has a Boolean field `ok`. If `ok` equals *true*, the request was successful, and the result of the query can be found in the `result` field. In case of an unsuccessful request, `ok` equals *false*, and the error is explained in the `error` field (e.g. ACCESS_TOKEN_INVALID).

- All methods in the Gateway API are case-insensitive.
- All queries must be made using UTF-8.

### Authorization

Before invoking API methods, you must obtain an access token in the Telegram Gateway account settings.

The token must be passed in every request in one of two ways:

- in the HTTP header: `Authorization: Bearer <token>`
- as the `access_token` parameter.

### Available methods

>We support **GET** and **POST** HTTP methods. Use either [URL query string](https://en.wikipedia.org/wiki/Query_string) or *application/json* or *application/x-www-form-urlencoded* for passing parameters in Telegram Gateway API requests.
On successful call, a JSON object containing the result will be returned.

#### sendVerificationMessage

Use this method to send a verification message. Charges will apply according to the pricing plan for each successful message delivery. Note that this method is always free of charge when used to send codes to your own phone number. On success, returns a [RequestStatus](#requeststatus) object.

>[See the tutorial for examples >](/gateway/verification-tutorial.md#sending-auth-codes)

|Parameter|Type|Required|Description|
|-----------|
|phone_number|String|Yes|The phone number to which you want to send a verification message, in the [E.164](https://en.wikipedia.org/wiki/E.164) format.|
|request_id|String|Optional|The unique identifier of a previous request from [checkSendAbility](#checksendability). If provided, this request will be free of charge.|
|sender_username|String|Optional|Username of the Telegram channel from which the code will be sent. The specified channel, if any, must be [verified](https://telegram.org/verify) and owned by the same account who owns the Gateway API token.|
|code|String|Optional|The verification code. Use this parameter if you want to set the verification code yourself. Only fully numeric strings between 4 and 8 characters in length are supported. If this parameter is set, *code_length* is ignored.|
|code_length|Integer|Optional|The length of the verification code if Telegram needs to generate it for you. Supported values are from 4 to 8. This is only relevant if you are not using the *code* parameter to set your own code. Use the [checkVerificationStatus](#checkverificationstatus) method with the *code* parameter to verify the code entered by the user.|
|callback_url|String|Optional|An HTTPS URL where you want to receive [delivery reports](#report-delivery) related to the sent message, 0-256 bytes.|
|payload|String|Optional|Custom payload, 0-128 bytes. This will not be displayed to the user, use it for your internal processes.|
|ttl|Integer|Optional|Time-to-live (in seconds) before the message expires. If the message is not delivered or read within this time, the request fee will be refunded. Supported values are from 30 to 3600.|

#### checkSendAbility

Use this method to optionally check the ability to send a verification message to the specified phone number. If the ability to send is confirmed, a fee will apply according to the pricing plan. After checking, you can send a verification message using the [sendVerificationMessage](#sendverificationmessage) method, providing the *request_id* from this response. 

Within the scope of a *request_id*, only one fee can be charged. Calling [sendVerificationMessage](#sendverificationmessage) once with the returned *request_id* will be free of charge, while repeated calls will result in an error. Conversely, calls that don't include a *request_id* will spawn new requests and incur the respective fees accordingly. Note that this method is always free of charge when used to send codes to your own phone number.

In case the message can be sent, returns a [RequestStatus](#requeststatus) object. Otherwise, an appropriate error will be returned. 

>[See the tutorial for examples >](/gateway/verification-tutorial.md#checking-that-codes-can-be-delivered)

|Parameter|Type|Required|Description|
|-----------|
|phone_number|String|Yes|The phone number for which you want to check our ability to send a verification message, in the [E.164](https://en.wikipedia.org/wiki/E.164) format.|

#### checkVerificationStatus

Use this method to check the status of a verification message that was sent previously. If the code was generated by Telegram for you, you can also verify the correctness of the code entered by the user using this method. Even if you set the code yourself, it is recommended to call this method after the user has successfully entered the code, passing the correct code in the *code* parameter, so that we can track the conversion rate of your verifications. On success, returns a [RequestStatus](#requeststatus) object.

>[See the tutorial for examples >](/gateway/verification-tutorial.md#checking-the-authorization-status)

|Parameter|Type|Required|Description|
|-----------|
|request_id|String|Yes|The unique identifier of the verification request whose status you want to check.|
|code|String|Optional|The code entered by the user. If provided, the method checks if the code is valid for the relevant request.|

#### revokeVerificationMessage

Use this method to revoke a verification message that was sent previously. Returns *True* if the revocation request was received. However, this does not guarantee that the message will be deleted. For example, if the message has already been delivered or read, it will not be removed.

|Parameter|Type|Required|Description|
|-----------|
|request_id|String|Yes|The unique identifier of the request whose verification message you want to revoke.|

### Available types
All types used in Telegram Gateway API responses are represented as JSON objects.

It is safe to use 32-bit signed integers for storing all **Integer** fields unless otherwise noted.

>**Optional** fields may be not returned when irrelevant.

#### RequestStatus

This object represents the status of a verification message request.

|Field|Type|Description|
|-----------|
|request_id|String|Unique identifier of the verification request.|
|phone_number|String|The phone number to which the verification code was sent, in the [E.164](https://en.wikipedia.org/wiki/E.164) format.|
|request_cost|Float|Total request cost incurred by either [checkSendAbility](#checksendability) or [sendVerificationMessage](#sendverificationmessage).|
|is_refunded|Boolean|*Optional.* If *True*, the request fee was refunded.|
|remaining_balance|Float|*Optional.* Remaining balance in credits. Returned only in response to a request that incurs a charge.|
|delivery_status|[DeliveryStatus](#deliverystatus)|*Optional.* The current message delivery status. Returned only if a verification message was sent to the user.|
|verification_status|[VerificationStatus](#verificationstatus)|*Optional.* The current status of the verification process.|
|payload|String|*Optional.* Custom payload if it was provided in the request, 0-256 bytes.|

#### DeliveryStatus

This object represents the delivery status of a message.

|Field|Type|Description|
|-----------|----|-----------|
|status|String|The current status of the message. One of the following:\
- **sent** – the message has been sent to the recipient's device(s),\
- **delivered** – the message has been delivered to the recipient's device(s),\
- **read** – the message has been read by the recipient,\
- **expired** – the message has expired without being delivered or read,\
- **revoked** – the message has been revoked.|
|updated_at|Integer|The timestamp when the status was last updated.|

#### VerificationStatus
This object represents the verification status of a code.

|Field|Type|Description|
|-----------|----|-----------|
|status|String|The current status of the verification process. One of the following:\
- **code_valid** – the code entered by the user is correct, \
- **code_invalid** – the code entered by the user is incorrect, \
- **code_max_attempts_exceeded** – the maximum number of attempts to enter the code has been exceeded, \
- **expired** – the code has expired and can no longer be used for verification. |
|updated_at|Integer|The timestamp for this particular status. Represents the time when the status was last updated.|
|code_entered|String|*Optional.* The code entered by the user.|

### Report delivery

The Telegram Gateway API can send delivery reports to a user-specified callback URL. When you include a `callback_url` parameter in your request, the API will send an HTTP POST request to that URL containing the delivery report for the message. The payload of the POST request will be a JSON object representing the [RequestStatus](#requeststatus) object.

Your URL must respond with HTTP status code `200` to acknowledge receipt of the report. Any other status code will be considered a failure, and the service will retry sending the same report up to 10 times with increasing delays between attempts. If all retries fail, the report will be considered lost.

#### Checking report integrity

All reports submitted to your `callback_url`, if you provided one, will also contain the following headers:

 - `X-Request-Timestamp` – A Unix timestamp indicating when the server submitted the report.
 - `X-Request-Signature` – A server-generated signature needed to authenticate the report on your end.

You can confirm the origin and verify the integrity of the reports you receive by comparing the signature contained in the `X-Request-Signature` header with the hexadecimal representation of the [HMAC-SHA-256](https://en.wikipedia.org/wiki/Hash-based_message_authentication_code) signature of the **data-check-string** with the [SHA256](https://en.wikipedia.org/wiki/SHA-2) hash of the API token shown in your Gateway account settings.

The **data-check-string** is a concatenation of the report timestamp as provided by the  `X-Request-Timestamp` header, a [line feed character](https://en.wikipedia.org/wiki/Newline) ('\n', 0x0A) used as separator and the raw post body of the HTTP request.

Example:

    data_check_string = X-Request-Timestamp + '\n' + post_body
    secret_key = SHA256(api_token)
    if (hex(HMAC_SHA256(data_check_string, secret_key)) == X-Request-Signature) {
      // data is from Telegram
    }

> To prevent the use of outdated data, you should additionally check the `X-Request-Timestamp` header, which contains a Unix timestamp of when the relevant report was submitted by the server.
