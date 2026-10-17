# Formal TL declaration

See also [TL Language](TL). 
For the syntax of declaring combinators, see in article [Formal declaration of TL combinators](TL-combinators). 
For the syntax of patterns, see in article [Formal declaration of TL patterns](TL-patterns). 

### Tokens

Comments are the same as in C/C++. They are removed by a lexical parser (for example, being replaced by a single space). Whitespace separates tokens. Except for string constants, tokens cannot contain spaces. 

Character classes: 

<<<<
*lc-letter* ::= `a` | `b` | ... | `z` 
*uc-letter* ::= `A` | `B` | ... | `Z` 
*digit* ::= `0` | `1` | ... | `9` 
*hex-digit* ::= *digit* | `a` | `b` | `c` | `d` | `e` | `f` 
*underscore* ::= `_` 
*letter* ::= *lc-letter* | *uc-letter* 
*ident-char* ::= *letter* | *digit* | *underscore* 
>>>>

Simple identifiers and keywords: 

<<<<
*lc-ident* ::= *lc-letter* { *ident-char* }  
*uc-ident* ::= *uc-letter* { *ident-char* } 
*namespace-ident* ::= *lc-ident* 
*lc-ident-ns* ::= [ *namespace-ident* `.` ] *lc-ident* 
*uc-ident-ns* ::= [ *namespace-ident* `.` ] *uc-ident* 
*lc-ident-full* ::= *lc-ident-ns* [ `#` *hex-digit* *8 ] 
>>>>

Tokens:

<<<<
*underscore* ::= `_`
*colon* ::= `:` 
*semicolon* ::= `;` 
*open-par* ::= `(` 
*close-par* ::= `)` 
*open-bracket* ::= `[` 
*close-bracket* ::= `]` 
*open-brace* ::= `{` 
*close-brace* ::= `}` 
*triple-minus* ::= `---` 
*nat-const* ::= *digit* { *digit* } 
*lc-ident-full* 
*lc-ident* 
*uc-ident-ns* 
*equals* ::= `=` 
*hash* ::= `#` 
*question-mark* ::= `?` 
*percent* ::= `%` 
*plus* ::= `+` 
*langle* ::= `<` 
*rangle* ::= `>` 
*comma* ::= `,` 
*dot* ::= `.` 
*asterisk* ::= `*` 
*excl-mark* ::= `!` 
*Final-kw* ::= `Final` 
*New-kw* ::= `New` 
*Empty-kw* ::= `Empty`
>>>>

`Final` is a reserved keyword, e.g. a special token. Words like `Type` are not keywords, rather they are identifiers with preset values. 

Tokens consisting of one or more constant symbols shall be hereafter denoted using terms in quotation marks (for example, `---` replaces *triple-minus*). 

## Syntax

### General syntax of a TL program
Syntactically, a TL program consists of a stream of tokens (separated by spaces, which are ignored at this stage). General program structure: 

<<<<
*TL-program* ::= *constr-declarations* { `---` `functions` `---` *fun-declarations* | `---` `types` `---` *constr-declarations* } 
>>>>

Here the constructor- and function declarations are nearly identical in their syntax (they are both combinators): 

<<<<
*constr-declarations* ::= { *declaration* } 
*fun-declarations* ::= { *declaration* } 
>>>>

There are various declarations: 

<<<<
*declaration* ::= *combinator-decl* | *partial-app-decl* | *final-decl* 
>>>>

Before explaining how declarations of combinators, partial applications, and type `finalization` are given, we will introduce additional syntactical categories: 

### Syntactical categories and constructions

The concept of an expression (*expr*) is important. There are type expressions (*type-expr*) and numeric expressions (*nat-expr*). However, they are defined the same way. Their correctness as type- or numeric expressions is checked when the type of the analyzed expression is checked. 

