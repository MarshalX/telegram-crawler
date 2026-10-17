# File references


File references are strings of bytes that can be encountered in the `file_reference` fields of [document](/constructor/document.md) and [photo](/constructor/photo.md) objects.

They must be cached by the client, along with the **source** where the document/photo object was found, in order to be refetched when the file reference expires.

Example implementation of a reference database: [MadelineProto](https://github.com/danog/MadelineProto/blob/v8/src/MTProtoTools/ReferenceDatabase.php), [android](https://github.com/DrKLO/Telegram/blob/master/TMessagesProj/src/main/java/org/telegram/messenger/FileRefController.java), [telegram desktop](https://github.com/telegramdesktop/tdesktop/blob/ea438aeb8509b23e7789e9d198cf03f537d90fc5/Telegram/SourceFiles/data/data_file_origin.cpp), [tdlib](https://github.com/tdlib/td/blob/92d814640d1871320e125b68b0181e34a48f86d8/td/telegram/FileReferenceManager.cpp).

### Automatic implementation

Implementation and maintenance of the file reference database may be fully automated by using the **file reference database map file**.  

To start, set up the following two tables:

* [File reference table &raquo;](#file-reference-table): `HashMap<FileId, bytes>`
* [File source table &raquo;](#file-source-table): `HashMap<FileId, Vector<FileSource>>`

Then, download and implement the [map file &raquo;](#map-file).  

#### File reference table

The file reference table can be represented by the following type:

```
HashMap<FileId, bytes>
```

This table maps a [file ID &raquo;](#file-ids) (which uniquely identifies a photo or a document) to a [file reference &raquo;](#file-references).   

This table is populated by the [incoming traversers &raquo;](#incoming-traversers) contained in the [map file &raquo;](#map-file).  

The file reference can alternatively be stored, for example, in the document and photo DBs along with other metadata, or in any other way that uniquely associates a `FileId` to a file reference.  

#### File source table

```
HashMap<FileId, Vector<FileSource>>
```

It maps a [file ID &raquo;](#file-ids) to one or more [file sources &raquo;](#file-sources).  

This table is populated by the [incoming traversers &raquo;](#incoming-traversers) contained in the [map file &raquo;](#map-file).  

To reduce the size of the file source table, it's possible to only allow storing one file source per source type per file ID (max N file sources per file ID, for N file source types), or even just one file source per file ID (max 1 source per file ID).

### Map file

[Download latest JSON file reference map for the current layer &raquo;](https://raw.githubusercontent.com/danog/MadelineProto/refs/heads/v8/src/file_ref_map.json) - The constructor predicate is serialized under the `_` key, `bytes` fields are serialized as `{"_": "bytes", "bytes": "<base64 encoded value>"}`

[Download latest serialized TL version of the file reference map for the current layer &raquo;](https://raw.githubusercontent.com/danog/MadelineProto/refs/heads/v8/src/file_ref_map.dat)

See [here &raquo;](/api/file-references/map-schema.md) for the full TL schema of the map file.

Subset of the schema: 

```
fileReferenceMap#72a99250 layer:int db_schema:string db_schema_json:string traversers_incoming:Vector<TraverserIncoming> traversers_outgoing:Vector<TraverserOutgoing> refresh_actions:Vector<RefreshAction> skipped_incoming_sources:Vector<SkippedSource> = FileReferenceMap;

predicate#de3bc05a predicate:string is_constructor:Bool = Predicate;
skippedSource#2b543f6f predicate:Predicate why:string = SkippedSource;
```

The map file is composed of a single `fileReferenceMap` constructor, which contains:

* In the `layer` field, the layer version from which the map file was generated.  
* `db_schema` and `db_schema_json` fields with the TL **database** schema of `FileId`s and `FileSource`s.    
  `db_schema` is text TL schema, `db_schema_json` is the same TL schema in the JSON format [also used for the API schema &raquo;](/schema.md).  

  This DB schema is used for:
  - [File IDs &raquo;](#file-ids), used in the file reference DB as keys in the [file reference table &raquo;](#file-reference-table) and [file source table &raquo;](#file-source-table)
  - [File sources &raquo;](#file-sources), used in the file reference DB as values in the [file source table &raquo;](#file-source-table)

  These TL schemas can be used as a guideline for the file reference and file source table DBMS schema, or by directly serializing file IDs and file source vectors if a simple string => string KV DB is used.

  See [here &raquo;](/api/file-references/db-schema.md) for the current TL schema of the file reference database.  

* `traversers_incoming` contains [incoming traversers &raquo;](#incoming-traversers), used to extract and store [file references &raquo;](#file-references) from incoming media constructors.
* `traversers_outgoing` contains [outgoing traversers &raquo;](#outgoing-traversers), used to swap expired [file references &raquo;](#file-references) from outgoing media method calls.
* `refresh_actions` contains [refresh actions &raquo;](#refresh-actions), instructions used to refresh expired file references according to [file sources &raquo;](#file-sources) stored in the [file source table](#file-source-table).
* `skipped_incoming_sources` contains skipped sources.  
  These constructors indicate that the source should be ignored completely (including during codegen): `skippedSource` sources are used internally to make sure all file reference paths are still covered in some way during validation, including paths for ephemeral media like inline results, or for media without any associated source (for example, media uploaded using [messages.uploadMedia](/method/messages.uploadMedia.md) but not yet sent anywhere obviously does not have any associated source).  

  * `skippedSource.predicate` - Indicates the ignored constructor or method.
    `predicate.predicate` contains the name, and `predicate.is_constructor` specifies whether it points to a constructor or to a method.
  * `skippedSource.why` - A human-readable reason as to why this source should be ignored.

  Each skipped predicate has exactly one associated reason.  

The map file is automatically generated and validated by the [file reference generator tool &raquo;](/api/file-reference-generator.md); this tool can be manually run on newer or experimental layers, to generate the **file reference database map file** for a given API schema: see [here &raquo;](/api/file-reference-generator.md) for more info.  

### File IDs

A **file ID** (in the context of the file reference DB) is an object that, when serialized to a string, can easily and uniquely identify a media file.  

Currently, the following file ID objects are available (taken from the DB schema inside of the [map file](#map-file)):

<!-- start fileid -->

```
fileIdPhoto#47a0bd49 id:long = FileId;
fileIdDocument#461b1d89 id:long = FileId;
```

<!-- end fileid -->

This TL schema can be used as a guideline for the file reference and file source table DBMS schema, or by directly serializing file IDs and file source vectors if a simple string => string KV DB is used.

[Outgoing traversers &raquo;](#outgoing-traversers) and [incoming traversers &raquo;](#incoming-traversers) specify how to generate a file ID object from all media objects.  

### File references

A **file reference** is a string of bytes that can be encountered in the `file_reference` fields of

* *Incoming* media constructors, such as [document](/constructor/document.md) and [photo](/constructor/photo.md) objects.  
* *Outgoing* media constructors like [inputDocument](/constructor/inputDocument.md), [inputPhoto](/constructor/inputPhoto.md), etc, where it must be populated by the client in order to download or resend all media.  

A file reference may **expire**, in which case it cannot be used in outgoing constructors: it must be refreshed by refetching the message, [story](/api/stories.md), etc where the media last appeared, as specified below.

### File sources

A **file source** contains information that the client may use to re-fetch a media (and a new file reference for it), by invoking a specific **action**.  

Each source type is associated to a specific [refresh action &raquo;](#refresh-actions).
  
[Incoming traversers &raquo;](#incoming-traversers) and [source extraction logic](#source-extraction) are used together to populate the [file source table &raquo;](#file-source-table), which maps a **file ID** to one or more **file sources**.  

The [map file &raquo;](#map-file) contains all sources needed to implement the file reference database, including some skipped sources which are not handled by any extractor.  

This is the full list of valid sources contained by the current map file:  

<!-- start filesource -->

```
fileSourceMessage#b19f4c78 flags:# quick_reply_shortcut_id:flags.0?int peer:long id:int = FileSource;
fileSourceStarsTransaction#c1bac8c7 flags:# peer:long id:string refund:flags.0?true ton:flags.1?true = FileSource;
fileSourceScheduledMessage#9dc1f5f7 peer:long id:int = FileSource;
fileSourceStory#c820e3eb id:int peer:long = FileSource;
fileSourceWebPage#9e5b749c url:string = FileSource;
fileSourceBotApp#01cf8b7a id:long access_hash:long = FileSource;
fileSourceUserFull#70fdb7b0 id:long = FileSource;
fileSourceAdminLog#4797f959 channel:long max_id:long = FileSource;
fileSourceStoryAlbum#5e01f223 peer:long = FileSource;
fileSourceBotPreviewMedia#0aa91441 bot:long = FileSource;
fileSourceBotPreviewInfo#f9d2d6fc bot:long lang_code:string = FileSource;
fileSourcePaidMedia#b18d9042 id:int peer:long = FileSource;
fileSourceSavedMusic#dd1a7664 user_id:long id:long access_hash:long = FileSource;
fileSourceChatFull#9de75fde chat_id:long = FileSource;
fileSourceChannelFull#6fe19339 channel:long = FileSource;
fileSourcePremiumPromo#c907a44f = FileSource;
fileSourceAttachMenuBot#c3002694 bot:long = FileSource;
fileSourceTheme#92d05e0c id:long access_hash:long = FileSource;
fileSourceWallPaper#50dbf2f7 id:long access_hash:long = FileSource;
fileSourceStickerSet#34c73709 stickerset:InputStickerSet = FileSource;
fileSourceSavedGifs#13e78e07 = FileSource;
fileSourceSavedRingtones#2b25ef1b = FileSource;
fileSourceAvailableEffects#eb8578f0 = FileSource;
fileSourceAvailableReactions#0e432388 = FileSource;
fileSourceUserProfilePhoto#e39ee274 user_id:long max_id:long = FileSource;
fileSourceDocumentByHash#0f151e0f sha256:bytes size:long mime_type:string = FileSource;
```

<!-- end filesource -->

See [here &raquo;](#refresh-actions) for the refresh action associated to each file source type.  

### Incoming traversers

See [here &raquo;](/api/file-references/incoming-traversers.md) for the full list of incoming traversers contained by the current map file.

Schema:

```
traverseMethodResult#fda9f236 name:string push_sources:Vector<Source> is_needed_parent:Bool = TraverserIncoming;
traverseIncomingConstructor#6e4d00b6 type:string predicate:string params:Vector<TraverseParam> push_sources:Vector<Source> is_needed_parent:Bool = TraverserIncoming;
traverseCommitSourceLocation#94cc59c5 type:string predicate:string push_sources:Vector<Source> stored_constructor:string = TraverserIncoming;

traverseParam#62161b67 flags:# name:string is_flag:flags.0?true is_vector:flags.1?true type:string = TraverseParam;

predicate#de3bc05a predicate:string is_constructor:Bool = Predicate;
source#4ec4751a flags:# predicate:Predicate stored_constructor:string stored_params:Vector<FieldExtractor> skipped_flags:Vector<string> needs_parent:flags.3?Predicate needs_not_parents:Vector<Predicate> = Source;
```

Incoming traversers traverse constructors **received** from the API, and use the gathered information to:

* Extract [file ID &raquo;](#file-ids) => [file source &raquo;](#source-extraction) pairs from incoming media objects **received** from the API, and store them to the [file source table &raquo;](#file-source-table).  
* Extract [file ID &raquo;](#file-ids) => [file reference &raquo;](#file-references) pairs from incoming media objects **received** from the API, and store them to the [file reference table &raquo;](#file-reference-table).  

There are three traverser types.  

All three traverser types have an optional `push_sources` field, which may contain a list of [sources](#source-extraction) to push to the source stack when the traverser is triggered: these sources will be used to store file sources to the [file source table &raquo;](#file-source-table) when a `traverseCommitSourceLocation` is reached.  
  
The only allowed entry points for traversers are:

* The results of all methods covered by a `traverseMethodResult` traverser.  
* [Update](/type/Update.md) constructors covered by a `traverseIncomingConstructor` traverser. 

  **Note**: All [Updates](/type/Updates.md) constructors must be converted to a vector of [Update](/type/Update.md) constructors, **including short variants** like [updateShortMessage](/constructor/updateShortMessage.md), [updateShortSentMessage](/constructor/updateShortSentMessage.md), [updateShortChatMessage](/constructor/updateShortChatMessage.md), which must be pre-converted to [Update](/type/Update.md) constructors by the client using information extracted from the method call (not included in the map file for simplicity).  

  The map file does not contain traversers for [Updates](/type/Updates.md) returned by methods, as those are supposed to be handled by the update system: [Update](/type/Update.md) constructors should only be traversed after they are properly extracted, deduplicated and reordered by the [update system](/api/updates.md); traversal can be triggered directly from the update system.  

#### Example implementation

Use the following runtime structures:

* `HashMap<predicate, Vector<object>> parentContext` for `is_needed_parent`, `needs_parent` and `needs_not_parents` checks.
* `Vector<FileSource> sourceStack` for the source stack.

`parentContext` controls eligibility during [source extraction &raquo;](#source-extraction) with `needs_parent` and `needs_not_parents`; `sourceStack` provides values to commit at `traverseCommitSourceLocation`.

Execution order at runtime:

1. Start from an allowed entry point (`traverseMethodResult` or [Update](/type/Update.md)).  
2. Apply traversers recursively as follows:  
  2.1. Populate and push valid sources from `push_sources` to `sourceStack`.  
    A source is valid and can be pushed if [source extraction &raquo;](#source-extraction) can be populated according to `stored_params` (all required flag fields are set and all paths can be correctly extracted), if `parentContext` contains an entry for `source.needs_parent` (if set), and if `parentContext` contains no entry for any predicate listed in `source.needs_not_parents`.  
  2.2. If `is_needed_parent` is set, push the current constructor/method to `parentContext`, using its predicate as key.  
  2.3. Recurse into children as specified by `params`, or into the method result for `traverseMethodResult`.  
  2.4. If `is_needed_parent` is set, pop the value that was pushed in step 2.2.  
  2.5. Pop only the sources that were pushed in step 2.1 (keep all other sources unchanged).  
3. When `traverseCommitSourceLocation` matches a constructor:  
  3.1. Push valid sources from `push_sources` to `sourceStack` (some `traverseCommitSourceLocation` constructors can also contain sources).  
  3.2. Commit `FileId -> file_reference` to the [file reference table &raquo;](#file-reference-table) and `FileId -> FileSource` to the [file source table &raquo;](#file-source-table) for all currently active sources on the source stack.  
  3.3. Pop only the sources that were pushed in step 3.1 (keep all other sources unchanged).
4. Continue traversal to collect all matches in the same payload.

In other words, incoming traversal is a DFS-like walk where sources are pushed as context and committed only when a media location constructor is reached.

<!--
#### Example implementation (2)

An alternative implementation can be integrated directly into TL deserialization, avoiding a second traversal pass.

Use the following runtime structures:

* `Vector<FileId> sourceFileIds` - append-only list of file IDs discovered during deserialization: do not remove elements from this list during deserialization, drop it only after deserialization of the entire API response is completed. 
* `HashMap<predicate, Vector<Tuple{object, Vector<FileId>}>> parentContext` - deferred context used for `is_needed_parent`/`needs_parent` matching, drop it after deserialization of the entire API response is completed. 

Execution order at runtime:

1. When deserializing a constructor/method response matched by a `traverseMethodResult` or `traverseIncomingConstructor` traverser:  
  1.1. Store `len(sourceFileIds)` to a temporary `fileIdsIdx` variable  
  1.2. Deserialize the object or the method response  
  1.3. For file IDs `sourceFileIds[fileIdsIdx:]` (all file IDs starting from `fileIdsIdx`) and all valid sources in `push_sources`, populate and add `FileId -> FileSource` to the [file source table &raquo;](#file-source-table).  
    A source is valid and can be added if [source extraction &raquo;](#source-extraction) can be populated according to `stored_params` (all required flag fields are set and all paths can be correctly extracted).  

    If a source has the `needs_parent` flag set, instead of storing it to the file source table push the current object and the extracted list of file IDs to `parentContext`, keyed by the `needs_parent` constructor name, i.e. `needed_parent` => `Tuple{this, sourceFileIds[fileIdsIdx:]}`.  

    Do not remove elements from `sourceFileIds` on completion.  
  1.4. If `is_needed_parent` is set, extract all entries from `parentContext[predicate]`, and using the extracted object and file ID list (not the `sourceFileIds[fileIdsIdx:]` from above) populate and add `FileId -> FileSource` to the [file source table &raquo;](#file-source-table).  
    A source is valid and can be added if [source extraction &raquo;](#source-extraction) can be populated according to `stored_params` (all required flag fields are set and all paths can be correctly extracted).  

    On completion, clear `parentContext[predicate]`.  

2. When `traverseCommitSourceLocation` matches a constructor:  
  1.1. Store `len(sourceFileIds)` to a temporary `fileIdsIdx` variable  
  1.2. Deserialize the object  
  1.3. Append `FileId` to `sourceFileIds`  
  1.4. Commit `FileId -> file_reference` to the [file reference table &raquo;](#file-reference-table).  
  1.5. For file IDs `sourceFileIds[fileIdsIdx:]` (all file IDs starting from `fileIdsIdx`) and all valid sources in `push_sources`, populate and add `FileId -> FileSource` to the [file source table &raquo;](#file-source-table).  
    A source is valid and can be added if [source extraction &raquo;](#source-extraction) can be populated according to `stored_params` (all required flag fields are set and all paths can be correctly extracted).  

    If a source has the `needs_parent` flag set, instead of storing it to the file source table push the current object and the extracted list of file IDs to `parentContext`, keyed by the `needs_parent` constructor name, i.e. `needed_parent` => `Tuple{this, sourceFileIds[fileIdsIdx:]}`.  

    Do not remove elements from `sourceFileIds` on completion.  
-->

#### Traverser type list

* `traverseMethodResult` - For method calls: attaches sources using method call parameters, then traverses on the method result.  
  
  Only traverse the method result if the returned constructor has a matching `traverseIncomingConstructor`.  

  Params:

  * `name` - The name of the method call to attach to (for example, `messages.getMessages`).
  * `push_sources` - A list of sources to push when the traverser is triggered.  
  * `is_needed_parent` - If set, the traversal must expose this method result as parent context for downstream source extraction, because at least one downstream `Source` has `needs_parent` pointing to this method. Push the method call to a separate parent context map, keyed by method name (can be the same context map used for constructors with `is_needed_parent=true`, for example, `HashMap<predicate, Vector<object>>`).  

  The [map file &raquo;](#map-file) contains `traverseMethodResult`s for all methods that return file references.   

* `traverseIncomingConstructor` - Attaches sources on constructors with a specific predicate (name), then traverses on some of the constructor's parameters.  

  Params:
  * `type` - The type of the constructor to traverse (for example, `Document`, `Photo`, etc, present to simplify codegen).
  * `predicate` - The name of the constructor to traverse (for example, `document`, `photo`, etc).
  * `push_sources` - A list of sources to push when the traverser is triggered.  
  * `is_needed_parent` - If set, the traversal must expose this constructor as parent context for downstream source extraction, because at least one downstream `Source` has `needs_parent` pointing to this constructor. Push this object to a separate parent context map, keyed by predicate (for example, `HashMap<predicate, Vector<object>>`).  
  * `params` - A list of parameters to traverse.  
    Only traverse the parameter if the contained constructor has a matching `traverseIncomingConstructor`.  

    `traverseParam` contains the name of the parameter to traverse and (for simplicity, even if this info can be extracted from the schema) the parameter's type, and whether it's a flag, a vector, or a flagged vector.  
    The `type` will always contain the type of the underlying parameter (i.e. without `Vector<>` or `flags.X?`).  

  The [map file &raquo;](#map-file) contains `traverseIncomingConstructor`s for all incoming constructors that contain file references (nested within parameters).   

* `traverseCommitSourceLocation` - Stores the file reference contained in the current constructor and file sources currently on the source stack to the [file source table &raquo;](#file-source-table) and [file reference table &raquo;](#file-reference-table).  

  Params:
  * `type` - The type of the constructor in `predicate` (for example, `Document`, `Photo`, etc, present to simplify codegen).
  * `predicate` - The name of the incoming media constructor received from the API (for example, `document`, `photo`).
  This constructor is guaranteed to have an `id` field and a `file_reference` field.  
  * `push_sources` - A list of sources to push when the traverser is triggered, before any sources are stored to the file source table.    
  * `stored_constructor` - The type of the [file ID](#file-ids) that will be used to populate the [file reference table &raquo;](#file-reference-table) and [file source table &raquo;](#file-source-table) (for example, `fileIdDocument`, `fileIdPhoto`).  

  When a media constructor of predicate `traverseCommitSourceLocation.predicate` is received, the client must:

  - Extract the `file_reference` field of the media constructor
  - Extract the `id` field of the media constructor, generating a new file ID of type `traverseCommitSourceLocation.stored_constructor`
  - Store both in the [file reference table &raquo;](#file-reference-table), using the file ID as key and the file reference as value.
  - Store all [file sources](#source-extraction) currently on the source stack into the [file source table &raquo;](#file-source-table), using the file ID as key and the file source as value (multiple values can be stored for the same key). 

  For example:

  - Assume a `document{id: 12345, file_reference: "...", ...}` is received from the API; two [file sources](#file-sources) are currently present on the source stack when the [document](/constructor/document.md) is traversed, one `fileSourceMessage{...}` and one `fileSourceWebPage{...}`.
  - A new `fileIdDocument{id: 12345} => "..."` entry must be added to the [file reference table &raquo;](#file-reference-table)
  - Two new `fileIdDocument{id: 12345} => fileSourceMessage{...}` and `fileIdDocument{id: 12345} => fileSourceWebPage{...}` entries must be added to the [file source table &raquo;](#file-source-table).

  The [map file &raquo;](#map-file) contains `traverseCommitSourceLocation`s for all incoming constructors that have a `file_reference` and an `id` field.  
  The current map file has the following `traverseCommitSourceLocation`s:

  <!-- start incoming_locations 1 -->

  - <pre><code>traverseCommitSourceLocation{predicate: <a href='/constructor/document'>document</a>, stored_constructor: fileIdDocument, push_sources: [<a href='/api/file-references/sources#source-document-filesourcestickerset'>fileSourceStickerSet</a>, <a href='/api/file-references/sources#source-document-filesourcesavedmusic-users-getsavedmusic'>fileSourceSavedMusic</a> (needs <a href='/method/users.getSavedMusic'>users.getSavedMusic</a>), <a href='/api/file-references/sources#source-document-filesourcesavedmusic-users-getsavedmusicbyid'>fileSourceSavedMusic</a> (needs <a href='/method/users.getSavedMusicByID'>users.getSavedMusicByID</a>)], type: <a href='/type/Document'>Document</a>}</code></pre>
  - <pre><code>traverseCommitSourceLocation{predicate: <a href='/constructor/photo'>photo</a>, stored_constructor: fileIdPhoto, push_sources: [<a href='/api/file-references/sources#source-photo-filesourceuserprofilephoto-photos-getuserphotos'>fileSourceUserProfilePhoto</a> (needs <a href='/method/photos.getUserPhotos'>photos.getUserPhotos</a>)], type: <a href='/type/Photo'>Photo</a>}</code></pre>

<!-- end incoming_locations -->

### Outgoing traversers

See [here &raquo;](/api/file-references/outgoing-traversers.md) for the full list of outgoing traversers contained by the current map file.

Schema:

```
traverseMethodCall#9244f5bb name:string params:Vector<TraverseParam> = TraverserOutgoing;
traverseOutgoingConstructor#3fc5026d type:string predicate:string params:Vector<TraverseParam> = TraverserOutgoing;
traverseSwapLocation#032bf95d type:string predicate:string stored_constructor:string = TraverserOutgoing;

traverseParam#62161b67 flags:# name:string is_flag:flags.0?true is_vector:flags.1?true type:string = TraverseParam;
```

Outgoing traversers extract a [file ID &raquo;](#file-ids) from outgoing media objects **sent** to the API and use it to update and swap the [file reference &raquo;](#file-references) within that same outgoing media object before it is sent.  

There are three traverser types:  

- `traverseMethodCall` - Traverses the specified method call parameters. 

  Params:

  - `name` - The name of the method whose parameters should be traversed.
  - `params` - The parameters to traverse.  
    
    `traverseParam` contains the name of the parameter to traverse and (for simplicity, even if this info can be extracted from the schema) the parameter's type, and whether it's a flag, a vector, or a flagged vector.  
    The `type` will always contain the type of the underlying parameter (i.e. without `Vector<>` or `flags.X?`).  

- `traverseOutgoingConstructor` - Traverses the specified constructor parameters.

  Params:

  * `type` - The type of the constructor to traverse (for example, `InputMedia`).
  * `predicate` - The name of the constructor to traverse (for example, `inputMediaDocument`, `inputMediaPhoto`, etc).
  * `params` - The parameters to traverse.  
    
    `traverseParam` contains the name of the parameter to traverse and (for simplicity, even if this info can be extracted from the schema) the parameter's type, and whether it's a flag, a vector, or a flagged vector.  
    The `type` will always contain the type of the underlying parameter (i.e. without `Vector<>` or `flags.X?`).  

- `traverseSwapLocation` - Refreshes the file reference contained in the current constructor using the file sources stored in the [file source table &raquo;](#file-source-table).  

  Params:

  * `type` - The type of the outgoing media constructor sent to the API (for example, `InputMedia`).
  * `predicate` - The name of the outgoing media constructor sent to the API (for example, `inputPhoto`, `inputDocument`).
    This constructor is guaranteed to have an `id` field and a `file_reference` field.  
  * `stored_constructor` - The type of the [file ID](#file-ids) used to lookup values in the [file reference table &raquo;](#file-reference-table) and [file source table &raquo;](#file-source-table) (for example, `fileIdDocument`, `fileIdPhoto`)

  The [map file &raquo;](#map-file) contains outgoing traversers for all outgoing media constructors that have a `file_reference` and an `id` field.  
  The current map file has the following outgoing traversers:

  <!-- start outgoing_locations 1 -->

  - <pre><code>traverseSwapLocation{predicate: <a href='/constructor/inputPhoto'>inputPhoto</a>, stored_constructor: fileIdPhoto, type: <a href='/type/InputPhoto'>InputPhoto</a>}</code></pre>
  - <pre><code>traverseSwapLocation{predicate: <a href='/constructor/inputDocument'>inputDocument</a>, stored_constructor: fileIdDocument, type: <a href='/type/InputDocument'>InputDocument</a>}</code></pre>
  - <pre><code>traverseSwapLocation{predicate: <a href='/constructor/inputDocumentFileLocation'>inputDocumentFileLocation</a>, stored_constructor: fileIdDocument, type: <a href='/type/InputFileLocation'>InputFileLocation</a>}</code></pre>
  - <pre><code>traverseSwapLocation{predicate: <a href='/constructor/inputPhotoFileLocation'>inputPhotoFileLocation</a>, stored_constructor: fileIdPhoto, type: <a href='/type/InputFileLocation'>InputFileLocation</a>}</code></pre>

<!-- end outgoing_locations -->

  (Legacy `inputFileLocation` constructors are ignored by the current map file).

Outgoing traversers are triggered when a media method call returns a `FILE_REFERENCE_EXPIRED` or `FILE_REFERENCE_INVALID` RPC error.

Methods dealing with multiple media files at the same time like [messages.sendMultiMedia](/method/messages.sendMultiMedia.md) may also return file reference errors in a slightly different form, as `FILE_REFERENCE_%d_EXPIRED` errors (or a `FILE_REFERENCE_%d_INVALID`, which should be treated in the same way): in this case, the media with the file reference to refresh will be located at index `%d` of the passed `multi_media` vector.  

The same `FILE_REFERENCE_%d_INVALID` error may also be emitted by [messages.sendMedia](/method/messages.sendMedia.md) or other methods requiring a single [InputMedia](/type/InputMedia.md) constructor, when an [inputMediaPaidMedia](/constructor/inputMediaPaidMedia.md) is provided with an array of `extended_media` media files.  

When the error is received, clients should:  

- Use the traversers to find all outgoing media constructor(s) matching `traverseSwapLocation`, contained in the arguments of the failed method call.  
  - For `FILE_REFERENCE_%d_INVALID` errors, select the correct one according to the index, otherwise select the first one.  
- Using the `id` field of the selected constructor, generate a new [file ID &raquo;](#file-ids) of type `traverseSwapLocation.stored_constructor`.
- Use the [file ID &raquo;](#file-ids) to lookup [file sources &raquo;](#source-extraction) from the [file source table](#file-source-table)
- Refresh the [file reference](#file-references) using the [refresh actions &raquo;](#refresh-actions) associated to the file sources:
    
  Loop once through all stored file sources, executing the associated [refresh action &raquo;](#refresh-actions), exiting from the loop immediately if:
    
  * The [file reference table &raquo;](#file-reference-table) entry associated to the same [file ID &raquo;](#file-ids) is updated with a new value OR
  * There are no remaining sources, in which case the original `FILE_REFERENCE_EXPIRED` error should be rethrown to the user.  

- Fetch the new [file reference](#file-references) from the [file reference table &raquo;](#file-reference-table) and store it in the `file_reference` field of the selected constructor from step 1
- Repeat the original call.

For example, when a `messages.sendMedia{media: inputMediaPhoto{id: inputPhoto{id: 12345, file_reference: "...", ...}, ...}, ...}` method call sent to the API fails with `FILE_REFERENCE_EXPIRED`, a new `fileIdPhoto{id: 12345}` is used to fetch all associated [file sources &raquo;](#source-extraction) from the [file source table](#file-source-table), refresh the file reference, then fetch the new file reference (`abc`) from the [file reference table &raquo;](#file-reference-table), and resend the new method call: `messages.sendMedia{media: inputMediaPhoto{id: inputPhoto{id: 12345, file_reference: "abc", ...}, ...}, ...}`.

It's also possible to preemptively replace the file reference of media method calls by running the following simplified flow for all method calls, without waiting for an RPC error (this can be useful in cases where an expired file reference may be cached in some other database or provided externally, such as via an old [draftMessage](/constructor/draftMessage.md) returned by the API):

- Use the traversers to find all outgoing media constructor(s) matching `traverseSwapLocation`, contained in the arguments of the method call.  
- For all outgoing media constructors:
  - Using the `id` field of the selected constructor of type `traverseSwapLocation.predicate`, generate a new [file ID &raquo;](#file-ids) of type `traverseSwapLocation.stored_constructor`.
  - If present, fetch the current [file reference](#file-references) from the [file reference table &raquo;](#file-reference-table) and store it in the `file_reference` field of the selected constructor
- Proceed with the call

It's also possible to avoid using outgoing traversers altogether if the FileId or FileSources are already passed as external metadata to the client function that invokes the method call (i.e. as a separate additional argument, separate from the ones passed to the API).  

### Source extraction

A source extractor contains instruction that the client may use to extract a [file source &raquo;](#file-sources).  

A [file source &raquo;](#file-sources) contains instructions on how to extract and store file sources from an incoming method response or update.  

See [here &raquo;](/api/file-references/sources.md) for the full list of outgoing source extractors contained by the current map file.  

[Incoming traversers &raquo;](#incoming-traversers) and source extractors are used together to populate the [file source table &raquo;](#file-source-table), which maps a **file ID** to one or more **file sources**.  

Schema:
```
predicate#de3bc05a predicate:string is_constructor:Bool = Predicate;
source#4ec4751a flags:# predicate:Predicate stored_constructor:string stored_params:Vector<FieldExtractor> skipped_flags:Vector<string> needs_parent:flags.3?Predicate needs_not_parents:Vector<Predicate> = Source;
```

**Note**: The following sections assume that all [Updates](/type/Updates.md) constructors have already been converted to a vector of [Update](/type/Update.md) constructors, **including short variants** like [updateShortMessage](/constructor/updateShortMessage.md), [updateShortSentMessage](/constructor/updateShortSentMessage.md), [updateShortChatMessage](/constructor/updateShortChatMessage.md), which must be pre-converted to [Update](/type/Update.md) constructors by the client using information extracted from the method call.  
While this operation could be done within the map file, it would needlessly increase the number of paths: given that most clients already convert short constructors to Update constructors, the map file only considers paths starting from the Update constructors.  

Parameters:

* `predicate` - Indicates the constructor or method where extraction of the fields must start.
  `predicate.predicate` contains the name, and `predicate.is_constructor` specifies whether it points to a constructor or to a method.
* `needs_parent` - If set, contains a constructor that must be present as a parent in the current traversal branch, or a method whose response is currently being traversed; this parent object is required by one or more path extractors in the source.
* `needs_not_parents` - Contains constructors or methods that must **not** be present in the current parent context for the source to be valid.
* `stored_constructor` - Contains the name of a `FileSource` constructor from the TL schema specified in `fileReferenceMap.db_schema`, which should be stored to the database after being populated by `stored_params` as specified below.
* `stored_params` - Contains info on how to populate the `FileSource` constructor specified in `stored_constructor`
* `skipped_flags` - In some cases, some **flag** fields of `stored_constructor` aren't referenced by `action`: this field contains the full list of flags which are never referenced by the current source and must be unset.  

Each unique predicate can have one or more `stored_constructor`s with different params.  
Note that method sources cannot make use of `needs_parent`.   

#### Source field extraction

```
// Extractor
extractAndStore#72069549 from:Path to:string = FieldExtractor;

extractInputStickerSetFromDocumentAttributesAndStore#369d8d14 from:Path to:string = FieldExtractor;
extractInputStickerSetFromStickerSetAndStore#c167d470 from:Path to:string = FieldExtractor;

extractPeerIdFromPeerAndStore#7d33019c from:Path to:string = FieldExtractor;
extractPeerIdFromInputPeerAndStore#a51acfb4 from:Path to:string = FieldExtractor;

extractChannelIdFromChannelAndStore#5675bc97 from:Path to:string = FieldExtractor;
extractChannelIdFromInputChannelAndStore#b662660e from:Path to:string = FieldExtractor;

extractUserIdFromUserAndStore#4778ec63 from:Path to:string = FieldExtractor;
extractUserIdFromInputUserAndStore#7720aa2e from:Path to:string = FieldExtractor;

// Paths
paramNotFlag#acd9d5cf = ParamFlag;
paramIsFlagAbortIfEmpty#f8fe9fee = ParamFlag;
paramIsFlagFallback#202b77a1 fallback:TypedOp = ParamFlag;
paramIsFlagPassthrough#1dc6e17d = ParamFlag;

pathPart#19a10fbf type:string constructor:string param:string param_type:string flag:ParamFlag = PathPart;

path#0c3586a2 parts:Vector<PathPart> = Path;
pathParent#58f13684 parts:Vector<PathPart> = Path;
```

Field extractors are used to extract a parameter from one or more constructors, i.e. `updateStory.story -> storyItem.media -> messageMediaDocument.document -> document.file_reference` and store it to the specified field of a `FileSource`.  

#### Extractors

```
extractAndStore#72069549 from:Path to:string = FieldExtractor;

extractInputStickerSetFromDocumentAttributesAndStore#369d8d14 from:Path to:string = FieldExtractor;
extractInputStickerSetFromStickerSetAndStore#c167d470 from:Path to:string = FieldExtractor;

extractPeerIdFromPeerAndStore#7d33019c from:Path to:string = FieldExtractor;
extractPeerIdFromInputPeerAndStore#a51acfb4 from:Path to:string = FieldExtractor;

extractChannelIdFromChannelAndStore#5675bc97 from:Path to:string = FieldExtractor;
extractChannelIdFromInputChannelAndStore#b662660e from:Path to:string = FieldExtractor;

extractUserIdFromUserAndStore#4778ec63 from:Path to:string = FieldExtractor;
extractUserIdFromInputUserAndStore#7720aa2e from:Path to:string = FieldExtractor;
```

##### `extractAndStore`

Extracts the value at the specified path and stores it to `$FileSource.$to`.

##### `extractInputStickerSetFromDocumentAttributesAndStore`

Takes the `Vector<DocumentAttribute>` at `from`, looks for a [documentAttributeSticker](/constructor/documentAttributeSticker.md), and stores the [InputStickerSet](/type/InputStickerSet.md) contained in [documentAttributeSticker](/constructor/documentAttributeSticker.md).`stickerset` into `$FileSource.$to`.

Aborts if there is no attribute of type [documentAttributeSticker](/constructor/documentAttributeSticker.md) in the passed vector.

##### `extractInputStickerSetFromStickerSetAndStore`

Takes the [stickerSet](/constructor/stickerSet.md) at `from`, transforms it into an [InputStickerSet](/type/InputStickerSet.md), and stores it into `$FileSource.$to`.

##### `extractPeerIdFromPeerAndStore`

Takes the [Peer](/type/Peer.md) at `from`, transforms it into a [bot API peer ID (of type `long`) &raquo;](/api/bots/ids.md), and stores it into `$FileSource.$to`.  

##### `extractPeerIdFromInputPeerAndStore`

Takes the [InputPeer](/type/InputPeer.md) at `from`, transforms it into a [bot API peer ID (of type `long`) &raquo;](/api/bots/ids.md), and stores it into `$FileSource.$to`.  

If `from` points to an [inputPeerSelf](/constructor/inputPeerSelf.md), stores the ID of the current user, instead.  

Aborts if `from` points to an [inputPeerEmpty](/constructor/inputPeerEmpty.md).  

##### `extractChannelIdFromChannelAndStore`

Takes the [channel](/constructor/channel.md) at `from`, takes the `id` field and stores it into `$FileSource.$to`.  

##### `extractChannelIdFromInputChannelAndStore`

Takes the [InputChannel](/type/InputChannel.md) at `from`, takes the `channel_id` field and stores it into `$FileSource.$to`.  

Aborts if `from` points to an [inputChannelEmpty](/constructor/inputChannelEmpty.md).  

##### `extractUserIdFromUserAndStore`

Takes the [user](/constructor/user.md) at `from`, takes the `id` field and stores it into `$FileSource.$to`.  

##### `extractUserIdFromInputUserAndStore`

Takes the [InputUser](/type/InputUser.md) at `from`, takes the `user_id` field and stores it into `$FileSource.$to`.  

If `from` points to an [inputUserSelf](/constructor/inputUserSelf.md), stores the ID of the current user, instead.  

Aborts if `from` points to an [inputUserEmpty](/constructor/inputUserEmpty.md).  

#### Paths

The first part of the path always points to:

* The constructor/method of the `source` (`source.predicate`), for `path`
* The constructor/method of the parent contained in `source.needs_parent`, for `pathParent`

A path is composed of multiple `pathPart`s.  

Each `pathPart` contains the following fields, which describe how to extract the field.  

* `constructor` - Indicates the required constructor/method predicate. 
  If a different constructor type is encountered (i.e. [documentEmpty](/constructor/documentEmpty.md) instead of [document](/constructor/document.md)), abort extraction.  
  By definition, if a method name is passed, it will always be equal to the method of the associated source.
* `type` - Indicates the type of the required constructor/method.
* `param` - Indicates the required parameter; if it's an empty string, it indicates the return value of a method.  
* `param_type` - Indicates the type of the required parameter; if the parameter is a flag, the underlying type is specified; if `param` points to the return value of a method, `param_type` will be equal to `type`.    
* `flag` - Contains exactly one of the following constructors:
  * `paramNotFlag` - The current parameter is not a flag
  * `paramIsFlagAbortIfEmpty` - The current parameter is a flag, and if it's not set, abort extraction.  
  * `paramIsFlagFallback` -  The current parameter is a flag, and if it's not set, use the specified `TypedOp` as fallback value.  
    Note that OPs of type `copyOp`, `getInputChannelByIdOp`, `getInputUserByIdOp` and `getInputPeerByIdOp` are not allowed in this context.
  * `paramIsFlagPassthrough` - The current parameter is a flag, and its value should be copied/returned verbatim; can only be used on the last element of a path and within the arguments of a constructorOp/callOp/getMessageOp only if the argument that uses this path is a flag of the same type.  

### Refresh actions

Refresh actions are used to refresh an expired file reference of a media file according to the [file sources &raquo;](#file-sources) stored in the [file source table &raquo;](#file-source-table), associated to the `FileId`.

See [here &raquo;](/api/file-references/refresh-actions.md) for the full list of refresh actions contained by the current map file.  

```
refreshAction#d4e15689 stored_constructor:string action:ActionOp = RefreshAction;

// Actions
callOp#c2ff3383 method:string args:Vector<TypedOpArg> = ActionOp;
getMessageOp#8da4c2ae peer:TypedOp id:TypedOp quick_reply_shortcut_id:TypedOp = ActionOp;

// For string => TypedOp dictionaries
typedOpArg#3a2930c2 key:string value:TypedOp = TypedOpArg;

// Typed constructors, the type is specified to simplify codegen,
// but isn't strictly necessary as it can be inferred from the TypedOpOp.
// It is fully pre-validated during the generation of the definition file.
typedOp#705b10ec type:string op:TypedOpOp = TypedOp;
```

Params:

* `stored_constructor` - The name of a [file source](#file-sources) (an object of type `FileSource`), specified in the `db_schema`.
* `action` - The action to execute when refreshing a file source of type `stored_constructor`.  

There can only be one action per file source type.

The arguments of the action are composed of a set of `typedOp` constructors.  

[`typedOp` &raquo;](#action-parameters) is a wrapper for a `TypedOpOp` constructor which also contains the TL `type` of the associated `TypedOpOp`; this isn't strictly necessary for evaluation, but it can be useful during automatic code generation from the definition file.  

#### `callOp`

`callOp` is a generic action which invokes the method specified in `method` with the arguments specified in `args`.  

`callOp.args` will always contain at least all of the required parameters, and possibly some flagged parameters as well.  

#### `getMessageOp`

`getMessageOp` is a specialized action which invokes either [messages.getMessages](/method/messages.getMessages.md) or [channels.getMessages](/method/channels.getMessages.md) depending on the type of the `peer` (which is always a subtype of [InputPeer](/type/InputPeer.md)), passing the `id` as the only element to the vector `id` parameter.  
If the flag to which `quick_reply_shortcut_id` points is set, [messages.getQuickReplyMessages](/method/messages.getQuickReplyMessages.md) should be executed instead, passing `quick_reply_shortcut_id` to the `shortcut_id` parameter and `id` as the only element of the `id` vector parameter.  

#### Action parameters

```
copyOp#f48f418f from:string = TypedOpOp;

getInputChannelByIdOp#3cb47531 from:string = TypedOpOp;
getInputUserByIdOp#c0ee4326 from:string = TypedOpOp;
getInputPeerByIdOp#19813750 from:string = TypedOpOp;

// Literals & constructors (methods not allowed or needed here)
constructorOp#107f8d8a constructor:string args:Vector<TypedOpArg> = TypedOpOp;

vectorOp#f8fb8f72 values:Vector<TypedOp> = TypedOpOp;

intLiteralOp#cbfabe7c value:int = TypedOpOp;
longLiteralOp#d08b8d3a value:long = TypedOpOp;
stringLiteralOp#2b56ea8e value:string = TypedOpOp;
bytesLiteralOp#fdb395a4 value:bytes = TypedOpOp;
boolLiteralOp#37e07911 value:Bool = TypedOpOp;
doubleLiteralOp#3651e3bf value:double = TypedOpOp;
themeFormatLiteralOp#8e4f9208 = TypedOpOp;
```

Action parameters are represented by `TypedOpOp` constructors.  

#### `copyOp`

The most commonly used type, copies the value(s) from the stored `$FileSource.$from`.

#### `getInputChannelByIdOp`

Returns an [InputChannel](/type/InputChannel.md) constructor from the client's [peer database](/api/peers.md), based on the channel ID of type [long](/type/long.md) specified in the stored `$FileSource.$from`.  

#### `getInputUserByIdOp`

Returns an [InputUser](/type/InputUser.md) constructor from the client's [peer database](/api/peers.md), based on the user ID of type [long](/type/long.md) specified in the stored `$FileSource.$from`.    

#### `getInputPeerByIdOp`

Returns an [InputPeer](/type/InputPeer.md) constructor from the client's [peer database](/api/peers.md), based on the [bot API peer ID &raquo;](/api/bots/ids.md) of type [long](/type/long.md) specified in the stored `$FileSource.$from`.  

#### `constructorOp`

Constructs the constructor of type (predicate) `constructor` using the arguments specified in `args`.  

#### `vectorOp`

Constructs a vector with the values passed in `values`.  

#### `intLiteralOp`

Constructs a literal [int](/type/int.md) with the value passed in `value`.

#### `longLiteralOp`

Constructs a literal [long](/type/long.md) with the value passed in `value`.

#### `stringLiteralOp`

Constructs a literal [string](/type/string.md) with the value passed in `value`.

#### `bytesLiteralOp`

Constructs a literal [bytes](/type/bytes.md) with the value passed in `value`.

#### `boolLiteralOp`

Constructs a literal [Bool](/type/Bool.md) with the value passed in `value`.

#### `doubleLiteralOp`

Constructs a literal [double](/type/double.md) with the value passed in `value`.

#### `themeFormatLiteralOp`

Constructs a [string](/type/string.md), indicating the [theming engines](/api/themes.md) supported by the client (used when working with theme-related media, can be an empty string if the client doesn't support themes).

<!-- 
## Another example:
Assume you receive a [message](/constructor/message.md) from your friend: that message contains a [messageMediaPhoto](/constructor/messageMediaPhoto.md) with a [photo](/constructor/photo.md).

Your client has to cache not only the `file_reference` field of the photo, but also the context in which the file reference was seen (in this case, a message coming from a specific user).

The context info is, in this case, [a source of type message](https://github.com/danog/MadelineProto/blob/v8/src/MTProtoTools/ReferenceDatabase.php#L74), containing the message ID and the peer ID of the chat/channel/user where the message was seen.

The context info has to be associated with the file reference: when downloading a file using [upload.getFile](/method/upload.getFile.md) or resending it using [messages.sendMedia](/method/messages.sendMedia.md), a `FILE_REFERENCE_EXPIRED` error may be returned.  
[messages.sendMultiMedia](/method/messages.sendMultiMedia.md) returns a variation of the same error, as a `FILE_REFERENCE_%d_EXPIRED` error (where `%d` is the index of the media with the expired file reference in the passed media array).  
If this happens, the context info must be used to refetch the object that contained the file reference: in this example, the peer info and the message ID have to be used with [channels.getMessages](/method/channels.getMessages.md) or [messages.getMessages](/method/messages.getMessages.md) to [refetch the message](https://github.com/danog/MadelineProto/blob/v8/src/MTProtoTools/ReferenceDatabase.php#L481), recache the file reference and use it in a new file download request.

More than one source can be associated to one file reference, for greater resilience (in the case of a message that was deleted in one chat but was also forwarded in another chat, the file reference can be refetched from the second chat, instead).

Sources for objects returned by method calls with certain parameters can be considered, too (for example, in the case of favorited sticker sets returned by [messages.getFavedStickers](/method/messages.getFavedStickers.md)).

-->

