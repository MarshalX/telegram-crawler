# Creating Custom Cloud Themes

Official Telegram apps support [custom cloud themes](https://telegram.org/blog/scheduled-reminders-themes#custom-cloud-themes) as of version **5.11**. Everyone is welcome to create and share their themes.

###Creating a theme 

You can use the [**Online Theme Editor**](https://themes.contest.com/) (use a **VPN** if it is blocked in your country) to create new Telegram themes from scratch or edit existing ones. Simply log in with your Telegram account and pick a platform to start **editing** the relevant theme file – or **import** an existing theme.

- Set a **name** for your theme using the `name` attribute
- Set colors for elements using **hex codes** or the **color picker**
- Press 'Save and apply theme' to **push changes** to all users of your theme

###Checking your theme in-app

Once you have **saved** a theme for the first time, Telegram will send you a message with its [sharing link](#publishing-your-theme). Open the link in the app to switch to your theme.

You can always switch to your theme in *Settings > Chat Settings*. On iOS and MacOS native app – *Settings > Appearance*.

###Publishing your theme

Each theme has a `t.me/addtheme` **link** which people can use to switch to your theme. You can choose a beautiful short link (e.g., [https://t.me/addtheme/desert](https://t.me/addtheme/desert)) by changing the `shortname` attribute. If you add support for multiple platforms, the same link can be used for setting your theme on **all** of them.

###Updating your theme

Your theme gets **updated automatically** for all its users whenever you save and apply changes.

###Including a chat background

Your themes can include a [custom wallpaper](https://telegram.org/blog/backgrounds-2-0). To do this, simply go to *Settings > Chat Settings > Chat Background*. On iOS and MacOS native app – *Settings > Appearance > Chat Background*.

Open any background and tap the sharing button in the top right corner, then copy its `t.me/bg/...` link. In the theme file, set this link as the value of the `wallpaper` attribute.

For Telegram Desktop, if you want to make the background **tiled**, add `?mode=tiled` at the end of the link. For example:

	wallpaper: t.me/bg/-jI7lnO3DFABAAAA1vXcFaZP_Vo?mode=tiled

###Creating themes in-app

If you prefer a more WYSIWYG approach, try creating themes using the in-app tools for customizing appearance. Telegram for [Android](https://telegra.ph/Create-Theme-Android-FAQ) and [Telegram Desktop](https://telegra.ph/Create-Theme-Desktop-FAQ) have advanced in-app theme editors. Telegram for iOS and MacOS allow choosing a custom accent color from the color wheel and a background, then saving the result as a custom theme.

Once you have saved a new theme in any of the apps, it also becomes accessible in the [online editor](https://themes.contest.com/).

**Read more**

- [Android Theme Editor](https://telegra.ph/Create-Theme-Android-FAQ)
- [Telegram Desktop Theme Editor](https://telegra.ph/Create-Theme-Desktop-FAQ)
