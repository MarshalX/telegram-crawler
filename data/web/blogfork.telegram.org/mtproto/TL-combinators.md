# Formal description of TL combinators

﻿[Formal declaration of TL combinators](/mtproto/TL-combinators.md)

Main article: [Formal description of TL](TL-formal). See also [TL Language](TL).

Combinators in TL are declared as follows:

<<<<
*combinator-decl* ::= *full-combinator-id* { *opt-args* } { *args* } `=` *result-type* `;` 
*full-combinator-id* ::= *lc-ident-full* | `_` 
*combinator-id* ::= *lc-ident-ns* | `_`
*opt-args* ::= `{` *var-ident* { *var-ident* } : [*excl-mark*] *type-expr* `}` 
*args* ::= *var-ident-opt* `:` [ *conditional-arg-def* ] [ `!` ] *type-term* 
*args* ::= [ *var-ident-opt* `:` ] [ *multiplicity* `*`] `[` { *args* } `]` 
*args* ::= `(` *var-ident-opt* { *var-ident-opt* } `:` [`!`] *type-term* `)` 
*args* ::= [ `!` ] *type-term* 
*multiplicity* ::= *nat-term* 
*var-ident-opt* ::= *var-ident* | `_` 
*conditional-arg-def* ::= *var-ident* [ `.` *nat-const* ] `?` 
*result-type* ::= *boxed-type-ident* { *subexpr* } 
*result-type* ::= *boxed-type-ident* `<` *subexpr* { `,` *subexpr* } `>` 
>>>>

We shall clarify what all this means.

* A combinator identifier is either an identifier starting with a lowercase Latin letter (*lc-ident*), or a namespace identifier (also *lc-ident*) followed by a period and another *lc-ident*. Therefore, `cons` and `lists.get` are valid combinator identifiers.

* A combinator has a *name*, also known as a *number* (not to be confused with the *designation*) -- a 32-bit number that unambiguously determines it. It is either calculated automatically (see below) or it is explicitly assigned in the declaration. To do this, a hash mark (`#`) and exactly 8 hexadecimal digits -- the combinator's name -- are added to the identifier of the combinator being defined.

* A combinator's declaration begins with its identifier, to which its name (separated by a hash mark) may have been added.

* After the combinator identifier comes the main part of the declaration, which consists of declarations of *fields* (or *variables*), including an indication of their *types*.

* First come declarations of optional fields (of which there may be several or none at all). Then there are the declarations of the required fields (there may not be any of these either).

* Any identifier that begins with an uppercase or lowercase letter and which does not contain references to a namespace can be a field (variable) identifier. Using *uc-ident* for identifiers of variable types and *lc-indent* for other variables is good practice. 

* Next a combinator declaration contains the equals sign (`=`) and the result type (it may be composite or appearing for the first time). The result type may be polymorphic and/or dependent; any fields of the defined constructor's fields of type `Type` or `#` may be returned (as subexpressions).

* A combinator declaration is terminated with a semicolon.

In what follows, a constructor's *fields*, *variables*, and *arguments* mean the same thing.

### Optional field declarations

* These have the form `{` *field_1* ... *field_k* `:` *type-expr* `}`, where *field_i* is a variable (field) identifier that is unique within the scope of the combinator declaration, and *type-expr* is a type shared by all of the fields. 

* If *k>1*, this entry is functionally equivalent to `{` *field_1* `:` *type-expr* `}` ... `{` *field_k* `:` *type-expr* `}`. 

* All optional fields must be explicitly named (using `_` instead of *field_i* is not allowed).

* Moreover, at present the names of all optional fields must share the combinator's result type (possibly more than once) and themselves be of type `#` (i,e., `nat`) or `Type`. Therefore, if the exact result type is known, it is possible to determine the values of all of the combinator's implicit parameters (possibly obtaining a contradiction of the form `2=3` in doing so, which means that the combinator is not allowed in the context).

### Required field declarations

* These may have the form `(` *field_1* ... *field_k* `:` *type-expr* `)`, similar to an optional field declaration, but with parentheses. This entry is equivalent to `(` *field_1* `:` *type-expr* `)` ... `(` *field_k* : *type-expr* `)`, where the fields are defined one at a time.

