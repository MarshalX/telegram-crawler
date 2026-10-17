# langpack.getLanguages

Get information about all languages in a localization pack

```tl
---functions---
langpack.getLanguages#42c6978f lang_pack:string = Vector<LangPackLanguage>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **lang\_pack** | [string](/type/string.md) | Platform identifier (i.e. `android`, `tdesktop`, etc). |

### Result
[Vector](/type/Vector%20t)&lt;[LangPackLanguage](/type/LangPackLanguage.md)&gt;

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | LANG\_PACK\_INVALID | The provided language pack is invalid. |