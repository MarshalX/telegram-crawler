# Theme

Cloud theme

```tl
theme#a00e67d6 flags:# creator:flags.0?true default:flags.1?true for_chat:flags.5?true id:long access_hash:long slug:string title:string document:flags.2?Document settings:flags.3?Vector<ThemeSettings> emoticon:flags.6?string installs_count:flags.4?int = Theme;

---functions---

account.createTheme#652e4400 flags:# slug:string title:string document:flags.2?InputDocument settings:flags.3?Vector<InputThemeSettings> = Theme;
account.updateTheme#2bf40ccc flags:# format:string theme:InputTheme slug:flags.0?string title:flags.1?string document:flags.2?InputDocument settings:flags.3?Vector<InputThemeSettings> = Theme;
account.getTheme#3a5869ec format:string theme:InputTheme = Theme;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [theme](/constructor/theme.md) | Theme |

### Methods

| Method | Description |
| --- | --- |
| [account.createTheme](/method/account.createTheme.md) | Create a theme |
| [account.updateTheme](/method/account.updateTheme.md) | Update theme |
| [account.getTheme](/method/account.getTheme.md) | Get theme information |