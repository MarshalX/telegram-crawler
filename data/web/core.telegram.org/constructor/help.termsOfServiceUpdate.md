# help.termsOfServiceUpdate

Info about an update of telegram's terms of service. If the terms of service are declined, then the [account.deleteAccount](/method/account.deleteAccount.md) method should be called with the reason "Decline ToS update"

```tl
help.termsOfServiceUpdate#28ecf961 expires:int terms_of_service:help.TermsOfService = help.TermsOfServiceUpdate;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **expires** | [int](/type/int.md) | New TOS updates will have to be queried using [help.getTermsOfServiceUpdate](/method/help.getTermsOfServiceUpdate.md) in `expires` seconds |
| **terms\_of\_service** | [help.TermsOfService](/type/help.TermsOfService.md) | New terms of service |

### Type
[help.TermsOfServiceUpdate](/type/help.TermsOfServiceUpdate.md)

### Related pages

#### [help.getTermsOfServiceUpdate](/method/help.getTermsOfServiceUpdate.md)
Look for updates of telegram's terms of service

#### [account.deleteAccount](/method/account.deleteAccount.md)
Delete the user's account from the telegram servers.

Can also be used to delete the account of a user that provided the login code, but forgot the 2FA password and no recovery method is configured, see [here »](/api/srp.md#password-recovery) for more info on password recovery, and [here »](/api/account-deletion.md) for more info on account deletion.