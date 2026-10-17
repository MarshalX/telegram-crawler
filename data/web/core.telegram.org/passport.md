# Telegram Passport Manual


**Telegram Passport** is a unified authorization method for services that require personal identification. Users can upload their documents once, then instantly share their data with services that require real-world ID (finance, ICOs, etc.). Telegram doesn't have access to the users' personal information thanks to end-to-end encryption.

### Overview

From the perspective of a service that requires real-world ID, the process looks like this:

- A user presses "Log in with Telegram" on your **website** or in your **app**.
- You [request](#requesting-information) the [data](#fields) you need.
- The user accepts your [privacy policy](#privacy-policy) and agrees to share their data.
- The user's Telegram app downloads and decrypts the data you requested from the end-to-end encrypted storage on Telegram.
- If some of the data you requested is missing, the user can add it to their Telegram Passport at this point.
- The user's app encrypts the data with your [public key](#generating-your-public-key) and sends it to you.
- You [decrypt](#decrypting-data) the data, check it for [errors](#fixing-errors) and re-request any missing or invalid information.
- You sign the user up for your service. **Tada!**

Check out [this example](/passport/example.md) to see Telegram Passport in action.

> To learn more about Telegram Passport from the perspective of a user, please see [this blog post](https://telegram.org/blog/passport) and the [technical MTProto documentation](/api/passport.md).
See [this page](/passport/encryption.md) if you're interested in encryption algorithms used on Telegram's side.

### Recent changes

#### August 25, 2018
**Telegram Passport 1.1** ([blog post](https://telegram.org/blog/export-and-more#improved-telegram-passport))

- Added support for requesting **several documents of one type**. See the new objects [PassportScope](#passportscope), [PassportScopeElement](#passportscopeelement), [PassportScopeElementOneOfSeveral](#passportscopeelementone) and [PassportScopeElementOne](#passportscopeelementone).
- Added support for **middle names**.
- Added support for requesting certified **English translations** for documents (see [Fields](#fields); new field *translation* also added to the [SecureValue](#securevalue) object). **Note:** Please only request translations *after* you have received a valid document that requires one.
- Added support for requesting **names** in the language of the user's country of residence (if other than English). New fields *first_name_native*, *last_name_native* and *middle_name_native* added to the [PersonalDetails](#personaldetails) object.
- Replaced the *payload* parameter with the new parameter *nonce*, which serves the same function, to make the purpose more obvious (see [Request Parameters](#request-parameters) and the [Credentials](#credentials) object).
- Updated the [example page](/passport/example.md) to support the new functionality.

### Setting Up Telegram Passport

To integrate Telegram Passport into your login or verification flow, you need a working Telegram bot (see [this page](/bots.md#how-do-i-create-a-bot) for information on how to get one).

To request data from Telegram Passport users, your bot will need to generate a pair of encryption keys.

#### Generating a private key

First, use a console to generate a **private** key:

	openssl genrsa 2048 > private.key
    
**WARNING: Keep your private key SECRET!** 

#### Generating your public key
Then use the console to print the corresponding **public** key:

	openssl rsa -in private.key -pubout
    
Use the **/setpublickey** command with [@BotFather](https://t.me/BotFather) to connect this public key with your bot.

#### Privacy Policy

Add a link to your Privacy Policy by using the **/setprivacypolicy** command. Users will see this link when offered to authorize you to access their data.

### Requesting Information

#### SDK

To request information stored in a Telegram Passport, use one of these **SDKs**:

* [iOS/macOS SDK](/passport/sdk-ios-mac.md)
* [Android SDK](/passport/sdk-android.md)
* [Javascript SDK](/passport/sdk-javascript.md)

#### Request Parameters

Use the following parameters to request information with the SDK:

| Parameters | Type | Required | Description |
| --- | --- | --- | --- |
|bot_id|Integer|Yes|Unique identifier for the bot. You can get it from bot token. For example, for the bot token `1234567:4TT8bAc8GHUspu3ERYn-KGcvsvGB9u_n4ddy`, the bot id is `1234567`.|
|scope|[PassportScope](#passportscope)|Yes|A JSON-serialized object describing the data you want to request|
|public_key|String|Yes|Public key of the bot|
|nonce|String|Yes|Bot-specified nonce. **Important:** For security purposes it should be a cryptographically secure unique identifier of the request. In particular, it should be long enough and it should be generated using a cryptographically secure pseudorandom number generator. You should never accept credentials with the same nonce twice.|

#### PassportScope

This object represents the data to be requested.

| Field | Type | Description |
| --- | --- | --- |
|data|Array of [PassportScopeElement](#passportscopeelement)|List of requested elements, each type may be used only once in the entire array of PassportScopeElement objects|
|v|Integer|Scope version, must be _1_|

#### PassportScopeElement
This object represents a requested element, should be one of:

* [PassportScopeElementOneOfSeveral](#passportscopeelementoneofseveral) - use to request any one of the documents included in the scope.
* [PassportScopeElementOne](#passportscopeelementone) – use to request one particular document.

#### PassportScopeElementOneOfSeveral
This object represents several elements one of which must be provided.

| Field | Type | Description |
| --- | --- | --- |
|one_of|Array of [PassportScopeElementOne](#passportscopeelementone)|List of elements one of which must be provided; must contain either several of “passport”, “driver_license”, “identity_card”, “internal_passport” **or** several of “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration”|
|selfie|Boolean|_Optional._ Use this parameter if you want to request a selfie with the document from this list that the user chooses to upload.|
|translation|Boolean|_Optional._ Use this parameter if you want to request a translation of the document from this list that the user chooses to upload. **Note:** We suggest to only request translations *after* you have received a valid document that requires one.|

#### PassportScopeElementOne
This object represents one particular element that must be provided. If no options are needed, _String_ can be used instead of this object to specify the type of the element.

| Field | Type | Description |
| --- | --- | --- |
|type|String|Element type. One of "personal_details", "passport", "driver_license", "identity_card", "internal_passport", "address", "utility_bill", "bank_statement", "rental_agreement", "passport_registration", "temporary_registration", "phone_number", "email"|
|selfie|Boolean|_Optional._ Use this parameter if you want to request a selfie with the document as well. Available for "passport", "driver_license", "identity_card" and "internal_passport"|
|translation|Boolean|_Optional._ Use this parameter if you want to request a translation of the document as well. Available for "passport", "driver_license", "identity_card", "internal_passport", "utility_bill", "bank_statement", "rental_agreement", "passport_registration" and "temporary_registration". **Note:** We suggest to only request translations *after* you have received a valid document that requires one.|
|native_names|Boolean|_Optional._ Use this parameter to request the first, last and middle name of the user in the language of the user's country of residence. Available for "personal_details"|

You can also use the special type "id_document" as an alias for one of "passport", "driver_license", "identity_card" and the special type "address_document" as an alias for one of "utility_bill", "bank_statement", "rental_agreement". 
So `{"type":"id_document",selfie:true}` is equal to `{"one_of":["passport","driver_license","identity_card"],selfie:true}`.

#### Fields

Your bot can request personal details, one or several types of identity document, residential address, one or several types of proof of address document, a phone number, or an email address. You can also request optional **selfies** with the document and certified **English translations** of the document.
This is just a list of data types that can be requested, and the encrypted objects that will contain such data.

>**Note:** We suggest to only request English translations *after* you have received a valid document that requires one.

<div><table class="table">
<thead>
<tr><th>Name</th><th>Key</th><th>Type</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>personal_details</td><td>data</td><td><a href="#personaldetails">PersonalDetails</a></td><td>Personal Details</td></tr>
<tr><td rowspan="4">passport</td><td>data</td><td><a href="#iddocumentdata">IdDocumentData</a></td><td rowspan="4">Passport</td></tr>
<tr><td>front_side</td><td><a href="#passportfile">PassportFile</a></td></tr>
<tr><td>selfie</td><td><i>Optional.</i> <a href="#passportfile">PassportFile</a></td></tr>
<tr><td>translation</td><td><i>Optional.</i> Array of <a href="#passportfile">PassportFile</a></td></tr>
<tr><td rowspan="4">internal_passport</td><td>data</td><td><a href="#iddocumentdata">IdDocumentData</a></td><td rowspan="4">Internal Passport</td></tr>
<tr><td>front_side</td><td><a href="#passportfile">PassportFile</a></td></tr>
<tr><td>selfie</td><td><i>Optional.</i> <a href="#passportfile">PassportFile</a></td></tr>
<tr><td>translation</td><td><i>Optional.</i> Array of <a href="#passportfile">PassportFile</a></td></tr>
<tr><td rowspan="5">driver_license</td><td>data</td><td><a href="#iddocumentdata">IdDocumentData</a></td><td rowspan="5">Driver License</td></tr>
<tr><td>front_side</td><td><a href="#passportfile">PassportFile</a></td></tr>
<tr><td>reverse_side</td><td><a href="#passportfile">PassportFile</a></td></tr>
<tr><td>selfie</td><td><i>Optional.</i> <a href="#passportfile">PassportFile</a></td></tr>
<tr><td>translation</td><td><i>Optional.</i> Array of <a href="#passportfile">PassportFile</a></td></tr>
<tr><td rowspan="5">identity_card</td><td>data</td><td><a href="#iddocumentdata">IdDocumentData</a></td><td rowspan="5">Identity Card</td></tr>
<tr><td>front_side</td><td><a href="#passportfile">PassportFile</a></td></tr>
<tr><td>reverse_side</td><td><a href="#passportfile">PassportFile</a></td></tr>
<tr><td>selfie</td><td><i>Optional.</i> <a href="#passportfile">PassportFile</a></td></tr>
<tr><td>translation</td><td><i>Optional.</i> Array of <a href="#passportfile">PassportFile</a></td></tr>
<tr><td>address</td><td>data</td><td><a href="#residentialaddress">ResidentialAddress</a></td><td>Address</td></tr>
<tr><td rowspan="2">utility_bill</td><td>files</td><td>Array of <a href="#passportfile">PassportFile</a></td><td rowspan="2">Utility Bill</td></tr>
<tr><td>translation</td><td><i>Optional.</i> Array of <a href="#passportfile">PassportFile</a></td></tr>
<tr><td rowspan="2">bank_statement</td><td>files</td><td>Array of <a href="#passportfile">PassportFile</a></td><td rowspan="2">Bank Statement</td></tr>
<tr><td>translation</td><td><i>Optional.</i> Array of <a href="#passportfile">PassportFile</a></td></tr>
<tr><td rowspan="2">rental_agreement</td><td>files</td><td>Array of <a href="#passportfile">PassportFile</a></td><td rowspan="2">Rental Agreement</td></tr>
<tr><td>translation</td><td><i>Optional.</i> Array of <a href="#passportfile">PassportFile</a></td></tr>
<tr><td rowspan="2">passport_registration</td><td>files</td><td>Array of <a href="#passportfile">PassportFile</a></td><td rowspan="2">Registration Page in the Internal Passport</td></tr>
<tr><td>translation</td><td><i>Optional.</i> Array of <a href="#passportfile">PassportFile</a></td></tr>
<tr><td rowspan="2">temporary_registration</td><td>files</td><td>Array of <a href="#passportfile">PassportFile</a></td><td rowspan="2">Temporary Registration</td></tr>
<tr><td>translation</td><td><i>Optional.</i> Array of <a href="#passportfile">PassportFile</a></td></tr>
<tr><td>phone_number</td><td></td><td>String</td><td>Phone number</td></tr>
<tr><td>email</td><td></td><td>String</td><td>Email</td></tr>
</tbody>
</table></div>

#### PersonalDetails

This object represents personal details.

| Field | Type | Description |
| --- | --- | --- |
|first_name|String|First Name|
|last_name|String|Last Name|
|middle_name|String|_Optional._ Middle Name|
|birth_date|String|Date of birth in DD.MM.YYYY format|
|gender|String|Gender, *male* or *female* |
|country_code|String|Citizenship (ISO 3166-1 alpha-2 country code)|
|residence_country_code|String|Country of residence (ISO 3166-1 alpha-2 country code)|
|first_name_native|String|First Name in the language of the user's country of residence|
|last_name_native|String|Last Name in the language of the user's country of residence|
|middle_name_native|String|_Optional._ Middle Name in the language of the user's country of residence|

#### ResidentialAddress

This object represents a residential address.

| Field | Type | Description |
| --- | --- | --- |
|street_line1|String|First line for the address|
|street_line2|String|_Optional._ Second line for the address|
|city|String|City|
|state|String|_Optional._ State|
|country_code|String|ISO 3166-1 alpha-2 country code|
|post_code|String|Address post code|

#### IdDocumentData

This object represents the data of an identity document.

| Field | Type | Description |
| --- | --- | --- |
|document_no|String|Document number|
|expiry_date|String|_Optional._ Date of expiry, in DD.MM.YYYY format|

#### PassportFile

This object represents a [PassportFile](/bots/api/types/passportfile.md) related to a document. The file is up to 10 MB in size and in the .jpg format.

### Receiving information

When the user confirms your request by pressing the "Authorize" button, the Bot API sends an [Update](/bots/api/types/update.md) with the field *passport_data* to the bot that contains encrypted [Telegram Passport data](/bots/api/types/passportdata.md).

> Note that all base64-encoded fields should be decoded before use.

#### Decrypting data

To decrypt the received data, first, decrypt the credentials contained in [EncryptedCredentials](/bots/api/types/encryptedcredentials.md).

1. Decrypt the credentials secret ( *secret* field in [EncryptedCredentials](/bots/api/types/encryptedcredentials.md)) using your **private** key (set OAEP padding option, e.g. `OPENSSL_PKCS1_OAEP_PADDING` in PHP)
2. Use this secret and the credentials hash ( *hash* field in [EncryptedCredentials](/bots/api/types/encryptedcredentials.md)) to calculate *credentials_key* and *credentials_iv* as described below:

        credentials_secret_hash = SHA512( credentials_secret + credentials_hash )
        credentials_key = slice( credentials_secret_hash, 0, 32 )
        credentials_iv = slice( credentials_secret_hash, 32, 16 )
        
3. Decrypt the credentials data ( *data* field in [EncryptedCredentials](/bots/api/types/encryptedcredentials.md)) by AES256-CBC using these *credentials_key* and *credentials_iv*. **IMPORTANT:** At this step, make sure that the credentials hash is equal to `SHA256( credentials_data )`
4. Credentials data is padded with 32 to 255 random padding bytes to make its length divisible by 16 bytes. The first byte contains the length of this padding (including this byte). Remove the padding to get the data.

> Note that all hashes represent as raw binary data, not hexits

#### Credentials

Credentials is a JSON-serialized object.

| Field | Type | Description |
| --- | --- | --- |
|secure_data|[SecureData](#securedata)|Credentials for encrypted data|
|nonce|String|Bot-specified nonce|

**IMPORTANT:** Make sure that the **nonce** is the same as was passed in the request.

#### SecureData

This object represents the credentials required to decrypt encrypted data. All fields are optional and depend on [fields](#fields) that were requested.

| Field | Type | Description |
| --- | --- | --- |
|personal_details      |[SecureValue](#securevalue)|_Optional._ Credentials for encrypted personal details|
|passport              |[SecureValue](#securevalue)|_Optional._ Credentials for encrypted passport|
|internal_passport     |[SecureValue](#securevalue)|_Optional._ Credentials for encrypted internal passport|
|driver_license        |[SecureValue](#securevalue)|_Optional._ Credentials for encrypted driver license|
|identity_card         |[SecureValue](#securevalue)|_Optional._ Credentials for encrypted ID card|
|address               |[SecureValue](#securevalue)|_Optional._ Credentials for encrypted residential address|
|utility_bill          |[SecureValue](#securevalue)|_Optional._ Credentials for encrypted utility bill|
|bank_statement        |[SecureValue](#securevalue)|_Optional._ Credentials for encrypted bank statement|
|rental_agreement      |[SecureValue](#securevalue)|_Optional._ Credentials for encrypted rental agreement|
|passport_registration |[SecureValue](#securevalue)|_Optional._ Credentials for encrypted registration from internal passport|
|temporary_registration|[SecureValue](#securevalue)|_Optional._ Credentials for encrypted temporary registration|

#### SecureValue

This object represents the credentials required to decrypt encrypted values. All fields are optional and depend on the type of [fields](#fields) that were requested.

| Field | Type | Description |
| --- | --- | --- |
|data|[DataCredentials](#datacredentials)|_Optional._ Credentials for encrypted Telegram Passport data. Available for "personal_details", "passport", "driver_license", "identity_card", "internal_passport" and "address" types.|
|front_side|[FileCredentials](#filecredentials)|_Optional._ Credentials for an encrypted document's front side. Available for "passport", "driver_license", "identity_card" and "internal_passport".|
|reverse_side|[FileCredentials](#filecredentials)|_Optional._ Credentials for an encrypted document's reverse side. Available for "driver_license" and "identity_card".|
|selfie|[FileCredentials](#filecredentials)|_Optional._ Credentials for an encrypted selfie of the user with a document. Available for "passport", "driver_license", "identity_card" and "internal_passport".|
|translation|Array of [FileCredentials](#filecredentials)|_Optional._ Credentials for an encrypted translation of the document. Available for "passport", "driver_license", "identity_card", "internal_passport", "utility_bill", "bank_statement", "rental_agreement", "passport_registration" and "temporary_registration".|
|files|Array of [FileCredentials](#filecredentials)|_Optional._ Credentials for encrypted files. Available for "utility_bill", "bank_statement", "rental_agreement", "passport_registration" and "temporary_registration" types.|

#### DataCredentials

These credentials can be used to decrypt encrypted data from the *data* field in [EncryptedPassportElement](/bots/api/types/encryptedpassportelement.md).

| Field | Type | Description |
| --- | --- | --- |
|data_hash|String|Checksum of encrypted data|
|secret|String|Secret of encrypted data|

1. To decrypt data, use the corresponding secret and data_hash from [DataCredentials](#datacredentials) as described below:

        data_secret_hash = SHA512( data_secret + data_hash )
        data_key = slice( data_secret_hash, 0, 32 )
        data_iv = slice( data_secret_hash, 32, 16 )
        
2. Use AES256-CBC with this *data_key* and *data_iv* to decrypt the data (the *data* field in [EncryptedPassportElement](/bots/api/types/encryptedpassportelement.md)). **IMPORTANT:** At this step, make sure that data_hash from the credentials is equal to `SHA256( data )`.
3. The data is padded with 32 to 255 random padding bytes to make its length divisible by 16 bytes. The first byte contains the length of the padding (including this byte). Remove padding to get the data.
4. The data is a JSON-serialized object of one of the following types: [PersonalDetails](#personaldetails), [IdDocumentData](#iddocumentdata), [ResidentialAddress](#residentialaddress), depending on [type](#fields).

#### FileCredentials

These credentials can be used to decrypt encrypted files from the *front_side*, *reverse_side*, *selfie*, *files* and *translation* fields in [EncryptedPassportElement](/bots/api/types/encryptedpassportelement.md).

| Field | Type | Description |
| --- | --- | --- |
|file_hash|String|Checksum of encrypted file|
|secret|String|Secret of encrypted file|

1. To decrypt the file, use the corresponding secret and file_hash from [FileCredentials](#filecredentials) as described below:

        file_secret_hash = SHA512( file_secret + file_hash )
        file_key = slice( file_secret_hash, 0, 32 )
        file_iv = slice( file_secret_hash, 32, 16 )
        
2. Download the encrypted file using the [getFile](/bots/api/methods/getfile.md) method.
3. Use AES256-CBC with this *file_key* and *file_iv* to decrypt the content of the file. **IMPORTANT:** At this step, make sure that file_hash from the credentials is equal to `SHA256( file_content )`.
4. The content of the file is padded with 32 to 255 random padding bytes to make its length divisible by 16 bytes. The first byte contains the length of the padding (including that byte). Remove padding to get the file content.

### Fixing errors

If the data you received contains errors, the bot can use the [setPassportDataErrors](/bots/api/methods/setpassportdataerrors.md) method to inform the user and [request information](#requesting-information) again. The user will not be able to resend the data, until all errors are fixed.