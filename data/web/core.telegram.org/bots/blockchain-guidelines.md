# Blockchain Guidelines

### Terms of Service
The [Terms of Service for Bot Developers](https://telegram.org/tos/bot-developers) allow for mini apps to [integrate](https://telegram.org/tos/bot-developers#7-blockchain-integration) blockchain technology, provided that the developer's implementation:

- Exclusively uses the [TON Blockchain](https://ton.org/) for the creation and distribution of cryptocurrency tokens or blockchain assets.
- Only interfaces with cryptocurrency wallets connected by the [TON Connect](https://docs.ton.org/v3/guidelines/ton-connect/overview) SDK.
- Does not promote cryptocurrency wallets, unless such wallets are based on the TON blockchain, exclusively use [TON Connect](https://docs.ton.org/v3/guidelines/ton-connect/overview) for interactions with apps, and primarily provide services related to the TON blockchain.

> **Important:** To maintain uninterrupted access for Telegram users to their **Mini Apps**, developers must ensure compliance with clauses [7.1–7.4 of the Terms of Service](https://telegram.org/tos/bot-developers#7-blockchain-integration) by **February 1, 2025**.

>**Existing Mini Apps** operating **on other blockchains** must transition to TON by **February 21, 2025**, including bridging existing assets, migrating smart contracts, and exclusively utilizing TON Connect.

> [Clause 7.1](https://telegram.org/tos/bot-developers#9-compliance-with-laws) of the Terms of Service **applies immediately to all new blockchain-based initiatives**, including the issuance of **new** blockchain-based assets. All assets issued or distributed on or after **January 21, 2025** must adhere to it.

#### Bots Without Mini Apps

For clarity, these rules **only apply** to [Mini Apps](/bots/webapps.md) and their bots on the Telegram platform. Regular Telegram bots that **do not** have a Mini App component are exempt.

### Mini App Guidelines
To assist developers in modifying their apps, the following examples illustrate mini-app functionalities that are permitted or prohibited under [section 7](https://telegram.org/tos/bot-developers#7-blockchain-integration) of the [Terms of Service](https://telegram.org/tos/bot-developers), provided they also comply with all other sections, including [section 9](https://telegram.org/tos/bot-developers#9-compliance-with-laws).

------

#### Blockchain Assets
**Permitted:**

Issuing or distributing cryptocurrency assets on the TON blockchain.

- TON-based tokens from games or collectible NFTs are permitted.

**Not Permitted:**

Issuing or distributing cryptocurrency assets or NFTs on other blockchains.

- Tokens and NFTs on other blockchains like Ethereum, BNB, etc. are not permitted.

-------

#### TON Connect
**Permitted:**
Using TON Connect to interact with a user's wallet.

- Using TON Connect to sign a transaction within the app.
- Connecting a multichain wallet via TON Connect to sign a transaction.

Allowing other wallet connection protocols that are intended for bridging assets.

- Connecting a Bitcoin wallet to bridge BTC from the Bitcoin network to the TON blockchain.

**Not Permitted:**
Using other wallet connection protocols outside of bridging scenarios.

- Connecting an Ethereum wallet to sign a transaction within the app.
- Modifying or forking the TON Connect SDK.
- Limiting wallet selection in TON Connect unless based on feature availability.

------

#### Promotion of Wallets and Tokens
**Permitted:**
Promoting TON-based wallets in mini apps.

- Rewarding users for connecting a TON-based wallet that primarily provides asset management for the TON Blockchain, such as Wallet, Tonkeeper, or MyTonWallet.

Promoting TON-based tokens in the official channel or community of a mini app.

- Informing users of an upcoming launch of a new token on the TON blockchain.
- Directing users to a licensed exchange where your TON-based token is listed.

**Not Permitted:**
Promoting other blockchains, cryptoassets, wallets or multichain wallets based on blockchains other than TON.

- Rewarding users for connecting a wallet from blockchains such as Ethereum, Bitcoin, etc.
- Directing or linking users to external platforms or websites where cryptoassets not based on TON are promoted or utilized.

Promoting tokens from other blockchains in the official channel or community of a mini app.

- Informing users of an upcoming launch of a new token on another blockchain.
- Advertising alternate versions of TON-based tokens that are based on other blockchains.

------

### Wallet Guidelines
Below are additional examples, specifically for mini apps that primarily function as a cryptocurrency wallet.

#### Asset Management
**Permitted:**
Allowing users to manage assets from other blockchains within the wallet interface.

- Multichain **TON** wallets that let users send and receive Bitcoin, Ethereum and other cryptocurrencies.
- Multichain **TON** wallets that offer staking programs for tokens such as Bitcoin, Ethereum and other cryptocurrencies.
- Multichain **TON** wallets that enable cross-chain token swaps within their app interface.

**Not Permitted:**
Allowing users to manage assets from other blockchains by connecting to external apps.

- Utilizing an embedded catalog of apps from other blockchains within a multichain wallet.
- Linking to external apps for managing assets from other blockchains.

-------

#### Wallet Connection
**Permitted:**
Connecting wallets via TON Connect.

- A multichain wallet that interacts with apps only through TON Connect.

Offering no ability to connect a wallet.

- A wallet that does not offer connections to other apps.
- A multichain wallet that allows users to stake Ethereum within the wallet, without leaving the mini app.

**Not Permitted:**
Signing transactions on other blockchains in apps outside of [allowed bridging scenarios](#ton-connect).

- A wallet with an embedded catalog of apps that use other blockchains.
- A wallet that integrates other wallet connection protocols.
