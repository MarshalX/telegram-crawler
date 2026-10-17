# SecureValueError

Secure value error

```tl
secureValueErrorData#e8a40bd9 type:SecureValueType data_hash:bytes field:string text:string = SecureValueError;
secureValueErrorFrontSide#be3dfa type:SecureValueType file_hash:bytes text:string = SecureValueError;
secureValueErrorReverseSide#868a2aa5 type:SecureValueType file_hash:bytes text:string = SecureValueError;
secureValueErrorSelfie#e537ced6 type:SecureValueType file_hash:bytes text:string = SecureValueError;
secureValueErrorFile#7a700873 type:SecureValueType file_hash:bytes text:string = SecureValueError;
secureValueErrorFiles#666220e9 type:SecureValueType file_hash:Vector<bytes> text:string = SecureValueError;
secureValueError#869d758f type:SecureValueType hash:bytes text:string = SecureValueError;
secureValueErrorTranslationFile#a1144770 type:SecureValueType file_hash:bytes text:string = SecureValueError;
secureValueErrorTranslationFiles#34636dd8 type:SecureValueType file_hash:Vector<bytes> text:string = SecureValueError;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [secureValueErrorData](/constructor/secureValueErrorData.md) | Represents an issue in one of the data fields that was provided by the user. The error is considered resolved when the field's value changes. |
| [secureValueErrorFrontSide](/constructor/secureValueErrorFrontSide.md) | Represents an issue with the front side of a document. The error is considered resolved when the file with the front side of the document changes. |
| [secureValueErrorReverseSide](/constructor/secureValueErrorReverseSide.md) | Represents an issue with the reverse side of a document. The error is considered resolved when the file with reverse side of the document changes. |
| [secureValueErrorSelfie](/constructor/secureValueErrorSelfie.md) | Represents an issue with the selfie with a document. The error is considered resolved when the file with the selfie changes. |
| [secureValueErrorFile](/constructor/secureValueErrorFile.md) | Represents an issue with a document scan. The error is considered resolved when the file with the document scan changes. |
| [secureValueErrorFiles](/constructor/secureValueErrorFiles.md) | Represents an issue with a list of scans. The error is considered resolved when the list of files containing the scans changes. |
| [secureValueError](/constructor/secureValueError.md) | Secure value error |
| [secureValueErrorTranslationFile](/constructor/secureValueErrorTranslationFile.md) | Represents an issue with one of the files that constitute the translation of a document. The error is considered resolved when the file changes. |
| [secureValueErrorTranslationFiles](/constructor/secureValueErrorTranslationFiles.md) | Represents an issue with the translated version of a document. The error is considered resolved when a file with the document translation changes. |