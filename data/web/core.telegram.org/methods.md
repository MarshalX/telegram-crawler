# Available methods

### Accepting the [Terms of Service](https://telegram.org/tos)

| Name | Description |
| --- | --- |
| [help.getTermsOfServiceUpdate](/method/help.getTermsOfServiceUpdate.md) | Look for updates of telegram's terms of service |
| [help.acceptTermsOfService](/method/help.acceptTermsOfService.md) | Accept the new terms of service |

### Dealing with spam and ToS violations

| Name | Description |
| --- | --- |
| [account.reportPeer](/method/account.reportPeer.md) | Report a peer for violation of telegram's Terms of Service |
| [account.reportProfilePhoto](/method/account.reportProfilePhoto.md) | Report a profile photo of a dialog |
| [channels.reportSpam](/method/channels.reportSpam.md) | Reports some messages from a user in a supergroup as spam; requires administrator rights in the supergroup |
| [messages.report](/method/messages.report.md) | Report a message in a chat for violation of telegram's Terms of Service |
| [messages.reportSpam](/method/messages.reportSpam.md) | Report a new incoming chat for spam, if the [peer settings](/constructor/peerSettings.md) of the chat allow us to do that |
| [messages.reportEncryptedSpam](/method/messages.reportEncryptedSpam.md) | Report a secret chat for spam |

### Fetching [configuration](/api/config.md)

