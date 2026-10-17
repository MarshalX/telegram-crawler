# Telegram Cracking Contest Description

[**« Back to Contest Announcement**](https://telegram.org/blog/cryptocontest)

>The current round of the contest is over. [**Go to results »**](https://telegram.org/blog/cryptocontest-ends)

In this contest you assume the role of a malicious entity in control of Telegram's servers. Your goal is to extract sensitive data (a secret email and password) from a conversation between two peers — Paul and Nick. They are represented by two virtual users that communicate via [Secret Chats](/api/end-to-end.md) in Telegram.

Paul and Nick are both using clients that perform all the checks from [Telegram Security Guidelines](/mtproto/security_guidelines.md) and compare their key visualizations over an independent channel as soon as a new Secret Chat is established. If any of these checks fails, they stop accepting messages in that Secret Chat. You control the entire process by sending commands to the Telegram user `@CryptoContest`, used as an interface for this contest. This enables contestants to try CPA, KPA, MITM and other kinds of active attacks and data tampering.

### Protocol

The protocol used by Paul and Nick to establish Secret Сhats and exchange messages is identical to the one used for [Secret Chats](/api/end-to-end.md) in Telegram. Since we assume that the attacker is already in full control of the Telegram servers, basic MTProto encryption is bypassed altogether. In order to further simplify the task for contestants, we have removed irrelevant parameters, such as user_id and random_id.

The following [TL](/mtproto/TL.md) scheme is used to establish Secret Chats in this contest: 

	contest.dhConfig#01e00a51 g:int p:64*[int] random:64*[int] = contest.DhConfig;
	contest.requestEncryption#3a73a74c g_a:64*[int] = contest.Message;
	contest.acceptEncryption#068e4342 g_b:64*[int] fingerprint:int = contest.Message;
	contest.encryptedMessage#11a6d4b1 id:long message:string = contest.Message;
	---functions---
	contest.getDhConfig#369ee1a6 = contest.DhConfig;

For exchange of encrypted messages (see [documentation](/api/end-to-end.md#sending-and-receiving-messages-in-a-secret-chat)), the up-to-date layer 17 scheme with [sequence numbers](/api/end-to-end/seq_no.md) is used, but with plain text message support only.

Each plaintext message is first created as a layer 17 [decryptedMessage](/constructor/decryptedMessage.md), then embedded in a [decryptedMessageLayer](/constructor/decryptedMessageLayer.md) and encrypted as explained in the [Secret Chat documentation](/api/end-to-end.md#serialization-and-encryption-of-outgoing-messages). For the purpose of this contest, it is the result of this encryption *(ciphertext)* that is exchanged between the parties. 

Notice that sending messages in an actual Telegram Secret Chat involves further embedding of that *ciphertext* into an API call and an additional layer of [MTProto](/mtproto.md) encryption for client-server interaction. This step is omitted here, since we assume the attacker to be in control of the Telegram servers, not just of the communication lines between the clients and Telegram servers.

### Interface

To access the interface, find the Telegram user `@CryptoContest` using the Global Search by username in any of the [Telegram apps](https://telegram.org/apps). This is a special bot we created for this contest. You can control communication between Paul and Nick by sending [particularly formed](#commands) text messages to this bot and processing automatically generated answers to these messages (you may find the unofficial [Linux CLI](https://github.com/vysheng/tg) convenient for mass automated queries).

You can create as many parallel Secret Chats between Paul and Nick as you like using the bot — each of them will have a separate *session_id*. All data is represented in hexadecimal format, with the exception of the *session_id*.

###Commands

Below, **A** stands for the creator of the Secret Chat, **B** stands for the second party, **S** — the Telegram Server.

Each Secret Chat session in this contest is divided in two phases: 

* [Creating a Secret Chat](#1-creating-a-secret-chat)
* [Sending Encrypted Message](#2-sending-text-messages)

#####1. Creating a Secret Chat

In order to create a new Secret Chat, six messages need to be exchanged:

| **Source** | **Destination** | **Message**                   |
|-----|-----|---------------------------|
|  A  |  S  | contest.getDhConfig       | 
|  S  |  A  | contest.DhConfig          |
|  A  |  B  | contest.requestEncryption |
|  B  |  S  | contest.getDhConfig       |
|  S  |  B  | contest.DhConfig          |
|  B  |  A  | contest.acceptEncryption  |

To create a Secret Chat in this contest:

* Send the **START** command to the user `@CryptoContest` in Telegram. You'll get the __getDhConfig__ query, sent by A to the Server, and the answer that the server would normally send to A. You shall also receive the new *session_id* as the first 32-bit integer. All further messages related to this particular session (Secret Chat instance) must be prefixed with this *session_id* in decimal form.
* After that, use the **PASS** command to pass the server's answer to A or **ANSWER bytes** to send a different answer instead. **Bytes** is represented by a string of an even number of hexadecimal digits. You'll receive the __requestEncryption__ query as the result. 
* After that, use the **PASS** command to pass this query to B or **ANSWER bytes** to arbitrarily change it. You'll receive B's __getDhConfig__ to the server as the result.
* As before, you can use either **PASS** or **ANSWER bytes**. You'll receive __acceptEncryption__ as the result.
* As before, you can use either **PASS** or **ANSWER bytes**. You'll receive "Ok" as the result.

You will receive an error text as the result after any of these steps in case the participating clients perceive that something went wrong. This can happen if a security check is failed, or in the case that the first 128 bits of the SHA-1 of the newly created encryption key don't match on both parties' clients when this stage is completed (this corresponds to Paul and Nick comparing the key visualizations for the Secret Chat in their Telegram apps).

If you obtain such an error, the session is failed and can no longer be used. You'll have to start new session. Note that the time to complete this phase is limited. Each step should not take longer than one hour, otherwise the Secret Chat will get cancelled.

Example:

	START
	15 a6e19e36 510ae00103000000c71caeb9c6b1c9048e6c522f70f13f73980d40238e3e21c14934d037563d930f48198a0aa7c14058229493d22530f4dbfa336f6e0ac925139543aed44cce7c3720fd51f69458705ac68cd4fe6b6b13abdc9746512969328454f18faf8c595f642477fe96bb2a941d5bcd1d4ac8cc49880708fa9b378e3c4f3a9060bee67cf9a4a4a695811051907e162753b56b0f6b410dba74d8a84b2a14b3144e0ef1284754fd17ed950d5965b4b9dd46582db1178d169c6bc465b0d6ff9ca3928fef5b9ae4e418fc15e83ebea0f87fa9ff5eed70050ded2849f47bf959d956850ce929851f0d8115f635b105ee2e4e15d04b2454bf6f4fadf034b10403119cd8e3b92fcc5b202d33053c2340fd84dd024e8012277e9c6442ad7cd09fe85955c13196e2d32861ad0d8f8139ce5870f1c3563fbff77428632897352abd91cd0a6497a0f64a33d87cd8b53470cf1bc6a052bba7d0121623e9611c0de83ffeb63b7d15831a70187093373cb20df5613bdfab12a54bbc6fff94598d95a8dcdb1374631b021e77c350261bca9ffc16c59b19d3041bee011a20b06fc9806d633b6b9cdd79cbb8b02fe8ef9dde29b6d31d80b030c69d67d6fc4a7edb33ffab532d085796cf3e7635fd42ee72ea24840082186fd40c3c45cf0acef886533d4de7468f88942a662d302928470aa8704529180a6aec2f877398efb91893cc9b549e5123d7269adfe7b6ee
	15 PASS
	15 4ca7733a1a7823b420111d8e86e3fe9a7cff9fc611ce339d6999fc3053973ef6c8276af841b53547fdebdcb057cbad16aff6178be3fb8747889937dec082c984227c974a19232b85ad85ef457521fcf17d5f697a17b7e62952306f0ed086deb1ebcff0c8a32787789fe7afaa4035c2d0e07c10db46c0df6930a1729d3607fb035154e90c02036318862c5a9537e87a55bc656e3fc53db08f41a07f834e4917ebaaace1214409ffb44c5a806a9cb4def209bfb8ab2e59f1cb6257e422f37dfab288170bdc5666e6a63d1b0447a7b935ad3bdac8d53f64278d433b45925c84dc60214473363d57a30e31324d9b3cc42fb56d375aac2d9d1af16331ad3a92b43a9d64e47813
	15 PASS
	15 a6e19e36 510ae00103000000c71caeb9c6b1c9048e6c522f70f13f73980d40238e3e21c14934d037563d930f48198a0aa7c14058229493d22530f4dbfa336f6e0ac925139543aed44cce7c3720fd51f69458705ac68cd4fe6b6b13abdc9746512969328454f18faf8c595f642477fe96bb2a941d5bcd1d4ac8cc49880708fa9b378e3c4f3a9060bee67cf9a4a4a695811051907e162753b56b0f6b410dba74d8a84b2a14b3144e0ef1284754fd17ed950d5965b4b9dd46582db1178d169c6bc465b0d6ff9ca3928fef5b9ae4e418fc15e83ebea0f87fa9ff5eed70050ded2849f47bf959d956850ce929851f0d8115f635b105ee2e4e15d04b2454bf6f4fadf034b10403119cd8e3b92fcc5b1ccd9c752428f0bca9ac9060bb85b8f90acb9374cd8d5a03110635f591a18f131cb7cc204407efec0687a8b77ba6c4e6732c35174e79e36aaa7fa6ab685257710e074065961ce1b16d21fed8a83cd95efcc4be7111cd33b5704fe759dfab21fc3e8aaa86d44609dc0b073354f8160c653f4fbde3ae7c28c87c3667e0797fac24b32e5c1a870cd898b2a9c517709bb0b8e4ee875ff857868eb56548e6dc993f198fd78c8a77cf997ed42a15f99a9b6265c7cf9bedc7580a11514047b881f717b233f3570ec21856bd2b9791e4c43b125e9260ac3fd48b9a10de5f9d5080e53d92d194adb796766684d905cca35e691fab0c76d6b5f49242f81eb92fcc8adc5a64
	15 ANSWER 510ae00103000000c71caeb9c6b1c9048e6c522f70f13f73980d40238e3e21c14934d037563d930f48198a0aa7c14058229493d22530f4dbfa336f6e0ac925139543aed44cce7c3720fd51f69458705ac68cd4fe6b6b13abdc9746512969328454f18faf8c595f642477fe96bb2a941d5bcd1d4ac8cc49880708fa9b378e3c4f3a9060bee67cf9a4a4a695811051907e162753b56b0f6b410dba74d8a84b2a14b3144e0ef1284754fd17ed950d5965b4b9dd46582db1178d169c6bc465b0d6ff9ca3928fef5b9ae4e418fc15e83ebea0f87fa9ff5eed70050ded2849f47bf959d956850ce929851f0d8115f635b105ee2e4e15d04b2454bf6f4fadf034b10403119cd8e3b92fcc5b1ccd9c752428f0bca9ac9060bb85b8f90acb9374cd8d5a03110635f591a18f131cb7cc204407efec0687a8b77ba6c4e6732c35174e79e36aaa7fa6ab685257710e074065961ce1b16d21fed8a83cd95efcc4be7111cd33b5704fe759dfab21fc3e8aaa86d44609dc0b073354f8160c653f4fbde3ae7c28c87c3667e0797fac24b32e5c1a870cd898b2a9c517709bb0b8e4ee875ff857868eb56548e6dc993f198fd78c8a77cf997ed42a15f99a9b6265c7cf9bedc7580a11514047b881f717b233f3570ec21856bd2b9791e4c43b125e9260ac3fd48b9a10de5f9d5080e53d92d194adb796766684d905cca35e691fab0c76d6b5f49242f81eb92fcc8ad00000
	15 42438e06bbb424bba5fd95122ec2f206c9b502f1f6d4e4fdbf74ed2c946ad60abaefd6fbd6a08e3ef418709d15bc557ef5e486a51d1e304f6c1e943faad948fde4e6273c0cad0df07068ad028fb01dc0fd7221aeed6ed5dc510dbe4824939036b0f3a45e740b40cef86a32f0b73b20234efc41d573f3e14efc08b3f65e9f7be52d5b930de52d41c7aadc4e0e85dfcf3bb1dd2e9cdf94fc236082879aea27207415cb846a5d5969e619040416a7f0f708f56a5b340a8fd0be1a26bfdc3de365a950532d363b427d6d905af7534af574ae8afd3f47658de5da3fa02dd818a31523122ff53dd31ffd7aa22e53cbf2da7772a1589e9a242f28f9cb1130f54553fcb355b3398fc877b80b3ef2cc3d
	15 PASS
	15 Ok

#####2. Sending Text Messages

Once the Secret Chat has been established, you can use the following queries to make Paul and Nick exchange text messages inside the Secret Chat:

* **ASK \[A|B\]** -- asks A or B to send a random plaintext message to the other party. It is guaranteed that at least one of the first ten generated messages will contain the secret email and password that are the [goal](#objectives) of this contest. It is also guaranteed that apart from that, all messages will contain only dictionary English words, spaces, line breaks and punctuation marks. The result to this query is the ciphertext corresponding to the randomly generated plaintext.
* **TXT \[A|B\] bytes** -- asks A or B to encrypt **bytes** as the (plaintext) contents of a text message and send it to the other party. Note that **bytes** can be any byte sequence, not necessarily a valid UTF-8 sequence. The result to this query is the ciphertext corresponding to the given plaintext.
* **MSG \[A|B\] bytes** -- send a specified (ciphertext) message (for example, obtained as an answer to an **ASK** or **TXT** query) to A or B. You will receive 'Ok' if this message was decrypted successfully and accepted by the client, or 'Fail' otherwise.

Example:

	15 ASK A
	15 b1d4a6119278722b0309a8c1fee80000c877b80b3ef2cc3dc92104de4322d8ae374fbf38758091fe4c86bafffa792f7eb37d8431cf8f868319c3af005791b7c55f788e260b8fa6a96b6808d0d448abfdb49913160c5355ef2d4e439a676055e42de6b26dd7d0e06e3fb48981208449658aff63fd8262ef0669f8bb242ade401e1190d2f54f3896ac17c1b796cbe185d5b0166649d5bac25e4626c08c78527458fc7877ee2add14a8e7b1f9b56651b8264284aa2fd28de55f96bcec8075dd43bbc69f6c05c2428795e51a081e3995e4ede72d190d55d0b30d8215bf4ed13fde7c8f578993050280ec4a940e910eb182bd335e52e2a699d9b5
	15 MSG B b1d4a6119278722b0309a8c1fee80000c877b80b3ef2cc3dc92104de4322d8ae374fbf38758091fe4c86bafffa792f7eb37d8431cf8f868319c3af005791b7c55f788e260b8fa6a96b6808d0d448abfdb49913160c5355ef2d4e439a676055e42de6b26dd7d0e06e3fb48981208449658aff63fd8262ef0669f8bb242ade401e1190d2f54f3896ac17c1b796cbe185d5b0166649d5bac25e4626c08c78527458fc7877ee2add14a8e7b1f9b56651b8264284aa2fd28de55f96bcec8075dd43bbc69f6c05c2428795e51a081e3995e4ede72d190d55d0b30d8215bf4ed13fde7c8f578993050280ec4a940e910eb182bd335e52e2a699d9b0
	15 Fail
	15 MSG B b1d4a6119278722b0309a8c1fee80000c877b80b3ef2cc3dc92104de4322d8ae374fbf38758091fe4c86bafffa792f7eb37d8431cf8f868319c3af005791b7c55f788e260b8fa6a96b6808d0d448abfdb49913160c5355ef2d4e439a676055e42de6b26dd7d0e06e3fb48981208449658aff63fd8262ef0669f8bb242ade401e1190d2f54f3896ac17c1b796cbe185d5b0166649d5bac25e4626c08c78527458fc7877ee2add14a8e7b1f9b56651b8264284aa2fd28de55f96bcec8075dd43bbc69f6c05c2428795e51a081e3995e4ede72d190d55d0b30d8215bf4ed13fde7c8f578993050280ec4a940e910eb182bd335e52e2a699d9b5
	15 Ok
	15 TXT B abac
	15 b1d4a61101771d42f62323e6fe680000c877b80b3ef2cc3df751e68b935b083a6f5c15ba8d95b94388fc34453a1e7b9b20222402b7698be5dd8a6ff69a5141b01ca2488b0dada8f2b0e47980218f48912168ddd2cebd3b61b1edf2f557c7ec44768595ce1cb42a01f7c14dd4e6e6e7601cb17ab0b6d5a274
_______________
### Objectives
We are offering a **$300,000** reward to the first person to break Telegram's encryption protocol in this contest.

Your goal is to extract a secret email address from one of the random messages that are exchanged between Nick and Paul when you use the **ASK** command. It is guaranteed that at least one of the first ten generated messages within a session will contain the secret address. It is also guaranteed that apart from that, all messages will contain only dictionary English words, spaces, line breaks and punctuation marks.

Once you have the address, you will need to send an email to it. That email must contain:
- The entire text of the message that contained the secret email.
- Session logs for the successful attempt with your user_id.
- A detailed explanation of the attack on the protocol.
- Your bank account details to receive the $300,000 prize.

####Decrypting messages
To prove that the competition was fair, we will add a command that returns the keys used for a particular session by its *session_id* at the end of the contest. This will be done as soon as a winner is announced, or on February 4, 2015 in case no winner is announced to that date.

#### Bonus objective

We are also offering an independent **$100,000** reward to the first person to make the bot accept a ciphertext message (i.e. the first person to send a message using **MSG \[A|B\] bytes** and receive the result 'OK'), provided that that ciphertext deciphers to a plaintext that was never encrypted by the bot itself within this session.

Should you succeed at this, kindly send an email to security@telegram.org and include the following:
- Session logs for the successful attempt with your user_id.
- A detailed explanation of the attack on the protocol.
- Your bank account details to receive the $100,000 prize.