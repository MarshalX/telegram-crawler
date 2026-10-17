# Android SDK


The Android SDK helps you easily integrate Telegram Passport requests into your Android-based apps. Check out our [GitHub repository](https://github.com/TelegramMessenger/TGPassportAndroidSDK) to see samples using this SDK.

### Installation
#### Installing from Maven

Telegram Passport SDK is available from the Maven repository.
Add this line to the dependencies section in your build.gradle:

    compile 'org.telegram:passport:1.1'
    
and sync your project.

#### Adding as a module

Download the library, unzip it and copy the library project to the root of your project directory (the one with settings.gradle and gradle.properties). Then, make the following changes to your Gradle scripts.

In settings.gradle, add `':telegrampassport'` to includes:

    include ':app', ':telegrampassport'
In the build.gradle file for your app, add this line to the dependencies section:

    compile ':telegrampassport'
and sync your project.

### Usage
#### Adding the button

The SDK provides the "Log in with Telegram" button which we recommend using for a consistent user experience across different apps. You can either add it from your Java code:

    TelegramLoginButton telegramButton;
    // ...
    telegramButton=new TelegramLoginButton(this);
    // Optionally you can change the roundness of the button corners
    // to better fit your design.
    telegramButton.setCornerRoundness(1f);
    viewGroupOfSomeSort.addView(telegramButton, ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
 Or from XML:

     <org.telegram.passport.TelegramLoginButton
			     android:layout_width="wrap_content"
			     android:layout_height="wrap_content"
			     app:cornerRoundness="0.5"/>

#### Requesting authorization

The button doesn't do anything by itself; you need to set an OnClickListener on it to start the authorization flow (replace the comments with actual parameters):

    private static final int TG_PASSPORT_RESULT=352; // this can be any integer less than 0xFFFF
    // ...
    telegramButton.setOnClickListener(new View.OnClickListener(){
    @Override
    public void onClick(View view){
        TelegramPassport.AuthRequest req=new TelegramPassport.AuthRequest();
        req.botID=/* your bot ID here */;
        req.publicKey=/* your bot public key here */;
        req.nonce=/* a unique nonce to pass to the bot server */;
        // Request either a passport or an ID card with selfie, a driver license, personal details with
        // name as it appears in the documents, address with any address document, and a phone number.
        // You could also pass a raw JSON object here if that's what works better for you
        // (for example, if you already get it from your server in the correct format).
        req.scope=new PassportScope(
            new PassportScopeElementOneOfSeveral(PassportScope.PASSPORT, PassportScope.IDENTITY_CARD).withSelfie(),
            new PassportScopeElementOne(PassportScope.PERSONAL_DETAILS).withNativeNames(),
            PassportScope.DRIVER_LICENSE,
            PassportScope.ADDRESS,
            PassportScope.ADDRESS_DOCUMENT,
            PassportScope.PHONE_NUMBER
        );
        TelegramPassport.request(MyActivity.this, req, TG_PASSPORT_RESULT);
    }});
If you need more control over the process, the `TelegramPassport` class contains several more methods:

 - `getAuthIntent(AuthParams)` returns an `Intent` for you to use in `startActivityForResult` if you need to do that in some special way. Be sure to check that an app is present that can handle this intent before starting it by using `PackageManager` or `intent.resolveActivity`.
 - `showAppInstallAlert(Activity)` shows an alert that the user needs to install Telegram in order to continue. This is intended to be used together with the previous method for the cases when the app isn't installed.

#### Handling the result
The result is delivered via the `onActivityResult` method in your activity with the request code you passed to `TelegramPassport.request`. Currently, the only meaningful parameter is `resultCode`, which is `RESULT_OK` if the authorization was successful and `RESULT_CANCELED` otherwise.
