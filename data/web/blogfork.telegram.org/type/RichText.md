# RichText

Rich text

```tl
textEmpty#dc3d824f = RichText;
textPlain#744694e0 text:string = RichText;
textBold#6724abc4 text:RichText = RichText;
textItalic#d912a59c text:RichText = RichText;
textUnderline#c12622c4 text:RichText = RichText;
textStrike#9bf8bb95 text:RichText = RichText;
textFixed#6c3f19b9 text:RichText = RichText;
textUrl#3c2884c1 text:RichText url:string webpage_id:long = RichText;
textEmail#de5a0dd6 text:RichText email:string = RichText;
textConcat#7e6260d7 texts:Vector<RichText> = RichText;
textSubscript#ed6a8504 text:RichText = RichText;
textSuperscript#c7fb5e01 text:RichText = RichText;
textMarked#34b8621 text:RichText = RichText;
textPhone#1ccb966a text:RichText phone:string = RichText;
textImage#81ccf4f document_id:long w:int h:int = RichText;
textAnchor#35553762 text:RichText name:string = RichText;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [textEmpty](/constructor/textEmpty.md) | Empty rich text element |
| [textPlain](/constructor/textPlain.md) | Plain text |
| [textBold](/constructor/textBold.md) | **Bold** text |
| [textItalic](/constructor/textItalic.md) | *Italic* text |
| [textUnderline](/constructor/textUnderline.md) | Underlined text |
| [textStrike](/constructor/textStrike.md) | <del>Strikethrough</del> text |
| [textFixed](/constructor/textFixed.md) | `fixed-width` rich text |
| [textUrl](/constructor/textUrl.md) | Link |
| [textEmail](/constructor/textEmail.md) | Rich text email link |
| [textConcat](/constructor/textConcat.md) | Concatenation of rich texts |
| [textSubscript](/constructor/textSubscript.md) | Subscript text |
| [textSuperscript](/constructor/textSuperscript.md) | Superscript text |
| [textMarked](/constructor/textMarked.md) | Highlighted text |
| [textPhone](/constructor/textPhone.md) | Rich text linked to a phone number |
| [textImage](/constructor/textImage.md) | Inline image |
| [textAnchor](/constructor/textAnchor.md) | Text linking to another section of the page |