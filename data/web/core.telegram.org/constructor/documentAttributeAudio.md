# documentAttributeAudio

Represents an audio file

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===23===
documentAttributeAudio#051448e5 duration:int = DocumentAttribute;

===45===
documentAttributeAudio#ded218e0 duration:int title:string performer:string = DocumentAttribute;

===46===
documentAttributeAudio#9852f9c6 flags:# duration:int title:flags.0?string performer:flags.1?string waveform:flags.2?bytes = DocumentAttribute;
```

#### API schema
<!-- /schema-blocks -->

```tl
documentAttributeAudio#9852f9c6 flags:# voice:flags.10?true duration:int title:flags.0?string performer:flags.1?string waveform:flags.2?bytes = DocumentAttribute;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **voice** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | Whether this is a voice message |
| **duration** | [int](/type/int.md) | Duration in seconds |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Name of song |
| **performer** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Performer |
| **waveform** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[bytes](/type/bytes.md) | Waveform: consists in a series of bitpacked 5-bit values. \
Example implementation: [android](https://github.com/DrKLO/Telegram/blob/4d7a3a40c88ce28a211aa2814e9569389fc40567/TMessagesProj/jni/audio.c#L562). |

### Type
[DocumentAttribute](/type/DocumentAttribute.md)