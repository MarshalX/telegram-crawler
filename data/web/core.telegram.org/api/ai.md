# AI features


Telegram offers many AI features powered by [Cocoon](https://cocoon.org) — a decentralized network designed to maximize privacy.  

### Compose messages
    
    inputAiComposeToneID#773c080 id:long access_hash:long = InputAiComposeTone;
    inputAiComposeToneSlug#1fa01357 slug:string = InputAiComposeTone;
    inputAiComposeToneDefault#1fe9a9bf tone:string = InputAiComposeTone;

    messageEntityDiffInsert#71777116 offset:int length:int = MessageEntity;
    messageEntityDiffReplace#c6c1e5a7 offset:int length:int old_text:string = MessageEntity;
    messageEntityDiffDelete#0652c1c5 offset:int length:int = MessageEntity;

    textWithEntities#751f3146 text:string entities:Vector<MessageEntity> = TextWithEntities;

    messages.composedMessageWithAI#90d7adfa flags:# result_text:TextWithEntities diff_text:flags.0?TextWithEntities = messages.ComposedMessageWithAI;

    ---functions---

    messages.composeMessageWithAI#daecc589 flags:# proofread:flags.0?true emojify:flags.3?true text:TextWithEntities translate_to_lang:flags.1?string tone:flags.2?InputAiComposeTone = messages.ComposedMessageWithAI;

Use [messages.composeMessageWithAI](/method/messages.composeMessageWithAI.md) when writing a message to invoke Telegram's AI Editor that can translate, transform, fix up and/or emojify your text in a number of different ways, privately powered by [Cocoon](https://cocoon.org)!  

This method is invoked when pressing the AI button in the text input bar in chats: the AI button should be shown only for messages with more than 3 lines of text (even if the method itself doesn't have any limitation).  

There are multiple available editor modes, enabled by the appropriate flag:

- `proofread` - Proofread and fix mistakes in the message
- `translate_to_lang` - Translate the message to the specified language (pass the desired language code)
- `tone` - Rephrase the message using the specified [tone &raquo;](#ai-compose-tones)
- `emojify` - Add emojis to the message

All of the modes specified above can be combined.  

Pass the text to transform in `text`: the method will return a [messages.composedMessageWithAI](/constructor/messages.composedMessageWithAI.md) constructor, containing the transformed message in the `result_text` field, with all [styled text entities](/api/entities.md) offsets appropriately moved/resized/deleted as needed.  

If **only** the proofreading mode (`proofread`) is enabled, the method will additionally populate [messages.composedMessageWithAI](/constructor/messages.composedMessageWithAI.md).`diff_text` with a "pre-rendered" diff between the old and the new message text.  

`diff_text` should be rendered by simply rendering the `textWithEntities`, which only in this case will contain **only** [diff entities, rendered as specified here &raquo;](/api/entities.md#diff-entities) (normal styled text entities will always be stripped only in `diff_text`, never in `result_text`).  

[Premium](/api/premium.md) users have **50x** more AI text transformations per day: if a non-premium user reaches the daily limit, an `AICOMPOSE_FLOOD_PREMIUM` RPC error will be emitted, which should show a [Premium](/api/premium.md) modal with the [ai_compose &raquo; feature identifier](/api/premium.md#ai-compose).  

#### AI compose tones

    aiComposeTone#cff63ea9 flags:# creator:flags.0?true id:long access_hash:long slug:string title:string emoji_id:flags.1?long prompt:flags.4?string installs_count:flags.2?int author_id:flags.3?long example_english:flags.5?AiComposeToneExample = AiComposeTone;
    aiComposeToneDefault#9bad6414 tone:string emoji_id:long title:string = AiComposeTone;

    aicompose.tonesNotModified#c1f46103 = aicompose.Tones;
    aicompose.tones#6c9d0efe hash:long tones:Vector<AiComposeTone> users:Vector<User> = aicompose.Tones;

    updateAiComposeTones#8c0f91fb = Update;

    inputAiComposeToneID#773c080 id:long access_hash:long = InputAiComposeTone;
    inputAiComposeToneSlug#1fa01357 slug:string = InputAiComposeTone;
    inputAiComposeToneDefault#1fe9a9bf tone:string = InputAiComposeTone;

    aiComposeToneExample#f1d628ec from:TextWithEntities to:TextWithEntities = AiComposeToneExample;

    ---functions---

    aicompose.getTones#abd59201 hash:long = aicompose.Tones;
    
    aicompose.createTone#4aa83913 flags:# display_author:flags.0?true emoji_id:long title:string prompt:string = AiComposeTone;
    aicompose.updateTone#903bcf59 flags:# tone:InputAiComposeTone display_author:flags.0?Bool emoji_id:flags.1?long title:flags.2?string prompt:flags.3?string = AiComposeTone;
    aicompose.deleteTone#dd39316a tone:InputAiComposeTone = Bool;
    
    aicompose.getTone#b2e8ba03 tone:InputAiComposeTone = aicompose.Tones;
    aicompose.getToneExample#d1b4ab14 tone:InputAiComposeTone num:int = AiComposeToneExample;
    aicompose.saveTone#1782cbb1 tone:InputAiComposeTone unsave:Bool = Bool;

To fetch the list of default [AI composer tones &raquo;](#compose-messages) provided by Telegram, as well as custom tones saved (installed) by the current user, use [aicompose.getTones](/method/aicompose.getTones.md), which returns an array of [AiComposeTone](/type/AiComposeTone.md) constructors.  

Changes to the installed AI composer tone list are signaled by the [updateAiComposeTones](/constructor/updateAiComposeTones.md) update, which should trigger a new call to [aicompose.getTones](/method/aicompose.getTones.md) to re-cache the updated value.  

Default AI composer tones are represented by an [aiComposeToneDefault](/constructor/aiComposeToneDefault.md) constructor, and should be referred to by using [inputAiComposeToneDefault](/constructor/inputAiComposeToneDefault.md).  

In addition to the built-in tones, users can create, save and share their own custom tones, represented by the [aiComposeTone](/constructor/aiComposeTone.md) constructor and referenced either by ID with [inputAiComposeToneID](/constructor/inputAiComposeToneID.md) or by public slug with [inputAiComposeToneSlug](/constructor/inputAiComposeToneSlug.md).  

A custom tone is created with [aicompose.createTone](/method/aicompose.createTone.md), passing a `title` (up to [aicompose_tone_title_length_max &raquo;](/api/config.md#aicompose-tone-title-length-max) UTF-8 characters), an `emoji_id` for the tone's icon (a [custom emoji](/api/custom-emoji.md)) and a `prompt` (up to [aicompose_tone_prompt_length_max &raquo;](/api/config.md#aicompose-tone-prompt-length-max) UTF-8 characters) describing how the AI should rephrase messages; set `display_author` to be publicly credited as the tone's author.  

Use [aicompose.updateTone](/method/aicompose.updateTone.md) to edit a tone you created and [aicompose.deleteTone](/method/aicompose.deleteTone.md) to delete it.  

Install or uninstall a tone with [aicompose.saveTone](/method/aicompose.saveTone.md): non-[Premium](/api/premium.md) users may install up to [aicompose_tone_saved_limit_default &raquo;](/api/config.md#aicompose-tone-saved-limit-default) tones, [Premium](/api/premium.md) users up to [aicompose_tone_saved_limit_premium &raquo;](/api/config.md#aicompose-tone-saved-limit-premium) tones.  

A single tone can be resolved with [aicompose.getTone](/method/aicompose.getTone.md), for example after the user opens an [AI compose tone link &raquo;](/api/links.md#ai-compose-tone-links) or previews a [webPage](/constructor/webPage.md) of type `telegram_aicomposetone` (carrying a [webPageAttributeAiComposeTone](/constructor/webPageAttributeAiComposeTone.md)).  

A preview of how a tone rephrases a sample message is available through [aicompose.getToneExample](/method/aicompose.getToneExample.md), returning an [aiComposeToneExample](/constructor/aiComposeToneExample.md); pass an increasing `num` (up to [aicompose_tone_examples_num &raquo;](/api/config.md#aicompose-tone-examples-num)) to cycle through the available examples.  

Custom tones can be used wherever a tone is accepted, including [messages.composeMessageWithAI](/method/messages.composeMessageWithAI.md).`tone`.

### Summarize messages

    textWithEntities#751f3146 text:string entities:Vector<MessageEntity> = TextWithEntities;

    ---functions---
    
    messages.summarizeText#abbbd346 flags:# peer:InputPeer id:int to_lang:flags.0?string tone:flags.2?string = TextWithEntities;

Invoke [messages.summarizeText](/method/messages.summarizeText.md) to summarize the contents of the message with AI, privately powered by [Cocoon](https://cocoon.org).  

Clients should offer a summarization button for messages with [message](/constructor/message.md).`summary_from_language` set.  

The `summary_from_language` field is a server-provided UI hint and contains the detected language of the message text to summarize; it is not a required argument or precondition to invoke [messages.summarizeText](/method/messages.summarizeText.md), which can be invoked regardless of the value of `summary_from_language` for the target message.  

Pass the message's ID in `id`, and the chat where the message is located in `peer`.  

You may choose a custom [tone &raquo;](#ai-compose-tones) for the summary, passing the tone identifier to `tone`.  

If `to_lang` is set, the summary is generated in the specified target language; otherwise it is generated in the message's language.  

### Chatbot AI features

Telegram bots offer a number of features for AI chatbots: 

- [Live response streaming &raquo;](/api/bots/ai.md#live-response-streaming)
- [Bot forums &raquo;](/api/bots/ai.md#bot-forums)
