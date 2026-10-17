# Telegram Database Library

<div>
	<a href="/file/811140459/1bdb/rl5NwUNbBzM.26909.gif/0ecbc461e020d4bc3a" target="_blank"><img src="/file/811140459/1bdb/rl5NwUNbBzM.26909.gif/0ecbc461e020d4bc3a" title="TDLib"  style="max-width: 200px;float:right; padding-bottom:15px" /></a>
</div>

**TDLib** (Telegram Database Library) is a cross-platform, fully functional Telegram client. We designed it to help third-party developers create their own **custom apps** using the Telegram platform.

>[Read about TDLib on the Telegram blog »](https://telegram.org/blog/tdlib)

####TDLib Advantages

* **Cross-platform**. TDLib can be used on Android, iOS, Windows, macOS, Linux, WebAssembly, FreeBSD, Windows Phone, watchOS, tvOS, Tizen, Cygwin. It should also work on other \*nix systems with or without minimal effort.
* **Multilanguage**. TDLib can be easily used with **any programming language** that is able to execute C functions. Additionally it already has native bindings to Java (using JNI) and C# (using C++/CLI).
* **Easy to use**. TDLib takes care of all **network implementation details**, **encryption** and **local data storage**.
* **High-performance**. In the Telegram Bot API, each TDLib instance handles more than **24,000** active bots simultaneously.
* **Well-documented**. All TDLib API methods and public interfaces are [**fully documented**](/tdlib/docs/).
* **Consistent**. TDLib guarantees that all updates will be delivered in the **right order**.
* **Reliable**. TDLib remains **stable** on slow and unreliable Internet connections.
* **Secure**: All local data is **encrypted** using a user-provided encryption key.
* **Fully-asynchronous**. Requests to TDLib don't block each other or anything else, responses will be sent when they are available.

>[Getting started with TDLib »](/tdlib/getting-started.md)

####Resources

TDLib is fully **open source**, all code is available on [GitHub](https://github.com/tdlib/td).

**See also:**

* [Library documentation](/tdlib/docs/)
* [List of available options](/tdlib/options.md)
* [Notification API documentation](/tdlib/notification-api/)

[//]: # (* [Prebuilt library for Android]\(/tdlib/tdlib.zip\))