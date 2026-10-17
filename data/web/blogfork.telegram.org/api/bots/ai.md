# AI features for bots


Telegram bots offer a number of features for AI chatbots.

### Live response streaming

    sendMessageTextDraftAction#376d975c random_id:long text:TextWithEntities = SendMessageAction;

    updateUserTyping#2a17bf5c flags:# user_id:long top_msg_id:flags.0?int action:SendMessageAction = Update;
    
    ---functions---

    messages.setTyping#58943ee2 flags:# peer:InputPeer top_msg_id:flags.0?int action:SendMessageAction = Bool;

Live response streaming allows chatbots to stream text responses to the user as they are generated.  

Live response streaming is implemented using live drafts, represented by the [sendMessageTextDraftAction](/constructor/sendMessageTextDraftAction.md) typing action, sent using [messages.setTyping](/method/messages.setTyping.md) and received inside of [updateUserTyping](/constructor/updateUserTyping.md) updates.  

Unlike other typing notifications, incoming live drafts are rendered as a normal messages, always pinned to the bottom of the chat, as if they were the last sent message in the chat.  

Currently, live drafts can only be sent to users.  
Both bots and normal users can send live drafts to other users.  

Every live draft is identified by a combination of the following values:

- Live draft ID, contained in [sendMessageTextDraftAction](/constructor/sendMessageTextDraftAction.md).`random_id`
- Chat ID
- Topic ID (for [bot forums](#bot-forums))

This means that i.e. `{random_id: 1, chat_id: 1234, topic_id: 2}` and `{random_id: 1, chat_id: 1234, topic_id: 3}` point to different live drafts that can be updated independently.  

Live draft messages should be deleted automatically by graphical clients [message_typing_draft_ttl &raquo;](/api/config.md#message-typing-draft-ttl) seconds after they're received, or when receiving a normal message within the same chat/bot forum topic, whichever comes first.  

In other words, each live draft (identified by `random_id`, `chat_id` and `topic_id` as specified above) has its own expiration date, equal to `reception_date + message_typing_draft_ttl`.  

To update a live draft, simply send a new [sendMessageTextDraftAction](/constructor/sendMessageTextDraftAction.md) with the same `random_id` to the same chat and topic: graphical clients should render this by updating the live draft message, fading in (or otherwise animating) the added characters (the number of chars to fade in is equal to `max(0, strlen(new) - strlen(prev))`).    

To create a new live draft, send a new [sendMessageTextDraftAction](/constructor/sendMessageTextDraftAction.md) with a different `random_id` to the same chat and topic: this will add a new live draft along with existing ones, and graphical clients should render this by appending a new live draft message to the chat, fading in (or otherwise animating) all characters (the number of chars to fade in is equal to `strlen(new)`).  

To recap, each chat (or each bot forum topic, for [bot forums &raquo;](#bot-forums)) can have a variable number of live drafts, with each new draft replacing the previous one only if it has the same `random_id` and is sent to the same topic and peer.  

The exact batching of live draft updates is up to the bot: live drafts can be sent, for example, every `N` generated UTF-8 chars or every `M` seconds, whichever comes first.  

However, take care to pick appropriate values of `N` and `M` to avoid hitting the rate limits of [messages.setTyping](/method/messages.setTyping.md), documented below:

- Max 20 calls in 5 seconds
- Max 40 calls in 30 seconds

These ratelimits apply per `peer` (i.e. you can send 80 calls in 30 seconds if 40 are sent to peer A and 40 to peer B).  

If the bot/user exceeds a ratelimit, a [`FLOOD_WAIT_%d` error &raquo;](/api/errors.md#420-flood) will be returned, preventing further method calls until the ratelimit expires (i.e. making 20 calls at second 0 and then 1 more call at second 1 will return `FLOOD_WAIT_3`).  

If the bot developer picks wrong N/M values (and/or depending on the output token generation speed of the LLM being used), the bot might regularly hit the ratelimits, leading to janky updates in the live draft: to avoid this, pick sensible N/M values (possibly tiered, matching the two ratelimit tiers), and locally ratelimiting calls to avoid exceeding the chosen limits if the LLM generates too much text too quickly, triggering the `N` limit too frequently.  

Please note that even if sensible local ratelimits are picked, the server may still send short cool-down FLOOD_WAITs (at most `3` seconds) if the client makes too many queries in a very short period of time, even if no ratelimit was hit: make sure to respect them.  

The same ratelimits apply to the bot API counterparts of [messages.setTyping](/method/messages.setTyping.md), like [sendMessageDraft](/bots/api/methods/sendmessagedraft.md), [sendChatAction](/bots/api/methods/sendchataction.md), and so on.  

> Please note that not all Telegram clients currently support rendering multiple live drafts with different `random_id`s in the same topic concurrently, some clients may treat all drafts sent to the same topic as having the same `random_id`.  

### Bot forums

Bots can behave like [forums &raquo;](/api/forum.md) if **Threaded mode** is enabled via [@botfather](https://t.me/botfather).  

This is especially useful for AI chatbots, see [here &raquo;](/api/forum.md#bot-forums) for a detailed description of bot forums.  

Note: this feature is subject to an additional fee for Telegram Star purchases as described in [Section 6.2.6](https://telegram.org/tos/bot-developers#6-2-6-enabling-topics-in-private-chats) of our Terms of Service for Bot Developers.
