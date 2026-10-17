# E2E Group Calls


<!-- ref: aea46d7b1413c663b88243cbf398401d2c27738d -->

This article describes the end-to-end encryption used for Telegram **group voice and video calls**, incorporating a blockchain for state management and enhanced security.

##### Related Articles



-----

### Overview

Telegram end-to-end encrypted group calls generally rely on 3 components to manage communication securely among multiple participants:

1.  **Blockchain:** A decentralized ledger shared among all participants. It acts as the source of truth for the call's state, including participant lists, permissions, and shared encryption keys. Its hash is needed to generate verification codes.
2.  **Encryption Protocol:** A protocol optimized for real-time communication, encrypting audio and video data at the frame level. It includes mechanisms for packet signing to verify authorship and secure distribution of shared keys.
3.  **Emoji Verification Protocol:** A two-phase commit-reveal scheme used to generate verification emojis based on the blockchain state combined with participant-generated randomness. This **prevents manipulation by any single participant**, including block creators, ensuring trustworthy visual key verification.

This document details the technical implementation of these components.

### High-Level Workflow

Below follows a high-level workflow for working with group calls. As mentioned, the blockchain underpins the core operations of joining, leaving, and maintaining a consistent state within a group call.

#### Joining a Call

1.  **Fetch State:** A user wishing to join requests the latest blockchain block (representing the current call state) from the server, using [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) with `sub_chain_id=0`, `limit=1`, `offset=-1`.
2.  **Create Join Block:** The user constructs a new block proposal. This block:
    *   References the previous block's hash.
    *   Includes a `ChangeSetGroupState` change adding the user to the participant list.
    *   Includes a `ChangeSetSharedKey` change establishing a new shared key, encrypted for all participants (including the joining user). The joining user *must* be listed as a participant in the group state change *within the same block* to be able to create the shared key.