| Name | Description |
| --- | --- |
| [help.getAppConfig](/method/help.getAppConfig.md) | Get app-specific configuration, see [client configuration](/api/config.md#client-configuration) for more info on the result. |
| [help.getAppUpdate](/method/help.getAppUpdate.md) | Returns information on update availability for the current application. |
| [help.getConfig](/method/help.getConfig.md) | Returns current configuration, including data center configuration. |
| [help.getInviteText](/method/help.getInviteText.md) | Returns localized text of a text message with an invitation. |
| [help.getNearestDc](/method/help.getNearestDc.md) | Returns info on data center nearest to the user. |
| [help.getSupport](/method/help.getSupport.md) | Returns the support user for the "ask a question" feature. |
| [help.getSupportName](/method/help.getSupportName.md) | Get localized name of the telegram support user |
| [help.getCountriesList](/method/help.getCountriesList.md) | Get name, ISO code, localized name and phone codes/patterns of all available countries |
| [help.dismissSuggestion](/method/help.dismissSuggestion.md) | Dismiss a [suggestion, see here for more info »](/api/config.md#suggestions). |

### Login via [QR code](/api/qr-login.md)

| Name | Description |
| --- | --- |
| [auth.exportLoginToken](/method/auth.exportLoginToken.md) | Generate a login token, for [login via QR code](/api/qr-login.md).  \
The generated login token should be encoded using base64url, then shown as a `tg://login?token=base64encodedtoken` [deep link »](/api/links.md#qr-code-login-links) in the QR code.\
\
For more info, see [login via QR code](/api/qr-login.md). |
| [auth.acceptLoginToken](/method/auth.acceptLoginToken.md) | Accept QR code login token, logging in the app that generated it.\
\
Returns info about the new session.\
\
For more info, see [login via QR code](/api/qr-login.md). |
| [auth.importLoginToken](/method/auth.importLoginToken.md) | Login using a redirected login token, generated in case of DC mismatch during [QR code login](/api/qr-login.md).\
\
For more info, see [login via QR code](/api/qr-login.md). |

### Miscellaneous

| Name | Description |
| --- | --- |
| [help.saveAppLog](/method/help.saveAppLog.md) | Saves logs of application on the server. |
| [initConnection](/method/initConnection.md) | Initialize connection |
| [invokeAfterMsg](/method/invokeAfterMsg.md) | Invokes a query after successful completion of one of the previous queries. |
| [invokeAfterMsgs](/method/invokeAfterMsgs.md) | Invokes a query after a successful completion of previous queries |
| [invokeWithLayer](/method/invokeWithLayer.md) | Invoke the specified query using the specified API [layer](/api/invoking.md#layers) |
| [invokeWithoutUpdates](/method/invokeWithoutUpdates.md) | Invoke a request without subscribing the used connection for [updates](/api/updates.md) (this is enabled by default for [file queries](/api/files.md)). |
| [invokeWithGooglePlayIntegrity](/method/invokeWithGooglePlayIntegrity.md) | Official clients only, invoke with Google Play Integrity token. |
| [invokeWithApnsSecret](/method/invokeWithApnsSecret.md) | Official clients only, invoke with Apple push verification. |
| [invokeWithReCaptcha](/method/invokeWithReCaptcha.md) | Official clients only: re-execute a method call that required reCAPTCHA verification via a `RECAPTCHA_CHECK_%s__%s`, where the first placeholder is the `action`, and the second one is the reCAPTCHA key ID. |

### Registration/Authorization

| Name | Description |
| --- | --- |
| [auth.bindTempAuthKey](/method/auth.bindTempAuthKey.md) | Binds a temporary authorization key `temp_auth_key_id` to the permanent authorization key `perm_auth_key_id`.\
\
For more information, see [Perfect Forward Secrecy](/api/pfs.md). |
| [auth.cancelCode](/method/auth.cancelCode.md) | Cancel the login verification code |
| [account.sendVerifyEmailCode](/method/account.sendVerifyEmailCode.md) | Send an email verification code. |
| [account.verifyEmail](/method/account.verifyEmail.md) | Verify an email address. |
| [auth.resetLoginEmail](/method/auth.resetLoginEmail.md) | Reset the [login email »](/api/auth.md#email-verification). |
| [auth.checkPassword](/method/auth.checkPassword.md) | Try logging to an account protected by a [2FA password](/api/srp.md). |
| [account.resetPassword](/method/account.resetPassword.md) | Initiate a 2FA password reset: can only be used if the user is already logged-in, [see here for more info »](/api/srp.md#password-reset) |
| [auth.checkRecoveryPassword](/method/auth.checkRecoveryPassword.md) | Check if the [2FA recovery code](/api/srp.md) sent using [auth.requestPasswordRecovery](/method/auth.requestPasswordRecovery.md) is valid, before passing it to [auth.recoverPassword](/method/auth.recoverPassword.md). |
| [auth.dropTempAuthKeys](/method/auth.dropTempAuthKeys.md) | Delete all temporary authorization keys **except for** the ones specified |
| [auth.exportAuthorization](/method/auth.exportAuthorization.md) | Returns data for copying authorization to another data-center. |
| [auth.importAuthorization](/method/auth.importAuthorization.md) | Logs in a user using a key transmitted from his native data-center. |
| [auth.importBotAuthorization](/method/auth.importBotAuthorization.md) | Login as a bot |
| [account.changeAuthorizationSettings](/method/account.changeAuthorizationSettings.md) | Change settings related to a session. |
| [account.setAuthorizationTTL](/method/account.setAuthorizationTTL.md) | Set time-to-live of current session |
| [auth.logOut](/method/auth.logOut.md) | Logs out the user. |
| [auth.recoverPassword](/method/auth.recoverPassword.md) | Reset the [2FA password](/api/srp.md) using the recovery code sent using [auth.requestPasswordRecovery](/method/auth.requestPasswordRecovery.md). |
| [auth.requestPasswordRecovery](/method/auth.requestPasswordRecovery.md) | Request recovery code of a [2FA password](/api/srp.md), only for accounts with a [recovery email configured](/api/srp.md#email-verification). |
| [auth.resendCode](/method/auth.resendCode.md) | Resend the login code via another medium, the phone code type is determined by the return value of the previous auth.sendCode/auth.resendCode: see [login](/api/auth.md) for more info. |
| [auth.resetAuthorizations](/method/auth.resetAuthorizations.md) | Terminates all user's authorized sessions except for the current one.\
\
After calling this method it is necessary to reregister the current device using the method [account.registerDevice](/method/account.registerDevice.md) |
| [auth.sendCode](/method/auth.sendCode.md) | Send the verification code for login |
| [auth.reportMissingCode](/method/auth.reportMissingCode.md) | Official apps only, reports that the SMS authentication code wasn't delivered. |
| [auth.signIn](/method/auth.signIn.md) | Signs in a user with a validated phone number. |
| [auth.signUp](/method/auth.signUp.md) | Registers a validated phone number in the system. |
| [auth.requestFirebaseSms](/method/auth.requestFirebaseSms.md) | Request an SMS code via Firebase. |
| [auth.importWebTokenAuthorization](/method/auth.importWebTokenAuthorization.md) | Login by importing an authorization token |
| [account.invalidateSignInCodes](/method/account.invalidateSignInCodes.md) | Invalidate the specified login codes, see [here »](/api/auth.md#invalidating-login-codes) for more info. |
| [auth.checkPaidAuth](/method/auth.checkPaidAuth.md) | Checks the status of a [login payment](/api/auth.md#paid-auth). |

### Working with SMS jobs

| Name | Description |
| --- | --- |
| [smsjobs.isEligibleToJoin](/method/smsjobs.isEligibleToJoin.md) | Check if we can process SMS jobs (official clients only). |
| [smsjobs.join](/method/smsjobs.join.md) | Enable SMS jobs (official clients only). |
| [smsjobs.leave](/method/smsjobs.leave.md) | Disable SMS jobs (official clients only). |
| [smsjobs.updateSettings](/method/smsjobs.updateSettings.md) | Update SMS job settings (official clients only). |
| [smsjobs.getStatus](/method/smsjobs.getStatus.md) | Get SMS jobs status (official clients only). |
| [smsjobs.getSmsJob](/method/smsjobs.getSmsJob.md) | Get info about an SMS job (official clients only). |
| [smsjobs.finishJob](/method/smsjobs.finishJob.md) | Finish an SMS job (official clients only). |

### Working with TSF (internal use only)

| Name | Description |
| --- | --- |
| [help.editUserInfo](/method/help.editUserInfo.md) | Internal use |
| [help.getUserInfo](/method/help.getUserInfo.md) | Can only be used by TSF members to obtain internal information. |

### Working with Telegram Gateway verification messages

| Name | Description |
| --- | --- |
| [messages.reportMessagesDelivery](/method/messages.reportMessagesDelivery.md) | Used for [Telegram Gateway verification messages »](https://telegram.org/blog/star-messages-gateway-2-0-and-more#save-even-more-on-user-verification): indicate to the server that one or more [message](/constructor/message.md)s were received by the client, if requested by the [message](/constructor/message.md).**report\_delivery\_until\_date** flag or the equivalent flag in [push notifications](/api/push-updates.md). |

### Working with Telegram Premium

| Name | Description |
| --- | --- |
| [help.getPremiumPromo](/method/help.getPremiumPromo.md) | Get Telegram Premium promotion information |
| [payments.assignAppStoreTransaction](/method/payments.assignAppStoreTransaction.md) | Informs server about a purchase made through the App Store: for official applications only. |
| [payments.assignPlayMarketTransaction](/method/payments.assignPlayMarketTransaction.md) | Informs server about a purchase made through the Play Store: for official applications only. |
| [payments.canPurchaseStore](/method/payments.canPurchaseStore.md) | Checks whether a purchase is possible. Must be called before in-store purchase, official apps only. |

### Working with [2FA login](/api/srp.md)

| Name | Description |
| --- | --- |
| [account.confirmPasswordEmail](/method/account.confirmPasswordEmail.md) | Verify an email to use as [2FA recovery method](/api/srp.md). |
| [account.resendPasswordEmail](/method/account.resendPasswordEmail.md) | Resend the code to verify an email to use as [2FA recovery method](/api/srp.md). |
| [account.cancelPasswordEmail](/method/account.cancelPasswordEmail.md) | Cancel the code that was sent to verify an email to use as [2FA recovery method](/api/srp.md). |
| [account.getPassword](/method/account.getPassword.md) | Obtain configuration for two-factor authorization with password |
| [account.getPasswordSettings](/method/account.getPasswordSettings.md) | Get private info associated to the password info (recovery email, telegram [passport](/passport.md) info &amp; so on) |
| [account.updatePasswordSettings](/method/account.updatePasswordSettings.md) | Set a new 2FA password |
| [account.declinePasswordReset](/method/account.declinePasswordReset.md) | Abort a pending 2FA password reset, [see here for more info »](/api/srp.md#password-reset) |

### Working with [E2E conference calls &raquo;](/api/end-to-end/group-calls.md#overview)

| Name | Description |
| --- | --- |
| [phone.createConferenceCall](/method/phone.createConferenceCall.md) | Create and optionally join a new [conference call »](/api/group-calls.md#conference-calls). |
| [phone.deleteConferenceCallParticipants](/method/phone.deleteConferenceCallParticipants.md) | Remove participants from a [conference call »](/api/end-to-end/group-calls.md#removing-a-participant).\
\
Exactly one of the `only_left` and `kick` flags must be set. |
| [phone.sendConferenceCallBroadcast](/method/phone.sendConferenceCallBroadcast.md) | Submit a verification message to conference call subchain `1`, see [subchains »](/api/end-to-end/group-calls.md#subchains). |
| [phone.sendGroupCallEncryptedMessage](/method/phone.sendGroupCallEncryptedMessage.md) | Send an E2E-encrypted message or emoji reaction to all participants of a conference call. This method can only be used with conferences; see [here »](/api/end-to-end/group-calls.md#conference-in-call-messages) for the serialization and encryption process. |
| [phone.inviteConferenceCallParticipant](/method/phone.inviteConferenceCallParticipant.md) | Invite a user to a [conference call](/api/group-calls.md#conference-calls). |
| [phone.declineConferenceCallInvite](/method/phone.declineConferenceCallInvite.md) | Decline a [conference call](/api/group-calls.md#conference-calls) invite. |
| [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) | Fetch blocks from a conference call [subchain »](/api/end-to-end/group-calls.md#subchains); handle the returned [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md) as [specified here »](/api/end-to-end/group-calls.md#handling-updates).\
\
If the number of blocks returned by *any* call to this method is equal to `limit`, this method must be re-invoked immediately after processing the returned [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md), with the newly committed `offset` (usually equal to the returned `next_offset`). |

### Working with [Fragment collectibles](/api/fragment.md)

| Name | Description |
| --- | --- |
| [fragment.getCollectibleInfo](/method/fragment.getCollectibleInfo.md) | Fetch information about a [fragment collectible, see here »](/api/fragment.md#fetching-info-about-fragment-collectibles) for more info on the full flow. |

### Working with [GIFs&nbsp;&raquo;](/api/gifs.md)

| Name | Description |
| --- | --- |
| [messages.getSavedGifs](/method/messages.getSavedGifs.md) | Get saved GIFs. |
| [messages.saveGif](/method/messages.saveGif.md) | Add GIF to saved gifs list |

### Working with [Main Mini Bot Apps&nbsp;&raquo;](/api/bots/webapps.md#main-mini-apps) and the [Mini App Store](/api/search.md#apps-tab)

| Name | Description |
| --- | --- |
| [bots.getPopularAppBots](/method/bots.getPopularAppBots.md) | Fetch popular [Main Mini Apps](/api/bots/webapps.md#main-mini-apps), to be used in the [apps tab of global search »](/api/search.md#apps-tab). |
| [bots.addPreviewMedia](/method/bots.addPreviewMedia.md) | Add a [main mini app preview, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info.\
\
Only owners of bots with a configured Main Mini App can use this method, see [see here »](/api/bots/webapps.md#main-mini-app-previews) for more info on how to check if you can invoke this method. |
| [bots.editPreviewMedia](/method/bots.editPreviewMedia.md) | Edit a [main mini app preview, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info.\
\
Only owners of bots with a configured Main Mini App can use this method, see [see here »](/api/bots/webapps.md#main-mini-app-previews) for more info on how to check if you can invoke this method. |
| [bots.deletePreviewMedia](/method/bots.deletePreviewMedia.md) | Delete a [main mini app preview, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info.\
\
Only owners of bots with a configured Main Mini App can use this method, see [see here »](/api/bots/webapps.md#main-mini-app-previews) for more info on how to check if you can invoke this method. |
| [bots.reorderPreviewMedias](/method/bots.reorderPreviewMedias.md) | Reorder a [main mini app previews, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info.\
\
Only owners of bots with a configured Main Mini App can use this method, see [see here »](/api/bots/webapps.md#main-mini-app-previews) for more info on how to check if you can invoke this method. |
| [bots.getPreviewInfo](/method/bots.getPreviewInfo.md) | Bot owners only, fetch [main mini app preview information, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info.\
\
Note: technically non-owners may also invoke this method, but it will always behave exactly as [bots.getPreviewMedias](/method/bots.getPreviewMedias.md), returning only previews for the current language and an empty `lang_codes` array, regardless of the passed `lang_code`, so please only use [bots.getPreviewMedias](/method/bots.getPreviewMedias.md) if you're not the owner of the `bot`. |
| [bots.getPreviewMedias](/method/bots.getPreviewMedias.md) | Fetch [main mini app previews, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info. |
| [messages.requestMainWebView](/method/messages.requestMainWebView.md) | Open a [Main Mini App](/api/bots/webapps.md#main-mini-apps). |

### Working with [Mini Bot Apps&nbsp;&raquo;](/api/bots/webapps.md)

| Name | Description |
| --- | --- |
| [messages.requestWebView](/method/messages.requestWebView.md) | Open a [bot mini app](/bots/webapps.md), sending over user information after user confirmation.\
\
After calling this method, until the user closes the webview, [messages.prolongWebView](/method/messages.prolongWebView.md) must be called every 60 seconds. |
| [messages.prolongWebView](/method/messages.prolongWebView.md) | Indicate to the server (from the user side) that the user is still using a web app.\
\
If the method returns a `QUERY_ID_INVALID` error, the webview must be closed. |
| [messages.requestSimpleWebView](/method/messages.requestSimpleWebView.md) | Open a [bot mini app](/api/bots/webapps.md). |
| [messages.sendWebViewResultMessage](/method/messages.sendWebViewResultMessage.md) | Terminate webview interaction started with [messages.requestWebView](/method/messages.requestWebView.md), sending the specified message to the chat on behalf of the user. |
| [messages.sendWebViewData](/method/messages.sendWebViewData.md) | Used by the user to relay data from an opened [reply keyboard bot mini app](/api/bots/webapps.md) to the bot that owns it. |
| [messages.requestAppWebView](/method/messages.requestAppWebView.md) | Open a [bot mini app](/bots/webapps.md) from a [direct Mini App deep link](/api/links.md#direct-mini-app-links), sending over user information after user confirmation.\
\
After calling this method, until the user closes the webview, [messages.prolongWebView](/method/messages.prolongWebView.md) must be called every 60 seconds. |
| [messages.getBotApp](/method/messages.getBotApp.md) | Obtain information about a [direct link Mini App](/api/bots/webapps.md#direct-link-mini-apps) |
| [bots.canSendMessage](/method/bots.canSendMessage.md) | Check whether the specified bot can send us messages |
| [bots.allowSendMessage](/method/bots.allowSendMessage.md) | Allow the specified bot to send us messages |
| [bots.invokeWebViewCustomMethod](/method/bots.invokeWebViewCustomMethod.md) | Send a custom request from a [mini bot app](/api/bots/webapps.md), triggered by a [web\_app\_invoke\_custom\_method event »](/api/web-events.md#web-app-invoke-custom-method).\
\
The response should be sent using a [custom\_method\_invoked](/api/bots/webapps.md#custom-method-invoked) event, [see here »](/api/web-events.md#web-app-invoke-custom-method) for more info on the flow. |
| [bots.checkDownloadFileParams](/method/bots.checkDownloadFileParams.md) | Check if a [mini app](/api/bots/webapps.md) can request the download of a specific file: called when handling [web\_app\_request\_file\_download events »](/api/web-events.md#web-app-request-file-download) |

### Working with [OAuth login](/api/url-authorization.md)

| Name | Description |
| --- | --- |
| [messages.requestUrlAuth](/method/messages.requestUrlAuth.md) | Get more info about a Seamless Telegram Login authorization request, for more info [click here »](/api/url-authorization.md) |
| [messages.acceptUrlAuth](/method/messages.acceptUrlAuth.md) | Use this to accept a Seamless Telegram Login authorization request, for more info [click here »](/api/url-authorization.md) |
| [account.getWebAuthorizations](/method/account.getWebAuthorizations.md) | Get web [login widget](/widgets/login.md) authorizations |
| [account.resetWebAuthorization](/method/account.resetWebAuthorization.md) | Log out an active web [telegram login](/widgets/login.md) session |
| [account.resetWebAuthorizations](/method/account.resetWebAuthorizations.md) | Reset all active web [telegram login](/widgets/login.md) sessions |
| [messages.declineUrlAuth](/method/messages.declineUrlAuth.md) | Decline an incoming [OAuth authorization request »](/api/url-authorization.md#oauth-authorization), notifying the server that the user refused the login request. |
| [messages.checkUrlAuthMatchCode](/method/messages.checkUrlAuthMatchCode.md) | Validate the match code selected by the user against the code shown on the login page, as part of the [OAuth authorization flow »](/api/url-authorization.md#oauth-authorization).\
\
Only usable when both `match_codes` and `match_codes_first` are set in the [urlAuthResultRequest](/constructor/urlAuthResultRequest.md) returned by [messages.requestUrlAuth](/method/messages.requestUrlAuth.md).  \
If [boolTrue](/constructor/boolTrue.md) is returned, proceed with the login flow and pass the verified code to [messages.acceptUrlAuth](/method/messages.acceptUrlAuth.md).`match_code`. |

### Working with [Public Service Announcements, MTProxy channels and suggestions &raquo;](/api/config.md#suggestions)

| Name | Description |
| --- | --- |
| [help.hidePromoData](/method/help.hidePromoData.md) | Hide MTProxy/Public Service Announcement information |
| [help.getPromoData](/method/help.getPromoData.md) | Returns a set of useful suggestions and PSA/MTProxy sponsored peers, see [here »](/api/config.md#suggestions) for more info. |

### Working with [Telegram Business chat links](/api/business.md#business-chat-links)

| Name | Description |
| --- | --- |
| [account.createBusinessChatLink](/method/account.createBusinessChatLink.md) | Create a [business chat deep link »](/api/business.md#business-chat-links). |
| [account.editBusinessChatLink](/method/account.editBusinessChatLink.md) | Edit a created [business chat deep link »](/api/business.md#business-chat-links). |
| [account.deleteBusinessChatLink](/method/account.deleteBusinessChatLink.md) | Delete a [business chat deep link »](/api/business.md#business-chat-links). |
| [account.getBusinessChatLinks](/method/account.getBusinessChatLinks.md) | List all created [business chat deep links »](/api/business.md#business-chat-links). |
| [account.resolveBusinessChatLink](/method/account.resolveBusinessChatLink.md) | Resolve a [business chat deep link »](/api/business.md#business-chat-links). |

### Working with [Telegram Business connected bots&nbsp;&raquo;](/api/bots/connected-business-bots.md)

| Name | Description |
| --- | --- |
| [account.updateConnectedBot](/method/account.updateConnectedBot.md) | Connect a [business bot »](/api/bots/connected-business-bots.md) to the current account, or to change the current connection settings. |
| [account.getConnectedBots](/method/account.getConnectedBots.md) | List all currently connected [business bots »](/api/bots/connected-business-bots.md) |
| [account.toggleConnectedBotPaused](/method/account.toggleConnectedBotPaused.md) | Pause or unpause a specific chat, temporarily disconnecting it from all [business bots »](/api/bots/connected-business-bots.md). |
| [account.disablePeerConnectedBot](/method/account.disablePeerConnectedBot.md) | Permanently disconnect a specific chat from all [business bots »](/api/bots/connected-business-bots.md) (equivalent to specifying it in `recipients.exclude_users` during initial configuration with [account.updateConnectedBot »](/method/account.updateConnectedBot.md)); to reconnect of a chat disconnected using this method the user must reconnect the entire bot by invoking [account.updateConnectedBot »](/method/account.updateConnectedBot.md). |
| [account.getBotBusinessConnection](/method/account.getBotBusinessConnection.md) | Bots may invoke this method to re-fetch the [updateBotBusinessConnect](/constructor/updateBotBusinessConnect.md) constructor associated with a specific [business `connection_id`, see here »](/api/bots/connected-business-bots.md) for more info on connected business bots.  \
This is needed for example for freshly logged in bots that are receiving some [updateBotNewBusinessMessage](/constructor/updateBotNewBusinessMessage.md), etc. updates because some users have already connected to the bot before it could login.  \
In this case, the bot is receiving messages from the business connection, but it hasn't cached the associated [updateBotBusinessConnect](/constructor/updateBotBusinessConnect.md) with info about the connection (can it reply to messages? etc.) yet, and cannot receive the old ones because they were sent when the bot wasn't logged into the session yet.  \
This method can be used to fetch info about a not-yet-cached business connection, and should not be invoked if the info is already cached or to fetch changes, as eventual changes will automatically be sent as new [updateBotBusinessConnect](/constructor/updateBotBusinessConnect.md) updates to the bot using the usual [update delivery methods »](/api/updates.md). |
| [invokeWithBusinessConnection](/method/invokeWithBusinessConnection.md) | Invoke a method using a [Telegram Business Bot connection, see here » for more info, including a list of the methods that can be wrapped in this constructor](/api/bots/connected-business-bots.md).\
\
Make sure to always send queries wrapped in a `invokeWithBusinessConnection` to the datacenter ID, specified in the `dc_id` field of the [botBusinessConnection](/constructor/botBusinessConnection.md) that is being used. |

### Working with [Telegram Business greeting and away messages](/api/business.md)

| Name | Description |
| --- | --- |
| [account.updateBusinessGreetingMessage](/method/account.updateBusinessGreetingMessage.md) | Set a list of [Telegram Business greeting messages](/api/business.md#greeting-messages). |
| [account.updateBusinessAwayMessage](/method/account.updateBusinessAwayMessage.md) | Set a list of [Telegram Business away messages](/api/business.md#away-messages). |

### Working with [Telegram Business opening hours&nbsp;&raquo;](/api/business.md#opening-hours)

| Name | Description |
| --- | --- |
| [account.updateBusinessWorkHours](/method/account.updateBusinessWorkHours.md) | Specify a set of [Telegram Business opening hours](/api/business.md#opening-hours).  \
This info will be contained in [userFull](/constructor/userFull.md).`business_work_hours`.\
\
To remove all opening hours, invoke the method without setting the `business_work_hours` field.\
\
Note that the opening hours specified by the user must be appropriately validated and transformed before invoking the method, as specified [here »](/api/business.md#opening-hours). |

### Working with [Telegram Business quick reply shortcuts&nbsp;&raquo;](/api/business.md#quick-reply-shortcuts)

| Name | Description |
| --- | --- |
| [messages.getQuickReplies](/method/messages.getQuickReplies.md) | Fetch basic info about all existing [quick reply shortcuts](/api/business.md#quick-reply-shortcuts). |
| [messages.reorderQuickReplies](/method/messages.reorderQuickReplies.md) | Reorder [quick reply shortcuts](/api/business.md#quick-reply-shortcuts).\
\
This will emit an [updateQuickReplies](/constructor/updateQuickReplies.md) update to other logged-in sessions. |
| [messages.checkQuickReplyShortcut](/method/messages.checkQuickReplyShortcut.md) | Before offering the user the choice to add a message to a [quick reply shortcut](/api/business.md#quick-reply-shortcuts), to make sure that none of the limits specified [here »](/api/business.md#quick-reply-shortcuts) were reached. |
| [messages.editQuickReplyShortcut](/method/messages.editQuickReplyShortcut.md) | Rename a [quick reply shortcut](/api/business.md#quick-reply-shortcuts).  \
This will emit an [updateQuickReplies](/constructor/updateQuickReplies.md) update to other logged-in sessions. |
| [messages.deleteQuickReplyShortcut](/method/messages.deleteQuickReplyShortcut.md) | Completely delete a [quick reply shortcut](/api/business.md#quick-reply-shortcuts).  \
This will also emit an [updateDeleteQuickReply](/constructor/updateDeleteQuickReply.md) update to other logged-in sessions (and *no* [updateDeleteQuickReplyMessages](/constructor/updateDeleteQuickReplyMessages.md) updates, even if all the messages in the shortcuts are also deleted by this method). |
| [messages.getQuickReplyMessages](/method/messages.getQuickReplyMessages.md) | Fetch (a subset or all) messages in a [quick reply shortcut »](/api/business.md#quick-reply-shortcuts). |
| [messages.sendQuickReplyMessages](/method/messages.sendQuickReplyMessages.md) | Send a [quick reply shortcut »](/api/business.md#quick-reply-shortcuts). |
| [messages.deleteQuickReplyMessages](/method/messages.deleteQuickReplyMessages.md) | Delete one or more messages from a [quick reply shortcut](/api/business.md#quick-reply-shortcuts). This will also emit an [updateDeleteQuickReplyMessages](/constructor/updateDeleteQuickReplyMessages.md) update. |

### Working with [Telegram Gifts and collectible gifts](/api/gifts.md)

| Name | Description |
| --- | --- |
| [payments.getStarGifts](/method/payments.getStarGifts.md) | Get a list of available [gifts, see here »](/api/gifts.md) for more info. |
| [payments.saveStarGift](/method/payments.saveStarGift.md) | Display or remove a [received or hosted gift »](/api/gifts.md#hosted-collectible-gifts) from our profile. |
| [payments.convertStarGift](/method/payments.convertStarGift.md) | Convert a [received gift »](/api/gifts.md) into Telegram Stars: this will permanently destroy the gift, converting it into [starGift](/constructor/starGift.md).`convert_stars` [Telegram Stars](/api/stars.md), added to the user's balance.\
\
Note that [starGift](/constructor/starGift.md).`convert_stars` will be less than the buying price ([starGift](/constructor/starGift.md).`stars`) of the gift if it was originally bought using Telegram Stars bought a long time ago. |
| [payments.getStarGiftUpgradePreview](/method/payments.getStarGiftUpgradePreview.md) | Obtain a preview of the possible attributes (chosen randomly) a [gift »](/api/gifts.md) can receive after upgrading it to a [collectible gift »](/api/gifts.md#collectible-gifts), see [here »](/api/gifts.md#collectible-gifts) for more info. |
| [payments.upgradeStarGift](/method/payments.upgradeStarGift.md) | Upgrade a [gift](/api/gifts.md) to a [collectible gift](/api/gifts.md#collectible-gifts): can only be used if the upgrade was already paid by the gift sender; see [here »](/api/gifts.md#upgrade-a-gift-to-a-collectible-gift) for more info on the full flow (including the different flow to use in case the upgrade was not paid by the gift sender). |
| [payments.transferStarGift](/method/payments.transferStarGift.md) | Transfer a [collectible gift](/api/gifts.md#collectible-gifts) to another user or channel: can only be used if transfer is free (i.e. [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md).`transfer_stars` is not set); see [here »](/api/gifts.md#transferring-collectible-gifts) for more info on the full flow (including the different flow to use in case the transfer isn't free). |
| [payments.getUniqueStarGift](/method/payments.getUniqueStarGift.md) | Obtain info about a [collectible gift »](/api/gifts.md#collectible-gifts) using a slug obtained from a [collectible gift link »](/api/links.md#collectible-gift-link). |
| [payments.getSavedStarGifts](/method/payments.getSavedStarGifts.md) | Fetch the full list of [gifts »](/api/gifts.md#list-all-received-gifts) owned, received or [hosted »](/api/gifts.md#hosted-collectible-gifts) by a peer.\
\
Note that unlike what the name suggests, the method can be used to fetch both "saved" and "unsaved" gifts (aka gifts both pinned and not pinned) to the profile, depending on the passed flags. |
| [payments.getSavedStarGift](/method/payments.getSavedStarGift.md) | Fetch info about specific [gifts](/api/gifts.md) owned by a peer we control.\
\
Note that unlike what the name suggests, the method can be used to fetch both "saved" and "unsaved" gifts (aka gifts both pinned and not pinned to the profile). |
| [payments.getStarGiftWithdrawalUrl](/method/payments.getStarGiftWithdrawalUrl.md) | Convert a [collectible gift »](/api/gifts.md) to an NFT on the TON blockchain. |
| [payments.toggleChatStarGiftNotifications](/method/payments.toggleChatStarGiftNotifications.md) | Enables or disables the reception of notifications every time a [gift »](/api/gifts.md) is received by the specified channel, can only be invoked by admins with `post_messages` [admin rights](/constructor/chatAdminRights.md). |
| [payments.toggleStarGiftsPinnedToTop](/method/payments.toggleStarGiftsPinnedToTop.md) | Pins a received gift on top of the profile of the user or owned channels by using [payments.toggleStarGiftsPinnedToTop](/method/payments.toggleStarGiftsPinnedToTop.md). |
| [payments.getResaleStarGifts](/method/payments.getResaleStarGifts.md) | Get [collectible gifts](/api/gifts.md#collectible-gifts) of a specific type currently on resale, see [here »](/api/gifts.md#reselling-collectible-gifts) for more info.\
\
`sort_by_price` and `sort_by_num` are mutually exclusive, if neither are set results are sorted by the unixtime (descending) when their resell price was last changed.\
\
See [here »](/api/gifts.md#sending-gifts) for detailed documentation on this method. |
| [payments.updateStarGiftPrice](/method/payments.updateStarGiftPrice.md) | A [collectible gift we own »](/api/gifts.md#collectible-gifts) can be put up for sale on the [gift marketplace »](https://telegram.org/blog/gift-marketplace-and-more) with this method, see [here »](/api/gifts.md#reselling-collectible-gifts) for more info. |
| [payments.getUniqueStarGiftValueInfo](/method/payments.getUniqueStarGiftValueInfo.md) | Get information about the value of a [collectible gift »](/api/gifts.md#collectible-gifts). |
| [payments.checkCanSendGift](/method/payments.checkCanSendGift.md) | Check if the specified [gift »](/api/gifts.md) can be sent. |
| [payments.resolveStarGiftOffer](/method/payments.resolveStarGiftOffer.md) | Accept or decline a previously received [collectible gift purchase offer »](/api/gifts.md#collectible-gift-purchase-offers), see [here »](/api/gifts.md#collectible-gift-purchase-offers) for the full flow. |
| [payments.sendStarGiftOffer](/method/payments.sendStarGiftOffer.md) | Send an offer to purchase a [collectible gift »](/api/gifts.md#collectible-gift-purchase-offers), see [here »](/api/gifts.md#collectible-gift-purchase-offers) for the full flow. |
| [payments.getStarGiftUpgradeAttributes](/method/payments.getStarGiftUpgradeAttributes.md) | Obtains the **full** list of just the collectible attributes that may appear for a gift type once it's upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).\
\
The result may also include [starGiftAttributeModel](/constructor/starGiftAttributeModel.md) constructors with the `crafted` flag set: these models are reserved for [crafting »](/api/gifts.md#crafting-collectible-gifts) and should be filtered out from regular upgrade previews (and vice versa). |
| [payments.getCraftStarGifts](/method/payments.getCraftStarGifts.md) | Obtain owned [collectible gifts »](/api/gifts.md#collectible-gifts) of a specific type that can be used for [crafting »](/api/gifts.md#crafting-collectible-gifts). |
| [payments.craftStarGift](/method/payments.craftStarGift.md) | Craft a new [collectible gift »](/api/gifts.md#collectible-gifts) by combining 1 to 4 owned collectible gifts of the same base gift type.\
\
The passed gifts must all have the same [starGiftUnique](/constructor/starGiftUnique.md).`gift_id`, must be usable for crafting, and must not be blocked by a future `can_craft_at` timestamp.\
\
The first passed gift must not be [located on the TON blockchain](/api/gifts.md#hosted-collectible-gifts). |

### Working with [Telegram Star subscriptions &raquo;](/api/subscriptions.md)

| Name | Description |
| --- | --- |
| [payments.getStarsSubscriptions](/method/payments.getStarsSubscriptions.md) | Obtain a list of active, expired or cancelled [Telegram Star subscriptions »](/api/invites.md#paid-invite-links). |
| [payments.changeStarsSubscription](/method/payments.changeStarsSubscription.md) | Activate or deactivate a [Telegram Star subscription »](/api/invites.md#paid-invite-links). |
| [payments.fulfillStarsSubscription](/method/payments.fulfillStarsSubscription.md) | Re-join a private channel associated to an active [Telegram Star subscription »](/api/invites.md#paid-invite-links). |
| [payments.botCancelStarsSubscription](/method/payments.botCancelStarsSubscription.md) | Cancel a [bot subscription](/api/subscriptions.md#bot-subscriptions) |

### Working with [Telegram Stars](/api/stars.md)

| Name | Description |
| --- | --- |
| [payments.getStarsTopupOptions](/method/payments.getStarsTopupOptions.md) | Obtain a list of [Telegram Stars topup options »](/api/stars.md#buying-or-gifting-stars) as [starsTopupOption](/constructor/starsTopupOption.md) constructors. |
| [payments.getStarsStatus](/method/payments.getStarsStatus.md) | Get the current [Telegram Stars balance](/api/stars.md) of the current account (with peer=[inputPeerSelf](/constructor/inputPeerSelf.md)), or the stars balance of the bot or channel specified in `peer`. |
| [payments.getStarsTransactions](/method/payments.getStarsTransactions.md) | Fetch [Telegram Stars transactions](/api/stars.md#balance-and-transaction-history).\
\
The `inbound` and `outbound` flags are mutually exclusive: if none of the two are set, both incoming and outgoing transactions are fetched. |
| [payments.sendStarsForm](/method/payments.sendStarsForm.md) | Make a payment using [Telegram Stars, see here »](/api/stars.md#using-stars) for more info. |
| [payments.refundStarsCharge](/method/payments.refundStarsCharge.md) | Refund a [Telegram Stars](/api/stars.md) transaction, see [here »](/api/payments.md#6-refunds) for more info. |
| [payments.getStarsRevenueStats](/method/payments.getStarsRevenueStats.md) | Get [Telegram Star revenue statistics »](/api/stars.md). |
| [payments.getStarsRevenueWithdrawalUrl](/method/payments.getStarsRevenueWithdrawalUrl.md) | Withdraw funds from a channel or bot's [star balance »](/api/stars.md#withdrawing-revenue). |
| [payments.getStarsRevenueAdsAccountUrl](/method/payments.getStarsRevenueAdsAccountUrl.md) | Returns a URL for a Telegram Ad platform account that can be used to set up advertisements for channel/bot in `peer`, paid using the Telegram Stars owned by the specified `peer`, see [here »](/api/stars.md#paying-for-ads) for more info. |
| [payments.getStarsTransactionsByID](/method/payments.getStarsTransactionsByID.md) | Obtain info about [Telegram Star transactions »](/api/stars.md#balance-and-transaction-history) using specific transaction IDs. |
| [payments.getStarsGiftOptions](/method/payments.getStarsGiftOptions.md) | Obtain a list of [Telegram Stars gift options »](/api/stars.md#buying-or-gifting-stars) as [starsGiftOption](/constructor/starsGiftOption.md) constructors. |

### Working with [VoIP calls](/api/end-to-end/voice-calls.md)

| Name | Description |
| --- | --- |
| [phone.acceptCall](/method/phone.acceptCall.md) | Accept incoming call, see [here »](/api/calls.md#one-to-one-calls) for more info on the full flow. |
| [phone.confirmCall](/method/phone.confirmCall.md) | [Complete phone call E2E encryption key exchange »](/api/end-to-end/voice-calls.md), see [here »](/api/calls.md#one-to-one-calls) for more info on the full flow. |
| [phone.discardCall](/method/phone.discardCall.md) | Refuse or end running call, see [here »](/api/calls.md#one-to-one-calls) for more info on the full flow. |
| [phone.getCallConfig](/method/phone.getCallConfig.md) | DEPRECATED: Get phone call configuration to be passed to the libtgvoip (deprecated) shared config. |
| [phone.receivedCall](/method/phone.receivedCall.md) | Optional: notify the server that the user is currently busy in a call: this will automatically refuse all incoming phone calls until the current phone call is ended, see [here »](/api/calls.md#one-to-one-calls) for more info on the full flow. |
| [phone.requestCall](/method/phone.requestCall.md) | Start a telegram phone call, see [here »](/api/calls.md#one-to-one-calls) for more info on the full flow. |
| [phone.saveCallDebug](/method/phone.saveCallDebug.md) | Send [phone call](/api/calls.md#call-debug) debug data to server. |
| [phone.sendSignalingData](/method/phone.sendSignalingData.md) | Send VoIP [signaling data](/api/calls.md#signaling-data) for an ongoing phone call. |
| [phone.setCallRating](/method/phone.setCallRating.md) | Rate a call, returns info about the rating message sent to the official VoIP bot, see [here »](/api/calls.md#call-rating) for more info on the full flow. |
| [phone.saveCallLog](/method/phone.saveCallLog.md) | Deprecated: send libtgvoip phone call debug information |
| [messages.deletePhoneCallHistory](/method/messages.deletePhoneCallHistory.md) | Delete the entire phone call history. |

### Working with [accent colors&nbsp;&raquo;](/api/colors.md)

| Name | Description |
| --- | --- |
| [help.getPeerColors](/method/help.getPeerColors.md) | Get the set of [accent color palettes »](/api/colors.md) that can be used for message accents. |
| [help.getPeerProfileColors](/method/help.getPeerProfileColors.md) | Get the set of [accent color palettes »](/api/colors.md) that can be used in profile page backgrounds. |
| [account.updateColor](/method/account.updateColor.md) | Update the [accent color and background custom emoji »](/api/colors.md) of the current account. |
| [channels.updateColor](/method/channels.updateColor.md) | Update the [accent color and background custom emoji »](/api/colors.md) of a channel. |
| [account.getDefaultBackgroundEmojis](/method/account.getDefaultBackgroundEmojis.md) | Get a set of suggested [custom emoji stickers](/api/custom-emoji.md) that can be used in an [accent color pattern](/api/colors.md). |

### Working with [affiliate programs](/api/bots/referrals.md)

| Name | Description |
| --- | --- |
| [payments.getConnectedStarRefBots](/method/payments.getConnectedStarRefBots.md) | Fetch all affiliations we have created for a certain peer |
| [payments.getConnectedStarRefBot](/method/payments.getConnectedStarRefBot.md) | Fetch info about a specific [bot affiliation »](/api/bots/referrals.md) |
| [payments.getSuggestedStarRefBots](/method/payments.getSuggestedStarRefBots.md) | Obtain a list of suggested [mini apps](/api/bots/webapps.md) with available [affiliate programs](/api/bots/referrals.md)\
\
`order_by_revenue` and `order_by_date` are mutually exclusive: if neither is set, results are sorted by profitability. |
| [payments.connectStarRefBot](/method/payments.connectStarRefBot.md) | Join a bot's [affiliate program, becoming an affiliate »](/api/bots/referrals.md#becoming-an-affiliate) |
| [payments.editConnectedStarRefBot](/method/payments.editConnectedStarRefBot.md) | Leave a bot's [affiliate program »](/api/bots/referrals.md#becoming-an-affiliate) |
| [bots.updateStarRefProgram](/method/bots.updateStarRefProgram.md) | Create, edit or delete the [affiliate program](/api/bots/referrals.md) of a bot we own |

### Working with [animated dice &raquo;](/api/dice.md)

| Name | Description |
| --- | --- |
| [messages.getEmojiGameInfo](/method/messages.getEmojiGameInfo.md) | Fetch dice game information. |

### Working with [boosts&nbsp;&raquo;](/api/boost.md)

| Name | Description |
| --- | --- |
| [premium.getBoostsList](/method/premium.getBoostsList.md) | Obtains info about the boosts that were applied to a certain channel or supergroup (admins only) |
| [premium.getMyBoosts](/method/premium.getMyBoosts.md) | Obtain which peers are we currently [boosting](/api/boost.md), and how many [boost slots](/api/boost.md) we have left. |
| [premium.applyBoost](/method/premium.applyBoost.md) | Apply one or more [boosts »](/api/boost.md) to a peer. |
| [premium.getBoostsStatus](/method/premium.getBoostsStatus.md) | Gets the current [number of boosts](/api/boost.md) of a channel/supergroup. |
| [premium.getUserBoosts](/method/premium.getUserBoosts.md) | Returns the lists of boost that were applied to a channel/supergroup by a specific user (admins only) |
| [channels.setBoostsToUnblockRestrictions](/method/channels.setBoostsToUnblockRestrictions.md) | Admins with [ban\_users admin rights »](/constructor/chatAdminRights.md) may allow users that apply a certain number of [booosts »](/api/boost.md) to the group to bypass [slow mode »](/method/channels.toggleSlowMode.md) and [other »](/api/rights.md#default-rights) supergroup restrictions, see [here »](/api/boost.md#bypass-slowmode-and-chat-restrictions) for more info. |

### Working with [bot verification icons](/api/bots/verification.md)

| Name | Description |
| --- | --- |
| [bots.setCustomVerification](/method/bots.setCustomVerification.md) | Verify a user or chat [on behalf of an organization »](/api/bots/verification.md). |
| [bots.getBotRecommendations](/method/bots.getBotRecommendations.md) | Obtain a list of similarly themed bots, selected based on similarities in their subscriber bases, see [here »](/api/recommend.md) for more info. |

### Working with [channel recommendations&nbsp;&raquo;](/api/recommend.md)

| Name | Description |
| --- | --- |
| [channels.getChannelRecommendations](/method/channels.getChannelRecommendations.md) | Obtain a list of similarly themed public channels, selected based on similarities in their **subscriber bases**. |

### Working with [channels/supergroups/geogroups](/api/channel.md)

| Name | Description |
| --- | --- |
| [channels.createChannel](/method/channels.createChannel.md) | Create a [supergroup/channel](/api/channel.md). |
| [channels.getInactiveChannels](/method/channels.getInactiveChannels.md) | Get inactive channels and supergroups |
| [channels.deleteChannel](/method/channels.deleteChannel.md) | Delete a [channel/supergroup](/api/channel.md) |
| [channels.deleteHistory](/method/channels.deleteHistory.md) | Delete the history of a [supergroup](/api/channel.md) |
| [channels.deleteMessages](/method/channels.deleteMessages.md) | Delete messages in a [channel/supergroup](/api/channel.md) |
| [channels.deleteParticipantHistory](/method/channels.deleteParticipantHistory.md) | Delete all messages sent by a specific participant of a given supergroup |
| [channels.editAdmin](/method/channels.editAdmin.md) | Modify the admin rights of a user in a [supergroup/channel](/api/channel.md). |
| [channels.editBanned](/method/channels.editBanned.md) | Ban/unban/kick a user in a [supergroup/channel](/api/channel.md). |
| [channels.editLocation](/method/channels.editLocation.md) | Edit location of geogroup, see [here »](/api/nearby.md) for more info on geogroups. |
| [channels.editPhoto](/method/channels.editPhoto.md) | Change the photo of a [channel/supergroup](/api/channel.md) |
| [channels.editTitle](/method/channels.editTitle.md) | Edit the name of a [channel/supergroup](/api/channel.md) |
| [channels.exportMessageLink](/method/channels.exportMessageLink.md) | Get link and embed info of a message in a [channel/supergroup](/api/channel.md) |
| [channels.getAdminLog](/method/channels.getAdminLog.md) | Get the admin log of a [channel/supergroup](/api/channel.md) |
| [channels.getAdminedPublicChannels](/method/channels.getAdminedPublicChannels.md) | Get [channels/supergroups/geogroups](/api/channel.md) we're admin in. Usually called when the user exceeds the [limit](/constructor/config.md) for owned public [channels/supergroups/geogroups](/api/channel.md), and the user is given the choice to remove one of his channels/supergroups/geogroups. |
| [channels.getChannels](/method/channels.getChannels.md) | Get info about [channels/supergroups](/api/channel.md) |
| [channels.getFullChannel](/method/channels.getFullChannel.md) | Get full info about a [supergroup](/api/channel.md#supergroups), [gigagroup](/api/channel.md#gigagroups) or [channel](/api/channel.md#channels) |
| [channels.getGroupsForDiscussion](/method/channels.getGroupsForDiscussion.md) | Get all groups that can be used as [discussion groups](/api/discussion.md).\
\
Returned [basic group chats](/api/channel.md#basic-groups) must be first upgraded to [supergroups](/api/channel.md#supergroups) before they can be set as a discussion group.  \
To set a returned supergroup as a discussion group, access to its old messages must be enabled using [channels.togglePreHistoryHidden](/method/channels.togglePreHistoryHidden.md), first. |
| [channels.getMessages](/method/channels.getMessages.md) | Get [channel/supergroup](/api/channel.md) messages |
| [channels.getParticipant](/method/channels.getParticipant.md) | Get info about a [channel/supergroup](/api/channel.md) participant |
| [channels.getParticipants](/method/channels.getParticipants.md) | Get the participants of a [supergroup/channel](/api/channel.md) |
| [channels.inviteToChannel](/method/channels.inviteToChannel.md) | Invite users to a channel/supergroup |
| [channels.joinChannel](/method/channels.joinChannel.md) | Join a channel/supergroup |
| [channels.leaveChannel](/method/channels.leaveChannel.md) | Leave a [channel/supergroup](/api/channel.md) |
| [channels.readHistory](/method/channels.readHistory.md) | Mark [channel/supergroup](/api/channel.md) history as read |
| [channels.readMessageContents](/method/channels.readMessageContents.md) | Mark [channel/supergroup](/api/channel.md) message contents as read, emitting an [updateChannelReadMessagesContents](/constructor/updateChannelReadMessagesContents.md). |
| [channels.setDiscussionGroup](/method/channels.setDiscussionGroup.md) | Associate a group to a channel as [discussion group](/api/discussion.md) for that channel |
| [channels.setStickers](/method/channels.setStickers.md) | Associate a stickerset to the supergroup |
| [channels.togglePreHistoryHidden](/method/channels.togglePreHistoryHidden.md) | Hide/unhide message history for new channel/supergroup users |
| [channels.toggleSignatures](/method/channels.toggleSignatures.md) | Enable/disable message signatures in channels |
| [channels.toggleSlowMode](/method/channels.toggleSlowMode.md) | Toggle supergroup slow mode: if enabled, users will only be able to send one message every `seconds` seconds |
| [channels.toggleParticipantsHidden](/method/channels.toggleParticipantsHidden.md) | Hide or display the participants list in a [supergroup](/api/channel.md).\
\
The supergroup must have at least `hidden_members_group_size_min` participants in order to use this method, as specified by the [client configuration parameters »](/api/config.md#client-configuration). |

### Working with [chat invites and join requests](/api/invites.md)

| Name | Description |
| --- | --- |
| [messages.exportChatInvite](/method/messages.exportChatInvite.md) | Export an invite link for a chat |
| [messages.getExportedChatInvite](/method/messages.getExportedChatInvite.md) | Get info about a chat invite |
| [messages.getExportedChatInvites](/method/messages.getExportedChatInvites.md) | Get info about the chat invites of a specific chat |
| [messages.editExportedChatInvite](/method/messages.editExportedChatInvite.md) | Edit an exported chat invite |
| [messages.deleteRevokedExportedChatInvites](/method/messages.deleteRevokedExportedChatInvites.md) | Delete all revoked chat invites |
| [messages.deleteExportedChatInvite](/method/messages.deleteExportedChatInvite.md) | Delete a chat invite |
| [messages.getAdminsWithInvites](/method/messages.getAdminsWithInvites.md) | Get info about chat invites generated by admins. |
| [messages.getChatInviteImporters](/method/messages.getChatInviteImporters.md) | Get info about the users that joined the chat using a specific chat invite |
| [messages.checkChatInvite](/method/messages.checkChatInvite.md) | Check the validity of a chat invite link and get basic info about it |
| [messages.importChatInvite](/method/messages.importChatInvite.md) | Import a chat invite and join a private chat/supergroup/channel |
| [messages.hideChatJoinRequest](/method/messages.hideChatJoinRequest.md) | Dismiss or approve a chat [join request](/api/invites.md#join-requests) related to a specific chat or channel. |
| [messages.hideAllChatJoinRequests](/method/messages.hideAllChatJoinRequests.md) | Dismiss or approve all [join requests](/api/invites.md#join-requests) related to a specific chat or channel. |
| [channels.toggleJoinToSend](/method/channels.toggleJoinToSend.md) | Set whether all users [should join a discussion group in order to comment on a post »](/api/discussion.md#requiring-users-to-join-the-group) |
| [channels.toggleJoinRequest](/method/channels.toggleJoinRequest.md) | Set whether all users should [request admin approval to join the group »](/api/invites.md#join-requests). |

### Working with [chats/supergroups/channels](/api/channel.md)

| Name | Description |
| --- | --- |
| [messages.getMessageReadParticipants](/method/messages.getMessageReadParticipants.md) | Get which users read a specific message: only available for groups and supergroups with less than [`chat_read_mark_size_threshold` members](/api/config.md#chat-read-mark-size-threshold), read receipts will be stored for [`chat_read_mark_expire_period` seconds after the message was sent](/api/config.md#chat-read-mark-expire-period), see [client configuration for more info »](/api/config.md#client-configuration). |
| [messages.addChatUser](/method/messages.addChatUser.md) | Adds a user to a chat and sends a service message on it. |
| [messages.createChat](/method/messages.createChat.md) | Creates a new chat. |
| [messages.deleteChatUser](/method/messages.deleteChatUser.md) | Deletes a user from a chat and sends a service message on it. |
| [messages.editChatAbout](/method/messages.editChatAbout.md) | Edit the description of a [group/supergroup/channel](/api/channel.md). |
| [messages.editChatAdmin](/method/messages.editChatAdmin.md) | Make a user admin in a [basic group](/api/channel.md#basic-groups). |
| [messages.editChatDefaultBannedRights](/method/messages.editChatDefaultBannedRights.md) | Edit the default banned rights of a [channel/supergroup/group](/api/channel.md). |
| [messages.editChatPhoto](/method/messages.editChatPhoto.md) | Changes chat photo and sends a service message on it |
| [messages.editChatTitle](/method/messages.editChatTitle.md) | Changes chat name and sends a service message on it. |
| [messages.getChats](/method/messages.getChats.md) | Returns chat basic info on their IDs. |
| [messages.deleteChat](/method/messages.deleteChat.md) | Delete a [chat](/api/channel.md) |
| [messages.getCommonChats](/method/messages.getCommonChats.md) | Get chats in common with a user |
| [messages.getFullChat](/method/messages.getFullChat.md) | Get full info about a [basic group](/api/channel.md#basic-groups). |
| [messages.migrateChat](/method/messages.migrateChat.md) | Turn a [basic group into a supergroup](/api/channel.md#migration) |
| [channels.convertToGigagroup](/method/channels.convertToGigagroup.md) | Convert a [supergroup](/api/channel.md) to a [gigagroup](/api/channel.md), when requested by [channel suggestions](/api/config.md#channel-suggestions). |
| [channels.setEmojiStickers](/method/channels.setEmojiStickers.md) | Set a [custom emoji stickerset](/api/custom-emoji.md) for supergroups. Only usable after reaching at least the [boost level »](/api/boost.md) specified in the [`group_emoji_stickers_level_min` »](/api/config.md#group-emoji-stickers-level-min) config parameter. |
| [messages.editChatCreator](/method/messages.editChatCreator.md) | Transfer the ownership of a basic group, supergroup or channel to another user, see [here »](/api/channel.md#transferring-ownership-of-a-group-channel) for the full flow. |
| [messages.getFutureChatCreatorAfterLeave](/method/messages.getFutureChatCreatorAfterLeave.md) | Group/channel owners only: returns the ID of the user that will become the new owner of the group if we decide to leave the group, see [here »](/api/channel.md#leaving-groups-channels) for more info on the full flow. |

### Working with [cloud themes](/api/themes.md)

| Name | Description |
| --- | --- |
| [account.updateTheme](/method/account.updateTheme.md) | Update theme |
| [account.uploadTheme](/method/account.uploadTheme.md) | Upload theme |
| [account.getThemes](/method/account.getThemes.md) | Get installed themes |
| [account.createTheme](/method/account.createTheme.md) | Create a theme |
| [account.installTheme](/method/account.installTheme.md) | Install a theme |
| [account.saveTheme](/method/account.saveTheme.md) | Save a theme |
| [account.getTheme](/method/account.getTheme.md) | Get theme information |
| [account.getChatThemes](/method/account.getChatThemes.md) | Get all available chat [themes »](/api/themes.md). |
| [account.getUniqueGiftChatThemes](/method/account.getUniqueGiftChatThemes.md) | Obtain all [chat themes »](/api/themes.md#chat-themes) associated to owned or [hosted collectible gifts »](/api/gifts.md#hosted-collectible-gifts). |
| [messages.setChatTheme](/method/messages.setChatTheme.md) | Change the chat theme of a certain chat, see [here »](/api/themes.md#chat-themes) for more info. |

### Working with [collectible gift auctions &raquo;](/api/auctions.md)

| Name | Description |
| --- | --- |
| [payments.getStarGiftAuctionState](/method/payments.getStarGiftAuctionState.md) | Returns info about a [collectible gift auction »](/api/auctions.md); also subscribes the user to auction updates, see [here »](/api/auctions.md) for more info on the full flow. |
| [payments.getStarGiftAuctionAcquiredGifts](/method/payments.getStarGiftAuctionAcquiredGifts.md) | Fetches all the gifts that the current user won in an [auction](/api/auctions.md). |
| [payments.getStarGiftActiveAuctions](/method/payments.getStarGiftActiveAuctions.md) | Fetches all currently active [gift auctions](/api/auctions.md) **the user has ever bid on** (including auctions where the user was outbid and their bid was returned), as long as the auction hasn't ended yet.\
\
This method is primarily used to display an auction badge in the chat list immediately on app startup, without waiting for real-time [updateStarGiftAuctionState](/constructor/updateStarGiftAuctionState.md) updates to arrive: the client calls it to discover which auctions the user is participating in and show the badge proactively.\
\
To instead fetch the full state of a single auction, subscribe to its real-time updates and render the detailed auction UI (typically when the user opens a specific auction), use [payments.getStarGiftAuctionState](/method/payments.getStarGiftAuctionState.md). |

### Working with [content protection &raquo;](/api/content-protection.md)

| Name | Description |
| --- | --- |
| [messages.toggleNoForwards](/method/messages.toggleNoForwards.md) | Enable or disable [content protection](/api/content-protection.md) on a channel, group or private chat. |

### Working with [custom animated emojis](/api/custom-emoji.md)

| Name | Description |
| --- | --- |
| [messages.getCustomEmojiDocuments](/method/messages.getCustomEmojiDocuments.md) | Fetch [custom emoji stickers »](/api/custom-emoji.md).\
\
Returns a list of [documents](/constructor/document.md) with the animated custom emoji in TGS format, and a [documentAttributeCustomEmoji](/constructor/documentAttributeCustomEmoji.md) attribute with the original emoji and info about the emoji stickerset this custom emoji belongs to. |
| [messages.getEmojiStickers](/method/messages.getEmojiStickers.md) | Gets the list of currently installed [custom emoji stickersets](/api/custom-emoji.md). |
| [messages.getFeaturedEmojiStickers](/method/messages.getFeaturedEmojiStickers.md) | Gets featured custom emoji stickersets. |
| [messages.searchCustomEmoji](/method/messages.searchCustomEmoji.md) | Look for [custom emojis](/api/custom-emoji.md) associated to a UTF8 emoji |
| [account.getDefaultProfilePhotoEmojis](/method/account.getDefaultProfilePhotoEmojis.md) | Get a set of suggested [custom emoji stickers](/api/custom-emoji.md) that can be [used as profile picture](/api/files.md#sticker-profile-pictures) |
| [account.getDefaultGroupPhotoEmojis](/method/account.getDefaultGroupPhotoEmojis.md) | Get a set of suggested [custom emoji stickers](/api/custom-emoji.md) that can be [used as group picture](/api/files.md#sticker-profile-pictures) |

### Working with [deep links](/api/links.md)

| Name | Description |
| --- | --- |
| [messages.startBot](/method/messages.startBot.md) | Start a conversation with a bot using a [deep linking parameter](/api/links.md#bot-links) |
| [help.getDeepLinkInfo](/method/help.getDeepLinkInfo.md) | Get info about an unsupported deep link, see [here for more info »](/api/links.md#unsupported-links). |
| [help.getRecentMeUrls](/method/help.getRecentMeUrls.md) | Get recently used `t.me` links.\
\
When installing official applications from "Download Telegram" buttons present in [t.me](https://t.me) pages, a referral parameter is passed to applications after installation.  \
If, after downloading the application, the user creates a new account (instead of logging into an existing one), the referral parameter should be imported using this method, which returns the [t.me](https://t.me) pages the user recently opened, before installing Telegram. |

### Working with [drafts](/api/drafts.md)

| Name | Description |
| --- | --- |
| [messages.clearAllDrafts](/method/messages.clearAllDrafts.md) | Clear all [drafts](/api/drafts.md). |
| [messages.getAllDrafts](/method/messages.getAllDrafts.md) | Return all message [drafts](/api/drafts.md).  \
Returns all the latest [updateDraftMessage](/constructor/updateDraftMessage.md) updates related to all chats with drafts. |
| [messages.saveDraft](/method/messages.saveDraft.md) | Save a message [draft](/api/drafts.md) associated to a chat. |

### Working with [emoji categories](/api/emoji-categories.md)

| Name | Description |
| --- | --- |
| [messages.getEmojiStickerGroups](/method/messages.getEmojiStickerGroups.md) | Represents a list of [emoji categories](/api/emoji-categories.md), to be used when choosing a sticker. |
| [messages.getEmojiGroups](/method/messages.getEmojiGroups.md) | Represents a list of [emoji categories](/api/emoji-categories.md). |
| [messages.getEmojiStatusGroups](/method/messages.getEmojiStatusGroups.md) | Represents a list of [emoji categories](/api/emoji-categories.md), to be used when selecting custom emojis to set as [custom emoji status](/api.md). |
| [messages.getEmojiProfilePhotoGroups](/method/messages.getEmojiProfilePhotoGroups.md) | Represents a list of [emoji categories](/api/emoji-categories.md), to be used when selecting custom emojis to set as [profile picture](/api/files.md#sticker-profile-pictures). |

### Working with [emoji keywords](/api/custom-emoji.md#emoji-keywords)

| Name | Description |
| --- | --- |
| [messages.getEmojiKeywords](/method/messages.getEmojiKeywords.md) | Get localized [emoji keywords »](/api/custom-emoji.md#emoji-keywords). |
| [messages.getEmojiKeywordsDifference](/method/messages.getEmojiKeywordsDifference.md) | Get changed [emoji keywords »](/api/custom-emoji.md#emoji-keywords). |
| [messages.getEmojiKeywordsLanguages](/method/messages.getEmojiKeywordsLanguages.md) | Obtain a list of related languages that must be used when fetching [emoji keyword lists »](/api/custom-emoji.md#emoji-keywords).\
\
Usually the method will return the passed language codes (if localized) + `en` + some language codes for similar languages (if applicable). |
| [messages.getEmojiURL](/method/messages.getEmojiURL.md) | Returns an HTTP URL which can be used to automatically log in into translation platform and suggest new [emoji keywords »](/api/custom-emoji.md#emoji-keywords). The URL will be valid for 30 seconds after generation. |

### Working with [emoji statuses](/api/emoji-status.md)

| Name | Description |
| --- | --- |
| [account.updateEmojiStatus](/method/account.updateEmojiStatus.md) | Set an [emoji status](/api/emoji-status.md) |
| [channels.updateEmojiStatus](/method/channels.updateEmojiStatus.md) | Set an [emoji status](/api/emoji-status.md) for a channel or supergroup. |
| [account.getDefaultEmojiStatuses](/method/account.getDefaultEmojiStatuses.md) | Get a list of default suggested [emoji statuses](/api/emoji-status.md) |
| [account.getCollectibleEmojiStatuses](/method/account.getCollectibleEmojiStatuses.md) | Obtain a list of [emoji statuses »](/api/emoji-status.md) for owned or [hosted collectible gifts »](/api/gifts.md#hosted-collectible-gifts). |
| [account.getChannelDefaultEmojiStatuses](/method/account.getChannelDefaultEmojiStatuses.md) | Get a list of default suggested [channel emoji statuses](/api/emoji-status.md). |
| [account.getChannelRestrictedStatusEmojis](/method/account.getChannelRestrictedStatusEmojis.md) | Returns fetch the full list of [custom emoji IDs »](/api/custom-emoji.md) that cannot be used in [channel emoji statuses »](/api/emoji-status.md). |
| [account.getRecentEmojiStatuses](/method/account.getRecentEmojiStatuses.md) | Get recently used [emoji statuses](/api/emoji-status.md) |
| [account.clearRecentEmojiStatuses](/method/account.clearRecentEmojiStatuses.md) | Clears list of recently used [emoji statuses](/api/emoji-status.md) |
| [bots.updateUserEmojiStatus](/method/bots.updateUserEmojiStatus.md) | Change the emoji status of a user (invoked by bots, see [here »](/api/emoji-status.md#setting-an-emoji-status-from-a-bot) for more info on the full flow) |
| [bots.toggleUserEmojiStatusPermission](/method/bots.toggleUserEmojiStatusPermission.md) | Allow or prevent a bot from [changing our emoji status »](/api/emoji-status.md#setting-an-emoji-status-from-a-bot) |

### Working with [fact-checks](/api/factcheck.md)

| Name | Description |
| --- | --- |
| [messages.editFactCheck](/method/messages.editFactCheck.md) | Edit/create a [fact-check](/api/factcheck.md) on a message.\
\
Can only be used by independent fact-checkers as specified by the [appConfig.can\_edit\_factcheck](/api/config.md#can-edit-factcheck) configuration flag. |
| [messages.deleteFactCheck](/method/messages.deleteFactCheck.md) | Delete a [fact-check](/api/factcheck.md) from a message.\
\
Can only be used by independent fact-checkers as specified by the [appConfig.can\_edit\_factcheck](/api/config.md#can-edit-factcheck) configuration flag. |
| [messages.getFactCheck](/method/messages.getFactCheck.md) | Fetch one or more [factchecks, see here »](/api/factcheck.md) for the full flow. |

### Working with [files](/api/files.md)

| Name | Description |
| --- | --- |
| [help.getCdnConfig](/method/help.getCdnConfig.md) | Get configuration for [CDN](/cdn.md) file downloads. |
| [upload.getCdnFile](/method/upload.getCdnFile.md) | Download a [CDN](/cdn.md) file. |
| [upload.getCdnFileHashes](/method/upload.getCdnFileHashes.md) | Get SHA256 hashes for verifying downloaded [CDN](/cdn.md) files |
| [upload.reuploadCdnFile](/method/upload.reuploadCdnFile.md) | Request a reupload of a certain file to a [CDN DC](/cdn.md). |
| [upload.getFile](/method/upload.getFile.md) | Returns content of a whole file or its part. |
| [upload.getFileHashes](/method/upload.getFileHashes.md) | Get SHA256 hashes for verifying downloaded files |
| [upload.getWebFile](/method/upload.getWebFile.md) | Returns content of a web file, by proxying the request through telegram, see the [webfile docs for more info](/api/files.md#downloading-webfiles).\
\
**Note**: the query must be sent to the DC specified in the `webfile_dc_id` [MTProto configuration field](/api/config.md#mtproto-configuration). |
| [upload.saveBigFilePart](/method/upload.saveBigFilePart.md) | Saves a part of a large file (over 10 MB in size) to be later passed to one of the methods. |
| [upload.saveFilePart](/method/upload.saveFilePart.md) | Saves a part of file for further sending to one of the methods. |
| [messages.uploadEncryptedFile](/method/messages.uploadEncryptedFile.md) | Upload encrypted file and associate it to a secret chat (without actually sending it to the chat). |
| [messages.uploadMedia](/method/messages.uploadMedia.md) | Upload a file and associate it to a chat (without actually sending it to the chat)\
\
May also be used in a [business connection](/api/bots/connected-business-bots.md), *not* by wrapping the query in [invokeWithBusinessConnection »](/method/invokeWithBusinessConnection.md), but rather by specifying the business connection ID in the `business_connection_id` parameter. |
| [messages.getDocumentByHash](/method/messages.getDocumentByHash.md) | Get a document by its SHA256 hash, mainly used for gifs |

### Working with [folder tags](/api/folders.md#folder-tags)

| Name | Description |
| --- | --- |
| [messages.toggleDialogFilterTags](/method/messages.toggleDialogFilterTags.md) | Enable or disable [folder tags »](/api/folders.md#folder-tags). |

### Working with [folders](/api/folders.md)

| Name | Description |
| --- | --- |
| [messages.updateDialogFiltersOrder](/method/messages.updateDialogFiltersOrder.md) | Reorder [folders](/api/folders.md) |
| [messages.getDialogFilters](/method/messages.getDialogFilters.md) | Get [folders](/api/folders.md) |
| [messages.getSuggestedDialogFilters](/method/messages.getSuggestedDialogFilters.md) | Get [suggested folders](/api/folders.md) |
| [messages.updateDialogFilter](/method/messages.updateDialogFilter.md) | Update [folder](/api/folders.md) |
| [folders.editPeerFolders](/method/folders.editPeerFolders.md) | Edit peers in [peer folder](/api/folders.md#peer-folders) |
| [chatlists.exportChatlistInvite](/method/chatlists.exportChatlistInvite.md) | Export a [folder »](/api/folders.md), creating a [chat folder deep link »](/api/links.md#chat-folder-links). |
| [chatlists.deleteExportedInvite](/method/chatlists.deleteExportedInvite.md) | Delete a previously created [chat folder deep link »](/api/links.md#chat-folder-links). |
| [chatlists.editExportedInvite](/method/chatlists.editExportedInvite.md) | Edit a [chat folder deep link »](/api/links.md#chat-folder-links). |
| [chatlists.getExportedInvites](/method/chatlists.getExportedInvites.md) | List all [chat folder deep links »](/api/links.md#chat-folder-links) associated to a folder |
| [chatlists.checkChatlistInvite](/method/chatlists.checkChatlistInvite.md) | Obtain information about a [chat folder deep link »](/api/links.md#chat-folder-links). |
| [chatlists.joinChatlistInvite](/method/chatlists.joinChatlistInvite.md) | Import a [chat folder deep link »](/api/links.md#chat-folder-links), joining some or all the chats in the folder. |
| [chatlists.getChatlistUpdates](/method/chatlists.getChatlistUpdates.md) | Fetch new chats associated with an imported [chat folder deep link »](/api/links.md#chat-folder-links). Must be invoked at most every `chatlist_update_period` seconds (as per the related [client configuration parameter »](/api/config.md#chatlist-update-period)). |
| [chatlists.joinChatlistUpdates](/method/chatlists.joinChatlistUpdates.md) | Join channels and supergroups recently added to a [chat folder deep link »](/api/links.md#chat-folder-links). |
| [chatlists.hideChatlistUpdates](/method/chatlists.hideChatlistUpdates.md) | Dismiss new pending peers recently added to a [chat folder deep link »](/api/links.md#chat-folder-links). |
| [chatlists.getLeaveChatlistSuggestions](/method/chatlists.getLeaveChatlistSuggestions.md) | Returns identifiers of pinned or always included chats from a chat folder imported using a [chat folder deep link »](/api/links.md#chat-folder-links), which are suggested to be left when the chat folder is deleted. |
| [chatlists.leaveChatlist](/method/chatlists.leaveChatlist.md) | Delete a folder imported using a [chat folder deep link »](/api/links.md#chat-folder-links) |

### Working with [forums](/api/forum.md)

| Name | Description |
| --- | --- |
| [channels.toggleForum](/method/channels.toggleForum.md) | Enable or disable [forum functionality](/api/forum.md) in a supergroup. |
| [channels.toggleViewForumAsMessages](/method/channels.toggleViewForumAsMessages.md) | Users may also choose to display messages from all topics of a [forum](/api/forum.md) as if they were sent to a normal group, using a "View as messages" setting in the local client: this setting only affects the current account, and is synced to other logged in sessions using this method.\
\
Invoking this method will update the value of the `view_forum_as_messages` flag of [channelFull](/constructor/channelFull.md) or [dialog](/constructor/dialog.md) and emit an [updateChannelViewForumAsMessages](/constructor/updateChannelViewForumAsMessages.md). |
| [messages.getForumTopics](/method/messages.getForumTopics.md) | Get [topics of a forum](/api/forum.md) |
| [messages.getForumTopicsByID](/method/messages.getForumTopicsByID.md) | Get forum topics by their ID |
| [messages.editForumTopic](/method/messages.editForumTopic.md) | Edit [forum topic](/api/forum.md). |
| [messages.updatePinnedForumTopic](/method/messages.updatePinnedForumTopic.md) | Pin or unpin [forum topics](/api/forum.md) |
| [messages.reorderPinnedForumTopics](/method/messages.reorderPinnedForumTopics.md) | Reorder pinned forum topics |
| [messages.createForumTopic](/method/messages.createForumTopic.md) | Create a [forum topic](/api/forum.md). |
| [messages.deleteTopicHistory](/method/messages.deleteTopicHistory.md) | Delete message history of a [forum topic](/api/forum.md) |

### Working with [fragment.com usernames](/api/fragment.md)

| Name | Description |
| --- | --- |
| [account.reorderUsernames](/method/account.reorderUsernames.md) | Reorder usernames associated with the currently logged-in user. |
| [account.toggleUsername](/method/account.toggleUsername.md) | Activate or deactivate a purchased [fragment.com](https://fragment.com) username associated to the currently logged-in user. |
| [bots.reorderUsernames](/method/bots.reorderUsernames.md) | Reorder usernames associated to a bot we own. |
| [bots.toggleUsername](/method/bots.toggleUsername.md) | Activate or deactivate a purchased [fragment.com](https://fragment.com) username associated to a bot we own. |
| [channels.reorderUsernames](/method/channels.reorderUsernames.md) | Reorder active usernames |
| [channels.toggleUsername](/method/channels.toggleUsername.md) | Activate or deactivate a purchased [fragment.com](https://fragment.com) username associated to a [supergroup or channel](/api/channel.md) we own. |
| [channels.deactivateAllUsernames](/method/channels.deactivateAllUsernames.md) | Disable all purchased usernames of a supergroup or channel |

### Working with [games](/api/bots/games.md)

| Name | Description |
| --- | --- |
| [messages.getGameHighScores](/method/messages.getGameHighScores.md) | Get highscores of a game |
| [messages.getInlineGameHighScores](/method/messages.getInlineGameHighScores.md) | Get highscores of a game sent using an inline bot |
| [messages.setGameScore](/method/messages.setGameScore.md) | Use this method to set the score of the specified user in a game sent as a normal message (bots only). |
| [messages.setInlineGameScore](/method/messages.setInlineGameScore.md) | Use this method to set the score of the specified user in a game sent as an inline message (bots only). |

### Working with [gift codes](/api/links.md#premium-giftcode-links)

| Name | Description |
| --- | --- |
| [payments.checkGiftCode](/method/payments.checkGiftCode.md) | Obtain information about a [Telegram Premium giftcode »](/api/giveaways.md) |
| [payments.applyGiftCode](/method/payments.applyGiftCode.md) | Apply a [Telegram Premium giftcode »](/api/giveaways.md) |

### Working with [gift collections](/api/gifts.md#gift-collections)

| Name | Description |
| --- | --- |
| [payments.createStarGiftCollection](/method/payments.createStarGiftCollection.md) | Create a [star gift collection »](/api/gifts.md#gift-collections). |
| [payments.updateStarGiftCollection](/method/payments.updateStarGiftCollection.md) | Add or remove gifts from a [star gift collection »](/api/gifts.md#gift-collections), or rename the collection. |
| [payments.reorderStarGiftCollections](/method/payments.reorderStarGiftCollections.md) | Reorder the [star gift collections »](/api/gifts.md#gift-collections) on an owned peer's profile. |
| [payments.deleteStarGiftCollection](/method/payments.deleteStarGiftCollection.md) | Delete a [star gift collection »](/api/gifts.md#gift-collections). |
| [payments.getStarGiftCollections](/method/payments.getStarGiftCollections.md) | Fetches all [star gift collections »](/api/gifts.md#gift-collections) of a peer. |

### Working with [giveaways & gifts](/api/giveaways.md)

| Name | Description |
| --- | --- |
| [payments.getPremiumGiftCodeOptions](/method/payments.getPremiumGiftCodeOptions.md) | Obtain a list of Telegram Premium [giveaway/gift code »](/api/giveaways.md) options. |
| [payments.getGiveawayInfo](/method/payments.getGiveawayInfo.md) | Obtain information about a [Telegram Premium giveaway »](/api/giveaways.md). |
| [payments.launchPrepaidGiveaway](/method/payments.launchPrepaidGiveaway.md) | Launch a [prepaid giveaway »](/api/giveaways.md). |
| [payments.getStarsGiveawayOptions](/method/payments.getStarsGiveawayOptions.md) | Fetch a list of [star giveaway options »](/api/giveaways.md#star-giveaways). |

### Working with [group calls &raquo;](/api/group-calls.md#group-call-types)

| Name | Description |
| --- | --- |
| [phone.exportGroupCallInvite](/method/phone.exportGroupCallInvite.md) | Get an invite link for a public [video chat/livestream »](/api/group-calls.md#video-chats-livestreams).\
\
Non-admin members or subscribers may export a link with `can_self_unmute` omitted. Only group call admins may set `can_self_unmute` to export a link that allows users to speak.\
\
Cannot be used for video chats/livestreams associated with private groups/channels, [conference calls »](/api/group-calls.md#conference-calls) or [live stories »](/api/group-calls.md#live-stories). |
| [phone.getGroupCallJoinAs](/method/phone.getGroupCallJoinAs.md) | Get a list of peers that can be used to join a [video chat or livestream »](/api/group-calls.md#joining-a-group-call-on-behalf-of-owned-channels), presenting yourself as a specific user/channel.\
\
This method cannot be used for live stories or conference calls. To comment or react in a live story as another peer, use [channels.getSendAs](/method/channels.getSendAs.md) with `for_live_stories` set and pass one of the returned peers to [phone.sendGroupCallMessage](/method/phone.sendGroupCallMessage.md).`send_as`. |
| [phone.editGroupCallParticipant](/method/phone.editGroupCallParticipant.md) | Edit information about a participant of a non-RTMP video chat/livestream or conference. The `raise_hand` field is only supported in video chats/livestreams, see [here »](/api/group-calls.md#managing-an-active-group-call) for more info.\
\
Note: [flags](/mtproto/TL-combinators.md#conditional-fields).N?[Bool](/type/Bool.md) parameters can have three possible values:\
\
- If the [TL flag](/mtproto/TL-combinators.md#conditional-fields) is not set, the previous value will not be changed.\
- If the [TL flag](/mtproto/TL-combinators.md#conditional-fields) is set and contains a [boolTrue](/constructor/boolTrue.md), the previous value will be overwritten to `true`.\
- If the [TL flag](/mtproto/TL-combinators.md#conditional-fields) is set and contains a [boolFalse](/constructor/boolFalse.md), the previous value will be overwritten to `false`. |
| [phone.toggleGroupCallRecord](/method/phone.toggleGroupCallRecord.md) | Start or stop recording a video chat/livestream, see [here »](/api/group-calls.md#video-chats-livestreams) for more info. The recorded audio and video streams will be automatically sent to Saved Messages (the chat with ourselves). |
| [phone.editGroupCallTitle](/method/phone.editGroupCallTitle.md) | Edit the title of a video chat or livestream. This method cannot be used with live stories or conferences, see [here »](/api/group-calls.md#video-chats-livestreams) for more info. |
| [phone.getGroupParticipants](/method/phone.getGroupParticipants.md) | Get [group call](/api/group-calls.md#getting-info-about-a-group-call) participants. |
| [phone.checkGroupCall](/method/phone.checkGroupCall.md) | Check which of the specified source IDs the server still recognizes as joined to a group call. This method can be used with all group call types, see [here »](/api/group-calls.md#maintaining-group-call-connections) for more info.\
\
After joining the main connection with [phone.joinGroupCall](/method/phone.joinGroupCall.md), pass its non-zero SSRC/source ID to this method periodically. If a presentation connection is also active, include the separate source registered using [phone.joinGroupCallPresentation](/method/phone.joinGroupCallPresentation.md).\
\
The method returns the subset of the supplied sources that are still joined. A missing source means that the corresponding connection must be recreated and joined again; it does not indicate whether media packets are currently flowing. If the method returns `GROUPCALL_JOIN_MISSING`, the main connection must be rejoined. |
| [phone.createGroupCall](/method/phone.createGroupCall.md) | Create a video chat or livestream, see [here »](/api/group-calls.md#video-chats-livestreams) for the full flow. |
| [phone.toggleGroupCallStartSubscription](/method/phone.toggleGroupCallStartSubscription.md) | Subscribe or unsubscribe to a scheduled [group call](/api/group-calls.md#video-chats-livestreams). |
| [phone.leaveGroupCall](/method/phone.leaveGroupCall.md) | Leave a group call without ending it for other participants. This method can be used with all group call types, see [here »](/api/group-calls.md#managing-an-active-group-call) for more info. |
| [phone.toggleGroupCallSettings](/method/phone.toggleGroupCallSettings.md) | Change group call settings. Each setting supports different group call types, see [here »](/api/group-calls.md#managing-an-active-group-call) for more info. |
| [phone.inviteToGroupCall](/method/phone.inviteToGroupCall.md) | Invite a set of users to a [video chat/livestream »](/api/group-calls.md#video-chats-livestreams); cannot be used for [live stories »](/api/group-calls.md#live-stories) or [conference calls »](/api/group-calls.md#conference-calls). |
| [phone.getGroupCall](/method/phone.getGroupCall.md) | Get info about a [group call](/api/group-calls.md#getting-info-about-a-group-call) and its participants. |
| [phone.joinGroupCall](/method/phone.joinGroupCall.md) | Join any [group call type »](/api/group-calls.md#group-call-types). Conference calls additionally require the [E2E joining flow »](/api/end-to-end/group-calls.md#joining-a-call).\
\
The `params` field must contain a join payload generated by the local tgcalls group-call engine. It contains a random non-zero audio `ssrc`, ICE `ufrag` and `pwd`, DTLS `fingerprints`, and, when publishing video, `ssrc-groups`.\
\
For example, a join payload without published video has the following shape:\
\
```json\
{\
  "ssrc": 123456789,\
  "ufrag": "...",\
  "pwd": "...",\
  "fingerprints": [{\
    "hash": "sha-256",\
    "fingerprint": "...",\
    "setup": "passive"\
  }]\
}\
```\
\
When joining an RTMP-mode call, generate the payload without published video source groups. |
| [phone.leaveGroupCallPresentation](/method/phone.leaveGroupCallPresentation.md) | Stop screen sharing in a non-RTMP video chat/livestream or conference. Presentations are not supported in live stories or RTMP-mode video chats/livestreams, see [here »](/api/group-calls.md#presentations) for more info. |
| [phone.discardGroupCall](/method/phone.discardGroupCall.md) | Terminate a group call, ending the room for all participants. This method can be used with all group call types, see [here »](/api/group-calls.md#managing-an-active-group-call) for more info. |
| [phone.joinGroupCallPresentation](/method/phone.joinGroupCallPresentation.md) | Start screen sharing in a non-RTMP video chat/livestream or conference. Presentations are not supported in live stories or RTMP-mode video chats/livestreams, see [here »](/api/group-calls.md#presentations) for more info. |
| [phone.startScheduledGroupCall](/method/phone.startScheduledGroupCall.md) | Start a scheduled [group call](/api/group-calls.md#video-chats-livestreams). |
| [phone.saveDefaultGroupCallJoinAs](/method/phone.saveDefaultGroupCallJoinAs.md) | Set the default peer used to join a [video chat/livestream »](/api/group-calls.md#joining-a-group-call-on-behalf-of-owned-channels) associated with a specific dialog. |
| [phone.getGroupCallStreamChannels](/method/phone.getGroupCallStreamChannels.md) | Get the available stream channels and current playback timestamp of an RTMP-mode video chat, livestream or live story, see [here »](/api/group-calls.md#rtmp-mode) for the full flow.  \
The group call must be joined before invoking this method. Send the request to the media DC specified by [groupCall](/constructor/groupCall.md).`stream_dc_id`. |
| [phone.getGroupCallStreamRtmpUrl](/method/phone.getGroupCallStreamRtmpUrl.md) | Get the RTMP URL and stream key used by the single external streamer that publishes all audio and video for an RTMP-mode video chat, livestream or live story.\
\
See [here »](/api/group-calls.md#creating-and-publishing-an-rtmp-livestream) for the full flow. |
| [phone.sendGroupCallMessage](/method/phone.sendGroupCallMessage.md) | Send an in-call message to all participants of a video chat/livestream or live story, including in RTMP mode, see [here »](/api/group-calls.md#in-call-messages) for more info.\
\
The `send_as` field can only be populated for live stories, where it optionally selects the displayed author. If omitted, the server automatically selects the appropriate author. Do not populate it for video chats/livestreams.\
\
Video chats/livestreams and live stories support [animated emoji reactions »](/api/group-calls.md#in-call-reactions), encoded as messages containing only a standard available reaction emoji or a single custom emoji entity.\
\
For a paid live story comment, pass the user-confirmed donation amount in `allow_paid_stars`. For commenters other than the live story owner, this amount must be at least the current [groupCall](/constructor/groupCall.md).`send_paid_messages_stars` minimum. A higher amount may be donated to highlight the comment. The live story owner may comment without populating `allow_paid_stars`. To send a standalone paid live story donation, pass a positive `allow_paid_stars` value and an empty `message`, see [here »](/api/group-calls.md#paid-live-story-donations) for the full flow. |
| [phone.deleteGroupCallMessages](/method/phone.deleteGroupCallMessages.md) | Delete specific messages from the [in-call message overlay »](/api/group-calls.md#in-call-messages) of a video chat/livestream or live story, including in RTMP mode.\
\
Non-admin participants may delete messages they sent; admins may delete any message. |
| [phone.deleteGroupCallParticipantMessages](/method/phone.deleteGroupCallParticipantMessages.md) | As an admin, delete all messages from a specific participant in the [in-call message overlay »](/api/group-calls.md#in-call-messages) of a video chat/livestream or live story, including in RTMP mode. |
| [phone.saveDefaultSendAs](/method/phone.saveDefaultSendAs.md) | Save the default peer displayed as the author of live story comments and reactions, see [in-call messages »](/api/group-calls.md#in-call-messages).\
\
It cannot be used for normal video chats/livestreams, where in-call messages are sent as the peer used to join the call (`join_as`). |

### Working with [group member/admin tags &raquo;](/api/rank.md)

| Name | Description |
| --- | --- |
| [messages.editChatParticipantRank](/method/messages.editChatParticipantRank.md) | Edit a group participant's [tag »](/api/rank.md). |

### Working with [guest mode for bots &raquo;](/api/bots/guest-mode.md)

| Name | Description |
| --- | --- |
| [messages.setBotGuestChatResult](/method/messages.setBotGuestChatResult.md) | Bots may use this method to answer a [guest mode »](/api/bots/guest-mode.md) query received via an [updateBotGuestChatQuery](/constructor/updateBotGuestChatQuery.md) update, providing the message to post into the chat as a guest, see [here »](/api/bots/guest-mode.md#handling-guest-queries-bot-side) for more info. |

### Working with [instant view pages](https://instantview.telegram.org)

| Name | Description |
| --- | --- |
| [messages.getWebPage](/method/messages.getWebPage.md) | Get [instant view](https://instantview.telegram.org) page |
| [messages.getWebPagePreview](/method/messages.getWebPagePreview.md) | Get preview of webpage |

### Working with [live stories &raquo;](/api/group-calls.md#live-stories)

| Name | Description |
| --- | --- |
| [stories.startLive](/method/stories.startLive.md) | Start a live story, optionally using RTMP livestream mode, see [here »](/api/group-calls.md#live-stories) for the full flow. |
| [phone.getGroupCallStars](/method/phone.getGroupCallStars.md) | Fetch a live story's total donations and top donors, see [paid live story donations »](/api/group-calls.md#paid-live-story-donations). |

### Working with [managed bots &raquo;](/api/bots/managed-bots.md)

| Name | Description |
| --- | --- |
| [bots.checkUsername](/method/bots.checkUsername.md) | Check whether a username is available and valid for use when [creating a managed bot »](/api/bots/managed-bots.md#creating-a-managed-bot). |
| [bots.createBot](/method/bots.createBot.md) | Create a [managed bot »](/api/bots/managed-bots.md#creating-a-managed-bot) owned by the current user and controlled by the specified manager bot. |
| [bots.exportBotToken](/method/bots.exportBotToken.md) | Export the bot token of a [managed bot »](/api/bots/managed-bots.md#managing-a-managed-bot); can only be called by the manager bot. |
| [bots.getAccessSettings](/method/bots.getAccessSettings.md) | Get the [access restriction settings »](/api/bots/managed-bots.md#managing-a-managed-bot) of a managed bot; can only be called by the manager bot. |
| [bots.editAccessSettings](/method/bots.editAccessSettings.md) | Edit the [access restriction settings »](/api/bots/managed-bots.md#managing-a-managed-bot) of a managed bot; can only be called by the manager bot. |

### Working with [message effects](/api/effects.md)

| Name | Description |
| --- | --- |
| [messages.getAvailableEffects](/method/messages.getAvailableEffects.md) | Fetch the full list of usable [animated message effects »](/api/effects.md). |

### Working with [message reactions](/api/reactions.md)

| Name | Description |
| --- | --- |
| [messages.setDefaultReaction](/method/messages.setDefaultReaction.md) | Change default emoji reaction to use in the quick reaction menu: the value is synced across devices and can be fetched using [help.getConfig, `reactions_default` field](/method/help.getConfig.md). |
| [messages.getMessagesReactions](/method/messages.getMessagesReactions.md) | Get [message reactions »](/api/reactions.md) |
| [messages.sendReaction](/method/messages.sendReaction.md) | React to message.\
\
Starting from layer 159, the reaction will be sent from the peer specified using [messages.saveDefaultSendAs](/method/messages.saveDefaultSendAs.md). |
| [messages.getAvailableReactions](/method/messages.getAvailableReactions.md) | Obtain available [message reactions »](/api/reactions.md) |
| [messages.getUnreadReactions](/method/messages.getUnreadReactions.md) | Get unread reactions to messages you sent |
| [messages.readReactions](/method/messages.readReactions.md) | Mark [message reactions »](/api/reactions.md) as read |
| [messages.setChatAvailableReactions](/method/messages.setChatAvailableReactions.md) | Change the set of [message reactions »](/api/reactions.md) that can be used in a certain group, supergroup or channel |
| [messages.getMessageReactionsList](/method/messages.getMessageReactionsList.md) | Get [message reaction](/api/reactions.md) list, along with the sender of each reaction. |
| [messages.reportReaction](/method/messages.reportReaction.md) | Report a [message reaction](/api/reactions.md) |
| [messages.getTopReactions](/method/messages.getTopReactions.md) | Got popular [message reactions](/api/reactions.md) |
| [messages.getRecentReactions](/method/messages.getRecentReactions.md) | Get recently used [message reactions](/api/reactions.md) |
| [messages.clearRecentReactions](/method/messages.clearRecentReactions.md) | Clear recently used [message reactions](/api/reactions.md) |
| [messages.sendPaidReaction](/method/messages.sendPaidReaction.md) | Sends one or more [paid Telegram Star reactions »](/api/reactions.md#paid-reactions), transferring [Telegram Stars »](/api/stars.md) to a channel's balance. |
| [messages.togglePaidReactionPrivacy](/method/messages.togglePaidReactionPrivacy.md) | Changes the privacy of already sent [paid reactions](/api/reactions.md#paid-reactions) on a specific message. |
| [messages.getPaidReactionPrivacy](/method/messages.getPaidReactionPrivacy.md) | Fetches an [updatePaidReactionPrivacy](/constructor/updatePaidReactionPrivacy.md) update with the current [default paid reaction privacy, see here »](/api/reactions.md#paid-reactions) for more info. |
| [messages.deleteParticipantReactions](/method/messages.deleteParticipantReactions.md) | As an admin, remove all of a specific participant's [reactions](/api/reactions.md) from every message in a group or channel. |
| [messages.deleteParticipantReaction](/method/messages.deleteParticipantReaction.md) | As an admin, remove all of a specific participant's [reactions](/api/reactions.md) from a single message. |

### Working with [message translation](/api/translation.md)

| Name | Description |
| --- | --- |
| [messages.translateText](/method/messages.translateText.md) | Translate a given text.\
\
[Styled text entities](/api/entities.md) will only be preserved for [Telegram Premium](/api/premium.md) users. |
| [messages.togglePeerTranslations](/method/messages.togglePeerTranslations.md) | Show or hide the [real-time chat translation popup](/api/translation.md) for a certain chat |
| [channels.toggleAutotranslation](/method/channels.toggleAutotranslation.md) | Toggle autotranslation in a channel, for all users: see [here »](/api/translation.md#autotranslation-for-channels) for more info. |

### Working with [message views and read metrics &raquo;](/api/views.md)

| Name | Description |
| --- | --- |
| [messages.reportReadMetrics](/method/messages.reportReadMetrics.md) | Report viewport read metrics for visible messages, indicating how long each message stayed in the chat viewport, see [here »](/api/views.md#read-metrics) for more info on the full flow. |
| [messages.reportMusicListen](/method/messages.reportMusicListen.md) | Report the listening duration of a music track (audio document without the `voice` flag), see [here »](/api/views.md#music-listens) for more info on the full flow. |

### Working with [paid media](/api/paid-media.md)

| Name | Description |
| --- | --- |
| [messages.getExtendedMedia](/method/messages.getExtendedMedia.md) | Fetch updated information about [paid media, see here »](/api/paid-media.md) for the full flow.\
\
This method will return an array of [updateMessageExtendedMedia](/constructor/updateMessageExtendedMedia.md) updates, only for messages containing **already bought** paid media.  \
No information will be returned for messages containing not yet bought paid media. |

### Working with [paid messages](/api/paid-messages.md)

| Name | Description |
| --- | --- |
| [account.getPaidMessagesRevenue](/method/account.getPaidMessagesRevenue.md) | Get the number of stars we have received from the specified user thanks to [paid messages »](/api/paid-messages.md); the received amount will be equal to the sent amount multiplied by [stars\_paid\_message\_commission\_permille](/api/config.md#stars-paid-message-commission-permille) divided by 1000. |
| [account.toggleNoPaidMessagesException](/method/account.toggleNoPaidMessagesException.md) | Allow a user to send us messages without paying if [paid messages »](/api/paid-messages.md) are enabled. |
| [channels.updatePaidMessagesPrice](/method/channels.updatePaidMessagesPrice.md) | Enable or disable [paid messages »](/api/paid-messages.md) in this [supergroup](/api/channel.md) or [monoforum](/api/monoforum.md).\
\
Also used to [enable or disable monoforums aka direct messages in a channel](/api/monoforum.md).\
\
Note that passing the ID of the monoforum itself to `channel` will return a `CHANNEL_MONOFORUM_UNSUPPORTED` error: pass the ID of the associated channel to edit the settings of the associated monoforum, instead. |

### Working with [passkeys &raquo;](/api/passkeys.md)

| Name | Description |
| --- | --- |
| [auth.initPasskeyLogin](/method/auth.initPasskeyLogin.md) | Initialize login with a passkey over an unauthenticated connection, see [here »](/api/passkeys.md#logging-in-with-a-passkey) for more info. |
| [auth.finishPasskeyLogin](/method/auth.finishPasskeyLogin.md) | Complete login with a passkey over an unauthenticated connection, see [here »](/api/passkeys.md#logging-in-with-a-passkey) for more info.\
\
Must be sent to the user's native DC, as specified by the `user_handle` (`dcId:userId`) returned in the passkey assertion, see [here »](/api/passkeys.md#logging-in-with-a-passkey) for the full flow. |
| [account.initPasskeyRegistration](/method/account.initPasskeyRegistration.md) | Initialize passkey registration for the current account, see [here »](/api/passkeys.md#creating-a-passkey) for more info on the full flow. |
| [account.registerPasskey](/method/account.registerPasskey.md) | Complete passkey registration for the current account, see [here »](/api/passkeys.md#creating-a-passkey) for more info on the full flow. |
| [account.getPasskeys](/method/account.getPasskeys.md) | List the passkeys associated to the current account that can be used to log in, see [here »](/api/passkeys.md#list-passkeys) for more info on passkeys. |
| [account.deletePasskey](/method/account.deletePasskey.md) | Delete a passkey associated to the current account, see [here »](/api/passkeys.md#delete-passkeys) for more info. |

### Working with [prepared inline messages](/api/bots/inline.md#21-using-a-prepared-inline-message)

| Name | Description |
| --- | --- |
| [messages.savePreparedInlineMessage](/method/messages.savePreparedInlineMessage.md) | Save a [prepared inline message](/api/bots/inline.md#21-using-a-prepared-inline-message), to be shared by the user of the mini app using a [web\_app\_send\_prepared\_message event](/api/web-events.md#web-app-send-prepared-message) |
| [messages.getPreparedInlineMessage](/method/messages.getPreparedInlineMessage.md) | Obtain a [prepared inline message](/api/bots/inline.md#21-using-a-prepared-inline-message) generated by a [mini app](/api/bots/webapps.md): invoked when handling [web\_app\_send\_prepared\_message events](/api/web-events.md#web-app-send-prepared-message) |

### Working with [reaction notification settings&nbsp;&raquo;](/api/reactions.md#notifications-about-reactions)

| Name | Description |
| --- | --- |
| [account.getReactionsNotifySettings](/method/account.getReactionsNotifySettings.md) | Get the current [reaction notification settings »](/api/reactions.md#notifications-about-reactions). |
| [account.setReactionsNotifySettings](/method/account.setReactionsNotifySettings.md) | Change the [reaction notification settings »](/api/reactions.md#notifications-about-reactions). |

### Working with [saved message dialogs&nbsp;&raquo;](/api/saved-messages.md) or [monoforums &raquo;](/api/monoforum.md)

| Name | Description |
| --- | --- |
| [messages.getSavedDialogs](/method/messages.getSavedDialogs.md) | Returns the current [saved dialog list »](/api/saved-messages.md) or [monoforum topic list »](/api/monoforum.md). |
| [messages.getSavedHistory](/method/messages.getSavedHistory.md) | Fetch [saved messages »](/api/saved-messages.md) forwarded from a specific peer, or fetch messages from a [monoforum topic »](/api/monoforum.md). |
| [messages.deleteSavedHistory](/method/messages.deleteSavedHistory.md) | Deletes messages from a [monoforum topic »](/api/monoforum.md), or deletes messages forwarded from a specific peer to [saved messages »](/api/saved-messages.md). |
| [messages.getPinnedSavedDialogs](/method/messages.getPinnedSavedDialogs.md) | Get pinned [saved dialogs, see here »](/api/saved-messages.md) for more info. |
| [messages.toggleSavedDialogPin](/method/messages.toggleSavedDialogPin.md) | Pin or unpin a [saved message dialog »](/api/saved-messages.md). |
| [messages.reorderPinnedSavedDialogs](/method/messages.reorderPinnedSavedDialogs.md) | Reorder pinned [saved message dialogs »](/api/saved-messages.md). |
| [messages.getSavedDialogsByID](/method/messages.getSavedDialogsByID.md) | Obtain information about specific [saved message dialogs »](/api/saved-messages.md#saved-message-dialogs) or [monoforum topics »](/api/monoforum.md). |
| [messages.readSavedHistory](/method/messages.readSavedHistory.md) | Mark messages as read in a [monoforum topic »](/api/monoforum.md). |
| [channels.getMessageAuthor](/method/channels.getMessageAuthor.md) | Can only be invoked by non-bot admins of a [monoforum »](/api/monoforum.md), obtains the original sender of a message sent by other monoforum admins to the monoforum, on behalf of the channel associated to the monoforum. |

### Working with [saved message tags&nbsp;&raquo;](/api/saved-messages.md#tags)

| Name | Description |
| --- | --- |
| [messages.getSavedReactionTags](/method/messages.getSavedReactionTags.md) | Fetch the full list of [saved message tags](/api/saved-messages.md#tags) created by the user. |
| [messages.updateSavedReactionTag](/method/messages.updateSavedReactionTag.md) | Update the [description of a saved message tag »](/api/saved-messages.md#tags). |
| [messages.getDefaultTagReactions](/method/messages.getDefaultTagReactions.md) | Fetch a default recommended list of [saved message tag reactions](/api/saved-messages.md#tags). |

### Working with [secret chats](/api/end-to-end.md)

| Name | Description |
| --- | --- |
| [messages.setEncryptedTyping](/method/messages.setEncryptedTyping.md) | Send typing event by the current user to a secret chat. |
| [messages.readEncryptedHistory](/method/messages.readEncryptedHistory.md) | Marks message history within a secret chat as read. |
| [messages.acceptEncryption](/method/messages.acceptEncryption.md) | Confirms creation of a secret chat |
| [messages.discardEncryption](/method/messages.discardEncryption.md) | Cancels a request for creation and/or delete info on secret chat. |
| [messages.requestEncryption](/method/messages.requestEncryption.md) | Sends a request to start a secret chat to the user. |
| [messages.sendEncrypted](/method/messages.sendEncrypted.md) | Sends a text message to a secret chat. |
| [messages.sendEncryptedFile](/method/messages.sendEncryptedFile.md) | Sends a message with a file attachment to a secret chat |
| [messages.sendEncryptedService](/method/messages.sendEncryptedService.md) | Sends a service message to a secret chat. |
| [messages.getDhConfig](/method/messages.getDhConfig.md) | Returns configuration parameters for Diffie-Hellman key generation. Can also return a random sequence of bytes of required length. |
| [messages.receivedQueue](/method/messages.receivedQueue.md) | Confirms receipt of messages in a secret chat by client, cancels push notifications.  \
The method returns a list of **random\_id**s of messages for which push notifications were cancelled. |

### Working with [sponsored messages and sponsored peers](/api/sponsored-messages.md)

| Name | Description |
| --- | --- |
| [channels.restrictSponsoredMessages](/method/channels.restrictSponsoredMessages.md) | Disable ads on the specified channel, for all users.\
\
Available only after reaching at least the [boost level »](/api/boost.md) specified in the [`channel_restrict_sponsored_level_min` »](/api/config.md#channel-restrict-sponsored-level-min) config parameter. |
| [account.toggleSponsoredMessages](/method/account.toggleSponsoredMessages.md) | Disable or re-enable Telegram ads for the current [Premium](/api/premium.md) account.\
\
Useful for business owners that may want to launch and view their own Telegram ads via the [Telegram ad platform »](https://ads.telegram.org). |
| [messages.viewSponsoredMessage](/method/messages.viewSponsoredMessage.md) | Mark a specific [sponsored message »](/api/sponsored-messages.md) as read |
| [messages.clickSponsoredMessage](/method/messages.clickSponsoredMessage.md) | Informs the server that the user has interacted with a sponsored message in [one of the ways listed here »](/api/sponsored-messages.md#clicking-on-sponsored-messages). |
| [messages.reportSponsoredMessage](/method/messages.reportSponsoredMessage.md) | Report a [sponsored message »](/api/sponsored-messages.md), see [here »](/api/sponsored-messages.md#reporting-sponsored-messages) for more info on the full flow. |
| [messages.getSponsoredMessages](/method/messages.getSponsoredMessages.md) | Get a list of [sponsored messages for a peer, see here »](/api/sponsored-messages.md) for more info. |
| [contacts.getSponsoredPeers](/method/contacts.getSponsoredPeers.md) | Obtain a list of sponsored peer search results for a given query |

### Working with [statistics](/api/stats.md)

| Name | Description |
| --- | --- |
| [stats.loadAsyncGraph](/method/stats.loadAsyncGraph.md) | Load [channel statistics graph](/api/stats.md) asynchronously |
| [stats.getBroadcastStats](/method/stats.getBroadcastStats.md) | Get [channel statistics](/api/stats.md) |
| [stats.getMessagePublicForwards](/method/stats.getMessagePublicForwards.md) | Obtains a list of messages, indicating to which other public channels was a channel message forwarded.  \
Will return a list of [messages](/constructor/message.md) with `peer_id` equal to the public channel to which this message was forwarded. |
| [stats.getMegagroupStats](/method/stats.getMegagroupStats.md) | Get [supergroup statistics](/api/stats.md) |
| [stats.getMessageStats](/method/stats.getMessageStats.md) | Get [message statistics](/api/stats.md) |
| [stats.getStoryStats](/method/stats.getStoryStats.md) | Get [statistics](/api/stats.md) for a certain [story](/api/stories.md). |
| [stats.getStoryPublicForwards](/method/stats.getStoryPublicForwards.md) | Obtain forwards of a [story](/api/stories.md) as a message to public chats and reposts by public channels. |
| [stats.getPollStats](/method/stats.getPollStats.md) | Get [statistics](/api/stats.md#poll-statistics) for a poll sent in a message. |

### Working with [stickers&nbsp;&raquo;](/api/stickers.md)

| Name | Description |
| --- | --- |
| [messages.getOldFeaturedStickers](/method/messages.getOldFeaturedStickers.md) | Method for fetching previously featured stickers |
| [messages.toggleStickerSets](/method/messages.toggleStickerSets.md) | Apply changes to multiple stickersets |
| [stickers.suggestShortName](/method/stickers.suggestShortName.md) | Suggests a short name for a given stickerpack name |
| [stickers.replaceSticker](/method/stickers.replaceSticker.md) | Replace a sticker in a [stickerset »](/api/stickers.md). |
| [stickers.checkShortName](/method/stickers.checkShortName.md) | Check whether the given short name is available |
| [stickers.setStickerSetThumb](/method/stickers.setStickerSetThumb.md) | Set stickerset thumbnail |
| [stickers.addStickerToSet](/method/stickers.addStickerToSet.md) | Add a sticker to a stickerset. The sticker set must have been created by the current user/bot. |
| [stickers.changeStickerPosition](/method/stickers.changeStickerPosition.md) | Changes the absolute position of a sticker in the set to which it belongs. The sticker set must have been created by the current user/bot. |
| [stickers.createStickerSet](/method/stickers.createStickerSet.md) | Create a stickerset. |
| [stickers.changeSticker](/method/stickers.changeSticker.md) | Update the keywords, emojis or [mask coordinates](/api/stickers.md#mask-stickers) of a sticker. |
| [stickers.renameStickerSet](/method/stickers.renameStickerSet.md) | Renames a stickerset. |
| [stickers.deleteStickerSet](/method/stickers.deleteStickerSet.md) | Deletes a stickerset we created. |
| [messages.getMyStickers](/method/messages.getMyStickers.md) | Fetch all [stickersets »](/api/stickers.md) owned by the current user. |
| [stickers.removeStickerFromSet](/method/stickers.removeStickerFromSet.md) | Remove a sticker from the set where it belongs. The sticker set must have been created by the current user/bot. |
| [messages.clearRecentStickers](/method/messages.clearRecentStickers.md) | Clear recent stickers |
| [messages.faveSticker](/method/messages.faveSticker.md) | Mark or unmark a sticker as favorite |
| [messages.getAllStickers](/method/messages.getAllStickers.md) | Get all installed stickers |
| [messages.getArchivedStickers](/method/messages.getArchivedStickers.md) | Get all archived stickers |
| [messages.getAttachedStickers](/method/messages.getAttachedStickers.md) | Get stickers attached to a photo or video |
| [messages.getFavedStickers](/method/messages.getFavedStickers.md) | Get faved stickers |
| [messages.getFeaturedStickers](/method/messages.getFeaturedStickers.md) | Get featured stickers |
| [messages.getMaskStickers](/method/messages.getMaskStickers.md) | Get installed mask stickers |
| [messages.getRecentStickers](/method/messages.getRecentStickers.md) | Get recent stickers |
| [messages.getStickerSet](/method/messages.getStickerSet.md) | Get info about a stickerset |
| [messages.getStickers](/method/messages.getStickers.md) | Get stickers by emoji |
| [messages.saveRecentSticker](/method/messages.saveRecentSticker.md) | Add/remove sticker from recent stickers list |
| [messages.installStickerSet](/method/messages.installStickerSet.md) | Install a stickerset |
| [messages.readFeaturedStickers](/method/messages.readFeaturedStickers.md) | Mark new featured stickers as read |
| [messages.reorderStickerSets](/method/messages.reorderStickerSets.md) | Reorder installed stickersets |
| [messages.searchStickerSets](/method/messages.searchStickerSets.md) | Search for stickersets |
| [messages.searchStickers](/method/messages.searchStickers.md) | Search for stickers using AI-powered keyword search |
| [messages.searchEmojiStickerSets](/method/messages.searchEmojiStickerSets.md) | Search for [custom emoji stickersets »](/api/custom-emoji.md) |
| [messages.uninstallStickerSet](/method/messages.uninstallStickerSet.md) | Uninstall a stickerset |

### Working with [stories](/api/stories.md)

| Name | Description |
| --- | --- |
| [stories.searchPosts](/method/stories.searchPosts.md) | Globally search for [stories](/api/stories.md) using a hashtag or a [location media area](/api/stories.md#location-tags), see [here »](/api/stories.md#searching-stories) for more info on the full flow.\
\
Either `hashtag` **or** `area` **must** be set when invoking the method. |
| [stories.canSendStory](/method/stories.canSendStory.md) | Check whether we can post stories as the specified peer. |
| [stories.sendStory](/method/stories.sendStory.md) | Uploads a [Telegram Story](/api/stories.md).\
\
May also be used in a [business connection](/api/bots/connected-business-bots.md), *not* by wrapping the query in [invokeWithBusinessConnection »](/method/invokeWithBusinessConnection.md), but rather by specifying the ID of a controlled business user in `peer`. |
| [stories.editStory](/method/stories.editStory.md) | Edit an uploaded [story](/api/stories.md)\
\
May also be used in a [business connection](/api/bots/connected-business-bots.md), *not* by wrapping the query in [invokeWithBusinessConnection »](/method/invokeWithBusinessConnection.md), but rather by specifying the ID of a controlled business user in `peer`: in this context, the method can only be used to edit stories posted by the same business bot on behalf of the user with [stories.sendStory](/method/stories.sendStory.md). |
| [stories.deleteStories](/method/stories.deleteStories.md) | Deletes some posted [stories](/api/stories.md). |
| [stories.togglePinnedToTop](/method/stories.togglePinnedToTop.md) | Pin some stories to the top of the profile, see [here »](/api/stories.md#pinned-or-archived-stories) for more info. |
| [stories.togglePinned](/method/stories.togglePinned.md) | Pin or unpin one or more stories |
| [stories.getAllStories](/method/stories.getAllStories.md) | Fetch the List of active (or active and hidden) stories, see [here »](/api/stories.md#watching-stories) for more info on watching stories. |
| [stories.getPinnedStories](/method/stories.getPinnedStories.md) | Fetch the [stories](/api/stories.md#pinned-or-archived-stories) pinned on a peer's profile. |
| [stories.getStoriesArchive](/method/stories.getStoriesArchive.md) | Fetch the [story archive »](/api/stories.md#pinned-or-archived-stories) of a peer we control. |
| [stories.getStoriesByID](/method/stories.getStoriesByID.md) | Obtain full info about a set of [stories](/api/stories.md) by their IDs. |
| [stories.toggleAllStoriesHidden](/method/stories.toggleAllStoriesHidden.md) | Hide the active stories of a specific peer, preventing them from being displayed on the action bar on the homescreen. |
| [stories.readStories](/method/stories.readStories.md) | Mark all stories up to a certain ID as read, for a given peer; will emit an [updateReadStories](/constructor/updateReadStories.md) update to all logged-in sessions. |
| [stories.incrementStoryViews](/method/stories.incrementStoryViews.md) | Increment the view counter of one or more stories. |
| [stories.getStoryViewsList](/method/stories.getStoryViewsList.md) | Obtain the list of users that have viewed a specific [story we posted](/api/stories.md) |
| [stories.getStoryReactionsList](/method/stories.getStoryReactionsList.md) | Get the [reaction](/api/reactions.md) and interaction list of a [story](/api/stories.md) posted to a channel, along with the sender of each reaction.\
\
Can only be used by channel admins. |
| [stories.getStoriesViews](/method/stories.getStoriesViews.md) | Obtain info about the view count, forward count, reactions and recent viewers of one or more [stories](/api/stories.md). |
| [stories.exportStoryLink](/method/stories.exportStoryLink.md) | Generate a [story deep link](/api/links.md#story-links) for a specific story |
| [stories.report](/method/stories.report.md) | Report a story. |
| [stories.activateStealthMode](/method/stories.activateStealthMode.md) | Activates [stories stealth mode](/api/stories.md#stealth-mode), see [here »](/api/stories.md#stealth-mode) for more info.\
\
Will return an [updateStoriesStealthMode](/constructor/updateStoriesStealthMode.md). |
| [stories.getPeerStories](/method/stories.getPeerStories.md) | Fetch the full active [story list](/api/stories.md#watching-stories) of a specific peer. |
| [stories.getAllReadPeerStories](/method/stories.getAllReadPeerStories.md) | Obtain the latest read story ID for all peers when first logging in, returned as a list of [updateReadStories](/constructor/updateReadStories.md) updates, see [here »](/api/stories.md#watching-stories) for more info. |
| [stories.getPeerMaxIDs](/method/stories.getPeerMaxIDs.md) | Get compact [active story summaries »](/api/stories.md#recent-story-summaries) for a set of peers. |
| [stories.getChatsToSend](/method/stories.getChatsToSend.md) | Obtain a list of channels where the user can post [stories](/api/stories.md) |
| [stories.togglePeerStoriesHidden](/method/stories.togglePeerStoriesHidden.md) | Hide the active stories of a user, preventing them from being displayed on the action bar on the homescreen, see [here »](/api/stories.md#hiding-stories-of-other-users) for more info. |
| [stories.sendReaction](/method/stories.sendReaction.md) | React to a story. |
| [stories.createAlbum](/method/stories.createAlbum.md) | Creates a [story album](/api/stories.md#story-albums). |
| [stories.updateAlbum](/method/stories.updateAlbum.md) | Rename a [story albums »](/api/stories.md#story-albums), or add, delete or reorder stories in it. |
| [stories.reorderAlbums](/method/stories.reorderAlbums.md) | Reorder [story albums on a profile »](/api/stories.md#story-albums). |
| [stories.deleteAlbum](/method/stories.deleteAlbum.md) | Delete a [story album](/api/stories.md#story-albums). |
| [stories.getAlbums](/method/stories.getAlbums.md) | Get [story albums](/api/stories.md#story-albums) created by a peer. |
| [stories.getAlbumStories](/method/stories.getAlbumStories.md) | Get stories in a [story album »](/api/stories.md#story-albums). |

### Working with [suggested posts](/api/suggested-posts.md)

| Name | Description |
| --- | --- |
| [messages.toggleSuggestedPostApproval](/method/messages.toggleSuggestedPostApproval.md) | Approve or reject a [suggested post »](/api/suggested-posts.md). |

### Working with [telegram passport](/passport.md)

| Name | Description |
| --- | --- |
| [account.sendVerifyPhoneCode](/method/account.sendVerifyPhoneCode.md) | Send the verification phone code for telegram [passport](/passport.md). |
| [account.verifyPhone](/method/account.verifyPhone.md) | Verify a phone number for telegram [passport](/passport.md). |
| [account.acceptAuthorization](/method/account.acceptAuthorization.md) | Sends a Telegram Passport authorization form, effectively sharing data with the service |
| [account.getAuthorizationForm](/method/account.getAuthorizationForm.md) | Returns a Telegram Passport authorization form for sharing data with a service |
| [account.getAuthorizations](/method/account.getAuthorizations.md) | Get logged-in sessions |
| [account.deleteSecureValue](/method/account.deleteSecureValue.md) | Delete stored [Telegram Passport](/passport.md) documents, [for more info see the passport docs »](/passport/encryption.md#encryption) |
| [account.getAllSecureValues](/method/account.getAllSecureValues.md) | Get all saved [Telegram Passport](/passport.md) documents, [for more info see the passport docs »](/passport/encryption.md#encryption) |
| [account.getSecureValue](/method/account.getSecureValue.md) | Get saved [Telegram Passport](/passport.md) document, [for more info see the passport docs »](/passport/encryption.md#encryption) |
| [account.saveSecureValue](/method/account.saveSecureValue.md) | Securely save [Telegram Passport](/passport.md) document, [for more info see the passport docs »](/passport/encryption.md#encryption) |
| [help.getPassportConfig](/method/help.getPassportConfig.md) | Get [passport](/passport.md) configuration |
| [users.setSecureValueErrors](/method/users.setSecureValueErrors.md) | Notify the user that the sent [passport](/passport.md) data contains some errors The user will not be able to re-submit their Passport data to you until the errors are fixed (the contents of the field for which you returned the error must change).\
\
Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues. |

### Working with [temporary profile links](/api/links.md#temporary-profile-links)

| Name | Description |
| --- | --- |
| [contacts.exportContactToken](/method/contacts.exportContactToken.md) | Generates a [temporary profile link](/api/links.md#temporary-profile-links) for the currently logged-in user. |
| [contacts.importContactToken](/method/contacts.importContactToken.md) | Obtain user info from a [temporary profile link](/api/links.md#temporary-profile-links). |

### Working with [todo lists](/api/todo.md)

| Name | Description |
| --- | --- |
| [messages.toggleTodoCompleted](/method/messages.toggleTodoCompleted.md) | Mark one or more items of a [todo list »](/api/todo.md) as completed or not completed. |
| [messages.appendTodoList](/method/messages.appendTodoList.md) | Appends one or more items to a [todo list »](/api/todo.md). |

### Working with [updates](/api/updates.md)

| Name | Description |
| --- | --- |
| [updates.getChannelDifference](/method/updates.getChannelDifference.md) | Returns the difference between the current state of updates of a certain channel and transmitted. |
| [updates.getDifference](/method/updates.getDifference.md) | Get new [updates](/api/updates.md). |
| [updates.getState](/method/updates.getState.md) | Returns a current state of updates. |

### Working with [user/channel profiles](/api/profile.md)

| Name | Description |
| --- | --- |
| [channels.setMainProfileTab](/method/channels.setMainProfileTab.md) | Changes the main profile tab of a channel, see [here »](/api/profile.md#tabs) for more info. |
| [account.setMainProfileTab](/method/account.setMainProfileTab.md) | Changes the main profile tab of the current user, see [here »](/api/profile.md#tabs) for more info. |
| [photos.deletePhotos](/method/photos.deletePhotos.md) | Deletes profile photos. The method returns a list of successfully deleted photo IDs. |
| [photos.getUserPhotos](/method/photos.getUserPhotos.md) | Returns the list of user photos. |
| [photos.updateProfilePhoto](/method/photos.updateProfilePhoto.md) | Installs a previously uploaded photo as a profile photo. |
| [photos.uploadProfilePhoto](/method/photos.uploadProfilePhoto.md) | Updates current user profile photo.\
\
The `file`, `video` and `video_emoji_markup` flags are mutually exclusive. |
| [photos.uploadContactProfilePhoto](/method/photos.uploadContactProfilePhoto.md) | Upload a custom profile picture for a contact, or suggest a new profile picture to a contact.\
\
The `file`, `video` and `video_emoji_markup` flags are mutually exclusive. |
| [account.updateProfile](/method/account.updateProfile.md) | Updates user profile. |
| [account.updateBirthday](/method/account.updateBirthday.md) | Update our [birthday, see here »](/api/profile.md#birthday) for more info. |
| [contacts.updateContactNote](/method/contacts.updateContactNote.md) | Update the private note associated to a contact; see [here »](/api/contacts.md#private-notes-for-contacts) for more info. |
| [contacts.getBirthdays](/method/contacts.getBirthdays.md) | Fetch all users with birthdays that fall within +1/-1 days, relative to the current day: this method should be invoked by clients every 6-8 hours, and if the result is non-empty, it should be used to appropriately update locally cached birthday information in [user](/constructor/user.md).`birthday`.\
\
[See here »](/api/profile.md#birthday) for more info. |
| [account.updatePersonalChannel](/method/account.updatePersonalChannel.md) | Associate (or remove) a personal [channel »](/api/channel.md), that will be listed on our personal [profile page »](/api/profile.md#personal-channel).\
\
Changing it will emit an [updateUser](/constructor/updateUser.md) update. |
| [account.updateStatus](/method/account.updateStatus.md) | Updates online user status. |
| [users.getSavedMusic](/method/users.getSavedMusic.md) | Get songs [pinned to the user's profile, see here »](/api/profile.md#music) for more info. |
| [users.getSavedMusicByID](/method/users.getSavedMusicByID.md) | Check if the passed songs are still pinned to the user's profile, or refresh the file references of songs pinned on a user's profile [see here »](/api/profile.md#music) for more info. |
| [account.saveMusic](/method/account.saveMusic.md) | Adds or removes a song from the current user's profile [see here »](/api/profile.md#music) for more info on the music tab of the profile page. |
| [account.getSavedMusicIds](/method/account.getSavedMusicIds.md) | Fetch the full list of only the IDs of [songs currently added to the profile, see here »](/api/profile.md#music) for more info. |
| [users.suggestBirthday](/method/users.suggestBirthday.md) | Suggest a birthday to another user, see [here »](/api/profile.md#birthday) for more info on birthdays in the API. |
| [messages.getPersonalChannelHistory](/method/messages.getPersonalChannelHistory.md) | Fetch the message history of a user's [personal channel »](/api/profile.md#personal-channel). |

### Working with [voice message transcription](/api/transcribe.md)

| Name | Description |
| --- | --- |
| [messages.transcribeAudio](/method/messages.transcribeAudio.md) | [Transcribe voice message](/api/transcribe.md) |
| [messages.rateTranscribedAudio](/method/messages.rateTranscribedAudio.md) | Rate [transcribed voice message](/api/transcribe.md) |

### Working with [wallpapers&nbsp;&raquo;](/api/wallpapers.md)

| Name | Description |
| --- | --- |
| [account.getMultiWallPapers](/method/account.getMultiWallPapers.md) | Get info about multiple [wallpapers](/api/wallpapers.md) |
| [account.getWallPaper](/method/account.getWallPaper.md) | Get info about a certain [wallpaper](/api/wallpapers.md) |
| [account.getWallPapers](/method/account.getWallPapers.md) | Returns a list of available [wallpapers](/api/wallpapers.md). |
| [account.installWallPaper](/method/account.installWallPaper.md) | Install [wallpaper](/api/wallpapers.md) |
| [account.resetWallPapers](/method/account.resetWallPapers.md) | Delete all installed [wallpapers](/api/wallpapers.md), reverting to the default wallpaper set. |
| [account.saveWallPaper](/method/account.saveWallPaper.md) | Install/uninstall [wallpaper](/api/wallpapers.md) |
| [account.uploadWallPaper](/method/account.uploadWallPaper.md) | Create and upload a new [wallpaper](/api/wallpapers.md) |
| [messages.setChatWallPaper](/method/messages.setChatWallPaper.md) | Set a custom [wallpaper »](/api/wallpapers.md) in a specific private chat with another user. |

### Working with bot admin right suggestions

| Name | Description |
| --- | --- |
| [bots.setBotBroadcastDefaultAdminRights](/method/bots.setBotBroadcastDefaultAdminRights.md) | Set the default [suggested admin rights](/api/rights.md#suggested-bot-rights) for bots being added as admins to channels, see [here for more info on how to handle them »](/api/rights.md#suggested-bot-rights). |
| [bots.setBotGroupDefaultAdminRights](/method/bots.setBotGroupDefaultAdminRights.md) | Set the default [suggested admin rights](/api/rights.md#suggested-bot-rights) for bots being added as admins to groups, see [here for more info on how to handle them »](/api/rights.md#suggested-bot-rights). |

### Working with bot inline queries and callback buttons

| Name | Description |
| --- | --- |
| [messages.getInlineBotResults](/method/messages.getInlineBotResults.md) | Query an inline bot |
| [messages.setInlineBotResults](/method/messages.setInlineBotResults.md) | Answer an inline query, for bots only |
| [messages.sendInlineBotResult](/method/messages.sendInlineBotResult.md) | Send a result obtained using [messages.getInlineBotResults](/method/messages.getInlineBotResults.md). |
| [messages.getBotCallbackAnswer](/method/messages.getBotCallbackAnswer.md) | Press an inline callback button and get a callback answer from the bot |
| [messages.setBotCallbackAnswer](/method/messages.setBotCallbackAnswer.md) | Set the callback answer to a user button press (bots only) |
| [messages.editInlineBotMessage](/method/messages.editInlineBotMessage.md) | Edit an inline bot message |
| [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md) | Send one or more chosen peers, as requested by a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button. |
| [bots.requestWebViewButton](/method/bots.requestWebViewButton.md) | Bots may use this method to prepare a peer request button for a [Mini App](/api/bots/webapps.md), see [here »](/api/bots/buttons.md#requesting-peers-via-mini-apps) for more info. |
| [bots.getRequestedWebViewButton](/method/bots.getRequestedWebViewButton.md) | Fetch the peer request button a bot prepared for a [Mini App](/api/bots/webapps.md) with [bots.requestWebViewButton](/method/bots.requestWebViewButton.md), invoked when the Mini App emits a [`web_app_request_chat`](/api/web-events.md#web-app-request-chat) event, see [here »](/api/bots/buttons.md#requesting-peers-via-mini-apps) for more info. |

### Working with bots

| Name | Description |
| --- | --- |
| [bots.resetBotCommands](/method/bots.resetBotCommands.md) | Clear bot commands for the specified bot scope and language code |
| [bots.getBotCommands](/method/bots.getBotCommands.md) | Obtain a list of bot commands for the specified bot scope and language code |
| [bots.setBotCommands](/method/bots.setBotCommands.md) | Set bot command list |
| [bots.setBotInfo](/method/bots.setBotInfo.md) | Set localized name, about text and description of a bot (or of the current account, if called by a bot). |
| [bots.getBotInfo](/method/bots.getBotInfo.md) | Get localized name, about text and description of a bot (or of the current account, if called by a bot). |
| [bots.getAdminedBots](/method/bots.getAdminedBots.md) | Get a list of bots owned by the current user |

### Working with bots (internal bot API use)

| Name | Description |
| --- | --- |
| [bots.answerWebhookJSONQuery](/method/bots.answerWebhookJSONQuery.md) | Answers a custom query; for bots only |
| [bots.sendCustomRequest](/method/bots.sendCustomRequest.md) | Sends a custom request; for bots only |
| [help.setBotUpdatesStatus](/method/help.setBotUpdatesStatus.md) | Informs the server about the number of pending bot updates if they haven't been processed for a long time; for bots only |

### Working with contacts and [top peers](/api/top-rating.md)

| Name | Description |
| --- | --- |
| [account.getContactSignUpNotification](/method/account.getContactSignUpNotification.md) | Whether the user will receive notifications when contacts sign up |
| [account.setContactSignUpNotification](/method/account.setContactSignUpNotification.md) | Toggle contact sign up notifications |
| [contacts.acceptContact](/method/contacts.acceptContact.md) | If the [add contact action bar is active](/api/action-bar.md#add-contact), add that user as contact |
| [contacts.addContact](/method/contacts.addContact.md) | Add an existing telegram user as contact.\
\
Use [contacts.importContacts](/method/contacts.importContacts.md) to add contacts by phone number, without knowing their Telegram ID. |
| [contacts.block](/method/contacts.block.md) | Adds a peer to a blocklist, see [here »](/api/block.md) for more info. |
| [contacts.deleteByPhones](/method/contacts.deleteByPhones.md) | Delete contacts by phone number |
| [contacts.deleteContacts](/method/contacts.deleteContacts.md) | Deletes several contacts from the list. |
| [contacts.getBlocked](/method/contacts.getBlocked.md) | Returns the list of blocked users. |
| [contacts.getContactIDs](/method/contacts.getContactIDs.md) | Get the telegram IDs of all contacts.  \
Returns an array of Telegram user IDs for all contacts (0 if a contact does not have an associated Telegram account or have hidden their account using privacy settings). |
| [contacts.getContacts](/method/contacts.getContacts.md) | Returns the current user's contact list. |
| [contacts.getLocated](/method/contacts.getLocated.md) | Get users and geochats near you, see [here »](/api/nearby.md) for more info. |
| [contacts.getSaved](/method/contacts.getSaved.md) | Get all contacts, requires a [takeout session, see here » for more info](/api/takeout.md). |
| [contacts.getStatuses](/method/contacts.getStatuses.md) | Use this method to obtain the online statuses of all contacts with an accessible Telegram account. |
| [contacts.getTopPeers](/method/contacts.getTopPeers.md) | Get most used peers |
| [contacts.importContacts](/method/contacts.importContacts.md) | Imports contacts: saves a full list on the server, adds already registered contacts to the contact list, returns added contacts and their info.\
\
Use [contacts.addContact](/method/contacts.addContact.md) to add Telegram contacts without actually using their phone number. |
| [contacts.resetSaved](/method/contacts.resetSaved.md) | Removes all contacts without an associated Telegram account. |
| [contacts.resetTopPeerRating](/method/contacts.resetTopPeerRating.md) | Reset [rating](/api/top-rating.md) of top peer |
| [contacts.search](/method/contacts.search.md) | Returns users found by username substring. |
| [contacts.toggleTopPeers](/method/contacts.toggleTopPeers.md) | Enable/disable [top peers](/api/top-rating.md) |
| [contacts.unblock](/method/contacts.unblock.md) | Deletes a peer from a blocklist, see [here »](/api/block.md) for more info. |
| [contacts.setBlocked](/method/contacts.setBlocked.md) | Replace the contents of an entire [blocklist, see here for more info »](/api/block.md). |
| [contacts.editCloseFriends](/method/contacts.editCloseFriends.md) | Edit the [close friends list, see here »](/api/privacy.md) for more info. |

### Working with dialogs

| Name | Description |
| --- | --- |
| [messages.getDialogs](/method/messages.getDialogs.md) | Returns the current user dialog list. |
| [messages.getPeerDialogs](/method/messages.getPeerDialogs.md) | Get dialog info of specified peers |
| [messages.getPinnedDialogs](/method/messages.getPinnedDialogs.md) | Get pinned dialogs |
| [messages.toggleDialogPin](/method/messages.toggleDialogPin.md) | Pin/unpin a dialog |
| [messages.reorderPinnedDialogs](/method/messages.reorderPinnedDialogs.md) | Reorder pinned dialogs |
| [messages.getDialogUnreadMarks](/method/messages.getDialogUnreadMarks.md) | Get dialogs manually marked as unread |
| [messages.markDialogUnread](/method/messages.markDialogUnread.md) | Manually mark dialog as unread |
| [messages.getPeerSettings](/method/messages.getPeerSettings.md) | Get peer settings |
| [messages.hidePeerSettingsBar](/method/messages.hidePeerSettingsBar.md) | Should be called after the user hides the [report spam/add as contact bar](/api/action-bar.md) of a new chat, effectively prevents the user from executing the actions specified in the [action bar »](/api/action-bar.md). |
| [messages.getOnlines](/method/messages.getOnlines.md) | Get count of online users in a chat |
| [messages.sendScreenshotNotification](/method/messages.sendScreenshotNotification.md) | Notify the other user in a private chat that a screenshot of the chat was taken |
| [messages.setTyping](/method/messages.setTyping.md) | Sends a current user typing event (see [SendMessageAction](/type/SendMessageAction.md) for all event types) to a conversation partner or group. |
| [messages.setHistoryTTL](/method/messages.setHistoryTTL.md) | Set maximum Time-To-Live of all messages in the specified chat |

### Working with imported chats

| Name | Description |
| --- | --- |
| [messages.uploadImportedMedia](/method/messages.uploadImportedMedia.md) | Upload a media file associated with an [imported chat, click here for more info »](/api/import.md). |
| [messages.startHistoryImport](/method/messages.startHistoryImport.md) | Complete the [history import process](/api/import.md), importing all messages into the chat.  \
To be called only after initializing the import with [messages.initHistoryImport](/method/messages.initHistoryImport.md) and uploading all files using [messages.uploadImportedMedia](/method/messages.uploadImportedMedia.md). |
| [messages.checkHistoryImportPeer](/method/messages.checkHistoryImportPeer.md) | Check whether chat history exported from another chat app can be [imported into a specific Telegram chat, click here for more info »](/api/import.md).\
\
If the check succeeds, and no RPC errors are returned, a [messages.CheckedHistoryImportPeer](/type/messages.CheckedHistoryImportPeer.md) constructor will be returned, with a confirmation text to be shown to the user, before actually initializing the import. |
| [messages.checkHistoryImport](/method/messages.checkHistoryImport.md) | Obtains information about a chat export file, generated by a foreign chat app, [click here for more info about imported chats »](/api/import.md). |
| [messages.initHistoryImport](/method/messages.initHistoryImport.md) | Import chat history from a foreign chat app into a specific Telegram chat, [click here for more info about imported chats »](/api/import.md). |

### Working with localization packs

| Name | Description |
| --- | --- |
| [langpack.getDifference](/method/langpack.getDifference.md) | Get new strings in language pack |
| [langpack.getLangPack](/method/langpack.getLangPack.md) | Get localization pack strings |
| [langpack.getLanguage](/method/langpack.getLanguage.md) | Get information about a language in a localization pack |
| [langpack.getLanguages](/method/langpack.getLanguages.md) | Get information about all languages in a localization pack |
| [langpack.getStrings](/method/langpack.getStrings.md) | Get strings from a language pack |

### Working with media autodownload settings

| Name | Description |
| --- | --- |
| [account.getAutoDownloadSettings](/method/account.getAutoDownloadSettings.md) | Get media autodownload settings |
| [account.saveAutoDownloadSettings](/method/account.saveAutoDownloadSettings.md) | Change media autodownload settings |

### Working with media autosave settings

| Name | Description |
| --- | --- |
| [account.getAutoSaveSettings](/method/account.getAutoSaveSettings.md) | Get autosave settings |
| [account.saveAutoSaveSettings](/method/account.saveAutoSaveSettings.md) | Modify autosave settings |
| [account.deleteAutoSaveExceptions](/method/account.deleteAutoSaveExceptions.md) | Clear all peer-specific autosave settings. |

### Working with message [threads](/api/threads.md)

| Name | Description |
| --- | --- |
| [messages.getReplies](/method/messages.getReplies.md) | Get messages in a reply thread |
| [contacts.blockFromReplies](/method/contacts.blockFromReplies.md) | Stop getting notifications about [discussion replies](/api/discussion.md) of a certain user in `@replies` |
| [messages.getDiscussionMessage](/method/messages.getDiscussionMessage.md) | Get [discussion message](/api/threads.md) from the [associated discussion group](/api/discussion.md) of a channel to show it on top of the comment section, without actually joining the group |
| [messages.readDiscussion](/method/messages.readDiscussion.md) | Mark a [thread](/api/threads.md) as read |

### Working with messages

| Name | Description |
| --- | --- |
| [messages.deleteHistory](/method/messages.deleteHistory.md) | Deletes communication history. |
| [messages.deleteMessages](/method/messages.deleteMessages.md) | Deletes messages by their identifiers. |
| [messages.editMessage](/method/messages.editMessage.md) | Edit message |
| [messages.forwardMessages](/method/messages.forwardMessages.md) | Forwards messages by their IDs. |
| [messages.getHistory](/method/messages.getHistory.md) | Returns the message history in a peer.\
\
Results are ordered by date (descending). |
| [messages.getSearchResultsPositions](/method/messages.getSearchResultsPositions.md) | Returns sparse positions of messages of the specified type in the chat to be used for shared media scroll implementation.\
\
Returns the results in reverse chronological order (i.e., in order of decreasing message\_id). |
| [messages.getMessageEditData](/method/messages.getMessageEditData.md) | Find out if a media message's caption can be edited |
| [messages.getOutboxReadDate](/method/messages.getOutboxReadDate.md) | Get the exact read date of one of our messages, sent to a private chat with another user.\
\
Can be only done for private outgoing messages not older than [appConfig.pm\_read\_date\_expire\_period »](/api/config.md#pm-read-date-expire-period).\
\
If the `peer`'s [userFull](/constructor/userFull.md).`read_dates_private` flag is set, we will not be able to fetch the exact read date of messages we send to them, and a `USER_PRIVACY_RESTRICTED` RPC error will be emitted.  \
The exact read date of messages might still be unavailable for other reasons, see [here »](/constructor/globalPrivacySettings.md) for more info.  \
To set [userFull](/constructor/userFull.md).`read_dates_private` for ourselves invoke [account.setGlobalPrivacySettings](/method/account.setGlobalPrivacySettings.md), setting the `settings.hide_read_marks` flag. |
| [messages.getMessages](/method/messages.getMessages.md) | Returns the list of messages by their IDs. |
| [messages.getMessagesViews](/method/messages.getMessagesViews.md) | Get and increase the view counter of a message sent or forwarded from a [channel](/api/channel.md) |
| [messages.getRecentLocations](/method/messages.getRecentLocations.md) | Get all recent [live locations](/api/live-location.md) sent to a specific chat: returns up to 1 location message ([messageMediaGeoLive](/constructor/messageMediaGeoLive.md)) per chat participant. |
| [messages.getSearchCounters](/method/messages.getSearchCounters.md) | Get the number of results that would be found by a [messages.search](/method/messages.search.md) call with the same parameters |
| [messages.getUnreadMentions](/method/messages.getUnreadMentions.md) | Get unread messages where we were mentioned |
| [messages.readHistory](/method/messages.readHistory.md) | Marks message history as read. |
| [messages.readMentions](/method/messages.readMentions.md) | Mark mentions as read; can be used in [forums](/api/forum.md) but **cannot** be used in [monoforums](/api/monoforum.md). |
| [messages.readMessageContents](/method/messages.readMessageContents.md) | Notifies the sender about the recipient having listened a voice message or watched a video, emitting an [updateReadMessagesContents](/constructor/updateReadMessagesContents.md). |
| [messages.receivedMessages](/method/messages.receivedMessages.md) | Confirms receipt of messages by a client, cancels PUSH-notification sending. |
| [messages.search](/method/messages.search.md) | Search for messages. |
| [messages.getSearchResultsCalendar](/method/messages.getSearchResultsCalendar.md) | Returns information about the next messages of the specified type in the chat split by days.\
\
Returns the results in reverse chronological order.  \
Can return partial results for the last returned day. |
| [messages.searchGlobal](/method/messages.searchGlobal.md) | Search for messages and peers globally |
| [messages.searchSentMedia](/method/messages.searchSentMedia.md) | View and search recently sent media.  \
This method does not support pagination. |
| [channels.checkSearchPostsFlood](/method/channels.checkSearchPostsFlood.md) | Check if the specified [global post search »](/api/search.md#posts-tab) requires payment. |
| [channels.searchPosts](/method/channels.searchPosts.md) | Globally search for posts from public [channels »](/api/channel.md) (*including* those we aren't a member of) containing either a specific hashtag, *or* a full text query.\
\
Exactly one of `query` and `hashtag` must be set. |
| [messages.sendMedia](/method/messages.sendMedia.md) | Send a media |
| [messages.sendMessage](/method/messages.sendMessage.md) | Sends a message to a chat |
| [messages.sendMultiMedia](/method/messages.sendMultiMedia.md) | Send an [album or grouped media](/api/files.md#albums-grouped-media) |
| [messages.updatePinnedMessage](/method/messages.updatePinnedMessage.md) | Pin a message |
| [messages.unpinAllMessages](/method/messages.unpinAllMessages.md) | [Unpin](/api/pin.md) all pinned messages |
| [messages.saveDefaultSendAs](/method/messages.saveDefaultSendAs.md) | Change the default peer that should be used when sending messages, reactions, poll votes to a specific group |
| [channels.getSendAs](/method/channels.getSendAs.md) | Obtains a list of peers that can be displayed as the sender in a specific context. With `for_live_stories`, returns peers that may author [live story in-call messages »](/api/group-calls.md#in-call-messages). |

### Working with notification settings

| Name | Description |
| --- | --- |
| [account.registerDevice](/method/account.registerDevice.md) | Register device to receive [PUSH notifications](/api/push-updates.md) |
| [account.unregisterDevice](/method/account.unregisterDevice.md) | Deletes a device by its token, stops sending PUSH-notifications to it. |
| [account.updateDeviceLocked](/method/account.updateDeviceLocked.md) | When client-side passcode lock feature is enabled, will not show message texts in incoming [PUSH notifications](/api/push-updates.md). |
| [account.getNotifyExceptions](/method/account.getNotifyExceptions.md) | Returns list of chats with non-default notification settings |
| [account.getNotifySettings](/method/account.getNotifySettings.md) | Gets current notification settings for a given user/group, from all users/all groups. |
| [account.updateNotifySettings](/method/account.updateNotifySettings.md) | Edits notification settings from a given user/group, from all users/all groups. |
| [account.resetNotifySettings](/method/account.resetNotifySettings.md) | Resets all notification settings from users and groups. |

### Working with notification sounds

| Name | Description |
| --- | --- |
| [account.getSavedRingtones](/method/account.getSavedRingtones.md) | Fetch saved notification sounds |
| [account.saveRingtone](/method/account.saveRingtone.md) | Save or remove saved notification sound.\
\
If the notification sound is already in MP3 format, [account.savedRingtone](/constructor/account.savedRingtone.md) will be returned.  \
Otherwise, it will be automatically converted and a [account.savedRingtoneConverted](/constructor/account.savedRingtoneConverted.md) will be returned, containing a new [document](/constructor/document.md) object that should be used to refer to the ringtone from now on (ie when deleting it using the `unsave` parameter, or when downloading it). |
| [account.uploadRingtone](/method/account.uploadRingtone.md) | Upload notification sound, use [account.saveRingtone](/method/account.saveRingtone.md) to convert it and add it to the list of saved notification sounds. |

### Working with other users

| Name | Description |
| --- | --- |
| [users.getFullUser](/method/users.getFullUser.md) | Returns extended user info by ID. |
| [users.getUsers](/method/users.getUsers.md) | Returns basic user info according to their identifiers. |
| [contacts.resolvePhone](/method/contacts.resolvePhone.md) | Resolve a phone number to get user info, if their privacy settings allow it.\
\
Make sure to implement client-side ratelimiting/debounce for this method, allowing at most 1 call every 3 seconds. |

### Working with payments

| Name | Description |
| --- | --- |
| [payments.getSavedInfo](/method/payments.getSavedInfo.md) | Get saved payment information |
| [payments.clearSavedInfo](/method/payments.clearSavedInfo.md) | Clear saved payment information |
| [payments.getPaymentForm](/method/payments.getPaymentForm.md) | Get a payment form |
| [payments.validateRequestedInfo](/method/payments.validateRequestedInfo.md) | Submit requested order information for validation |
| [messages.setBotShippingResults](/method/messages.setBotShippingResults.md) | If you sent an invoice requesting a shipping address and the parameter is\_flexible was specified, the bot will receive an [updateBotShippingQuery](/constructor/updateBotShippingQuery.md) update. Use this method to reply to shipping queries. |
| [account.getTmpPassword](/method/account.getTmpPassword.md) | Get temporary payment password |
| [payments.sendPaymentForm](/method/payments.sendPaymentForm.md) | Send compiled payment form |
| [messages.setBotPrecheckoutResults](/method/messages.setBotPrecheckoutResults.md) | Once the user has confirmed their payment and shipping details, the bot receives an [updateBotPrecheckoutQuery](/constructor/updateBotPrecheckoutQuery.md) update.  \
Use this method to respond to such pre-checkout queries.  \
**Note**: Telegram must receive an answer within 10 seconds after the pre-checkout query was sent. |
| [payments.getPaymentReceipt](/method/payments.getPaymentReceipt.md) | Get payment receipt |
| [payments.exportInvoice](/method/payments.exportInvoice.md) | Generate an [invoice deep link](/api/links.md#invoice-links) |
| [payments.getBankCardData](/method/payments.getBankCardData.md) | Get info about a credit card |

### Working with polls

| Name | Description |
| --- | --- |
| [messages.getPollResults](/method/messages.getPollResults.md) | Get poll results |
| [messages.getPollVotes](/method/messages.getPollVotes.md) | Get poll results for non-anonymous polls |
| [messages.sendVote](/method/messages.sendVote.md) | Vote in a [poll](/constructor/poll.md)\
\
Starting from layer 159, the vote will be sent from the peer specified using [messages.saveDefaultSendAs](/method/messages.saveDefaultSendAs.md).\
\
Before voting, clients should check that the user is actually allowed to vote: voting is not possible if the poll is closed, if it is [subscriber-only »](/api/poll.md#subscriber-only-polls) and the user is not an eligible subscriber, or if it is [country-restricted »](/api/poll.md#country-restricted-polls) and the user's [`phone_country_iso2` »](/api/config.md#phone-country-iso2) is not in the poll's allowed country list. See [vote restrictions »](/api/poll.md#vote-restrictions) for the full list of conditions. |
| [messages.addPollAnswer](/method/messages.addPollAnswer.md) | Add an answer option to an [open-answer poll »](/api/poll.md#open-answer-polls) |
| [messages.deletePollAnswer](/method/messages.deletePollAnswer.md) | Remove an answer option from an [open-answer poll »](/api/poll.md#open-answer-polls) |
| [messages.getUnreadPollVotes](/method/messages.getUnreadPollVotes.md) | Get messages containing polls with [unread votes »](/api/poll.md#unread-poll-votes) |
| [messages.readPollVotes](/method/messages.readPollVotes.md) | Mark all [unread poll votes »](/api/poll.md#unread-poll-votes) in a chat as read |

### Working with scheduled messages

| Name | Description |
| --- | --- |
| [messages.sendScheduledMessages](/method/messages.sendScheduledMessages.md) | Send scheduled messages right away |
| [messages.getScheduledHistory](/method/messages.getScheduledHistory.md) | Get scheduled messages |
| [messages.deleteScheduledMessages](/method/messages.deleteScheduledMessages.md) | Delete scheduled messages |
| [messages.getScheduledMessages](/method/messages.getScheduledMessages.md) | Get scheduled messages |

### Working with sensitive content (NSFW)

| Name | Description |
| --- | --- |
| [account.getContentSettings](/method/account.getContentSettings.md) | Get sensitive content settings |
| [account.setContentSettings](/method/account.setContentSettings.md) | Set sensitive content settings (for viewing or hiding NSFW content) |

### Working with the [AI features &raquo;](/api/ai.md)

| Name | Description |
| --- | --- |
| [messages.composeMessageWithAI](/method/messages.composeMessageWithAI.md) | Invokes telegram's AI Editor that can translate, transform, fixup and/or emojify your message in a number of different ways, privately powered by [Cocoon](https://cocoon.org), see [here »](/api/ai.md#compose-messages) for more info!\
\
All of the modes specified below can be combined. |
| [messages.summarizeText](/method/messages.summarizeText.md) | Summarize the contents of a message with AI, see [here »](/api/ai.md#summarize-messages) for more info.\
\
Clients should use [message](/constructor/message.md).`summary_from_language` as a hint for showing a summarization button; its absence does not forbid invoking this method. |
| [aicompose.createTone](/method/aicompose.createTone.md) | Create a new custom [AI composer tone »](/api/ai.md#ai-compose-tones). |
| [aicompose.updateTone](/method/aicompose.updateTone.md) | Edit a custom [AI composer tone »](/api/ai.md#ai-compose-tones) previously created by the current user. Only the fields whose flag is set will be modified. |
| [aicompose.saveTone](/method/aicompose.saveTone.md) | Install or uninstall an [AI composer tone »](/api/ai.md#ai-compose-tones), adding it to or removing it from the list of saved tones of the current user.\
\
Non-[Premium](/api/premium.md) users may install up to [aicompose\_tone\_saved\_limit\_default »](/api/config.md#aicompose-tone-saved-limit-default) tones, [Premium](/api/premium.md) users up to [aicompose\_tone\_saved\_limit\_premium »](/api/config.md#aicompose-tone-saved-limit-premium) tones. |
| [aicompose.deleteTone](/method/aicompose.deleteTone.md) | Permanently delete a custom [AI composer tone »](/api/ai.md#ai-compose-tones) created by the current user. |
| [aicompose.getTone](/method/aicompose.getTone.md) | Fetch information about a single [AI composer tone »](/api/ai.md#ai-compose-tones), for example to resolve a shared tone deep link. |
| [aicompose.getTones](/method/aicompose.getTones.md) | Fetch the list of saved [AI composer tones »](/api/ai.md#ai-compose-tones) of the current user. |
| [aicompose.getToneExample](/method/aicompose.getToneExample.md) | Fetch an example showing how an [AI composer tone »](/api/ai.md#ai-compose-tones) rephrases a sample message, used as a preview in the tone picker. |

### Working with the [Telegram Business intro&nbsp;&raquo;](/api/business.md#business-introduction)

| Name | Description |
| --- | --- |
| [account.updateBusinessIntro](/method/account.updateBusinessIntro.md) | Set or remove the [Telegram Business introduction »](/api/business.md#business-introduction). |

### Working with the [Telegram Business location](/api/business.md#location)

| Name | Description |
| --- | --- |
| [account.updateBusinessLocation](/method/account.updateBusinessLocation.md) | [Businesses »](/api/business.md#location) may advertise their location using this method, see [here »](/api/business.md#location) for more info.\
\
To remove business location information invoke the method without setting any of the parameters. |

### Working with the [attachment menu&nbsp;&raquo;](/bots/webapps.md#launching-mini-apps-from-the-attachment-menu) of [mini bot apps&nbsp;&raquo;](/bots/webapps.md)

| Name | Description |
| --- | --- |
| [messages.getAttachMenuBots](/method/messages.getAttachMenuBots.md) | Returns installed attachment menu [bot mini apps »](/api/bots/attach.md) |
| [messages.getAttachMenuBot](/method/messages.getAttachMenuBot.md) | Returns attachment menu entry for a [bot mini app that can be launched from the attachment menu »](/api/bots/attach.md) |
| [messages.toggleBotInAttachMenu](/method/messages.toggleBotInAttachMenu.md) | Enable or disable [web bot attachment menu »](/api/bots/attach.md) |

### Working with the [native anti-spam system](/api/antispam.md)

| Name | Description |
| --- | --- |
| [channels.toggleAntiSpam](/method/channels.toggleAntiSpam.md) | Enable or disable the [native antispam system](/api/antispam.md). |
| [channels.reportAntiSpamFalsePositive](/method/channels.reportAntiSpamFalsePositive.md) | Report a [native antispam](/api/antispam.md) false positive |

### Working with the [privacy settings](/api/privacy.md)

| Name | Description |
| --- | --- |
| [account.getPrivacy](/method/account.getPrivacy.md) | Get privacy settings of current account |
| [account.setPrivacy](/method/account.setPrivacy.md) | Change privacy settings of current account |
| [account.setGlobalPrivacySettings](/method/account.setGlobalPrivacySettings.md) | Set global privacy settings |
| [account.getGlobalPrivacySettings](/method/account.getGlobalPrivacySettings.md) | Get global privacy settings |
| [messages.setDefaultHistoryTTL](/method/messages.setDefaultHistoryTTL.md) | Changes the default value of the Time-To-Live setting, applied to all new chats. |
| [messages.getDefaultHistoryTTL](/method/messages.getDefaultHistoryTTL.md) | Gets the default value of the Time-To-Live setting, applied to all new chats. |
| [users.getRequirementsToContact](/method/users.getRequirementsToContact.md) | Check whether we can write to the specified users, used to implement bulk checks for [Premium-only messages »](/api/privacy.md#require-premium-for-new-non-contact-users) and [paid messages »](/api/paid-messages.md).\
\
For each input user, returns a [RequirementToContact](/type/RequirementToContact.md) constructor (at the same offset in the vector) containing requirements to contact them. |

### Working with the [takeout API, see here &raquo; for more info](/api/takeout.md).

| Name | Description |
| --- | --- |
| [account.initTakeoutSession](/method/account.initTakeoutSession.md) | Initialize a [takeout session, see here » for more info](/api/takeout.md). |
| [account.finishTakeoutSession](/method/account.finishTakeoutSession.md) | Terminate a [takeout session, see here » for more info](/api/takeout.md). |
| [messages.getSplitRanges](/method/messages.getSplitRanges.md) | Get message ranges for saving the user's chat history |
| [channels.getLeftChannels](/method/channels.getLeftChannels.md) | Get a list of [channels/supergroups](/api/channel.md) we left, requires a [takeout session, see here » for more info](/api/takeout.md). |
| [invokeWithMessagesRange](/method/invokeWithMessagesRange.md) | Invoke with the given message range |
| [invokeWithTakeout](/method/invokeWithTakeout.md) | Invoke a method within a [takeout session, see here » for more info](/api/takeout.md). |

### Working with the bot [menu button&nbsp;&raquo;](/bots/webapps.md#launching-mini-apps-from-the-menu-button)

| Name | Description |
| --- | --- |
| [bots.setBotMenuButton](/method/bots.setBotMenuButton.md) | Sets the [menu button action »](/api/bots/menu.md) for a given user or for all users |
| [bots.getBotMenuButton](/method/bots.getBotMenuButton.md) | Gets the menu button action for a given user or for all users, previously set using [bots.setBotMenuButton](/method/bots.setBotMenuButton.md); users can see this information in the [botInfo](/constructor/botInfo.md) constructor. |

### Working with the user's account

| Name | Description |
| --- | --- |
| [account.changePhone](/method/account.changePhone.md) | Change the phone number of the current account |
| [account.confirmPhone](/method/account.confirmPhone.md) | Confirm a phone number to cancel account deletion, for more info [click here »](/api/account-deletion.md) |
| [account.deleteAccount](/method/account.deleteAccount.md) | Delete the user's account from the telegram servers.\
\
Can also be used to delete the account of a user that provided the login code, but forgot the 2FA password and no recovery method is configured, see [here »](/api/srp.md#password-recovery) for more info on password recovery, and [here »](/api/account-deletion.md) for more info on account deletion. |
| [account.getAccountTTL](/method/account.getAccountTTL.md) | Get days to live of account |
| [account.resetAuthorization](/method/account.resetAuthorization.md) | Log out an active [authorized session](/api/auth.md) by its hash |
| [account.sendChangePhoneCode](/method/account.sendChangePhoneCode.md) | Verify a new phone number to associate to the current account |
| [account.sendConfirmPhoneCode](/method/account.sendConfirmPhoneCode.md) | Send confirmation code to cancel account deletion, for more info [click here »](/api/account-deletion.md) |
| [account.setAccountTTL](/method/account.setAccountTTL.md) | Set account self-destruction period |

### Working with timezones

| Name | Description |
| --- | --- |
| [help.getTimezonesList](/method/help.getTimezonesList.md) | Returns timezone information that may be used elsewhere in the API, such as to set [Telegram Business opening hours »](/api/business.md#opening-hours). |

### Working with usernames

| Name | Description |
| --- | --- |
| [channels.checkUsername](/method/channels.checkUsername.md) | Check if a username is free and can be assigned to a channel/supergroup |
| [channels.updateUsername](/method/channels.updateUsername.md) | Change or remove the username of a supergroup/channel |
| [account.updateUsername](/method/account.updateUsername.md) | Changes username for the current user. |
| [account.checkUsername](/method/account.checkUsername.md) | Validates a username and checks availability. |
| [contacts.resolveUsername](/method/contacts.resolveUsername.md) | Resolve a @username to get peer info |

