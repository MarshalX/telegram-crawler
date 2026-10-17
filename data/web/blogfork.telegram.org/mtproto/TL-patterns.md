# TL template types

<<<<
*partial-app-decl* ::= *partial-type-app-decl* | *partial-comb-app-decl* 
*partial-type-app-decl* ::= *boxed-type-ident* *subexpr* { *subexpr* } `;`  | *boxed-type-ident* `<` *expr* { `,` *expr* } `>` `;` 
*partial-comb-app-decl* ::= *combinator-id* *subexpr* { *subexpr* } `;` 
>>>>

According to the original design, templates must be used to replace concrete values in the first few or all of the optional arguments of a constructor or polymorphic type. For example, if `Tuple int 10` is used frequently, you can declare a template for it, which will cause the appropriate constructors to be generated automatically. When using such a constructor there may be nowhere to pass an `int` type or the tuple size `10`. Similarly, it was originally planned to declared templates for `Vector int`, `Vector string`, etc. in order to generate constructors for each vector type being used type. These constructors would make it possible during deserialization to determine what kind of array is being transmitted.

Templates are not used now. Instead, the same universal constructors (for example, `vector {t:Type} [t] = Vector t`) are used with the values of the optional parameters being inferred from the type of the result (if we already know from the schema that in this location there must be a `Vector int` during deserialization, we understand that we will see the universal `vector` constructor in which *t* is equal to `int`).

This approach is better in that it is not necessary to define `Vector SomeType` templates in advance for all possible types in order to generate their own constructors for each of these cases. Nevertheless, there is a drawback. If someone wants to transmit the serialization of a value of the clothed type `Vector int` as a serialization of a value of type `Object`, a problem arises during serialization: after seeing the universal `vector` constructor and then reading the vector length, we cannot determine what type of values should be expected next.

In theory, this problem can be solved by using the full form of the constructor (`@vector`) corresponding to `vector` (it is automatically defined and is different in that all of the optional parameters become required), or by defining

<<<<
object X:Type X = TypedObject 
>>>>

and passing the object type explicitly. [Type serialization](TL-types) is required in both cases.