3.  **Submit Block:** The user sends this proposed block to the server through the [appropriate API method &raquo;](#subchains).
4.  **Server Validation & Broadcast:** The server validates the block (ensuring it only adds the joining user, follows sequence rules, etc.).
    *   If the block is valid and no conflicting block for the same height has already been accepted, the server applies it and broadcasts the new block to all current participants.
    *   If the block is invalid or a conflict exists (e.g., another user joined simultaneously, resulting in a block at the same height), the operation fails, and the user may need to retry starting from the latest block.
5.  **Client Update:** Eventually, all participants receive the new block from the server, apply it locally, and start accepting packets encrypted for the new epoch.  
6.   **Emoji verification:** Every time the client accepts a [main subchain](#subchains) (`subchain=0`) block, it must immediately generate a fresh nonce commitment message bound to the new block height and hash, submit it through the [broadcast subchain](#subchains) (`subchain=1`), and wait for the commit-reveal protocol described below to complete before displaying verification emojis for that state.  

#### Removing a Participant

```tlang
groupCallParticipant#2a3dc7ac flags:# muted:flags.0?true left:flags.1?true can_self_unmute:flags.2?true just_joined:flags.4?true versioned:flags.5?true min:flags.8?true muted_by_you:flags.9?true volume_by_admin:flags.10?true self:flags.12?true video_joined:flags.15?true peer:Peer date:int active_date:flags.3?int source:int volume:flags.7?int about:flags.11?string raise_hand_rating:flags.13?long video:flags.6?GroupCallParticipantVideo presentation:flags.14?GroupCallParticipantVideo paid_stars_total:flags.16?long = GroupCallParticipant;

updateGroupCallParticipants#f2ebdb4e call:InputGroupCall participants:Vector<GroupCallParticipant> version:int = Update;

---functions---

phone.leaveGroupCall#500377f9 call:InputGroupCall source:int = Updates;
phone.deleteConferenceCallParticipants#8ca60525 flags:# only_left:flags.0?true kick:flags.1?true call:InputGroupCall ids:Vector<long> block:bytes = Updates;
```

There are two distinct removal operations, distinguished by the flag passed to [phone.deleteConferenceCallParticipants](/method/phone.deleteConferenceCallParticipants.md):

- **`only_left=true`** — Pruning of participants that already disconnected from the media layer.
- **`kick=true`** — Forced removal of a currently active participant.

**Note:** Self-removal is not supported via [phone.deleteConferenceCallParticipants](/method/phone.deleteConferenceCallParticipants.md), as a participant cannot create a block that removes themselves while simultaneously generating a new shared key for the others; instead, the other participants must prune from the blockchain users that left the call, as specified below.

##### Stale Pruning (`only_left`)

After a participant disconnects from the RTC media layer by invoking [phone.leaveGroupCall](/method/phone.leaveGroupCall.md), an [updateGroupCallParticipants](/constructor/updateGroupCallParticipants.md) update with `groupCallParticipant.left=true` is delivered to all other participants. However, the departing user's entry persists in the E2E blockchain (`e2e.chain.groupState`). Any other active participant that holds the `remove_users` permission must prune these stale entries from the blockchain.

**Detecting stale participants:**

Clients detect stale participants via two complementary paths:

- **Via incoming [updateGroupCallParticipants](/constructor/updateGroupCallParticipants.md):** When a [groupCallParticipant](/constructor/groupCallParticipant.md) with `left=true` is received for a user currently listed in the local E2E blockchain state (`e2e.chain.groupState.participants`), that user is immediately considered stale.

- **Via full participant list comparison:** When the E2E blockchain state is updated (e.g., after applying a new main-chain block that changes the participant list), the client compares the blockchain's `e2e.chain.groupState.participants` against the RTC participant list fetched from the server via [phone.getGroupParticipants](/method/phone.getGroupParticipants.md). Any user present in the blockchain state but absent from the server-reported RTC participant list is stale. If the full RTC participant list has not yet been loaded, the client first paginates through it with [phone.getGroupParticipants](/method/phone.getGroupParticipants.md) and performs this check once all pages have been received.

**Submitting the removal:**

Once one or more stale participants are identified:

1.  **Create Removal Block:** Construct a new block containing:
    *   A `ChangeSetGroupState` change that removes all stale participants from the participant list.
    *   A subsequent `ChangeSetSharedKey` change establishing a new shared key encrypted only for the *remaining* participants.
2.  **Submit:** Invoke [phone.deleteConferenceCallParticipants](/method/phone.deleteConferenceCallParticipants.md) with:
    *   `only_left=true` — signals to the server that these users already left the media layer.
    *   `ids` — the list of user IDs being pruned.
    *   `block` — the serialized E2E chain block.
3.  **Broadcast:** The server validates the block and, if accepted, broadcasts it to all remaining participants via [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md), who apply it as any other main-chain block.

##### Forced Removal (`kick`)

An active participant may forcefully remove another *currently active* participant by invoking [phone.deleteConferenceCallParticipants](/method/phone.deleteConferenceCallParticipants.md) with `kick=true` (instead of `only_left=true`), along with the same `ids` and `block` fields described above. As with stale pruning, the `remove_users` permission is required.  

#### Subchains

API schema:

```tlang
// Receive blocks from any chain
updateGroupCallChainBlocks#a477288f call:InputGroupCall sub_chain_id:int blocks:Vector<bytes> next_offset:int = Update;

---functions---

// Fetch blocks from any chain
phone.getGroupCallChainBlocks#ee9f88a6 call:InputGroupCall sub_chain_id:int offset:int limit:int = Updates;

// The following methods submit blocks to chain 0
phone.createConferenceCall#7d0444bb flags:# muted:flags.0?true video_stopped:flags.2?true join:flags.3?true random_id:int public_key:flags.3?int256 block:flags.3?bytes params:flags.3?DataJSON = Updates;
phone.joinGroupCall#8fb53057 flags:# muted:flags.0?true video_stopped:flags.2?true call:InputGroupCall join_as:InputPeer invite_hash:flags.1?string public_key:flags.3?int256 block:flags.3?bytes params:DataJSON = Updates;
phone.deleteConferenceCallParticipants#8ca60525 flags:# only_left:flags.0?true kick:flags.1?true call:InputGroupCall ids:Vector<long> block:bytes = Updates;

// The following method submits blocks to chain 1
phone.sendConferenceCallBroadcast#c6701900 call:InputGroupCall block:bytes = Updates;
```

E2E-call schema:

```tlang
// Chain 0 blocks
e2e.chain.block#639a3db6 signature:int512 flags:# prev_block_hash:int256 changes:Vector<e2e.chain.Change> height:int state_proof:e2e.chain.StateProof signature_public_key:flags.0?int256 = e2e.chain.Block;

// Chain 1 blocks
e2e.chain.groupBroadcastNonceCommit#d1512ae7 signature:int512 user_id:int64 chain_height:int32 chain_hash:int256 nonce_hash:int256 = e2e.chain.GroupBroadcast;
e2e.chain.groupBroadcastNonceReveal#83f4f9d8 signature:int512 user_id:int64 chain_height:int32 chain_hash:int256 nonce:int256 = e2e.chain.GroupBroadcast;
```

Currently, each and every conference call has two independent blockchains, independent from other calls and from each other.  

These two blockchains are identified by their subchain ID:

- Subchain ID `0`: Main blockchain.  
  The main blockchain contains a sequence of **only** `e2e.chain.Block` objects, containing state changes for the call.  

  Each block has its own height (aka offset within the subchain): the first block in the subchain has height `0`, then `1`, etc.  

  Every block is linked to its previous block by the `prev_block_hash` parameter.  
  
  To submit blocks to subchain `0`, only the following methods can be used:  

  - [phone.createConferenceCall](/method/phone.createConferenceCall.md) - Create a conference call
  - [phone.joinGroupCall](/method/phone.joinGroupCall.md) - Join a conference call
  - [phone.deleteConferenceCallParticipants](/method/phone.deleteConferenceCallParticipants.md) - Remove a conference call participant

  All of these methods will return an [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md) with the submitted blocks on success.  

  All of these methods except for [phone.createConferenceCall](/method/phone.createConferenceCall.md) can return an RPC error that starts with `CONF_WRITE_CHAIN_INVALID`, if the passed block is not based on the latest block of the subchain: in this case, the latest block must be re-fetched using [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md), the new block must re-generated on top of it and re-submitted by re-invoking the method.  

- Subchain ID `1`: Call verification blockchain.  
  The call verification blockchain contains a sequence of **only** objects of type `e2e.chain.GroupBroadcast`, containing messages used for the [commit-reveal emoji verification protocol &raquo;](#commit-reveal-protocol-workflow).  
  
  Each block has its own height (aka offset within the subchain): the first block in the subchain has height `0`, then `1`, etc.  

  All subchain `1` blocks are linked to a block from subchain `0` via `chain_height` and `chain_hash`, both pointing to a block in subchain `0`, **not** to the previous block within subchain `1`, so they're not strictly a blockchain, but the API still uses the term `subchain` for simplicity.  

  To submit blocks to subchain `1`, only the following methods can be used:

  - [phone.sendConferenceCallBroadcast](/method/phone.sendConferenceCallBroadcast.md) - Submits a block to subchain `1`.

Blocks are returned by the server inside of [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md) updates, which are returned by all block submission methods and also delivered passively for group call members using the usual [update delivery mechanism](/api/updates.md), and must be handled as specified [here &raquo;](#handling-updates).  

Subchain blocks can also be fetched using [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md), which will return a maximum of `limit` blocks from subchain `sub_chain_id` with height bigger than or equal to `offset`, as an [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md) update; `offset` can also be `-1` to fetch the latest block on the specified subchain.  

If the client is not a member of the call, [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) will **only** return the last block regardless of the values of `offset` and `limit`.  

If a client is removed from a conference call, the server will start rejecting conference method calls with a `GROUPCALL_FORBIDDEN` RPC error.  

A `GROUPCALL_FORBIDDEN` error returned by **any** of the following methods must thus be treated as a signal that the client has lost its membership, and it must transparently **rejoin** the call: re-initialize the local E2E blockchain state (resetting `next_offset` to `{-1, -1}` and `joined` to `false`, as described [below](#handling-updates)) and re-submit a self-add block via [phone.joinGroupCall](/method/phone.joinGroupCall.md), instead of surfacing the error to the user.  

- [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) (while polling for new blocks).
- [phone.deleteConferenceCallParticipants](/method/phone.deleteConferenceCallParticipants.md) (when pruning stale or kicking active participants).
- [phone.sendConferenceCallBroadcast](/method/phone.sendConferenceCallBroadcast.md) (when broadcasting a verification block to subchain `1`): the block that failed to send must be stashed and re-broadcast once the rejoin completes.
- [phone.editGroupCallParticipant](/method/phone.editGroupCallParticipant.md) (both when updating the local participant's own state and when editing another participant).

This `GROUPCALL_FORBIDDEN` rejoin handling is distinct from the `CONF_WRITE_CHAIN_INVALID` handling described [above](#subchains): the former indicates lost membership and requires a full rejoin, while the latter merely indicates that a submitted block was not based on the latest block of the subchain and only requires re-fetching the latest block, regenerating the block on top of it and re-submitting it.  

Please note that as long as the client is a member of the call, it **must also** manually poll for new chain blocks by invoking [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) with `limit=50` every 5 seconds in normal conditions, and every second when [key verification is in progress](#key-verification-and-emoji-generation) (i.e. a new block was added to the main subchain, and an emoji fingerprint is currently being generated for that block via commit-reveal messages on the verification subchain), passing to `offset`, for each subchain, the height of the last accepted block plus `1`.  

If the number of blocks returned by *any* call to [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) is equal to `limit`, more blocks may be available server-side, so [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) **must** be re-invoked immediately after processing the returned [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md), with the newly committed `offset`.   

**Note**: the constructor IDs of all blocks **returned by the server** inside of [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md) either passively or actively from [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) are **modified**, adding 1 to the constructor ID, so for example:

- [e2e.chain.block](/constructor/e2e.chain.block.md)`#639a3db6` becomes `639a3db7`
- [e2e.chain.groupBroadcastNonceCommit](/constructor/e2e.chain.groupBroadcastNonceCommit.md)`#d1512ae7` becomes `d1512ae8`
- [e2e.chain.groupBroadcastNonceReveal](/constructor/e2e.chain.groupBroadcastNonceReveal.md)`#83f4f9d8` becomes `83f4f9d9`

**Only** accept blocks received from the server if their ID is the increased version (specifically, only accept `639a3db7` for the main subchain, and `d1512ae8`, `83f4f9d9` for the verification subchain).

When **submitting** blocks to the server, use the canonical constructor IDs (`639a3db6`, `d1512ae7`, `83f4f9d8`).  

Clients must apply both main-chain blocks and verification messages only from the server: this includes blocks and verification messages created by the local client, apply only the blocks echoed back from the server.  

#### Handling updates

    updateGroupCallChainBlocks#a477288f call:InputGroupCall sub_chain_id:int blocks:Vector<bytes> next_offset:int = Update;

Blocks are returned by the server inside of [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md) updates, which must be additionally deduplicated by comparing the height of received blocks, similarly to the [usual pts deduplication logic](/api/updates.md), which still applies to these updates, just earlier in the handling process, together with all other update types.  

The [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md).`next_offset` field refers to the height/offset (within the [subchain](#subchains) identified by `sub_chain_id`) of the block located *after* the last block in [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md).`blocks`.  

The height/offset of the first block in [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md).`blocks` is equal to `(next_offset - blocks.length) + 0`, the height of the second is `(next_offset - blocks.length) + 1`, and so on until `(next_offset - blocks.length) + (blocks.length - 1) == (next_offset - 1)` for the last block in `blocks`.  

While in practice, the height/offset of a main subchain block will match the value of the corresponding [e2e.chain.block](/constructor/e2e.chain.block.md).`height`, the API offset should not be confused with the block height: in particular, clients should **not** attempt to overwrite the value of [e2e.chain.block](/constructor/e2e.chain.block.md).`height` based on the computed offset, and call verification subchain [e2e.chain.GroupBroadcast](/type/e2e.chain.GroupBroadcast.md) blocks don't even have an explicit `height` field anyway: clients must still associate the computed height to each block in `blocks` in order to deduplicate blocks, but without affecting the block contents, for example via a container `blockOffset{block: bytes, offset: int}` object (or virtually via a simple counter when iterating over `blocks`).  

Clients must separately store the offset+1 of the last accepted block in both subchains, i.e. in an `int next_offset[2]` variable for each conference.  

The initial value for `next_offset` when initializing the conference state *before* invoking [phone.createConferenceCall](/method/phone.createConferenceCall.md)/[phone.joinGroupCall](/method/phone.joinGroupCall.md) to join the call **must** be equal to `{-1, -1}`.  

Clients must also keep a `joined` boolean variable for each conference, initially `false`.  

If the client leaves the call or is kicked from it, clear all local blockchain state, including `next_offset` and `joined`.  

The [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md) handling logic (triggered by the [update system](/api/updates.md) both for passive updates and updates returned by any method) differs depending on whether we joined the call:  

- If we haven't fully joined the call yet (`joined == false`):

  - If the [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md) came from a [phone.createConferenceCall](/method/phone.createConferenceCall.md)/[phone.joinGroupCall](/method/phone.joinGroupCall.md):

    For each individual block in [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md).`blocks`:

    - Apply the block, ignoring the value of `block.offset`.

    If block validation and application succeeds for all blocks, set `next_offset[updateGroupCallChainBlocks.sub_chain_id] := updateGroupCallChainBlocks.next_offset`.

    Then, if `next_offset[0] >= 0 && next_offset[1] >= 0`, set `joined := true`.  

  - Otherwise, completely ignore the update.  

    This logic means that i.e. the [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md)`{offset=-1}` call used to fetch the last block when joining an existing call must **not** trigger any local state change, and the last block must be manually extracted by the caller in order to construct the self-add block.  

    This also means that i.e. passive late [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md) related to a left call we're trying to rejoin will be ignored, instead of triggering gap recovery logic that will not work anyway, because as mentioned above, if the client is not a member of the call, [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) will **only** return the last block regardless of the values of `offset` and `limit`, obviously breaking gap recovery logic.  

- Otherwise, if `joined == true`:

  For each individual block in [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md).`blocks`:

  - If `next_offset == block.offset`, apply the block: if block validation and application succeeds, immediately set `next_offset[updateGroupCallChainBlocks.sub_chain_id] := block.offset + 1` before proceeding to the next block.
  - If `next_offset > block.offset`, the block was already applied, and must be skipped.
  - If `next_offset < block.offset`, there's a gap in the block update sequence, handle it as follows:
  
    - Skip all remaining blocks in the update, starting from and including the current one, then:
    - Fill the gap by invoking [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) with `offset=next_offset` and `limit=50`; in other words, by early-triggering the [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) poll loop mentioned [above](#subchains).  
    
      As mentioned above, if the number of blocks returned by *any* call to [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) is equal to `limit`, [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) must be re-invoked immediately after processing the returned [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md), with the newly committed `offset` (usually equal to the returned `next_offset`), so the skipped block will be processed anyway once the client catches up to it during gap recovery.  

    Alternatively, instead of throwing away and re-downloading blocks that form a gap, they could be slotted into a queue, and the client could wait 0.5 seconds before invoking [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) if a gap is still present, as an update that fills the gap may arrive by itself a bit later, out of order.  

    Regardless of the chosen approach, take care when invoking [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) to fill gaps: if the user leaves the conference while a gap is being filled, the method will return only the latest block, not the requested range, potentially creating another gap, recursively triggering the gap recovery logic: the `joined` flag must be set to `false` when the user leaves the conference, but there may still be a race condition between `joined := false` and the polling logic, so make sure to disable wakeups of the poll loop when the user leaves the call.  

    To fill gaps, do not invoke [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) blockingly within the update handling thread/actor, instead simply schedule an early wakeup of the polling logic, which will naturally execute the method on a separate thread/actor (with the limitation described above).  

#### Conference in-call messages

```tlang
updateGroupCallEncryptedMessage#c957a766 call:InputGroupCall from_id:Peer encrypted_message:bytes = Update;

---functions---

phone.sendGroupCallEncryptedMessage#e5afa56d call:InputGroupCall encrypted_message:bytes = Bool;
```

Conference in-call messages are serialized as JSON and encrypted using the [packet encryption process](#packet-encryption).  

The server only forwards the opaque encrypted packet and provides the sender separately in [updateGroupCallEncryptedMessage](/constructor/updateGroupCallEncryptedMessage.md).`from_id`.

The plaintext of the message is a JSON object with the following structure:

```json
{
    "_": "groupCallMessage",
    "random_id": "1234567890123456789",
    "message": {
        "_": "textWithEntities",
        "text": "Hello!",
        "entities": [
            {
                "_": "messageEntityBold",
                "offset": 0,
                "length": 5
            }
        ]
    }
}
```

- `_` identifies the serialized object or constructor.
- `random_id` is a non-zero, client-generated random signed 64-bit integer, encoded as a decimal JSON string to avoid precision loss, it uniquely identifies messages sent **by the current user** within the chat, similar to the `random_id` in secret chats.  
- `message` is the JSON representation of a [textWithEntities](/constructor/textWithEntities.md) constructor.
- Each entry in `entities` is the JSON representation (with the predicate name stored in the `_` key) of **only** the following supported [message entity types](/api/entities.md):
  - [messageEntityBold](/constructor/messageEntityBold.md)
  - [messageEntityItalic](/constructor/messageEntityItalic.md)
  - [messageEntityUnderline](/constructor/messageEntityUnderline.md)
  - [messageEntityStrike](/constructor/messageEntityStrike.md)
  - [messageEntitySpoiler](/constructor/messageEntitySpoiler.md)
  - [messageEntityCustomEmoji](/constructor/messageEntityCustomEmoji.md) (`document_id` is represented as a string, like `random_id`)

  All other entity types must be transformed to a [messageEntityUnknown](/constructor/messageEntityUnknown.md).  

  The offset and the length of the entities are both represented in [UTF-16 code units](/api/entities.md#entity-length), as usual.  

This is **not** a serialization of the API [groupCallMessage](/constructor/groupCallMessage.md) constructor: conference messages do not contain its server-assigned `id`, `from_id`, `date`, `from_admin` or `paid_message_stars` fields, they only contain a client-generated `random_id`, and the `message`.  

The sender is provided by the surrounding [updateGroupCallEncryptedMessage](/constructor/updateGroupCallEncryptedMessage.md), while the display date is generated by the receiving client.

Receivers must validate the JSON structure, reject invalid text or entity bounds and ignore unsupported entity constructors.

##### Conference in-call reactions

Conference calls support the same animated standard and custom emoji reactions as other group call types, but the reaction payload must be serialized and E2E-encrypted as a conference in-call message.

For a standard emoji reaction, set `message.text` to only the selected available reaction emoji and leave `message.entities` empty:

```json
{
    "_": "groupCallMessage",
    "random_id": "1234567890123456789",
    "message": {
        "_": "textWithEntities",
        "text": "👍",
        "entities": []
    }
}
```

For a custom emoji reaction, set `message.text` to the custom emoji's fallback emoji text and add exactly one `messageEntityCustomEmoji` entity spanning the entire text:

```json
{
    "_": "groupCallMessage",
    "random_id": "1234567890123456789",
    "message": {
        "_": "textWithEntities",
        "text": "👍",
        "entities": [
            {
                "_": "messageEntityCustomEmoji",
                "offset": 0,
                "length": 2,
                "document_id": "1234567890123456789"
            }
        ]
    }
}
```

Serialize, encrypt and send this payload using the normal [conference in-call message flow](#encrypting-and-sending-a-message). Receivers should recognize a supported emoji-only payload or a single full-span custom emoji entity as a reaction and should render its animated effect instead of displaying it as ordinary text.

##### Encrypting and sending a message

```tlang
---functions---

phone.sendGroupCallEncryptedMessage#e5afa56d call:InputGroupCall encrypted_message:bytes = Bool;
```

To send a conference in-call message:

1. Serialize the message as described above.
2. Encrypt the UTF-8 bytes using [packet encryption](#packet-encryption), with:
   - `payload` set to the serialized JSON bytes.
   - `channel_id` set to `0`.
   - `extra_data` empty
   - `seqno` set to the next sequence number for channel `0`.
   - All currently active encryption epochs and the conference private key.
3. Pass the complete resulting encrypted packet to [phone.sendGroupCallEncryptedMessage](/method/phone.sendGroupCallEncryptedMessage.md).`encrypted_message`.

##### Receiving and decrypting a message

```tlang
updateGroupCallEncryptedMessage#c957a766 call:InputGroupCall from_id:Peer encrypted_message:bytes = Update;
```

Incoming messages are delivered in [updateGroupCallEncryptedMessage](/constructor/updateGroupCallEncryptedMessage.md) updates. To process one:

1. Verify that `from_id` identifies a user and extract its user ID.  
2. Decrypt `encrypted_message` using the [packet decryption process](#packet-encryption), passing the extracted sender user ID and expecting channel ID `0`, applying all the usual checks.  
3. Parse and validate the decrypted UTF-8 JSON message.
4. Deduplicate the message using the `(from_id, random_id)` pair before displaying it.

#### Security Considerations

* Clients **must** only apply blocks received from the server, even those they proposed themselves. The server enforces block ordering and prevents forks.
* All participants must verify that they see the same verification emojis, which are derived from the blockchain state using the commit-reveal protocol detailed later.
* If the server were to deliver different valid blocks to different participants (a fork), their blockchain hashes, and consequently their verification emojis, would permanently diverge. The reliance on the server prevents this under normal operation.

-----

### Blockchain State Management

A dedicated blockchain provides a distributed, verifiable, and synchronized history of the group call's state.

#### Block Structure

Blocks form the chain, linking sequentially to maintain history. The structure is defined as follows:

```tlang
e2e.chain.block#639a3db6 signature:int512 flags:# prev_block_hash:int256 changes:Vector<e2e.chain.Change> height:int state_proof:e2e.chain.StateProof signature_public_key:flags.0?int256 = e2e.chain.Block;
```

Namely:

*   `signature`: A cryptographic signature verifying the block's authenticity, calculated over the TL serialization of the `e2e.chain.block` with the `signature` field itself zeroed out.  
*   `prev_block_hash`: The SHA256 hash of the complete TL serialization of the preceding `e2e.chain.block`, forming the chain link.  
*   `changes`: A list of state modifications applied by this block.

    A block must contain *at least* a `ChangeSetGroupState` or a `ChangeSetValue`.  
    A block containing only `ChangeNoop` or only `ChangeSetSharedKey` is invalid.  

    See [here &raquo;](#change-types-for-group-calls) for the full list of available change types and how to apply them.  

*   `height`: The sequential number of the block in the chain.
*   `state_proof`: Cryptographic proof of the blockchain state *after* this block is applied, including the key-value state hash and, depending on the block contents, the group state and shared key state.
    
    See [here &raquo;](#local-blockchain-state) for a more detailed description of this field.  

*   `signature_public_key`: The public key of the participant who created and signed the block. 
    **Note**: For optimization purposes, the `signature_public_key` can be omitted if it matches the first participant's key in the group state (except for the block at height `0`, where it **must** always be present).  

#### Participants and Permissions

```tlang
e2e.chain.groupState#1ddc7584 participants:Vector<e2e.chain.GroupParticipant> external_permissions:int = e2e.chain.GroupState;
e2e.chain.groupParticipant#28852f20 user_id:long public_key:int256 flags:# add_users:flags.0?true remove_users:flags.1?true set_value:flags.2?true version:int = e2e.chain.GroupParticipant;
```

Participants are described by the [e2e.chain.groupState](/constructor/e2e.chain.groupState.md).`participants` field inside the [local state](#local-blockchain-state) and [incoming blocks](#block-structure), and are identified by `user_id` or `public_key`.

Each participant is represented by a [e2e.chain.groupParticipant](/constructor/e2e.chain.groupParticipant.md) object, containing the following fields:

* `user_id`: Contains the participant's Telegram user ID
* `public_key`: Contains the participant's public key
* `version`: Indicates the maximum [version of the E2E group calls protocol &raquo;](#versioning) supported by this participant.   
* `add_users`: If set, this user has permission to add new participants.
* `remove_users`: If set, this user has permission to remove existing participants.
* `set_value`: If set, this user has permission to modify the kv trie.

> **Note:** For improved user experience, any person can currently join a call with server permission, without requiring explicit confirmation from existing participants. While the blockchain supports an explicit confirmation mode, we currently use [e2e.chain.groupState](/constructor/e2e.chain.groupState.md).`external_permissions` in the blockchain state to allow self-addition to groups.  

[e2e.chain.groupState](/constructor/e2e.chain.groupState.md).`external_permissions` is used when the client needs to fetch permissions for a user that isn't present in the `participants` vector of the current (pre-block application) [e2e.chain.groupState](/constructor/e2e.chain.groupState.md).  

[e2e.chain.groupState](/constructor/e2e.chain.groupState.md).`external_permissions` can contain exactly the same bitflags that can be contained in [e2e.chain.groupParticipant](/constructor/e2e.chain.groupParticipant.md).`flags` (add_users, remove_users, set_value).  

[e2e.chain.groupState](/constructor/e2e.chain.groupState.md).`external_permissions` is **only** used when applying changes of type `ChangeSetGroupState`.  

#### Change Types for Group Calls
    
    e2e.chain.block#639a3db6 signature:int512 flags:# prev_block_hash:int256 changes:Vector<e2e.chain.Change> height:int state_proof:e2e.chain.StateProof signature_public_key:flags.0?int256 = e2e.chain.Block;

    e2e.chain.changeSetGroupState#2cf17146 group_state:e2e.chain.GroupState = e2e.chain.Change;
    e2e.chain.changeSetSharedKey#987a2158 shared_key:e2e.chain.SharedKey = e2e.chain.Change;
    e2e.chain.changeSetValue#7c4f9bfa key:bytes value:bytes = e2e.chain.Change;
    e2e.chain.changeNoop#deb4a41b nonce:int256 = e2e.chain.Change;

Blocks contain changes that modify the blockchain state.  

A block must contain *at least* a `ChangeSetGroupState` or a `ChangeSetValue`.  
A block containing only `ChangeNoop` or only `ChangeSetSharedKey` is invalid.  

To apply changes, follow these instructions:

1.  **ChangeSetGroupState**: Modifies the list of participants and their permissions. This action *clears* the current shared key, requiring a subsequent `ChangeSetSharedKey` **within the same block**.  
    ```tlang
    e2e.chain.groupParticipant#28852f20 user_id:long public_key:int256 flags:# add_users:flags.0?true remove_users:flags.1?true set_value:flags.2?true version:int = e2e.chain.GroupParticipant;
    e2e.chain.groupState#1ddc7584 participants:Vector<e2e.chain.GroupParticipant> external_permissions:int = e2e.chain.GroupState;
    e2e.chain.changeSetGroupState#2cf17146 group_state:e2e.chain.GroupState = e2e.chain.Change;
    ```

    The initial local value of the local `group_state` when at the conceptual `height=-1`, **only** used when applying the first block of the blockchain with `height=0`, must be equal to:

    - `local_group_state=e2e.chain.GroupState{participants: [], external_permissions: add_users | remove_users | set_value}`

    To apply incoming changes of this type, follow these steps:

    - Initialize `local_group_state` with the locally stored `e2e.chain.GroupState`, before the application of this change.
    - Initialize `incoming_group_state` with the incoming `e2e.chain.GroupState`.
    - Initialize `local_permissions` with the permissions of the block's author, looked up in `local_group_state.participants` based on block's `signature_public_key`: if no matching entry can be found for the public key, fallback to `local_group_state.external_permissions`.
    - Validate that `incoming_group_state.external_permissions` is exactly equal to or a subset of `add_users | remove_users | set_value` (don't allow unknown flags)
    - Validate that `incoming_group_state.external_permissions` is equal to or is a strict subset of `local_group_state.external_permissions`, i.e. `(incoming_group_state->external_permissions & ~local_group_state->external_permissions) == 0`.  
      In other words, `external_permissions` cannot be increased compared to the previous state, though it may be reduced.  
    - Validate that all `user_id` values are unique across `incoming_group_state.participants`
    - Validate that all `public_key` values are unique across `incoming_group_state.participants`
    - Validate `incoming_group_state.participants`: note that in this context, each participant must be uniquely identified by **both** the `user_id` **and** the `public_key` fields (i.e. generate a new combined identifier by concatenating the binary version of `user_id` and `public_key`), this is used when comparing participants in the local and incoming list.  
      - Validate that the `flags` of all `incoming_group_state.participants` are exactly equal to or a subset of `add_users | remove_users | set_value` (don't allow unknown flags)
      - If at least one participant present in `local_group_state.participants` is **not** present in `incoming_group_state.participants`, validate that `local_permissions` contains `remove_users` (the block signer must have the `remove_users` permission to remove users)
      - For all participants present in `incoming_group_state.participants` but **not** present in `local_group_state.participants`:
        - Validate that `local_permissions` contains `add_users` (the block signer must have the `add_users` permission to add users, or `add_users` must be present in `local_group_state.external_permissions` for self-add blocks)
        - Validate that `incoming_participant.flags` is equal to or is a subset of `local_permissions` (a newly added user cannot have more permissions than the adder, or more permissions than `local_group_state.external_permissions` for self-add blocks)  
      - For all participants present **both** in `incoming_group_state.participants` **and** `local_group_state.participants`, if the local `flags` field differs from the incoming `flags` field:
        - Validate that `local_permissions` contains **both** `add_users` **and** `remove_users` (the block signer must have both `add_users` and `remove_users` permissions to change someone else's or their own permissions).  
        - Validate that `incoming_participant.flags` is equal to or is a subset of `local_permissions` (the block signer cannot grant permission bits that the signer does not currently have).  
        
    - If all these validation steps succeed, apply the change as follows:
      - Update the local group state: `local_group_state = incoming_group_state`
      - Clear the existing shared key state: `local_shared_key = *empty*`
        A new key **must** be set by a subsequent `ChangeSetSharedKey` in the same block. 
      
    Please note that these state updates (like all other state updates triggered by all change types) **must** be rolled back if any of the changes within the current block fails validation.  

    One of the reasons why all changes must be applied to the local state even if the entire block wasn't processed yet (and then rolled back on error) is because the `ChangeSetSharedKey` that **must** follow a `ChangeSetGroupState` relies on the user being already present in the local participant list.  

2.  **ChangeSetSharedKey**: Establishes a new shared encryption key, encrypted individually for each listed participant.
    ```tlang
    e2e.chain.sharedKey#8a847e7f ek:int256 encrypted_shared_key:string dest_user_id:Vector<long> dest_header:Vector<bytes> = e2e.chain.SharedKey;
    e2e.chain.changeSetSharedKey#987a2158 shared_key:e2e.chain.SharedKey = e2e.chain.Change;
    ```

    To apply incoming changes of this type, follow these steps:

    - Validate that the local state does **not** contain the shared encryption key (in other words, only apply the change if the call was just initialized, or if the key was cleared by a previous `ChangeSetGroupState`)
    - Initialize `local_group_state` with the locally stored `e2e.chain.GroupState`, before the application of this change.
    - Initialize `local_permissions` with the permissions of the block's author, looked up in `local_group_state.participants` based on block's `signature_public_key`, abort validation if no matching entry can be found for the public key: **do not** fallback to `local_group_state.external_permissions`.  
    - Validate that `local_permissions` contains `add_users` and/or `remove_users`
    - Validate that `dest_user_id` and `dest_header` contain the same number of elements
    - Validate that `dest_user_id` doesn't contain duplicated user IDs
    - Validate that `dest_user_id` contains exactly one entry for each participant in `local_group_state.participants`, in any order.
    - If all these validation steps succeed, apply the change by [generating and updating &raquo;](#shared-key-encryption) the local shared key.

3.  **ChangeSetValue**: Updates the key-value trie. 
    ```tlang
    e2e.chain.changeSetValue#7c4f9bfa key:bytes value:bytes = e2e.chain.Change;
    ```

    Clients that do not implement the key-value trie must still store the latest accepted `kv_hash`, and handle blockchain updates as follows:

    - For ordinary group-call blocks that do not contain [e2e.chain.changeSetValue](/constructor/e2e.chain.changeSetValue.md), the `incoming.state_proof.kv_hash` must be identical to the locally stored value.
    - If a block containing an [e2e.chain.changeSetValue](/constructor/e2e.chain.changeSetValue.md) is received, ignore the `key` and `value` contents and just accept the `incoming.state_proof.kv_hash` (from the containing block), storing that value as the new local `kv_hash`, but only if the block author has the `set_value` permission.  

4.  **ChangeNoop**: A no-operation change, potentially used for hash randomization.  
    ```tlang
    e2e.chain.changeNoop#deb4a41b nonce:int256 = e2e.chain.Change;
    ```

#### Local Blockchain State

```tlang
e2e.chain.block#639a3db6 signature:int512 flags:# prev_block_hash:int256 changes:Vector<e2e.chain.Change> height:int state_proof:e2e.chain.StateProof signature_public_key:flags.0?int256 = e2e.chain.Block;

e2e.chain.stateProof#d6b679e6 flags:# kv_hash:int256 group_state:flags.0?e2e.chain.GroupState shared_key:flags.1?e2e.chain.SharedKey = e2e.chain.StateProof;

e2e.chain.groupState#1ddc7584 participants:Vector<e2e.chain.GroupParticipant> external_permissions:int = e2e.chain.GroupState;
e2e.chain.groupParticipant#28852f20 user_id:long public_key:int256 flags:# add_users:flags.0?true remove_users:flags.1?true set_value:flags.2?true version:int = e2e.chain.GroupParticipant;

e2e.chain.sharedKey#8a847e7f ek:int256 encrypted_shared_key:string dest_user_id:Vector<long> dest_header:Vector<bytes> = e2e.chain.SharedKey;
```

Blockchain states must be stored locally and are used to verify incoming blocks.  

The state of a specific blockchain is composed of the following fields:

- `current_height` - **Height of the last block**: The current height of the blockchain (equal to the height of the last applied block)
- `current_hash` - **Hash of the last block**: The hash of the last applied block
- `shared_key` - **Shared Key**: Shared group key encrypted for each group participant.
- `group_state` - **Group State**: List of group participants and their permissions.  
- `kv_hash` - **Key Value Storage hash**: Root hash of the key-value trie after applying the block. The full trie format is intentionally out of scope for this document, because the key-value trie is currently not used anywhere. The `kv_hash`, however, is still partially used during block verification, as described below.  

The client must keep all these fields stored locally, and use them to validate changes when applying blocks: if block application succeeds, the fields must be updated according to the changes contained in the block.  

Application of incoming blocks where `group_state` and/or `shared_key` are not set according to the omission rules [specified below](#block-application-process) must NOT remove those fields from the local state.

The initial local value of these fields when at the conceptual `height=-1`, only used when applying the first block of the blockchain with `height=0`, must be equal to:

- `current_height=-1`
- `current_hash=0`
- `shared_key=*empty*`
- `group_state=e2e.chain.GroupState{participants: [], external_permissions: add_users | remove_users | set_value}`
- `kv_hash=0`

#### Block application process

```tlang
e2e.chain.block#639a3db6 signature:int512 flags:# prev_block_hash:int256 changes:Vector<e2e.chain.Change> height:int state_proof:e2e.chain.StateProof signature_public_key:flags.0?int256 = e2e.chain.Block;
```

Blocks must be applied atomically (all changes succeed or none do) and sequentially. 

The validation process validates incoming blocks based on and modifying the current local value of the [local blockchain state &raquo;](#local-blockchain-state).  

1.  **Height Check:** The block's `height` must be exactly `local.current_height + 1`. If not, the block is invalid. It is currently impossible to apply a block with height larger than `2^31-1`.  
2.  **Previous Hash Check:** The block's `prev_block_hash` must match the hash of the last applied block (`local.current_hash`). If not, the block is invalid.
3.  **Find signer**: If the `signature_public_key` field is populated, use it, otherwise:
    - If the block's `height` is equal to `0`, abort (the first block **must** have an attached `signature_public_key`)
    - Otherwise, use `local.group_state.participants[0].public_key`
4.  **Permission Check (Initial):** Determine the permissions of the block creator (identified by the `signature_public_key` extracted in the previous step). Permissions are sourced from the *previous* block's state or `external_permissions` if the creator wasn't already a participant.
5.  **Signature Verification:** Verify the block's `signature` using the block creator's public key. If invalid, the block is rejected.
6.  **Apply Changes Sequentially:** Iterate through the `changes` vector:
    *   Verify the creator has sufficient permissions for the specific change, using their *current* permissions (which might have been updated by a previous change *within the same block*). If permissions are insufficient, the entire block is invalid.
    *   Apply the change to the state [as specified above &raquo;](#change-types-for-group-calls). If the change itself is malformed or invalid (e.g., invalid participant data), the entire block is invalid.
7.  **State Proof Validation:** After applying all changes, verify that the resulting state matches the information provided in the block's `state_proof`. If not, the block is invalid.

If the block is invalid, all changes made to the local state by the block must be rolled back (or, the block application process can run on a copy of the local state which is mutated when iterating over the changes, and only applied if the block is fully validated).  

The blockchain starts with a conceptual "genesis" block at `height: -1` with a hash of `UInt256(0)` (the full local blockchain state at height `-1` is described [here &raquo;](#local-blockchain-state)). 

#### Versioning

    e2e.chain.groupParticipant#28852f20 user_id:long public_key:int256 flags:# add_users:flags.0?true remove_users:flags.1?true set_value:flags.2?true version:int = e2e.chain.GroupParticipant;

The E2E group call encryption protocol specified in this article may change in the future: to preserve backwards-compatibility with clients that do not support newer protocols yet, each participant must announce its maximum supported version in [e2e.chain.groupParticipant](/constructor/e2e.chain.groupParticipant.md).`version`.  

The protocol version used when generating and applying blocks must be equal to the smallest `version` contained in the participant list, clamped to the inclusive range `0...255`.  

Protocol changelog: 

- Version `0`: Initial version.
- Version `1`: The shared group key now **must** be hashed via `HMAC-SHA512(raw_group_shared_key, block_hash)[0:32]` before use (step 5 in [shared key encryption &raquo;](#shared-key-encryption)).  

#### Implementation Notes

* **Serialization:** Blocks and their contents are serialized using the standard Telegram TL serialization methods before signing or hashing.
* **Concurrency:** If multiple valid blocks for the same `height` are created concurrently, only the first one to be successfully applied will be appended. Subsequent blocks for that height will be rejected by participants due to the height mismatch, preventing forks and ensuring a linear history.
* **Validation:** Clients **must** only apply blocks received from the server (even blocks they created themselves). The server performs validation and ordering to prevent forks and ensure consistency. Clients should retry sending created blocks/broadcasts until acknowledged (success or error) by the server.

-----

### Encryption Protocol

The following protocol encrypts call data (audio/video frames) and manages shared keys securely.

#### Core Primitives

The encryption relies on the following primitive functions, similar to MTProto 2.0. Note that **KDF** refers to **HMAC-SHA512** throughout this document.

* **encrypt_data(payload, secret, extra_data)**

<div>
  <a href="/file/400780400121/3/4i8vpkfDb-Q.209706.png/5b7f9e14d6c811fd9c">
    <img src="/file/400780400121/3/4i8vpkfDb-Q.209706.png/5b7f9e14d6c811fd9c" alt="Encrypt Data" class="dev_page_image" style="max-width: 600px;">
  </a>
</div>

> Encrypts `payload` using a `secret`. `extra_data` will be used as part of MAC. `large_msg_id` will be used later to sign the packet.

```
padding_size = 16 + 15 - (payload.size + 15) % 16
padding = random_bytes(padding_size)
padding[0] = padding_size
padded_data = padding || payload
large_secret = KDF(secret, "tde2e_encrypt_data")
encrypt_secret = large_secret[0:32]
hmac_secret = large_secret[32:64]
large_msg_id = HMAC-SHA256(hmac_secret, padded_data || extra_data || len(extra_data))
msg_id = large_msg_id[0:16]
(aes_key, aes_iv) = HMAC-SHA512(encrypt_secret, msg_id)[0:48]
encrypted = aes_cbc(aes_key, aes_iv, padded_data)
Result: (msg_id || encrypted), large_msg_id
```

* **encrypt_header(header, encrypted_msg, secret)**

<div>
  <a href="/file/400780400206/1/iqlwkozJe4g.139107.png/e98f3020c133d4b503">
    <img src="/file/400780400206/1/iqlwkozJe4g.139107.png/e98f3020c133d4b503" alt="Encrypt Header" class="dev_page_image" style="max-width: 600px;">
  </a>
</div>

> Encrypts a 32-byte `header` using context from `encrypted_msg` and a `secret`.

```
msg_id = encrypted_msg[0:16]
encrypt_secret = KDF(secret, "tde2e_encrypt_header")[0:32]
(aes_key, aes_iv) = HMAC-SHA512(encrypt_secret, msg_id)[0:48]
encrypted_header = aes_cbc(aes_key, aes_iv, header)
```

**Security:**

* Decryption routines **must** re-calculate and verify the `msg_id` before processing the decrypted payload.
* Replay protection is managed at the packet level using `seqno`.

#### Packet Encryption

Audio, video and conference in-call message packets are encrypted using the following process:

* **encrypt_packet(payload, extra_data, active_epochs, user_id, channel_id, seqno, private_key)**

<div>
  <a href="/file/400780400411/2/SNTNBubSRE4.286743.png/191c0cd208afb9921f">
    <img src="/file/400780400411/2/SNTNBubSRE4.286743.png/191c0cd208afb9921f" alt="Encrypt Packet" class="dev_page_image" style="max-width: 600px;">
  </a>
</div>

> Encrypts `payload` for transmission, associating it with active blockchain epochs. Epochs are essentially blocks whose shared keys are currently used for encryption.

1. **Generate Header A (Epoch List):**
    *   `epoch_id[i] = active_epochs[i].block_hash` (32 bytes per epoch_id)
    *   `header_a = active_epochs.size (4 bytes) || epoch_id[0] || epoch_id[1] || ...`

2. **Encrypt Payload with One-Time Key:**
    *   `one_time_key = random(32)`
    *   `packet_payload = channel_id (4 bytes) || seqno (4 bytes) || payload`
    *   `inner_extra_data = magic1 || header_a || extra_data`
    *   `encrypted_payload, large_msg_id = encrypt_data(packet_payload, one_time_key, inner_extra_data)`
   
3. **Generate signature**
    *   `signature = sign(magic2 || large_msg_id, private_key)`

4. **Generate Header B (Encrypted One-Time Keys):**
    *   For each `i` in `active_epochs`:
        *   `encrypted_key[i] = encrypt_header(one_time_key, encrypted_payload, active_epochs[i].shared_key)`
    *   `header_b = encrypted_key[0] || encrypted_key[1] || ...`

5. **Final Packet:** `extra_data || header_a || header_b || encrypted_payload || signature || extra_data_size`.

The final `unencrypted_prefix_size` is a 4-byte little-endian integer stored at the end of the packet. On decryption, receivers first remove this trailer, split off the unencrypted prefix, parse `header_a` and `header_b`, and then try the advertised epochs until one decrypts the one-time key successfully.

`magic1` is the CRC32 constructor magic (the part after `#`) for [e2e.callPacket](/constructor/e2e.callPacket.md).

`magic2` is the CRC32 constructor magic (the part after `#`) for [e2e.callPacketLargeMsgId](/constructor/e2e.callPacketLargeMsgId.md).

#### Security Considerations

*   **Replay Protection:** The `seqno` must be unique and monotonically increasing for each `(public key, channel_id)` pair. In case of overflow, the client must leave the call. Receivers must track recently received `seqno` values and discard packets with old or duplicate numbers.
*   **Signature Verification:** During decryption, the receiver must use the `user_id` (provided out-of-band) to look up the sender's `public_key` in the relevant blockchain state (epoch specified in `header_a`). The signature is stored as the 64 bytes immediately following `encrypted_payload`, and this public key is used to verify it against `magic2 || large_msg_id` after recalculating `large_msg_id` while decrypting the payload.
* **Unique private keys:** Clients **must** use unique private keys each time they add themselves to the blockchain. Otherwise, replay attacks could be possible.

#### Shared Key Encryption

When a `ChangeSetSharedKey` operation occurs in the blockchain, the new shared key material is distributed securely as follows:

1. **Generate New Material:**
    *   `raw_group_shared_key = random(32 bytes)` (The actual shared key for data encryption).
    *   `one_time_secret = random(32 bytes)` (A temporary secret for encrypting the *raw_group_shared_key*).
    *   `e_private_key, e_public_key = generate_private_key()` (Ephemeral key pair used to derive the per-participant secret, *one_time_secret*)

2. **Encrypt the Group Shared Key:**
    *   `encrypted_group_shared_key = encrypt_data(raw_group_shared_key, one_time_secret)`

3. **Encrypt `one_time_secret` for Each Participant:**
    *   For each `participant` in the current group state:
        *   `shared_secret = compute_shared_secret(e_private_key, participant.public_key)`
        *   `encrypted_header = encrypt_header(one_time_secret, encrypted_group_shared_key, shared_secret)`

4. **Store in Blockchain:** The `e_public_key`, `encrypted_group_shared_key`, and the list of `encrypted_header` (one per participant) are recorded in the blockchain state.

5. **Generate the real shared key used for packet encryption:** (only for [protocol version >= 1](#versioning))
    * `block_hash` is the hash of the block where this shared key is set.
    * `group_shared_key` = `HMAC-SHA512(raw_group_shared_key, block_hash)[0:32]` 

Each accepted main-chain block creates a new encryption epoch identified by that block hash. Old epochs remain usable for a short grace period, so packets in flight can still be decrypted; tdlib currently keeps old epochs for about 10 seconds and caps the active epoch list at 15.

#### Security Considerations

* Decryption is not guaranteed for all participants (e.g., if a participant has an outdated app or corrupted state).
* However, all participants who *can* successfully decrypt the key material (by reversing the `encrypt_header` and `encrypt_data` steps using their private key and the ephemeral public key) will arrive at the identical `group_shared_key`.
* Participants unable to decrypt the key **must** exit the call immediately, and specifically must not participate in the emoji generation process.

-----

### Key Verification and Emoji Generation

To ensure participants are communicating securely without a Man-in-the-Middle (MitM) attack, and to prevent manipulation of verification codes, a commit-reveal protocol is used to generate emojis based on the blockchain state and shared randomness.

#### Commit-Reveal Protocol Workflow

The protocol is run for every newly accepted main-chain block. The selected block is identified by `(chain_height, chain_hash)`, respectively the height and the hash of the selected block. 

1.  **Initial Setup (Per Participant):**
    *   Generate a cryptographically secure random 32-byte **nonce**.
    *   Compute `nonce_hash = SHA256(nonce)`.

2.  **Commit Phase:**
    *   Each participant broadcasts their `nonce_hash`, `chain_height` and `chain_hash` with a signature.
    *   Use the [e2e.chain.groupBroadcastNonceCommit](/constructor/e2e.chain.groupBroadcastNonceCommit.md) structure.
    *   The system (coordinated via the server) waits until commits have been received from *all* expected participants (based on the blockchain state at the specified height).

3.  **Reveal Phase:**
    *   Once all commits are collected, each participant broadcasts their original `nonce`, again with a signature.
    *   Use the [e2e.chain.groupBroadcastNonceReveal](/constructor/e2e.chain.groupBroadcastNonceReveal.md) structure.
    *   The system verifies each revealed `nonce` by checking `SHA256(revealed_nonce) == committed_nonce_hash`.
    *   The system waits until all valid nonces have been revealed.

4.  **Final Hash Generation:**
    *   Concatenate all successfully revealed raw 32-byte nonces sorted in lexicographic byte order. Let this be `concatenated_sorted_nonces`.
    *   Obtain the `blockchain_hash` (the hash of the latest block for which verification is being performed).
    *   Compute `emoji_hash = HMAC-SHA512(key=concatenated_sorted_nonces, message=blockchain_hash)`.
    *   Take the first 32 bytes of `emoji_hash`, ignoring the remaining 32 bytes.
    *   Convert this `emoji_hash_sliced` into the four-emoji fingerprint described below.

#### Emoji Fingerprint Generation

A 32-byte binary string (`emoji_hash_sliced` for group calls, `SHA256(key || g_a)` for [one-on-one calls](/api/end-to-end/video-calls.md)) is converted into an ordered fingerprint of four emojis as follows:

1.  Divide these bytes into 4 consecutive 8-byte chunks.
2.  Clear the highest bit of the first byte of each chunk.
3.  Interpret each chunk as a big-endian unsigned 64-bit integer.
4.  Reduce each integer modulo the length of the fixed, ordered fingerprint emoji table used by Telegram clients (which has 333 elements).
5.  Use the 4 resulting values as indexes into the emoji table, preserving their order.

In pseudocode:

```
fingerprint_hash = emoji_hash[0:32]

for i in 0..3:
    offset = i * 8
    value = big_endian_uint64(fingerprint_hash[offset:offset + 8])
    value &= 0x7fffffffffffffff
    fingerprint[i] = emoji_table[value % emoji_table.length]

// fingerprint now contains the 4 emojis
```

See [here &raquo;](https://github.com/DrKLO/Telegram/blob/d62d2ed5ec2e1c565f771edce40f8340ab085a9b/TMessagesProj/src/main/java/org/telegram/messenger/voip/EncryptionKeyEmojifier.java#L8) for the exact contents of the emoji table (contains 333 emojis).

#### TL Schema for Broadcasts

```tlang
// Phase 1: Commit
e2e.chain.groupBroadcastNonceCommit#d1512ae7 signature:int512 user_id:int64 chain_height:int32 chain_hash:int256 nonce_hash:int256 = e2e.chain.GroupBroadcast;

// Phase 2: Reveal
e2e.chain.groupBroadcastNonceReveal#83f4f9d8 signature:int512 user_id:int64 chain_height:int32 chain_hash:int256 nonce:int256 = e2e.chain.GroupBroadcast;
```

The `public_key` is extracted from the user's [e2e.chain.groupParticipant](/constructor/e2e.chain.groupParticipant.md) object using the `user_id`.  

The `signature` in both cases covers the TL-serialized object with the signature field itself zeroed out.

#### Security Considerations

* The final `emoji_hash` is unpredictable to any single participant *before* the reveal phase, as it depends on random nonces from all others.
* Participants should only process broadcast messages (commits/reveals) received from the server. Emojis should only be displayed once the process completes successfully for all participants (within reasonable network latency).
* The two-phase protocol prevents any participant (even one controlling block creation) from selectively revealing their nonce or trying multiple nonces to influence the final emoji outcome based on others' revealed values.

----

### Full TL Schema

<!-- start full schema -->

```
e2e.chain.groupBroadcastNonceCommit#d1512ae7 signature:int512 user_id:int64 chain_height:int32 chain_hash:int256 nonce_hash:int256 = e2e.chain.GroupBroadcast;
e2e.chain.groupBroadcastNonceReveal#83f4f9d8 signature:int512 user_id:int64 chain_height:int32 chain_hash:int256 nonce:int256 = e2e.chain.GroupBroadcast;

e2e.chain.groupParticipant#28852f20 user_id:long public_key:int256 flags:# add_users:flags.0?true remove_users:flags.1?true set_value:flags.2?true version:int = e2e.chain.GroupParticipant;

e2e.chain.groupState#1ddc7584 participants:Vector<e2e.chain.GroupParticipant> external_permissions:int = e2e.chain.GroupState;

e2e.chain.sharedKey#8a847e7f ek:int256 encrypted_shared_key:string dest_user_id:Vector<long> dest_header:Vector<bytes> = e2e.chain.SharedKey;

e2e.chain.changeNoop#deb4a41b nonce:int256 = e2e.chain.Change;
e2e.chain.changeSetValue#7c4f9bfa key:bytes value:bytes = e2e.chain.Change;
e2e.chain.changeSetGroupState#2cf17146 group_state:e2e.chain.GroupState = e2e.chain.Change;
e2e.chain.changeSetSharedKey#987a2158 shared_key:e2e.chain.SharedKey = e2e.chain.Change;

e2e.chain.stateProof#d6b679e6 flags:# kv_hash:int256 group_state:flags.0?e2e.chain.GroupState shared_key:flags.1?e2e.chain.SharedKey = e2e.chain.StateProof;

e2e.chain.block#639a3db6 signature:int512 flags:# prev_block_hash:int256 changes:Vector<e2e.chain.Change> height:int state_proof:e2e.chain.StateProof signature_public_key:flags.0?int256 = e2e.chain.Block;

e2e.callPacket#40a6bee9 = e2e.CallPacket;

e2e.callPacketLargeMsgId#1ce56c2d = e2e.CallPacketLargeMsgId;
```

<!-- end full schema -->