* The underscore sign (`_`) can be used as names of one or more fields (*field_i*), indicating that the field is anonymous (the exact name is unimportant).

* One field may be declared without outer parentheses, like this: *field_id* `:` *type-expr*. Here, however, if *type-expr* is a complex type, parentheses may be necessary around *type-expr* (this is reflected in BNF).

* Furthermore, one anonymous field may be declared using a *type-expr* entry, functionally equivalent to `_` `:` *type-expr*.

* Required field declarations follow one after another, separated by spaces (by any number of whitespace symbols, to be more precise).

* The declared field's type (*type-expr*) may use the declared combinator's previously defined variables (fields) as subexpressions (i.e. parameter values). For example:

	nil {X:Type} = List X;
	cons {X:Type} hd:X tl:(list X) = List X;
	typed_list (X:Type) (l : list X) = TypedList;

### Repetitions

* These may only exist among required parameters. They have the form [ *field-id* `:` ] [ *multiplicity* `*` ] `[` *args* `]`, where *args* has the same format as the combinator's declaration of (several) required fields, except that all of the enclosing combinator's previously declared fields may be used in the argument types.

* The name of a field of an enclosing combinator that receives a repetition as a value may be specified (*field-id*), or bypassed, which is equivalent to using the underscore sign as a *field-id*.

* The *multiplicity* field is an expression of the type `#` (`nat`), which can be a real constant, the name of a preceding field of type `#`, or an expression in the form `(` *c* `+` *v* `)`, where *c* is a real constant and *v* is the name of a field of type `#`. The sense of the *multiplicity* field is to provide the length of the (repetition) vector, each element of which consists of values of the types enumerated in *args*.

* The *multiplicity* field may be bypassed. In this case, the last preceding parameter of type `#` from the enclosing combinator is used (it must be).

* Functionally, the repetition *field-id* `:` *multiplicity* `*` `[` *args* `]` is equivalent to the declaration of the single field `(` *field-id* `:` `%Tuple` `%AuxType` *multiplicity* `)`, where `aux_type` is an auxiliary type with a new name defined as `aux_type *args* = AuxType`. If any of the enclosing type's fields are used within *args*, they are added to the auxiliary constructor `aux_type` and to its `AuxType` result type as the first (optional) parameters. 

* If *args* consists of one anonymous field of type *some-type*, then *some-type* can be used directly instead of `%AuxType`.

* If during implementation the repetitions are rewritten as indicated above, it is logical to use instead of `aux_type` and `AuxType`, some identifiers that contain the name of the outer combinator being defined and the repetition's index number inside its definition.

Example:

	matrix {m n : #} a : m* [ n* [ double ] ] = Matrix m n;

is functionally equivalent to

	aux_type {n : #} (_ : %Tuple double n) = AuxType n;
	matrix {m : #} {n : #} (a : %Tuple %(AuxType n) m) = Matrix m n;

Moreover, the built-in types `Tuple` and `Vector` could be defined as:

	tnil {X : Type} = Tuple X 0;
	tcons {X : Type} {n : #} hd:X tl:%(Tuple X n) = Tuple X (S n);
	vector {X : Type} (n : #) (v : %(Tuple X n)) = Vector X;

Actually, the following equivalent entry is considered the definition of `Vector` (i.e. it is specifically this entry that is used to compute the name of the `vector` constructor and its partial applications):

	vector {t : Type} # [ t ] = Vector t;

If we expand it using `Tuple`, we obtain the previous definition exactly.

### Conditional fields

The construction 

<<<<
*args* ::= *var-ident-opt* `:` [ *conditional-arg-def* ] [ `!` ] *type-term*
*conditional-arg-def* ::= *var-ident* [ `.` *nat-const* ] `?`     
>>>>

permits assigning fields which are only present if the value of a preceding mandatory or optional field of type `#` is not null (or if its chosen bit is not zero if the special binary bit-selection operator `.` is applied).
Example:

<<<<
user {fields:#} id:int first_name:(fields.0?string) last_name:(fields.1?string) friends:(fields.2?%(Vector int)) = User fields;
get_users req_fields:# ids:%(Vector int) = Vector %(User req_fields)
>>>>
