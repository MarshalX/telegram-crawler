# Pattern matching

Some methods require the client to verify if the data obtained from an external source matches a certain pattern.

For example, when [requesting a login code](/api/auth.md), if the chosen verification method is a [flash call](/constructor/auth.sentCodeTypeFlashCall.md), it is required that the phone number (which is the login code) matches the specified pattern.

Same with [email verification codes](/constructor/account.sentEmailCode.md).

In all cases, the pattern is a string of the same length as the string to verify: and matching is as simple as checking if all chars in the source string are the same as in the pattern string.
Some chars in the pattern string may be censored using an asterisk `*`, in this case any char in the source string is considered valid.

The pattern string can also be a single asterisk, in this case all patterns are considered valid.

If the source string is a phone number, it has to be sanitized first to include only the following chars: `0123456789`.

Example implementation: [telegram for android](https://github.com/DrKLO/Telegram/blob/68d51749c4fcbaffa584829f23936565df55e08b/TMessagesProj/src/main/java/org/telegram/messenger/AndroidUtilities.java#L3108).
