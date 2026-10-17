# LangPackDifference

Language pack changes

```tl
langPackDifference#f385c1f6 lang_code:string from_version:int version:int strings:Vector<LangPackString> = LangPackDifference;

---functions---

langpack.getLangPack#f2f2330a lang_pack:string lang_code:string = LangPackDifference;
langpack.getDifference#cd984aa5 lang_pack:string lang_code:string from_version:int = LangPackDifference;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [langPackDifference](/constructor/langPackDifference.md) | Changes to the app's localization pack |

### Methods

| Method | Description |
| --- | --- |
| [langpack.getLangPack](/method/langpack.getLangPack.md) | Get localization pack strings |
| [langpack.getDifference](/method/langpack.getDifference.md) | Get new strings in language pack |