<<<<
*type-expr* ::= *expr* 
*nat-expr* ::= *expr* 
*expr* ::= { *subexpr* } 
*subexpr* ::= *term* | *nat-const* `+` *subexpr* | *subexpr* `+` *nat-const* 
*term* ::= `(` *expr* `)` | *type-ident* | *var-ident* | *nat-const* | `%` *term* | *type-ident* `<` *expr* { `,` *expr* } `>` 
*type-ident* ::= *boxed-type-ident* | *lc-ident-ns* | `#` 
*boxed-type-ident* ::= *uc-ident-ns* 
*var-ident* ::= *lc-ident* | *uc-ident* 
*type-term* ::= *term* 
*nat-term* ::= *term* 
>>>>

Note that writing `E = E_1 E_2 ... E_n` in the expression for *expr* means applying the function *E_1* to the argument *E_2*, applying the result to *E_3*, etc. Specifically, `E_1 E_2 E_3 = (E_1 E_2) E_3`. A solitary `#` is included in *type-ident*, because it is actually the identifier for a built-in type (`#` alias `nat`). 

The expression `E<E_1,...,E_n>` is syntactic sugar for `(E (E_1) ... (E_n))`, i.e. both expressions are transformed into the same internal representation. 

### Combinator declarations

<<<<
*combinator-decl* ::= *full-combinator-id* { *opt-args* } { *args* } `=` *result-type* `;` 
*full-combinator-id* ::= *lc-ident-full* | `_` 
*combinator-id* ::= *lc-ident-ns* | `_`
*opt-args* ::= `{` *var-ident* { *var-ident* } : [*excl-mark*] *type-expr* `}` 
*args* ::= *var-ident-opt* `:` [ *conditional-def* ] [ `!` ] *type-term* 
*args* ::= [ *var-ident-opt* `:` ] [ *multiplicity* `*`] `[` { *args* } `]` 
*args* ::= `(` *var-ident-opt* { *var-ident-opt* } `:` [`!`] *type-term* `)` 
*args* ::= [ `!` ] *type-term* 
*multiplicity* ::= *nat-term* 
*var-ident-opt* ::= *var-ident* | `_` 
*conditional-def* ::= *var-ident* [ `.` *nat-const* ] `?` 
*result-type* ::= *boxed-type-ident* { *subexpr* } 
*result-type* ::= *boxed-type-ident* `<` *subexpr* { `,` *subexpr* } `>` 
>>>>

See [Formal declaration of TL combinators](TL-combinators) for a description of what exactly this means. Here we will only note that when declaring the type of a combinator's next argument, only the names of previously arranged (more to the left) arguments of the same combinator may be used as variables, but when declaring the result type you can use all of its parameters (of type `Type` and `#`). 

Note that the names of combinators declared in this way may be used in TL itself only as the corresponding bare types. The only combinators that appear in declarations are built-in: `O : #` and `S : # -> #`. 

There are also “pseudo-declarations” that are allowed only to declare built-in types (such as `int ? = Int;`): 

<<<<
*builtin-combinator-decl* ::= *full-combinator-id* `?` `=` *boxed-type-ident* `;` 
>>>>

### Partial applications (patterns)

<<<<
*partial-app-decl* ::= *partial-type-app-decl* | *partial-comb-app-decl* 
*partial-type-app-decl* ::= *boxed-type-ident* *subexpr* { *subexpr* } `;`  | *boxed-type-ident* `<` *expr* { `,` *expr* } `>` `;` 
*partial-comb-app-decl* ::= *combinator-id* *subexpr* { *subexpr* } `;` 
>>>>

See [Formal declaration of TL patterns](TL-patterns). 

### Type finalization

<<<<
*final-decl* ::= `New` *boxed-type-ident* `;` | `Final` *boxed-type-ident* `;` | `Empty` *boxed-type-ident* `;`
>>>>

This type of declaration means that there must not be any constructor for the indicated type: before the declaration for `New` and after the declaration for `Final`. The keyword `Empty` enables both effects.

### Predefined identifiers

Nearly all predefined identifiers may be given using the following schema (usually located in `common.tl`):

<<<<
/////
//
// Common Types
//
/////

