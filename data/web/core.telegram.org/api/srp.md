# Two-factor authentication


Telegram uses the [Secure Remote Password protocol](https://en.wikipedia.org/wiki/Secure_Remote_Password_protocol) version 6a to implement 2FA.

Example implementation: [tdlib](https://github.com/tdlib/td/blob/4d06d1ba3a1978476fe2b6575de8388439f6baa3/td/telegram/PasswordManager.cpp).

### Checking the password with SRP

To login to an account protected by a 2FA password or to perform some other actions (like changing channel owner), you will need to verify the user's knowledge of the current 2FA account password.

To do this, first the client needs to obtain SRP parameters and the KDF algorithm to use to check the validity of the password via [account.getPassword](/method/account.getPassword.md) method. For now, only the [passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow](/constructor/passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow.md) algorithm is supported, so we'll only explain that.

Then, after the user provides a password, the client should generate an [InputCheckPasswordSRP](/type/InputCheckPasswordSRP.md) object using SRP and a specific KDF algorithm as shown below and pass it to appropriate method (e.g. [auth.checkPassword](/method/auth.checkPassword.md) in case of authorization).

This extension of the [SRP protocol](https://en.wikipedia.org/wiki/Secure_Remote_Password_protocol) uses the password-based [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) with 100000 iterations using sha512 (`PBKDF2HMACSHA512iter100000`).
PBKDF2 is used to additionally rehash the `x` parameter, obtained using a method similar to the one described in [RFC 2945](https://tools.ietf.org/html/rfc2945#section-3) (`H(s | H ( I | password | I) | s)` instead of `H(s | H ( I | ":" | password)`) (see below).

Here, `|` denotes concatenation and `+` denotes the arithmetical operator `+`.
In all cases where concatenation of numbers passed to hashing functions is done, the numbers must be used in big-endian form, padded to 2048 bits; all math is modulo `p`.
Instead of `I`, `salt1` will be used (see [SRP protocol](https://en.wikipedia.org/wiki/Secure_Remote_Password_protocol)).
Instead of `s`, `salt2` will be used (see [SRP protocol](https://en.wikipedia.org/wiki/Secure_Remote_Password_protocol)).

The main hashing function `H` is sha256:

* `H(data) := sha256(data)`

The salting hashing function `SH` is defined as follows:

* `SH(data, salt) := H(salt | data | salt)`

The primary password hashing function is defined as follows:

* `PH1(password, salt1, salt2) := SH(SH(password, salt1), salt2)`

The secondary password hashing function is defined as follows:

* `PH2(password, salt1, salt2) := SH(pbkdf2(sha512, PH1(password, salt1, salt2), salt1, 100000), salt2)`

Client-side, the following parameters are extracted from the [passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow](/constructor/passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow.md) object, contained in the [account.password](/constructor/account.password.md) object.

* `g := algo.g`
* `p := algo.p`
The client is expected to check whether **p** is a safe 2048-bit prime (meaning that both **p** and **(p-1)/2** are prime, and that `2^2047 < p < 2^2048`), and that **g** generates a cyclic subgroup of prime order **(p-1)/2**, i.e. is a quadratic residue **mod p**. Since **g** is always equal to 2, 3, 4, 5, 6 or 7, this is easily done using quadratic reciprocity law, yielding a simple condition on **p mod 4g** -- namely, **p mod 8 = 7** for **g = 2**; **p mod 3 = 2** for **g = 3**; no extra condition for **g = 4**; **p mod 5 = 1 or 4** for **g = 5**; **p mod 24 = 19 or 23** for **g = 6**; and **p mod 7 = 3, 5 or 6** for **g = 7**. After **g** and **p** have been checked by the client, it makes sense to cache the result, so as to avoid repeating lengthy computations in future. This cache might be shared with one used for [Authorization Key generation](/mtproto/auth_key.md).

  If the client has an inadequate random number generator, it makes sense to use the **secure_random** of account.password as additional seed.

* `password := (user-provided password)`
* `salt1 := algo.salt1`
* `salt2 := algo.salt2`
* `g_b := srp_B`
`srp_B` and `srp_id` are extracted from the [account.password](/constructor/account.password.md) object.

The `k` parameter is generated, both on client and server:

* `k := H(p | g)`

The shared param `u` is generated: the client does this, and the server does the same with the `g_a` we will send him later (see below)

* `u := H(g_a | g_b)`

The final parameters are generated client-side only:

* `x := PH2(password, salt1, salt2)`
* `v := pow(g, x) mod p`

The server already has `v`, from when we set the password.

A final shared param is generated, for commodity:

* `k_v := (k * v) mod p`

Finally, the [key exchange process](https://en.wikipedia.org/wiki/Secure_Remote_Password_protocol#Protocol) starts on both parties.

The client computes a 2048-bit number **a** (using sufficient entropy or the server's **random**; see above) and generates:

* `g_a := pow(g, a) mod p`.

The server computes a 2048-bit number **b** using sufficient entropy and generates the `g_b` parameter that was sent to us (see above).

* `g_b := (k_v + (pow(g, b) mod p)) mod p`

Finally, the [SRP session keys](https://en.wikipedia.org/wiki/Secure_Remote_Password_protocol#Protocol) are generated:

Client side: 

* `t := (g_b - k_v) mod p` (positive modulo, if the result is negative increment by `p`) 
* `s_a := pow(t, a + u * x) mod p`
* `k_a := H(s_a)`

Server side: 

* `s_b := pow(g_a * (pow(v, u) mod p), b) mod p`
* `k_b := H(s_b)`

Since:

* `g_b := (k_v + (pow(g, b) mod p)) mod p`
* `t := (g_b - k_v) mod p`
* `t :=  ((k_v + (pow(g, b) mod p)) - k_v) mod p`
* `t := pow(g, b) mod p`
* `s_a := pow(t, a + u * x) mod p`
* `s_a := pow(pow(g, b) mod p, a + u * x) mod p`

And:

* `g_a := pow(g, a) mod p`
* `v := pow(g, x) mod p`
* `s_b := pow(g_a * (pow(v, u) mod p), b) mod p`
* `s_b := pow((pow(g, a) mod p) * (pow(pow(g, x) mod p, u) mod p), b) mod p`
* `s_b := pow(pow(g, a + x * u) mod p, b) mod p`
* `s_b := pow(pow(g, b) mod p, a + u * x) mod p`

* `s_a := pow(pow(g, b) mod p, a + u * x) mod p`

This means:

* `s_b === s_a`
* `k_b === k_a`

**Finally, as per SRP**:

* `M1 := H(H(p) xor H(g) | H(salt1) | H(salt2) | g_a | g_b | k_a)`

`M1` is passed to [inputCheckPasswordSRP](/constructor/inputCheckPasswordSRP.md), along with `g_a` (as `A` parameter) and the `srp_id`, extracted from the [account.password](/constructor/account.password.md) object.

The server then computes:

* `M2 := H(H(p) xor H(g) | H(salt1) | H(salt2) | g_a | g_b | k_b)`

Since we said that:

* `s_b === s_a`
* `k_b === k_a`

This means, if everything was done correctly,

* `M1 === M2`

If the password isn't correct, [400 PASSWORD_HASH_INVALID](/method/auth.checkPassword.md#possible-errors) will be returned.

### Setting a new 2FA password

To set a new 2FA password use the [account.updatePasswordSettings](/method/account.updatePasswordSettings.md) method.  
If a password is already set, generate an InputCheckPasswordSRP object as per [checking passwords with SRP](#checking-the-password-with-srp), and insert it in the `password` field of the [account.updatePasswordSettings](/method/account.updatePasswordSettings.md) method.  
To remove the current password, pass an empty `new_password_hash` in the [account.PasswordInputSettings](/type/account.PasswordInputSettings.md) object.

To set a new password, use the SRP parameters and the KDF algorithm obtained using [account.getPassword](/method/account.getPassword.md) when generating the `password` field.
Then generate a new `new_password_hash` using the KDF algorithm specified in the `new_settings`, just append 32 sufficiently random bytes to the `salt1`, first.
Proceed as for [checking passwords with SRP](#checking-the-password-with-srp), just stop at the generation of the `v` parameter, and use it as `new_password_hash`:

* `v := pow(g, x) mod p`

As usual in big endian form, padded to 2048 bits.

#### Email verification

When setting up two-factor authorization, it is recommended to set up a  **recovery email**, to allow recovery of the password through the user's email address, in case they forget it.

To set up a recovery email, it must first be verified.
This can be done directly when setting the new password using [account.updatePasswordSettings](/method/account.updatePasswordSettings.md) by setting the email parameter and flag in the [account.passwordInputSettings](/constructor/account.passwordInputSettings.md) constructor.
If the email isn't verified, an [EMAIL_UNCONFIRMED_X 400 error](/method/account.updatePasswordSettings.md#possible-errors) will be returned, where X is the length of the verification code that was just sent to the email.
Use [account.confirmPasswordEmail](/method/account.confirmPasswordEmail.md) to enter the received verification code and enable the recovery email.
Use [account.resendPasswordEmail](/method/account.resendPasswordEmail.md) to resend the verification code.
Use [account.cancelPasswordEmail](/method/account.cancelPasswordEmail.md) to cancel the verification code.

To get the current recovery email, use [account.getPasswordSettings](/method/account.getPasswordSettings.md).

### Password recovery

If the user has forgotten their 2FA password, the following recovery options are available:  

* Logged-in sessions only: [password reset&nbsp;&raquo;](#password-reset)
* Logged-in and not logged-in sessions: [email recovery&nbsp;&raquo;](#email-recovery)
* Not logged-in sessions: [account deletion&nbsp;&raquo;](#account-deletion)

#### Password reset

Password reset can be requested from logged-in sessions only.  

The following procedure can be used to reset the password without deleting the account:

    account.resetPasswordFailedWait#e3779861 retry_date:int = account.ResetPasswordResult;
    account.resetPasswordRequestedWait#e9effc7d until_date:int = account.ResetPasswordResult;
    account.resetPasswordOk#e926d63e = account.ResetPasswordResult;

    ---functions---

    account.resetPassword#9308ce1b = account.ResetPasswordResult;
    account.declinePasswordReset#4c9409f6 = Bool;

If the user is already logged in and has forgotten their 2FA password, [account.resetPassword](/method/account.resetPassword.md) can be used to initiate a password reset.  
On success, the call will initially return a [account.resetPasswordRequestedWait](/constructor/account.resetPasswordRequestedWait.md) constructor and start a 7-day server-side timer, during which the user can abort the reset process using a button sent by the Telegram service account or directly in-UI using [account.declinePasswordReset](/method/account.declinePasswordReset.md).  

When the time comes, [account.resetPassword](/method/account.resetPassword.md) is invoked once more, returning a [account.resetPasswordOk](/constructor/account.resetPasswordOk.md) to indicate that the password was successfully reset.  

If the user recently requested a password reset that was canceled, [account.resetPasswordFailedWait](/constructor/account.resetPasswordFailedWait.md) will be returned by the initial [account.resetPassword](/method/account.resetPassword.md) call, and they must wait until the specified date before requesting another reset.  

Note that if the user already knows their 2FA password and simply wants to disable 2FA, [the same process used to enable the password must also be used to disable it&nbsp;&raquo;](#setting-a-new-2fa-password).

#### Email recovery

Email recovery can be requested from logged in sessions, and from non-logged in sessions if the user has successfully provided the login code.  
In both cases, the account must have an associated [recovery email&nbsp;&raquo;](#email-verification).  

In order to recover a forgotten 2FA password, an email must be sent to the [previously specified address](#email-verification) using the [auth.requestPasswordRecovery](/method/auth.requestPasswordRecovery.md) method.  
Use [auth.checkRecoveryPassword](/method/auth.checkRecoveryPassword.md) to make sure that the user provided a valid code.  
Then use [auth.recoverPassword](/method/auth.recoverPassword.md) with the received code to delete the current 2FA password, to set a new one follow [these instructions&nbsp;&raquo;](/api/srp.md).

#### Account deletion

If the user has successfully provided the login code, but they forgot their [2FA](/api/srp.md) password and they don't have access to any other logged-in session, the account can be deleted following [these instructions&nbsp;&raquo;](/api/account-deletion.md).  

### Using the 2FA password

Multiple methods in the API such as those used to make [payments](/api/payments.md), [transfer group/channel ownership](/api/channel.md#transferring-ownership-of-a-group-channel) and others require the user to authenticate using the 2FA password passed as an [InputCheckPasswordSRP](/type/InputCheckPasswordSRP.md) constructor, generated as specified [above](#checking-the-password-with-srp).  

All such methods where a password verification is required *after login* may emit the following RPC errors:  

* `PASSWORD_MISSING` - No 2FA password is configured, but one is **required** in order to invoke the method. [Set a 2FA password](#setting-a-new-2fa-password) and then repeat the method call.
* `PASSWORD_TOO_FRESH_%d` - The 2FA password was modified less than 24 hours ago, try again in `%d` seconds.
* `SESSION_TOO_FRESH_%d` - This session was created less than 24 hours ago, try again in `%d` seconds.
* `PASSWORD_HASH_INVALID` - The specified password is invalid (or an [inputCheckPasswordEmpty](/constructor/inputCheckPasswordEmpty.md) was provided, but a 2FA password is required).  

The usual flow for invoking such methods is to first invoke the method passing an [inputCheckPasswordEmpty](/constructor/inputCheckPasswordEmpty.md) (as if no password is configured, even if one is actually configured); then, according to the returned RPC error, proceed to:

* `PASSWORD_HASH_INVALID` - The 2FA password insertion flow, the re-invoke the method with the user-provided password
* `PASSWORD_MISSING` - The 2FA password setup flow, then re-invoke the method with the newly provided password
* All other RPC errors - Show an error message with a description of the error

This flow is useful to avoid race conditions with other currently logged-in sessions that may change the password.  

### Related pages

#### [SRP design](http://srp.stanford.edu/design.html)
