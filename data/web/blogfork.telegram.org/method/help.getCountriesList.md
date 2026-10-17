# help.getCountriesList

Get name, ISO code, localized name and phone codes/patterns of all available countries

```tl
help.countriesListNotModified#93cc1f32 = help.CountriesList;
help.countriesList#87d0759e countries:Vector<help.Country> hash:int = help.CountriesList;
---functions---
help.getCountriesList#735787a8 lang_code:string hash:int = help.CountriesList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **lang\_code** | [string](/type/string.md) | Language code of the current user |
| **hash** | [int](/type/int.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). |

### Result
[help.CountriesList](/type/help.CountriesList.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.