// Built-in types
int ? = Int;
long ? = Long;
double ? = Double;
string ? = String;

// Boolean emulation
boolFalse = Bool;
boolTrue = Bool;

// Boolean for diagonal queries
boolStat statTrue:int statFalse:int statUnknown:int = BoolStat;

// Vector
vector {t:Type} # [t] = Vector t;
tuple {t:Type} {n:#} [t] = Tuple t n;
vectorTotal {t:Type} total_count:int vector:%(Vector t) = VectorTotal t;

/////
//
// Result- (Maybe-) types
//
/////

resultFalse {t:Type} = Maybe t;
resultTrue {t:Type} result:t = Maybe t;

pair {X:Type} {Y:Type} a:X b:Y = Pair X Y;
map {X:Type} {Y:Type} key:X value:Y = Map X Y;

Empty False;
true = True;

unit = Unit;
>>>>

* Predefined identifier `Type`: This type signifies the type of all types. It is usually used to specify the types of optional parameters in the constructors of polymorphic types. If strongly desired, it can be used in its own right, but this is very rarely needed in practice.

* Identifier `#`: This type is used to specify a special type of nonnegative integers in the range from 0 to 2^31-1; its main purpose is the same as that of `Type`. There are two built-in constructors: `O` : # and `S` : # -> # (“null” and “next number”, respectively), which work as if `#` was defined using the schema

<<<<
O = #;
S # = #;
>>>>

* Identifier `Tuple`: Type -> # -> Type denotes a set of the specified number of values of the indicated type. In other words, *Tuple X n* means “a set of *n* values of type *X*".

* The type`Bool`, with two constructors `boolTrue` and `boolFalse`, is used to transmit Boolean values.

* The constructor-less type `False` may be used instead of undeclared or invalid types in the construction of a TL schema, because any attempt to (de)serialize a value of type `False` will produce an error. Usage Example:

<<<<
user {flags:#} id:flags.0?string first_name:flags.1?string last_name:flags.2?string reserved3:flags.3?False reserved4:flags.4?False = User flags;
user_present {flags:#} info:%(User flags) = UserInfo flags;
user_absent {flags:#} = UserInfo flags;
getUser flags:# id:int = !UserInfo flags;
>>>>

In the future, bits 3 and 4 in the `flags` field may be used to transmit new fields after changing the names and types of the `reserved3` and `reserved4` fields. This will change the `user` constructor's number, but this isn't too important, since the `User flags` type is only used as a bare type. Transmitting bits 3 or 4 in the `flags` field in a `getUser` query before these fields have actually been defined will lead to an error in the (de)serialization of the request.

* The type `True` with a single null constructor `true` plays a role similar to the void type in C/C++. It is especially useful as a bare type `%True`, alias `true`, because its serialization has zero length. For example, the `first_name:flags.1?string` constructor used above is in fact shorthand for (the as-yet unsupported) alternative-type general constructor `first_name:(flags.1?string:true)`.

When directly used in a [conditional field](/mtproto/TL-combinators.md#conditional-fields) it may simply indicate the presence (absence) of a certain parameter with void type.
If the conditional field exists, the associated parameter will not be populated; the conditional field simply exists and the existance value can be used to perform certain operations, example:

```
user {flags:#} id:flags.0?string first_name:flags.1?string last_name:flags.2?string bot:flags.3?true reserved4:flags.4?False = User flags;
```

If bit 3 of the `flags` parameter isn't set, the user is a normal user.
If bit 3 of the `flags` parameter is set, this indicates that the specified user is a bot: however, during deserialization, the `bot` parameter must not be assigned any value, since `true` is actually a `void` type.

* The type`Unit` with a single null constructor `Unit` is similar to the previous type.

#### ANTLR definition

An [ANLTR](https://www.antlr.org) definition of TL grammar can be found [here&nbsp;&raquo;](https://gitlab.com/telekram/telekram/-/blob/master/generator/src/commonMain/antlr/TL.g4).  
