# vector

A universal vector constructor.

```tl
vector#1cb5c415 {t:Type} # [ t ] = Vector t;
```

### Parameters

This constructor does not require any parameters.

### Type
[Vector t](/type/Vector%20t)

### Params additional

For serialization write the constructor id `0x1cb5c415`:**int**, then the number of vector elements - #:**int**, then, one after another, the # of the elements of the type **t**, that was implicitly passed to the constructor.