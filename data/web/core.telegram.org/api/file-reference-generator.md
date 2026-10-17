# File reference generator


Implementation and maintenance of the [file reference database &raquo;](/api/file-references.md) may be fully automated by using the file reference database schema generator tool, and the **file reference database map file** it generates.  

Dictionary:

* A **file reference path** is a deserialization path where a `file_reference` field may appear, for example `updateNewMessage.message -> message.media -> messageMediaDocument.document -> document.file_reference`.  
* A **file reference source** (or `FileSource`) contains information that the client may use to re-fetch the document (and the new file reference), for example for the above path it's `getMessage{peer: updateNewMessage.message.peer, id: updateNewMessage.message.id}`, which can be used to refetch the document using either [messages.getMessages](/method/messages.getMessages.md) or [channels.getMessages](/method/channels.getMessages.md) depending on the type of the [Peer](/type/Peer.md).  

The database map file contains **all possible sources**, for **all possible file reference paths**.  

It is generated using a set of manually-specified rules (specifying the actual sources) within the generator and the latest API schema, to make sure the following rules are followed:

* All possible and valid places where a `file_reference` appears have at least one valid associated source: this is checked by recursively checking all possible deserialized object graphs, starting from:
  * All constructors of type `Update`
  * All constructors which are directly returned by at least one method.
  * All constructors which are directly returned by at least one method inside of a vector.

  This covers all possible TL payloads received from the API, which can only return method call responses, or [Update](/type/Update.md) constructors contained inside [Updates](/type/Updates.md).  

  For example, when checking the graph of the [updateNewMessage](/constructor/updateNewMessage.md) constructor, the following file reference paths are found:

  ```
  updateNewMessage.message -> message.media -> messageMediaDocument.document -> document.file_reference
  updateNewMessage.message -> message.reply_to -> messageReplyHeader.reply_media -> messageMediaDocument.document -> document.file_reference
  updateNewMessage.message -> message.media -> messageMediaInvoice.extended_media -> messageExtendedMedia.media -> messageMediaDocument.document -> document.file_reference
  ... and many others
  ```

  ... and for all paths, the system which generates the definition file makes sure that at least one source covers the path.  

* All sources must be used in at least one path.
* All paths covered by sources which make use of flag fields (which may be absent, leading to an orphan, context-less file reference) must be covered by at least one non-flagged source (or the flagged source must be non-flagged in the specified path).  
  
  For example, the file reference path `updateStory.story -> storyItem.media -> messageMediaDocument.document -> document.file_reference` *would* rely on the source `getStory{peer: storyItem.from_id, story_id: storyItem.id}` with [stories.getStoriesByID](/method/stories.getStoriesByID.md).  
  
  However, the `from_id` field of [storyItem](/constructor/storyItem.md) is actually a flag and in this specific path it is **not** set (it's only set when a [storyItem](/constructor/storyItem.md) is returned by [stories.getAllStories](/method/stories.getAllStories.md)).
  
  The validator ([the code that generated the definition file, you DO NOT have to implement a validator yourself](https://github.com/danog/MadelineProto/blob/v8/tools/gen_filerefmap.php)) noticed that, which forced the manual addition of the valid fallback source `getStory{peer: updateStory.peer, story_id: updateStory.story -> storyItem.id}`, which is present in the final source definition file.  

  Note that the definition file is already pre-validated, no additional validation is needed to implement it, the above is just an example of a case that is successfully covered by the [validator implemented here &raquo;](https://github.com/danog/MadelineProto/blob/v8/tools/gen_filerefmap.php).  

### Running

To run the generator on a newer layer, clone the repo, install deps, and run the generator:

```
git clone https://github.com/danog/MadelineProto.git --recursive
cd MadelineProto
composer update
php tools/gen_filerefmap.php <layer> <inputSchema> <output> <outputJson>
```

Arguments:

- `layer` - Layer version
- `inputSchema` - The new API schema in JSON or TL format
- `output` - The generated file reference database map file in serialized TL format
- `outputJson` - The generated file reference database map file in JSON format 

The schema used for the map file is contained in `src/TL_file_ref_map_schema.tl`.  

When new, not yet covered paths are found, an exception will be thrown: to cover the new paths, modify `tools/FileRefExtractor/FileRefGenerator.php`, adding a new `CallOp`, for example:

```
$locations['storyItem'][] = new CallOp(
    'stories.getStoriesByID',
    [
        'id' => new ArrayOp(new CopyOp(new Path([['storyItem', 'id']]))),
        'peer' => new GetInputPeerOp(new Path([['peerStories', 'peer']], true)),
    ],
    'fileSourceStory'
);
```

In this example, when encountering a [storyItem](/constructor/storyItem.md) constructor, a new `fileSourceStory` is generated with the following fields:

* `id`: `storyItem.id`
* `peer`: `peerStories.peer` (must have a [peerStories](/constructor/peerStories.md) constructor as parent).  
  The generator automatically asserts that only one parent constructor is used (or none).  

The generator automatically asserts that the parameters of the file source are the same or compatible for all OPs, to generate only one file source constructor with the passed name (in this case `fileSourceStory`).  

The structure of some file sources may be manually specified in the `$pre` array, in case of sources generated from partially conflicting fields, requiring flag fields within the source.  

This `fileSourceStory` is then used, when a refresh is needed, in a [stories.getStoriesByID](/method/stories.getStoriesByID.md) method call with the following parameters:

* `id`: `fileSourceStory.id`
* `peer`: `fileSourceStory.peer`

The generator automatically asserts that all method calls use the parameters of the file source in the same or compatible ways, to generate only one method call per file source.  

As you can see, this definition combines:

* Extraction of the context
* Generation of the file source to store into the database
* The method call to use on the stored file source when refreshing the file reference

...in a single, concise definition.  

`$locations` is a `HashMap<Key, Vector<Op>>`, where:

- `Key` is the constructor where context capturing begins (must be equal to the first element of non-parent Paths)
- `Op` is an object of type  `ActionOp` (`CallOp`, `CopyMethodCallOp`, `GetMessageOp`, `Noop`).  

