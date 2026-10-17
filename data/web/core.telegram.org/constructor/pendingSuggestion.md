# pendingSuggestion

Represents a [custom pending suggestion »](/api/config.md#custom-suggestions).

```tl
pendingSuggestion#e7e82e12 suggestion:string title:TextWithEntities description:TextWithEntities url:string = PendingSuggestion;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **suggestion** | [string](/type/string.md) | The suggestion ID, can be passed to [help.dismissSuggestion](/method/help.dismissSuggestion.md). |
| **title** | [TextWithEntities](/type/TextWithEntities.md) | Title of the suggestion. |
| **description** | [TextWithEntities](/type/TextWithEntities.md) | Body of the suggestion. |
| **url** | [string](/type/string.md) | URL to open when the user clicks on the suggestion. |

### Type
[PendingSuggestion](/type/PendingSuggestion.md)

### Related pages

#### [help.dismissSuggestion](/method/help.dismissSuggestion.md)
Dismiss a [suggestion, see here for more info »](/api/config.md#suggestions).

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.