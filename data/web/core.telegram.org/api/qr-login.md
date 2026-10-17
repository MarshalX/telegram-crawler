# Login via QR code


[QR code](https://en.wikipedia.org/wiki/QR_code) login flow.

Related TL schema:

    auth.loginToken#629f1980 expires:int token:bytes = auth.LoginToken;
    auth.loginTokenMigrateTo#68e9916 dc_id:int token:bytes = auth.LoginToken;
    auth.loginTokenSuccess#390d5c5e authorization:auth.Authorization = auth.LoginToken;

    updateLoginToken#564fe691 = Update;

    authorization#ad01d61d flags:# current:flags.0?true official_app:flags.1?true password_pending:flags.2?true encrypted_requests_disabled:flags.3?true call_requests_disabled:flags.4?true unconfirmed:flags.5?true hash:long device_model:string platform:string system_version:string api_id:int app_name:string app_version:string date_created:int date_active:int ip:string country:string region:string = Authorization;

    ---functions---

    auth.exportLoginToken#b7e085fe api_id:int api_hash:string except_ids:Vector<long> = auth.LoginToken;
    auth.acceptLoginToken#e894ad4d token:bytes = Authorization;
    auth.importLoginToken#95ac5ce4 token:bytes = auth.LoginToken;

### Exporting a login token

First of all, [auth.exportLoginToken](/method/auth.exportLoginToken.md) must be called by the app that wants to log in to an existing Telegram account.  
The method will return an [auth.loginToken](/constructor/auth.loginToken.md) constructor, containing a binary login `token` and an expiration date (usually 30 seconds).  

The login `token` must be encoded using [base64url](https://tools.ietf.org/html/rfc4648#section-5), embedded in a `tg://login?token=<base64url-encoded-token>` URL and shown in the form of a [QR code](https://en.wikipedia.org/wiki/QR_code) to the user.  
After the expiration of the current QR code, the [auth.exportLoginToken](/method/auth.exportLoginToken.md) method must be recalled and a new QR code must be generated automatically.

### Accepting a login token

In order to log in, the QR code must be scanned and accepted by an already logged-in Telegram app using [auth.acceptLoginToken](/method/auth.acceptLoginToken.md).  
The token must be extracted from the `tg://login` URI and [base64url-decoded](https://tools.ietf.org/html/rfc4648#section-5) before using it in the method.

Possible [errors](/api/errors.md) returned by the method are:  

* 400 - `AUTH_TOKEN_INVALID`, `AUTH_TOKEN_INVALID1`, an invalid authorization token was provided
* 400 - `AUTH_TOKEN_EXPIRED`, the provided authorization token has expired and the updated QR-code must be re-scanned
* 400 - `AUTH_TOKEN_ALREADY_ACCEPTED`, the authorization token was already used

The method will return an [authorization](/constructor/authorization.md) object, containing info about the app and session that we just authorized.

### Confirming (importing) the login token

After the logged-in app calls [auth.acceptLoginToken](/method/auth.acceptLoginToken.md) and accepts the login token, the app that is trying to login will receive an [updateLoginToken](/constructor/updateLoginToken.md) update, which should trigger a **second** call to the [auth.exportLoginToken](/method/auth.exportLoginToken.md) method.  

This second call should then return an [auth.loginTokenSuccess](/constructor/auth.loginTokenSuccess.md) constructor, indicating **successful login**, essentially allowing further authorized interaction with the API.

If, however, there is a DC mismatch between the two apps, [auth.loginTokenMigrateTo](/constructor/auth.loginTokenMigrateTo.md) is returned instead, to which the app that is trying to login should respond by calling [auth.importLoginToken](/method/auth.importLoginToken.md) with the specified `token`, to the specified DC.  

This call should then finally return a [auth.loginTokenSuccess](/constructor/auth.loginTokenSuccess.md) constructor.
