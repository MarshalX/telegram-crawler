# Messages.StickerSetInstallResult

Result of stickerset installation process

```tl
messages.stickerSetInstallResultSuccess#38641628 = messages.StickerSetInstallResult;
messages.stickerSetInstallResultArchive#35e410a8 sets:Vector<StickerSetCovered> = messages.StickerSetInstallResult;

---functions---

messages.installStickerSet#c78fe460 stickerset:InputStickerSet archived:Bool = messages.StickerSetInstallResult;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.stickerSetInstallResultSuccess](/constructor/messages.stickerSetInstallResultSuccess.md) | The stickerset was installed successfully |
| [messages.stickerSetInstallResultArchive](/constructor/messages.stickerSetInstallResultArchive.md) | The stickerset was installed, but since there are too many stickersets some were archived |

### Methods

| Method | Description |
| --- | --- |
| [messages.installStickerSet](/method/messages.installStickerSet.md) | Install a stickerset |