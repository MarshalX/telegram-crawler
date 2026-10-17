# ﻿Type serialization

See [Polymorphism in TL](/mtproto/TL-polymorph.md) and [TL Language](/mtproto/TL.md).

It remains to describe how types, e.g. values of type Type, are transmitted (serialized). In general, there is nothing unexpected going on here: we have type constructors of various arities (for example, List is an arity-1 constructor, but IntList is a 0-arity constructor); and if we know that a 32-bit “name” is assigned to each type constructor, there are no further questions -- values of type Type are serialized exactly like values of any other recursive type with a defined set of constructors of differing arity. 

How can a 32-bit “name” be assigned to a type (a type constructor, to be more exact) such as List or IntList? 
It is proposed to use the sum of the names of all of its constructors, plus the CRC32 of the string with the designation of the type's name and all of its parameters such as “IntList = Type” or “List X:Type = Type”. This way, the List constructor's “name” is the sum of the CRC32s of the three strings "List X:Type = Type", "cons X:Type hd:X tl:List X = List X", and "nil X:Type = List X". 
For “bare” types (which, formally speaking, are subtypes of the corresponding “boxed” type), the situation is somewhat more complicated; the logical negation of the corresponding constructor's name is used. For built-in bareand boxed types (for example, int and Int), a pseudo-declaration is used (for example, int ? = Int").

* This description is somewhat outdated and may be updated in the future. Specifically, how to treat the `!` modifier has not been explained.*