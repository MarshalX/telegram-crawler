# ﻿Polymorphism in TL

It should be noted that in the TL schema of the overwhelming majority of API calls the use of polymorphic types is restricted to the Vector type. Nevertheless, having a view of the big picture is still helpful.

### Ordinary inductive types

For example, let us consider the IntList, which is defined as follows:

    int_cons hd:int tl:IntList = IntList;
    int_nil = IntList;

The “int_cons” and “int_nil” constructors as well as the “IntList” type itself are expressions of the following types (writing A : X means that A is an expression of type X):

    IntList : Type;
    int_cons : int -> IntList -> IntList;
    int_nil : IntList;

The keyword *Type* is used to denote the type of all types. Note that Type is not Object (Object is the type of all terms). 
Here is alternative syntax that could be used in some other functional programming language (but not in TL):

    NewType IntList :=
    | int_cons hd:int tl:IntList
    | int_nil
    EndType

### Polymorphic type

TL supports the following version (curly brackets indicate optional fields, see below):

    cons {X:Type} hd:X tl:(List X) = List X;
    nil {X:Type} = List X

Here is an alternative formulation in other functional languages with dependent types:

    NewType List {X:Type} :=
    | cons {X:Type} hd:X tl:(List X)
    | nil {X:Type}
    EndType

In any event, these variations are equivalent to one another from the point of view of the formal theory of types and lead to the definition of the following terms:

    List : Type -> Type;
    cons : forall (X:Type), X -> List X -> List X;
    nil : forall (X:Type), X -> List X;

In each case, remember that writing “A -> B” is shorthand for “forall (x : A), B” for any variable x not entering into A and B. For example, the “cons” type could be written as follows:

    cons : forall (X:Type), forall (hd : X), forall (tl : List X), List X

or more compactly:

    cons : forall (X : Type) (hd : X) (tl : List X), List X

See [Calculus of constructions](https://en.wikipedia.org/wiki/Calculus_of_constructions). Examples of functional languages with dependent types, which support similar constructions are [Coq](https://en.wikipedia.org/wiki/Coq) and [Agda](https://en.wikipedia.org/wiki/Agda_%28programming_language%29).

In this case, the entry after a universal quantifier proves to be more content-related than that after an arrow, because the name of a variable bound by the quantifier is used to transmit the name of the corresponding field in the constructor, even if this variable is not used anywhere as it pertains to the expression under the quantifier. Structurally, all of these entries of the “cons” type are equivalent.

### Serialization of types (values of type Type)

As we can see, to serialize a value of type List X, which has been obtained by applying the combinator “cons X:Type hd:X tl:(List X) = List X”, we need to:

1. serialize the name of the “cons” combinator into a 32-bit number;
2. serialize X (as a type, i.e. as a value of type Type) if X is a required parameter;
3. serialize the head of the list (hd) as a value of type X;
4. serialize the tail of the list as a value of the polymorphic type List X. 

In the first step, the natural question is which string exactly will be used to calculate the CRC32. It is proposed to take "`cons X:Type hd:X tl:List X = List X`” without the terminating semicolon and without any parentheses (closed type expressions are unambiguously reconstructed based on their construction's prefix).

In the last step, we recursively resolve the very same problem of serializing a value of type List X; we will consider it resolved based on the assumption of induction in the construction of the value being serialized. We will similarly consider the third step understandable (induction in the construction of the value being serialized). 

We still need to describe how to transmit (serialize) types, e.g. values of type **Type**. *Types in TL schemas currently appear only as constructors' optional parameters and are therefore never serialized explicitly. Rather, their values are inferred from the previously known type of the value being serialized*. 

For completeness we will describe how it would be possible to serialize types (values of type Type). However, keep in mind that for now this information is not useful. See [Type serialization](/mtproto/TL-types.md).

### Optional arguments in polymorphic constructors

It was stated above that any subset of (the first few) parameters of any constructor can be identified as optional (by enclosing their declarations in curly brackets), but this is not actually entirely accurate.  First, these optional parameters can only be of type ``Type`` or ``#`` (natural numbers). Second, optional parameters must share the return value's type, otherwise their value cannot be determined.

Note that @'''constr-id''' means the constructor's “full form” (in which all optional parameters become required), while '''constr-id'' denotes its abbreviated form (without the optional arguments). If there are no optional arguments, then these two forms are the same. Constructors' full forms are never used at present.

### Bare polymorphic types

There is a small problem: if we want to serialize the value of the bare type '%pair string int' or '%pair string Y' (which in TL is usually denoted simply as “pair”, though the form “%Pair” is preferable), we cannot simultaneously use both the full constructor @pair and the partial pair, because the constructor's name will not be serialized. Therefore, we must differentiate the bare types %@pair (type X, type Y, value x:X, and value y:Y are serialized) and %pair (only x:X and y:Y are serialized; types X and Y are known from the context). In practice, we nearly almost always need the bare type %pair, and this is precisely what “pair” means in the type's context in TL. Therefore, 

    record name:string map:(List (pair int string)) = Record;

will be serialized approximately like we want it to be (the serialization of list elements will consist of the serialization of int and the serialization of string, without any additional headers, types, or combinator names).
Incidentally, when calculating the “record” combinator's name *'record'* in the example given above, the CRC32 of `record name:string map:List pair int string = Record` will be computed.

Also note that a more precise description of this type would be

    record name:string map:(List %(Pair int string)) = Record
