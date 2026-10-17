# Telegram passport


**Telegram Passport** is a unified authorization method for services that require personal identification. Users can upload their documents once, then instantly share their data with services that require real-world ID (finance, ICOs, etc.). Telegram doesn't have access to the users' personal information thanks to end-to-end encryption.

This page describes the request flow that client apps must used to send the requested data to the service.

### Overview

From the perspective of a service that requires real-world ID, the process looks like this:

* A user presses “Log in with Telegram” on your website or in your app.
* You request the data you need.
* The user accepts your privacy policy and agrees to share their data.
* The user's Telegram app downloads and decrypts the data you requested from the end-to-end encrypted storage on Telegram.
* If some of the data you requested is missing, the user can add it to their Telegram Passport at this point.
* The user's app encrypts the data with your public key and sends it to you.
* You decrypt the data, check it for errors and re-request any missing or invalid information.
* You sign the user up for your service. Tada!

See [As a bot](#as-a-bot) to see how to request passport data using a bot, through the MTProto API.
Look at the [Passport Manual](/passport.md) to see how to request passport data using a bot, through the simplified bot API.

From the perspective of a user, the process looks something like this:

* Your app [receives an event/intent](#receiving-requests) from one of the [SDKs](/passport.md#sdk), or from a custom source.
* The user accepts your privacy policy and agrees to share their data.
* The user's Telegram app [downloads the data you requested](/passport/encryption.md#fetching-and-deleting-stored-passport-data) from the end-to-end encrypted storage on Telegram.
* If some of the data you requested is missing, the user can [add it to their Telegram Passport](/passport/encryption.md#encryption) at this point.
* The user's app encrypts the data with your public key and sends it to the service.
* You sign the user up for your service. Tada!

See [As a user](#as-a-user) to see how user client apps should send passport data to a service, through the MTProto API.

### As a bot

A simplified version of this process can be used using the bot API, for more info see the [Passport Manual](/passport.md).

Using the MTProto API, the process is pretty much the same, up until the actual API calls.

> Note that all binary fields are in raw binary format, unlike in the bot API where they are base64-encoded

#### Setting Up Telegram Passport

[As per the bot API](/passport.md#setting-up-telegram-passport).

#### Requesting Information

[As per the bot API](/passport.md#requesting-information).

#### Receiving information

Schema:

    secureData#8aeabec3 data:bytes data_hash:bytes secret:bytes = SecureData;

    securePlainPhone#7d6099dd phone:string = SecurePlainData;
    securePlainEmail#21ec5a5f email:string = SecurePlainData;

    secureFile#7d09c27e id:long access_hash:long size:long dc_id:int date:int file_hash:bytes secret:bytes = SecureFile;

    secureValueTypePersonalDetails#9d2a81e3 = SecureValueType;
    secureValueTypePassport#3dac6a00 = SecureValueType;
    secureValueTypeDriverLicense#6e425c4 = SecureValueType;
    secureValueTypeIdentityCard#a0d0744b = SecureValueType;
    secureValueTypeInternalPassport#99a48f23 = SecureValueType;
    secureValueTypeAddress#cbe31e26 = SecureValueType;
    secureValueTypeUtilityBill#fc36954e = SecureValueType;
    secureValueTypeBankStatement#89137c0d = SecureValueType;
    secureValueTypeRentalAgreement#8b883488 = SecureValueType;
    secureValueTypePassportRegistration#99e3806a = SecureValueType;
    secureValueTypeTemporaryRegistration#ea02ec33 = SecureValueType;
    secureValueTypePhone#b320aadb = SecureValueType;
    secureValueTypeEmail#8e3ca7ee = SecureValueType;

    secureValue#187fa0ca flags:# type:SecureValueType data:flags.0?SecureData front_side:flags.1?SecureFile reverse_side:flags.2?SecureFile selfie:flags.3?SecureFile translation:flags.6?Vector<SecureFile> files:flags.4?Vector<SecureFile> plain_data:flags.5?SecurePlainData hash:bytes = SecureValue;

    secureCredentialsEncrypted#33f0ea47 data:bytes hash:bytes secret:bytes = SecureCredentialsEncrypted;

    messageActionSecureValuesSentMe#1b287353 values:Vector<SecureValue> credentials:SecureCredentialsEncrypted = MessageAction;	
    messageService#7a800e0a flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true reactions_are_possible:flags.9?true silent:flags.13?true post:flags.14?true legacy:flags.19?true id:int from_id:flags.8?Peer peer_id:Peer saved_peer_id:flags.28?Peer reply_to:flags.3?MessageReplyHeader date:int action:MessageAction reactions:flags.20?MessageReactions ttl_period:flags.25?int = Message;
    
    updateNewMessage#1f2b0afd message:Message pts:int pts_count:int = Update;

When the user confirms your request by pressing the "Authorize" button, the MTProto API sends an [updateNewMessage](/constructor/updateNewMessage.md) from the user, with a [messageService](/constructor/messageService.md) constructor, containing a [messageActionSecureValuesSentMe](/constructor/messageActionSecureValuesSentMe.md) constructor that contains the encrypted Telegram Passport data.

#### Decrypting data

	secureCredentialsEncrypted#33f0ea47 data:bytes hash:bytes secret:bytes = SecureCredentialsEncrypted;

    messageActionSecureValuesSentMe#1b287353 values:Vector<SecureValue> credentials:SecureCredentialsEncrypted = MessageAction;	
    
    
To decrypt the received data, first, decrypt the credentials contained in [secureCredentialsEncrypted](/constructor/secureCredentialsEncrypted.md).

1. Decrypt the credentials secret ( *secret* field in [secureCredentialsEncrypted](/constructor/secureCredentialsEncrypted.md)) using your **private** key (set OAEP padding option, e.g. `OPENSSL_PKCS1_OAEP_PADDING` in PHP)
2. Use this secret and the credentials hash ( *hash* field in [secureCredentialsEncrypted](/constructor/secureCredentialsEncrypted.md)) to calculate *credentials_key* and *credentials_iv* as described below:

        credentials_secret_hash = SHA512( credentials_secret + credentials_hash )
        credentials_key = slice( credentials_secret_hash, 0, 32 )
        credentials_iv = slice( credentials_secret_hash, 32, 16 )
        
3. Decrypt the credentials data ( *data* field in [secureCredentialsEncrypted](/constructor/secureCredentialsEncrypted.md)) by AES256-CBC using these *credentials_key* and *credentials_iv*. **IMPORTANT:** At this step, make sure that the credentials hash is equal to `SHA256( credentials_data )`
4. Credentials data is padded with 32 to 255 random padding bytes to make its length divisible by 16 bytes. The first byte contains the length of this padding (including this byte). Remove the padding to get the data.

> Note that all hashes are raw binary data, not hexits

#### Credentials

The credentials are a JSON-serialized object, structured exactly as in the [bot API&nbsp;&raquo;](/passport.md#credentials).
Since decryption credentials are E2E encrypted, apps have to store the decryption credentials as JSON and not TL payloads.

The credentials are used as described in the [Passport Manual](/passport.md#credentials) to decrypt the files attached to the [secureValue](/constructor/secureValue.md).
In this case, the container for the E2E encrypted data is in TL, while the encrypted data itself is in JSON.

##### [secureValue](/constructor/secureValue.md)

    secureValue#187fa0ca flags:# type:SecureValueType data:flags.0?SecureData front_side:flags.1?SecureFile reverse_side:flags.2?SecureFile selfie:flags.3?SecureFile translation:flags.6?Vector<SecureFile> files:flags.4?Vector<SecureFile> plain_data:flags.5?SecurePlainData hash:bytes = SecureValue;
    
    messageActionSecureValuesSentMe#1b287353 values:Vector<SecureValue> credentials:SecureCredentialsEncrypted = MessageAction;	
    
    
The schema for the [secureValue](/constructor/inputSecureValue.md) constructor defines the constructor that can be found in each field.

| Name | Type | Description |
| --- | --- | --- |
| **type** | [SecureValueType](/type/SecureValueType.md) | Secure [passport](/passport.md) value type |
| **data** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[SecureData](/type/SecureData.md) | Encrypted [Telegram Passport](/passport.md) element data |
| **front\_side** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[SecureFile](/type/SecureFile.md) | Encrypted [passport](/passport.md) file with the front side of the document |
| **reverse\_side** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[SecureFile](/type/SecureFile.md) | Encrypted [passport](/passport.md) file with the reverse side of the document |
| **selfie** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[SecureFile](/type/SecureFile.md) | Encrypted [passport](/passport.md) file with a selfie of the user holding the document |
| **translation** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[Vector](/type/Vector%20t)<[SecureFile](/type/SecureFile.md)> | Array of encrypted [passport](/passport.md) files with translated versions of the provided documents |
| **files** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[Vector](/type/Vector%20t)<[SecureFile](/type/SecureFile.md)> | Array of encrypted [passport](/passport.md) files with photos the of the documents |
| **plain\_data** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[SecurePlainData](/type/SecurePlainData.md) | Plaintext verified [passport](/passport.md) data |
| **hash** | [bytes](/type/bytes.md) | Data hash |

Here's a list of possible [SecureValueTypes](/type/SecureValueType.md), and the parameters that can be set/requested when using each type.

| Type | Allowed fields |
| --- | --- |
| [secureValueTypeEmail](/constructor/secureValueTypeEmail.md) | `plain_data` |
| [secureValueTypePhone](/constructor/secureValueTypeEmail.md) | `plain_data` |
| [secureValueTypePersonalDetails](/constructor/secureValueTypePersonalDetails.md) | `data` |
| [secureValueTypePassport](/constructor/secureValueTypePassport.md) | `data`, `front_side`, `selfie`, `translation`  |
| [secureValueTypeDriverLicense](/constructor/secureValueTypeDriverLicense.md) | `data`, `front_side`, `reverse_side`, `selfie`, `translation` |
| [secureValueTypeIdentityCard](/constructor/secureValueTypeIdentityCard.md) | `data`, `front_side`, `reverse_side`, `selfie`, `translation` |
| [secureValueTypeInternalPassport](/constructor/secureValueTypeInternalPassport.md) | `data`, `front_side`, `selfie`, `translation` |
| [secureValueTypeAddress](/constructor/secureValueTypeAddress.md) | `data` |
| [secureValueTypeUtilityBill](/constructor/secureValueTypeUtilityBill.md) | `files`, `translation` |
| [secureValueTypeBankStatement](/constructor/secureValueTypeBankStatement.md) | `files`, `translation` |
| [secureValueTypeRentalAgreement](/constructor/secureValueTypeRentalAgreement.md) | `files`, `translation` |
| [secureValueTypePassportRegistration](/constructor/secureValueTypePassportRegistration.md) | `files`, `translation` |
| [secureValueTypeTemporaryRegistration](/constructor/secureValueTypeTemporaryRegistration.md) | `files`, `translation` |

##### [SecureData](/type/SecureData.md)

	secureData#8aeabec3 data:bytes data_hash:bytes secret:bytes = SecureData;

Data is an encrypted and padded JSON-serialized object of one of the specified JSON types, depending on the chosen [type](/type/SecureValueType.md).

| Chosen type | JSON object |
| --- | --- |
| [secureValueTypePersonalDetails](/constructor/secureValueTypePersonalDetails.md) | [PersonalDetails](/passport.md#personaldetails) |
| [secureValueTypePassport](/constructor/secureValueTypePassport.md) | [IdDocumentData](/passport.md#iddocumentdata) |
| [secureValueTypeDriverLicense](/constructor/secureValueTypeDriverLicense.md) | [IdDocumentData](/passport.md#iddocumentdata) |
| [secureValueTypeIdentityCard](/constructor/secureValueTypeIdentityCard.md) | [IdDocumentData](/passport.md#iddocumentdata) |
| [secureValueTypeInternalPassport](/constructor/secureValueTypeInternalPassport.md) | [IdDocumentData](/passport.md#iddocumentdata) |
| [secureValueTypeAddress](/constructor/secureValueTypeAddress.md) | [ResidentialAddress](/passport.md#residentialaddress) |

[DataCredentials](/passport.md#datacredentials) extracted [from the credentials](#credentials) can then be used to decrypt encrypted data from the *data* field in [secureData](/constructor/secureData.md).
For more info on how to decrypt the *data* field, see the [passport manual](/passport.md#datacredentials).

##### [SecureFile](/type/SecureFile.md)

	secureFile#7d09c27e id:long access_hash:long size:long dc_id:int date:int file_hash:bytes secret:bytes = SecureFile;	
    
    inputSecureFileLocation#cbc7ee28 id:long access_hash:long = InputFileLocation;
    
    ---functions---
    
	upload.getFile#be5335be flags:# precise:flags.0?true cdn_supported:flags.1?true location:InputFileLocation offset:long limit:int = upload.File;

Files (JPG format when decrypted, max. 10 MB) are downloaded chunk by chunk as described in [files&nbsp;&raquo;](/api/files.md), except that instead of generating an [inputFileLocation](/constructor/inputFile.md), an [inputFileLocation](/constructor/inputFileLocation.md) should be generated, instead.

* The `id` field is the `id` of the [secureFile](/constructor/secureFile.md)
* The `access_hash` field is the `access_hash` of the [secureFile](/constructor/secureFile.md)

[FileCredentials](/passport.md#filecredentials) extracted [from the credentials](#credentials) can then be used to decrypt downloaded encrypted data.
For more info on how to decrypt passport files, see the [passport manual](/passport.md#filecredentials).

##### [SecurePlainData](/type/SecurePlainData.md)

	securePlainPhone#7d6099dd phone:string = SecurePlainData;
	securePlainEmail#21ec5a5f email:string = SecurePlainData;
	
The email/phone is passed in plaintext using the respective [SecurePlainData](/type/SecurePlainData.md) constructor.
Emails and phone numbers sent using telegram passport are *already verified* as described in the [passport manual](/passport/encryption.md#secureplaindata).

#### Fixing errors

    secureValueErrorData#e8a40bd9 type:SecureValueType data_hash:bytes field:string text:string = SecureValueError;
    secureValueErrorFrontSide#be3dfa type:SecureValueType file_hash:bytes text:string = SecureValueError;
    secureValueErrorReverseSide#868a2aa5 type:SecureValueType file_hash:bytes text:string = SecureValueError;
    secureValueErrorSelfie#e537ced6 type:SecureValueType file_hash:bytes text:string = SecureValueError;
    secureValueErrorFile#7a700873 type:SecureValueType file_hash:bytes text:string = SecureValueError;
    secureValueErrorFiles#666220e9 type:SecureValueType file_hash:Vector<bytes> text:string = SecureValueError;
    secureValueError#869d758f type:SecureValueType hash:bytes text:string = SecureValueError;
    secureValueErrorTranslationFile#a1144770 type:SecureValueType file_hash:bytes text:string = SecureValueError;
    secureValueErrorTranslationFiles#34636dd8 type:SecureValueType file_hash:Vector<bytes> text:string = SecureValueError;

    inputUser#f21158c6 user_id:long access_hash:long = InputUser;

    ---functions---

    users.setSecureValueErrors#90c894b5 id:InputUser errors:Vector<SecureValueError> = Bool;

If the data you received contains errors, the bot can use the [users.setSecureValueErrors](/method/users.setSecureValueErrors.md) method to inform the user and [request information](#requesting-information) again. The user will not be able to resend the data, until all errors are fixed.

Descriptions of the method parameters can be found in the method's [documentation page&nbsp;&raquo;](/method/users.setSecureValueErrors.md).

### As a user

#### Receiving requests

The process starts when your app receives an event from one of the [SDKs](/passport.md#sdk), or from a custom source.

#### URI format

The SDKs trigger a passport authorization request by opening the following [deep links&nbsp;&raquo;](/api/links.md):

`tg:` syntax:
```
tg://passport?bot_id=<bot_user_id>&scope=<scope>&public_key=<public_key>&nonce=<nonce>
tg://resolve?domain=telegrampassport&bot_id=<bot_user_id>&scope=<scope>&public_key=<public_key>&nonce=<nonce>
```

With the following query string parameters:

| Parameters | Type | Required | Description |
| --- | --- | --- | --- |
| domain | String | Required only for `resolve` versions of the passport URI | Always `telegrampassport` for Passport authorization requests. |
|bot_id|Integer|Yes|Unique identifier for the bot. You can get it from bot token. For example, for the bot token `1234567:4TT8bAc8GHUspu3ERYn-KGcvsvGB9u_n4ddy`, the bot id is `1234567`.|
|scope|[UriPassportScope](#uripassportscope)|Yes|A more compact JSON-serialized object describing the data you want to request|
|public_key|String|Yes|Public key of the bot|
|nonce|String|Yes|Bot-specified nonce. **Important:** For security purposes it should be a cryptographically secure unique identifier of the request. In particular, it should be long enough and it should be generated using a cryptographically secure pseudorandom number generator. You should never accept credentials with the same nonce twice.|
|callback_url|String|Optional|Supported by some Telegram clients, specifies a callback URL to open once the process is finished or canceled. |
|payload|String|Optional|**Deprecated** parameter from Telegram Passport 1.0 that had the same function of the `nonce` parameter. Services that still use a legacy version of the SDK may provide this parameter instead of the `nonce`. In some cases, both the `nonce` and the `payload` parameters may be found in a URI, for backwards compatibility: in this case, the `nonce` parameter should always be used instead of `payload`.|

Example URI, generated by the [Telegram Passport Example page](/passport/example.md):

```
tg://resolve?domain=telegrampassport&bot_id=543260180&scope=%7B%22v%22%3A1%2C%22d%22%3A%5B%7B%22_%22%3A%22pd%22%2C%22n%22%3A1%7D%2C%22ad%22%2C%22pn%22%2C%22em%22%2C%7B%22_%22%3A%5B%7B%22_%22%3A%22pp%22%2C%22s%22%3A1%2C%22t%22%3A1%7D%2C%22ip%22%2C%22dl%22%2C%22ic%22%5D%7D%2C%7B%22_%22%3A%5B%22ub%22%2C%22bs%22%2C%22ra%22%2C%22pr%22%2C%22tr%22%5D%7D%5D%7D&public_key=-----BEGIN%20PUBLIC%20KEY-----%0AMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv6m1zBF8lZOCqcxf8hnj%0AkvHwuWdU8s4rBWaxKXH%2FvDDUklcCS5uhSnmjhxWca9suubaG3lW4HxlCilkeJPVf%0Ajimg5Q8ZqWrR3OoOihEpcG9iJZTOEpsEk7VtEiabgacBG3Quv9JslTrDe95Fn801%0At9d21HXwgMrHeHpWDOn31Dr%2BwoEH%2BkwySUWa6L%2FZbnGwSNP7eeDTE7Amz1RMDk3t%0A8EWGq58u0IQatPcEH09aUQlKzk6MIiALkZ9ILBKCBk6d2WCokKnsdBctovNbxwSx%0AhP1qst1r%2BYc8iPBZozsDC0ZsC5jXCkcODI3OC0tkNtYzN2XKalW5R0DjDRUDmGhT%0AzQIDAQAB%0A-----END%20PUBLIC%20KEY-----%0A&nonce=b8e892dc2e0afe63424d101b964f1256_32858210_708614a4585b84872e&callback_url=https%3A%2F%2Fcore.telegram.org%2Fpassport%2Fexample%3Fpassport_ssid%3Db8e892dc2e0afe63424d101b964f1256_32858210_db259b427f200751ce&payload=b8e892dc2e0afe63424d101b964f1256_32858210_708614a4585b84872e
```

#### UriPassportScope

This object represents the data to be requested.

| Field | Type | Description |
| --- | --- | --- |
|d|Array of [UriPassportScopeElement](#uripassportscopeelement)|List of requested elements, each type may be used only once in the entire array of UriPassportScopeElement objects|
|v|Integer|Scope version, must be _1_|

##### UriPassportScopeElement

This object represents a requested element, should be one of:

* [UriPassportScopeElementOneOfSeveral](#uripassportscopeelementoneofseveral) - use to request any one of the documents included in the scope.
* [UriPassportScopeElementOne](#uripassportscopeelementone) – use to request one particular document.

Passport document type identifiers are aliased with the following reduced type identifiers:

|**Full**|**Alias**|
|---|---|
|`personal_details`|`pd`|
|`passport`|`pp`|
|`driver_license`|`dl`|
|`identity_card`|`ic`|
|`internal_passport`|`ip`|
|`id_document`|`idd`|
|`address`|`ad`|
|`utility_bill`|`ub`|
|`bank_statement`|`bs`|
|`rental_agreement`|`ra`|
|`passport_registration`|`pr`|
|`temporary_registration`|`tr`|
|`address_document`|`add`|
|`phone_number`|`pn`|
|`email`|`em`|
 

You can use the special type "idd" as an alias for one of "pp", "dl", "ic" and the special type "add" as an alias for one of "ub", "bs", "ra". 

#### UriPassportScopeElementOneOfSeveral

This object represents several elements one of which must be provided.

| Field | Type | Description |
| --- | --- | --- |
|\_|Array of [UriPassportScopeElementOne](#uripassportscopeelementone)|List of elements one of which must be provided; must contain either several of “pp”, “dl”, “ic”, “ip” **or** several of “ub”, “bs”, “ra”, “pr”, “tr”|
|s|Boolean|_Optional._ Use this parameter if you want to request a selfie with the document from this list that the user chooses to upload.|
|t|Boolean|_Optional._ Use this parameter if you want to request a translation of the document from this list that the user chooses to upload. **Note:** We suggest to only request translations *after* you have received a valid document that requires one.|

#### UriPassportScopeElementOne
This object represents one particular element that must be provided. If no options are needed, _String_ can be used instead of this object to specify the type of the element.

| Field | Type | Description |
| --- | --- | --- |
|\_|String|Element type. One of "pd", "pp", "dl", "ic", "ip", "ad", "ub", "bs", "ra", "pr", "tr", "pn", "em"|
|s|Boolean|_Optional._ Use this parameter if you want to request a selfie with the document as well. Available for "pp", "dl", "ic" and "ip"|
|t|Boolean|_Optional._ Use this parameter if you want to request a translation of the document as well. Available for "pp", "dl", "ic", "ip", "ub", "bs", "ra", "pr" and "tr". **Note:** We suggest to only request translations *after* you have received a valid document that requires one.|
|n|Boolean|_Optional._ Use this parameter to request the first, last and middle name of the user in the language of the user's country of residence. Available for "pd"|

You can also use the special type "idd" as an alias for one of "pp", "dl", "ic" and the special type "add" as an alias for one of "ub", "bs", "ra". 

#### Setting up Telegram Passport

The next step for the client app is to request the user's 2FA passport, and configure Telegram Passport/fetch and decrypt remotely saved Telegram Passport parameters as described in the [Encryption article&nbsp;&raquo;](/passport/encryption.md).

#### Fetching the passport form

    account.authorizationForm#ad2e1cd8 flags:# required_types:Vector<SecureRequiredType> values:Vector<SecureValue> errors:Vector<SecureValueError> users:Vector<User> privacy_policy_url:flags.0?string = account.AuthorizationForm;

    ---functions---

    account.getAuthorizationForm#a929597a bot_id:long scope:string public_key:string = account.AuthorizationForm;

Then, the client app passes the bot ID, scope and public key from the [passport authorization request](#receiving-requests) to the Telegram servers using the [account.getAuthorizationForm](/method/account.getAuthorizationForm.md) method.

The response will be an [account.authorizationForm](/constructor/account.authorizationForm.md) constructor, with info about the required document types, the URL of the service's privacy policy, as well as info about the bot to which the form should be sent.
If the form was already submitted at least once, the constructor will also contain a list of already submitted data, along with eventual errors. 

The user should accept the privacy policy and proceed to fill in the required data, and the client should encrypt and upload it as described in the [Encryption article&nbsp;&raquo;](/passport/encryption.md).

#### Submitting the passport form

    secureCredentialsEncrypted#33f0ea47 data:bytes hash:bytes secret:bytes = SecureCredentialsEncrypted;

    secureValueHash#ed1ecdb0 type:SecureValueType hash:bytes = SecureValueHash;

    ---functions---

    account.acceptAuthorization#f3ed4c73 bot_id:long scope:string public_key:string value_hashes:Vector<SecureValueHash> credentials:SecureCredentialsEncrypted = Bool;

Once the user finishes uploading the required documents and clicks on the submit button, the client calls [account.acceptAuthorization](/method/account.acceptAuthorization.md), submitting the documents to the bot associated to the service.

* As before, `bot_id`, `scope` and `public_key` are taken from the authorization request URI.
* `value_hashes` is used by the server to choose which document of which type to send to the bot: the `type` field should be set to the document type, and the `hash` field should be set to the `data_hash`/`file_hash` generated when [uploading encrypting the data&nbsp;&raquo;](/passport/encryption.md#encryption).
* `credentials` contains the encrypted credentials required by the service to decrypt the sent E2E encrypted secure values: it is generated as described in [Passport Credentials&nbsp;&raquo;](/passport/encryption.md#passport-credentials).

Finally, the client opens the callback URL (if present).

#### Handling invalid forms

    secureValueErrorData#e8a40bd9 type:SecureValueType data_hash:bytes field:string text:string = SecureValueError;
    secureValueErrorFrontSide#be3dfa type:SecureValueType file_hash:bytes text:string = SecureValueError;
    secureValueErrorReverseSide#868a2aa5 type:SecureValueType file_hash:bytes text:string = SecureValueError;
    secureValueErrorSelfie#e537ced6 type:SecureValueType file_hash:bytes text:string = SecureValueError;
    secureValueErrorFile#7a700873 type:SecureValueType file_hash:bytes text:string = SecureValueError;
    secureValueErrorFiles#666220e9 type:SecureValueType file_hash:Vector<bytes> text:string = SecureValueError;
    secureValueError#869d758f type:SecureValueType hash:bytes text:string = SecureValueError;
    secureValueErrorTranslationFile#a1144770 type:SecureValueType file_hash:bytes text:string = SecureValueError;
    secureValueErrorTranslationFiles#34636dd8 type:SecureValueType file_hash:Vector<bytes> text:string = SecureValueError;

    account.authorizationForm#ad2e1cd8 flags:# required_types:Vector<SecureRequiredType> values:Vector<SecureValue> errors:Vector<SecureValueError> users:Vector<User> privacy_policy_url:flags.0?string = account.AuthorizationForm;

    ---functions---

    account.getAuthorizationForm#a929597a bot_id:long scope:string public_key:string = account.AuthorizationForm;
    
If any of the values of the submitted form are rejected by the service, the bot [calls the appropriate method to set information about errors](/api/passport.md#fixing-errors).

The user can find out about these errors directly from the service, or, if they decide to [restart the process](#receiving-requests) and resend the corrected data, directly from the authorization form (`errors` field).

