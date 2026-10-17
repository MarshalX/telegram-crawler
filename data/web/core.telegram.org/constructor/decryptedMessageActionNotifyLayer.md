# decryptedMessageActionNotifyLayer

A notification stating the API layer that is used by the client. You should use your current layer and take notice of the layer used on the other side of a conversation when sending messages.

```tl
===17===
decryptedMessageActionNotifyLayer#f3048883 layer:int = DecryptedMessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **layer** | [int](/type/int.md) | Layer number, must be **17** or higher (this constructor was introduced in Layer 17. |

### Type
[DecryptedMessageAction](/type/DecryptedMessageAction.md)