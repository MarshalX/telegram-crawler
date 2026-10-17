# Reproducible Builds for iOS and Android

This page contains instructions for verifying that Telegram's [open source code](https://telegram.org/apps#source-code) is exactly the same as the code that is used to build the apps that are available in the [App Store](https://telegram.org/dl/ios), [Google Play](https://telegram.org/dl/android) and [directly](https://telegram.org/android) on the Telegram website.

**Warning:** Telegram supports reproducible builds as of [**version 5.13**](https://telegram.org/blog/verifiable-apps-and-more). Bear in mind that, at this stage, the verification process should be considered **experimental**. We will be updating our apps and these instructions to make this process as straightforward as possible.

* [Telegram for Android](#reproducible-builds-for-android)
* [Telegram for iOS](#reproducible-builds-for-ios)

>Please read the relevant **notes** and [troubleshooting](#troubleshooting) section carefully.

-------------

<div class="blog_wide_image">
    <a href="/file/464001695/1/nxVa_f-qKS8.216020/9da7686ded6f1e7bef" target="_blank"><img src="/file/464001785/3/GqL9jQg6ChI.76277/1377819b17eaa4dcce" srcset="/file/464001695/1/nxVa_f-qKS8.216020/9da7686ded6f1e7bef, 1200w" title="Builds Telegram verifiable are." alt="Dude in a jacket inspecting the hologram of a mechanical dog to verify it's built according to the blueprints provided."/></a>
</div>

## Reproducible Builds for Android

### Step 1. Install Docker
Docker can be obtained [here](https://www.docker.com/). Once the installation is complete, log into your Docker account > Settings > Resources > Advanced and configure the amount of resources Docker may use:

<div class="blog_image_wrap">
	<a href="/file/464001096/115ed/SDQR5AepsL8.117492/5b793978a9f866dc1e" target="_blank"><img src="/file/464001096/115ed/SDQR5AepsL8.117492/5b793978a9f866dc1e" title="Docker Performance" /></a>
   <p>Docker Performance</p>
</div>

We recommend using the maximum amount allowed by your system's hardware, in order to speed up the build time.

### Step 2. Confirm which version you have installed on your Android device

You can find the **version/build** number  and the source (website, Play Store, Huawei Store) at the bottom of the Settings page. Note that Telegram supports reproducible builds starting with version **5.13**.

<div class="blog_image_wrap">
	<a href="/file/464001729/10c74/J5yxQsyIhu8.18423/0676180d6ab192b6ea" target="_blank"><img src="/file/464001729/10c74/J5yxQsyIhu8.18423/0676180d6ab192b6ea" title="App Version" /></a>
    <p>App Version</p>
</div>

<!--
<div>
  <a href="" target="_blank"><img src="/file/464001812/12119/us-sZeolClE.95982/62ccd4cbf110c2c9a0" title="Telegram Version"  class="dev_page_image" width=40%/></a>
</div>
-->

The commit tag to checkout source code for the example above will be `release-9.3.3_3026`.

>Please make sure that you're using the correct **version** and **build number**  of the version you want to check (and not the one from this example 😈). 

<!--
The part after the version number will help you know in which folder to look for the correct APK when you've finished [building the app (Step 4)](#step-4-build-the-app):

* “Direct” after version number means that the APK will be inside the “afat/standalone” folder.
* "Universal" after version number means that the APK will be inside the “afat/release” folder.
* If you have Android Version 6.0 or greater, your APK folder will have the “_SDK23” suffix.
* “arm64-v8a” - folder name will start with “arm64”.
* “armeabi-v7” - folder name will start with “armv7”.
* “x86” - folder name will start with “x86”.
* “x86_64”  - folder name will start with “x64”.
-->

<!--
<div class="blog_image_wrap">
	<a href="/file/464001368/2/fgnFkr2Id3Q.55259/d03599849440e62b52" target="_blank"><img src="/file/464001368/2/fgnFkr2Id3Q.55259/d03599849440e62b52" title="Relevant folder" /></a>
    <p>APK Folders</p>
</div>
-->

### Step 3. Obtain the source code
Open Terminal, run the commands:
`git clone https://github.com/DrKLO/Telegram.git $HOME/telegram-android` 
`cd $HOME/telegram-android`
`git checkout release-{VERSION AND BUILD NUMBER FROM STEP 2}`

For our [example](#step-2-confirm-which-version-you-have-installed-on-your-android), the command would be:
`git checkout release-5.13.0_1821`

<div class="blog_wide_image">
	<a href="/file/464001840/1/5DrefLlg3vw.116770/8901e43605c30939d4" target="_blank"><img src="/file/464001840/1/5DrefLlg3vw.116770/8901e43605c30939d4" title="Obtaining the source code" /></a>
</div>

### Step 4. Build the app
Open Terminal, run the commands:
`cd $HOME/telegram-android`
`docker build -t telegram-build .`

<div class="blog_wide_image">
	<a href="/file/464001202/1/UyO3_tLDRPg.35170/31865250522be6db86" target="_blank"><img src="/file/464001202/1/UyO3_tLDRPg.35170/31865250522be6db86" title="Building the app" /></a>
</div>

`docker run --rm -v "$PWD":/home/source telegram-build`

<div class="blog_wide_image">
	<a href="/file/464001691/2/SFreJq5OZ4U.34208/f69b83468ac2a07276" target="_blank"><img src="/file/464001691/2/SFreJq5OZ4U.34208/f69b83468ac2a07276" title="Building the app" /></a>
</div>

<div class="blog_wide_image">
  <a href="/file/464001014/116e8/0BQSMuzynOI.10222/1293c6fc237ab85f7e" target="_blank"><img src="/file/464001014/116e8/0BQSMuzynOI.10222/1293c6fc237ab85f7e" title="Building the app" /></a>
</div>

These commands will produce 3 different APKs and 2 bundles:

`/apk/afat/standalone/app.apk` – used for direct downloads from telegram.org/android
`/apk/afat/elease/app.apk` – the playstore version
`/apk/afat/release/app-huawei.apk` – used exclusively for the Huawei store

``bundle/bundleAfat_SDK23Release/TMessagesProj_App-bundleAfat_SDK23-release.aab``
``bundle/bundleAfatRelease/TMessagesProj_App-bundleAfat-release.aab``

These APKs can be found in:
``$HOME/telegram-android/TMessagesProj/build/outputs/apk/afat/``

Use the folder name from [Step 4](#step-4-build-the-app) to find the correct folder that holds the same APK as installed on your device. For example, for the Play Store version, the path to your APK will be:

`$HOME/telegram-android/TMessagesProj/build/outputs/apk/afat/release/app.apk`
Copy this APK to the root source directory by running this command in Terminal:
`cp $HOME/telegram-android/TMessagesProj/build/outputs/apk/afat/release/app.apk $HOME/telegram-android/telegram_built.apk`

<div class="blog_wide_image">
	<a href="/file/464001970/1/9nwL42h9lAU.32529/9b39cebcdb8c6daff7" target="_blank"><img src="/file/464001970/1/9nwL42h9lAU.32529/9b39cebcdb8c6daff7" title="Copy the APK" /></a>
</div>
    
### Step 5. The Telegram APK installed on your device
You will need [adb](https://developer.android.com/studio/releases/platform-tools.html#downloads) for this step. 

<div class="blog_image_wrap">
	<a href="/file/464001167/1/ekMuxStZVes.485894/eb0a512392500d53b3" target="_blank"><img src="/file/464001167/1/ekMuxStZVes.485894/eb0a512392500d53b3" title="ADB" /></a>
   <p>ADB</p>
</div>

> If you downloaded your APK [**directly from Telegram's website**](https://telegram.org/android), use the package name `org.telegram.messenger.web` in this step. To verify the **Google Play APK**, use `org.telegram.messenger`.

Connect your device to the computer, open Terminal, run the commands:
`adb shell pm path org.telegram.messenger`

<div class="blog_wide_image">
	<a href="/file/464001688/1/CJrBoBPxoKU.31587/670238fac9bc5f869d" target="_blank"><img src="/file/464001688/1/CJrBoBPxoKU.31587/670238fac9bc5f869d" title="ADB" /></a>
</div>

The output will look something like this:
`package:/data/app/org.telegram.messenger-_zOSURFEx2GpHM8UDF_PVg==/base.apk`
By using this information, pull the APK from your device to $HOME/telegram-android using command:
`adb pull /data/app/org.telegram.messenger-_zOSURFEx2GpHM8UDF_PVg==/base.apk $HOME/telegram-android/telegram_store.apk`

### Step 6. Compare the APKs
To compare Direct and Huawei Store versions, open Terminal, run the commands:
`cd $HOME/telegram-android`
`python apkdiff.py telegram_store.apk telegram_built.apk`
If the APKs are the same, you will see 
`APKs are the same!`
<div class="blog_wide_image">
	<a href="/file/464001327/1/Qcnkce3q-J4.35468/9791eeabf384c7830d" target="_blank"><img src="/file/464001327/1/Qcnkce3q-J4.35468/9791eeabf384c7830d" title="Match" /></a>
</div>

Play Store versions built from a bundle will be marked as 'store bundled'. To verify such builds, use:

`python apkfrombundle.py  telegram_bundle.aab  telegram_store.apk`

If anything goes wrong, you will see this:
<div class="blog_wide_image">
	<a href="/file/464001245/1/0wuFZh4wBYM.38635/bf90b5a321b44360fb" target="_blank"><img src="/file/464001245/1/0wuFZh4wBYM.38635/bf90b5a321b44360fb" title="Mismatch" /></a>
</div>

If your APKs don't match, please make sure that you chose [the correct code version](#step-2-confirm-which-version-you-have-installed-on-your-android) and [the right SDK](#step-4-build-the-app).

Check out the [Troubleshooting](#troubleshooting) section first in case you run into trouble.

-------------

## Reproducible Builds for iOS

The verification process for iOS builds is, unfortunately, a lot more complex than for Android. The two main issues with Apple's current policies and infrastructure are as follows:

1. Apple insists on using **FairPlay** encryption to “protect” even **free** and **open source** apps from “app pirates” which makes obtaining the executable code of apps impossible without a jailbroken device. To solve this issue, Apple would simply need to allow submitting unencryptable binaries to the App Store. This would not affect security since the code would still be signed – and would enable anyone to check the integrity of apps supporting reproducible builds without endangering the integrity and security of their devices.

2. Building your own reproducible binaries is difficult because macOS doesn't support containers like Docker. If Apple followed in the footsteps of Linux (and even Microsoft!) and added container support, it would eliminate the need for steps 1-3 in the guide below.

>As things stand now, you'll need a **jailbroken device**, at least **1,5 hours** and approximately **90GB** of free space to properly set up a virtual machine for the verification process.

To provide a stable and easily reproducible environment, Telegram iOS builds are compiled on a virtual machine.

### Step 1. Running Darwin-Containers

1. Checkout the latest DarwinContainers code: `git clone https://github.com/ali-fareed/darwin-containers.git`
2. Open darwin-containers/DarwinContainers.xcodeproj
3. Select DarwinContainersDaemon target
4. In Signing & Capabilities select your team and set a unique bundle id
5. Run

### Step 2. Creating an OS image

>Check [versions.json](https://github.com/TelegramMessenger/Telegram-iOS/blob/master/versions.json) for information on the relevant macOS and Xcode versions.

`./darwin-containers fetch`

Download the appropriate macOS restore image (e.g. 13.6):

`./darwin-containers fetch "macOS 13.6"`

Create a new OS image:

`./darwin-containers create --source "macOS 13.6" --tag "macos-13.0-xcode-{XCODE_VERSION}" --manual`

Follow the installation instructions. Set username to `containerhost` and password to `containerhost`.

Enable Remote Login and allow full disk access for remote users.

Connect to the guest VM using SSH with username `containerhost` and password `containerhost`.

Create the directory `~/.ssh` and set up the `authorized_keys` using the public key string printed by the `darwin-containers create` command earlier.

Upload the appropriate version of Xcode via `scp` and install to /Applications. Run it at least once to complete installation. Don't forget to download the **iOS SDK**.

<div class="blog_image_wrap">
  <a href="/file/400780400133/4/0E7KiaHo64A.103279/45c9eb5b6181a1bbd4" target="_blank"><img src="/file/400780400133/4/0E7KiaHo64A.103279/45c9eb5b6181a1bbd4" title=""  class="dev_page_image" /></a>

</div>

Shut down the guest OS.

### Step 3. Obtaining verification IPA

```
python3 -u build-system/Make/Make.py remote-build --darwinContainers="path-to-darwin-containers-script" --darwinContainersHost="unix://$HOME/.darwin-containers.sock" --configurationPath="build-system/appstore-configuration.json" --codesigningInformationPath=build-system/fake-codesigning --configuration=release_arm64
```

For more information see:

`build-system/Make/RemoteBuild.py`
`.gitlab-ci.yml` lane `verify_beta_testflight`

### Step 4. Obtaining the source code

`git clone --recursive https://github.com/TelegramMessenger/telegram-ios.git $HOME/telegram-ios`
`cd $HOME/telegram-ios`
`git checkout release-${VERSION_NUMBER}`

E.g., `git checkout release-7.3`. Please note that you need to check out the whole git history as the build version depends on the number of commits in the repository.

<div class="blog_wide_image">
	<a href="/file/464001402/3/U43d2T5SSGY.181052/c86e9e2a72b766e704" target="_blank"><img src="/file/464001402/3/U43d2T5SSGY.181052/c86e9e2a72b766e704" title="git clone"  /></a>
</div>

### Step 5. Downloading a decrypted version of the app from the App Store

This step requires a jailbroken device equipped with tools for decrypting apps. We‘d love to make this process more simple but that’s what you get for using Apple tech.

### Step 6. Comparing the AppStore build and the version built in the virtual machine

**Run**
`python3 tools/ipadiff.py build/artifacts/Telegram.ipa PATH-TO-THE-IPA-FILE-FROM-STEP-9`

1. cd telegram-ios > Enter
2. python3 tools/ipadiff.py build/artifacts/Telegram.ipa /path/ > Enter

<div class="blog_wide_image">
	<a href="/file/464001464/2/3skIXy_2ghc.41339/a62e0ea589b713438d" target="_blank"><img src="/file/464001464/2/3skIXy_2ghc.41339/a62e0ea589b713438d" title="Сomparing builds"  /></a>
</div>

In case of a successful comparison, you will get a text along these lines:
```
IPAs are equal, except for the files that can't currently be checked:
    Excluded files that couldn't be checked due to being encrypted:
        PlugIns/SiriIntents.appex/SiriIntents
        PlugIns/Widget.appex/Widget
        PlugIns/NotificationContent.appex/NotificationContent
        PlugIns/NotificationService.appex/NotificationService
        PlugIns/Share.appex/Share
    IPAs contain Watch directory with a Watch app which can't be checked currently.
    IPAs contain .car (Asset Catalog) files that are compiled by the App Store and can't currently be checked:

        Frameworks/TelegramUI.framework/Assets.car
        Assets.car
    IPAs contain .nib (compiled Interface Builder) files that are compiled by the App Store and can't currently be checked:
        Base.lproj/LaunchScreen.nib
```
   
<div class="blog_wide_image">
	<a href="/file/464001561/2/8mgy93NZXIg.138258/a0a0dca779416fba8a" target="_blank"><img src="/file/464001561/2/8mgy93NZXIg.138258/a0a0dca779416fba8a" title="The result > equal IPAs"  /></a>
</div>

In case of any mismatches, you'll get a detailed report.

<div class="blog_wide_image">
	<a href="/file/464001384/3/iSp-75NOtIU.58868/7b08b99752cdf7dd22" target="_blank"><img src="/file/464001384/3/iSp-75NOtIU.58868/7b08b99752cdf7dd22" title="Mismatching IPAs"  /></a>
</div>

-----

### iOS: Notes

1. You will get a warning if the archive created in [Step 5](#step-5-downloading-a-decrypted-version-of-the-app-from-the-app-s) contains encrypted files. If all these files are in the `PlugIns` subfolder, they represent various system extensions (e.g. external sharing, Siri). Decrypting such files using existing ways of receiving app archives via Jailbreak is non-trivial (but we're working on resolving this issue). If you do manage to decrypt them, e.g. on iOS 8, they will be matched.

2. Files with the `.car` extension are app resource archives (images, sounds) which were compiled and processed specifically for the target device. The App Store processes them in non-trivial ways, we're planning on getting rid of them in future versions.

3. The `LaunchScreen.nib` file is an empty file containing a description of the interface which is displayed by the system before the app is launched. It is processed by the App Store in a non-trivial way but doesn't contain any code and therefore may be ignored.

----

##Troubleshooting

If you encounter any issues with obtaining the code, building and comparing the apps, please contact us at [@BotSupport](https://t.me/botsupport) and include the hashtag `#reproducibleBuilds` with your message describing the problem.

###Troubleshooting: Android

1. Make sure that you checkout [the correct version](#step-2-confirm-which-version-you-have-installed-on-your-android) of the code.

2. Make sure that you build the app using [the right SDK](#step-4-build-the-app).

3. If the gradle version used in the Dockerfile is not available anymore and building of the Docker image fails, wait for a Dockerfile update or update manually to lastest available version.