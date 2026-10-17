# Binary serialization and abstract TL types

[TL Language](TL) defines *abstract* data types in the spirit of a general theory of types (more accurately, Martin-Löf's theories of dependent intuitionistic types) without specifying the values of these types should be represented in memory, when saved to disk, or transmitted over a network. In contrast, the article on [binary serialization](serialize) discusses the problem of effective serialization of values of abstract types. To this end, the concept of a *concrete* or *serialized* type has been defined as the sets of serializations of all possible values of the corresponding abstract type. In this case, the serializations take values in the set A\* of words in the alphabet *A*, which consists of 2^32 characters -- 32-bit integers.

In order to use a TL schema (e.g. “program”) in the TL language to describe the serialization of values of abstract types, we should explain how the concrete type *[T]* (subset *[T]* of A^\*) is associated with the abstract type *T* (defined in TL), and how the values of the abstract type *T* correspond to the values of the concrete type *[T]* (i.e. the elements of *[T]*).

Serialization is the process of constructing an element of *[T]* based on a value of the abstract type *T*. The reverse process is deserialization. 

Values of the abstract type *T* may be represented in a different way. Typically, some sort of trees or graphs are used in memory or, if desired, a set of nodes may be used, each of which contains a certain tag (“node type”) and several pointers to other nodes and/or values of built-in primitive types such as `int`. However, for general discussions it is useful to write the values of abstract type *T* as a string, more specifically, an S-expression. Recall that an S-expression is either an atom (the value of a primitive type, for example, an integer or a string constant in quotation marks; or an identifier that corresponds to a built-in or defined function) or a space-delimited list of S-expressions ending in parentheses. In our case, we use S-expressions, the first element of which is a combinator identifier, while the remaining elements (the number of which depends on the combinator's arity) are S-expressions representing elements of the chosen combinator's fields (or parameters). Moreover, the type of the arguments' S-expressions and the type of the S-expressions of the result (e.g. the associated expression) must match.

For example, for the schema

	pair x:int y:int = Pair;
	pnil = PairList;
	pcons hd:Pair tl:PairList = PairList;
    
the following are examples of the abstract type `PairList`, written as S-expressions: 

	(pnil)
	(pcons (pair 2 3) (pcons (pair 9 4) (pnil)))

We usually write *E : T* (read "*E* of type *T*”) when we want to say that *E* is a value of type *T*. We assume there is a built-in type *Type* whose values are types. Thus, writing *T : Type* means that *T* is a type.

For example, we can write:

	PairList : Type;
	(pcons (pair 2 3) (pcons (pair 9 4) (pnil))) : PairList;

Converting an abstract value to a serialized value, generally speaking, is straightforward (and, if desired, can be defined by induction):

* It is the serialization of values *n* of the primitive type `int` (as a single-symbol word in the alphabet *A*)

* The serialization of a string constant (a value of the primitive type string) is a sequence of the 32-bit numbers defined in [Binary serialization](serialize).

* The serialization of the S-expression `(C E1 ... Er) : T`, where `C` is a combinator with arity *r* with argument types *T1*, ..., *Tr* and result type *T* (e.g. *C : T1->T2->...->Tr->T*) is the concatenation of the *combinator number* *C* (a 32-bit number that unambiguously identifies the combinator, usually equal to the CRC-32 of the string of its TL description) and the serializations of the values *E1* of type *T1*, *E2* of type *T2*, ..., *Er* of type *Tr*.

If we use *[T]* to denote the concrete type corresponding to the abstract *T*, and *[E]* to denote an element of *[T]* corresponding to the value *E* of type *T*, then the last rule may be written as:

* *[T]* is the combination, for each constructor of type *C* *T1->T2->...->Tr->T* (i.e. that returns a value of type *T*), of direct products *{C} x [T1] x [T2] x ... x [Tr]*, where *{C}* is a single-element set consisting of the combinator number *C*. Because *{C}<>{C'}* when *C<>C'*, this defines a mutually single-valued mapping of the values of the abstract type *T* (written using S-expressions) to the set *[T]*.

Values of the built-in clothed types `Int` and `String` and serialized as if they were defined using `int x:int = Int;` and `string s:string = String;`, i.e. the serialization of integer constant or a string is preceded by number of the `int` or `string` combinator (constructor). In S-expressions, this may be written as `(int 5)` or `(string "Test")`.

However, what has been described above does not account for certain subtleties, such as the existence of naked types, or the difference between functions (active combinators whose application may be reduced, e.g. calculated) and constructors (passive combinators for which there are not and cannot be reduction rules). Furthermore, we have not explained how to handle polymorphic types and [optional combinator parameters](TL-optargs). We will attempt to explain this now.

### Constants, surface values, and functional values

By dividing combinators into constructors and functions, we can introduce the following classes of expressions (values) of the abstract type *T*:

* *Constant expressions*: for the types `int` and `string`, these are all integer/string constants; for *T*, these are all expressions like *(C E1 ... Er) : T*, where the combinator *C : T1->T2->...->Tr->T* is a constructor, and *Ei : Ti* is constant expressions of types *Ti*. In other words, a constant expression is an S-expression consisting of only constructors and constant of primitive types.

* *Surface expressions* are expressions that outwardly contain a functional combinator whose arguments, however, are constant expressions of the appropriate types. In other words, the functional combinator is resolved only at the outer level. (This is not entirely true; see the full explanation below).

* *Functional expressions*: These are expressions that may contain any combinators or constants at all levels.

In practice, we most frequently need constant values (for storage and passing any data structures, in particular, responses to RPC queries) and surface expressions (for example, as RPC queries: then the functional combinator of the outer level is the name of the RPC function that we want to call, while its parameters are the arguments, which are constant values, for invoking the function). In some cases, arbitrary functional expressions are helpful (for example, it we want to remotely transmit the result of one RPC query to a different RPC query).

We will use *c(T)* to denote a subtype of the abstract type *T*, whose values are constant expressions of type *T*. Clearly, *c(T)* possesses approximately the same constructors as *T* itself (with the types of all arguments *Ti* replaced by *c(Ti)*, but it does not have functional combinators.

Analogously, we will use *f(T)* to denote a subtype of *T*, whose values are surface expressions of type *T*. Clearly, the combinators of *f(T)* are essentially functional combinators of type *T*, but *c()* applies to the types of these combinators' arguments: The combinator *A : T1->...->Tr->T* turns into *A' : c(T1)->...->c(Tr)->f(T)*. (See the clarification of this rule below.)

Thus, we have defined two “functionals” *c : Type -> Type* and *f : Type -> Type*, such that *forall T : Type, c(T) :- T* and *forall T : Type, f(T) :- T*  (writing *T :- T'* means that *T* is contained in *T'*, or that *T* is a subtype of *T'*).

We will assume that *c* and *f* are idempotent.

### Naked types

From the perspective of abstract type theory, naked types (in contrast to built-in primitive types like `int` and `string` are unnecessary. However, they are extremely useful in practice.

Therefore, TL introduces the (partially defined) idempotent unary operator `%`, which turns a standard functional (e.g. an expression of type *...->Type* or simply *Type*) into a different standard functional of the same type. If *T* is a type, then from an abstract theoretical point of view, `%T` is equivalent to *c(T)*. In other words, the values of `%T` are the constant values of *T*. If *T* is a *k*-arity standard expression, then *T : S1 -> ... -> Sk -> Type*, where each *Si=Type* or *#*, then by definition `%T` is a *k*-arity standard expression with the same arity, which is defined by the equation *(%T) a1 ... ak = % (T a1 ... ak)*.  

When a _constant_ value of type `%T` is serialized, it is first serialized as a value of type *T* (assuming that *T* is not already a naked type itself). Then the first character of the serialization is discarded (e.g. the name of the enclosing combinator). Therefore, `%T` is a only a valid type expression if there is not more than one constructor for `%T`. The expression `%T`, where *T : S1 -> ... -> Sk -> Type*, is valid, if for _any_ choice of parameters *a1 : S1, ... , ak : Sk*, the type *T a1 ... ak* does not have more than one constructor. Using `%` in other instances is incorrect.

If for every value of the parameters *a1 : S1, ..., ak : Sk*, there is exactly one constructor *C* for *T a1 ... ak*, then TL allows writing `C a1 ... ak` instead of `%T a1 ... ak` or `%(T a1 .. ak)`. In other words, in certain situations the identifier `C` is a synonym for `%T`. This is only allowed in the context of a type (when specifying the type of a combinator's field or result).

Moreover, it is assumed that `%Int = int` and `%String = string`.

### `!` modifier

In TL, the idempotent operator `!` can modify any type, actually making surface values be allowed when its constant values are serialized. However, if *T* is a standard function like *S1->..->Sr->Type*, then *!T* is defined using the equation `(!T) a1 ... ar = !(T a1 ... ar)`, for any *a1:S1*, ..., *ar:Sr*.

The `!` operator is only allowed in a definition of the types of fields of functional combinators. It is usually used as a type prefix, for example:

	set_timeout {X:Type} timeout:int f:!X = X;

In this case, the `set_timeout` “wrapper” is defined. It takes two explicit parameters: the integer `timeout` and a surface expression of type `X`. *X : Type* is itself an implicit parameter (it is not explicitly stated, rather it is inferred from the values of the other parameters and their types). A similar kind of wrapper may be helpful for modifying the action of RPC queries (which are surface expressions of various types). For example, suppose we have the function

	factorial n:int = int;

then we can wrap the RPC query `(factorial 100)` as follows: `(set_timeout 200 (factorial 100))`. This expression is still a surface value of type `int`, which means it can be passed as an RPC query.

A consecutive pair of two computations is another example:

	pair {X Y : Type} x:X y:Y = Pair X Y;  // constructor
	seq_pair {X Y : Type} x:!X y:!Y = Pair X Y; // functional wrapper for sequential computation
	par_pair {X Y : Type} x:!X y:!Y = Pair X Y; // functional wrapper for parallel computation

Now the RPC query `(seq_pair (factorial 2) (factorial 3)) : Pair int int` first calculates factorial 2, then factorial 3, and returns the pair `(pair 2 6)`. In this case, the sequence of operations isn't important, because they do not have side effects. It would have been just as well to use `(par_pair (factorial 2) (factorial 3))`. However, this is not always the case.

We can also define an analogy to a “comma” operation:

	comma {X Y : Type} x:!X y:!Y = Y;
    
For example, this operation could first calculate `x`, then forget the result, calculate `y`, and return `y`. 

Note that the semantics of the `seq_pair`, `par_pair` and `comma` wrappers are indeed defined where they are implemented (like the semantics of all other functional combinators), not by their TL declaration.

In principle, polymorphic wrappers like `set_timeout` can also be applied, for example, to “annotate” a RPC response's constant values. For example, the server might return a response to a query together with the time it was calculated. However, a value of type *!X* must be constant, because that is what is expected as the enclosing expression's value. In other words, `set_timeout 239 E` is a constant/surface value of type *X* if and only if *E* is such itself.

### `$` modifier

The idempotent modifier `$` permits the use of arbitrary functional values of an appropriate type in contexts where only constants or surface values are usually allowed. It recursively transforms all combinators for all of the types involved, canceling the action of `%` and affixing `$` to the parameter types and result of all combinators (`$` is also added to the front of the transformed combinators). Moreover, built-in types are also transformed (in the final stage): `$int = Int` and `$string = String`.

This may be useful to create an RPC query that performs a “deep computation” of the expression passed to it:

	compute {X:Type} expr:$X = X;

For example, now we can transmit the following as an RPC query:

	(compute ($factorial ($factorial (int 3)))) : int
    
(Note that the three has become clothed; the combinator $factorial has type $int -> $int).

This is very powerful tool. It does not have to be implemented in very simple versions of TL. `$` is not encountered in currently used TL schemas.

### More on modifiers

In fact, at least in terms of its application to serialization, the TL language by default implies the *c()* modifier around all combinators' parameter types and results, while `!` and `$` cancel it (more accurately, `!` only cancels, and in some sense `$` reverses the meaning). This is why there is no explicit `c()` modifier in TL and why it is assumed that all functions only accept constant values and return constant results, unless otherwise specified.

You may think that some functional combinators may have a type such as `partial_factorial n:int = $int;` and that the RPC query `(partial_factorial 3)` might then unexpectedly return `($product (int 3) ($product (int 2) ($product (int 1) (int 1)))) : $int` ...

It is probably more correct to think about the `!` modifier as follows. All types initially include only constant values (and only constructors). The `!` modifier makes a new type (it's twin) out of each type. This new type has no inherent constructors. Functional combinators differ from constructors in that `!` is implicitly added in front of their result's type. After this, the (local or remote) process of calculating the expression can be represented using the polymorphic function `eval : !X -> X`.

### Optional combinator parameters and their values

See [Optional combinator parameters and their values](TL-optargs).
