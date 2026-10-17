# JSONValue

JSON value

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===216===
jsonArray#f7444763 value:Vector<JSONValue> = JSONValue;
jsonBool#c7345e6a value:Bool = JSONValue;
jsonNull#3f6d7b68 = JSONValue;
jsonNumber#2be0dfa4 value:double = JSONValue;
jsonObject#99c1d49d value:Vector<JSONObjectValue> = JSONValue;
jsonString#b71e767a value:string = JSONValue;
```

API schema:
<!-- /schema-blocks -->

```tl
jsonNull#3f6d7b68 = JSONValue;
jsonBool#c7345e6a value:Bool = JSONValue;
jsonNumber#2be0dfa4 value:double = JSONValue;
jsonString#b71e767a value:string = JSONValue;
jsonArray#f7444763 value:Vector<JSONValue> = JSONValue;
jsonObject#99c1d49d value:Vector<JSONObjectValue> = JSONValue;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [jsonNull](/constructor/jsonNull.md) | null JSON value |
| [jsonBool](/constructor/jsonBool.md) | JSON boolean value |
| [jsonNumber](/constructor/jsonNumber.md) | JSON numeric value |
| [jsonString](/constructor/jsonString.md) | JSON string |
| [jsonArray](/constructor/jsonArray.md) | JSON array |
| [jsonObject](/constructor/jsonObject.md) | JSON object value |