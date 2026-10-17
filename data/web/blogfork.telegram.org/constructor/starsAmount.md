# starsAmount

Describes a real (i.e. possibly decimal) amount of [Telegram Stars](/api/stars.md).

```tl
starsAmount#bbb6b4a3 amount:long nanos:int = StarsAmount;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **amount** | [long](/type/long.md) | The integer amount of Telegram Stars. |
| **nanos** | [int](/type/int.md) | The decimal amount of Telegram Stars, expressed as nanostars (i.e. 1 nanostar is equal to `1/1_000_000_000`th (one billionth) of a Telegram Star). \
This field may also be negative (the allowed range is from `-999_999_999` to `999_999_999`). |

### Type
[StarsAmount](/type/StarsAmount.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.