# Sharing Button

A Telegram **Sharing Button** is an easy way to let users forward content from your website or app to their **friends**, [**Channels**](https://telegram.org/tour/channels) or [**Saved Messages**](https://telegram.org/blog/albums-saved-messages#saved-messages) on Telegram.

<div class="blog_image_wrap blog_medium_image_wrap">
  <a href="/file/464001548/2/Ug-7BpYHOGI.51801/f0095722cd99a34a46" target="_blank"><img src="/file/464001511/3/yrhjSo2FPDw.14020/b040084e8ad9951a4b" title="TITLE" alt="TITLE" srcset="/file/464001548/2/Ug-7BpYHOGI.51801/f0095722cd99a34a46 , 2x" /></a>
</div>

When a user presses the button, Telegram asks them to choose a chat, group or channel where your link will be shared. You can also add some text that describes the link – the user will be able to edit it before sending the message. 

<div class="blog_image_wrap blog_medium_image_wrap">
  <a href="/file/464001274/2/e1tzJ2HkJOk.156878/ca3fda3984e764eee4" target="_blank"><img src="/file/464001467/1/aAY6bzDmuCI.37875/076ad2c2586eca3c06" title="TITLE" alt="TITLE" srcset="/file/464001274/2/e1tzJ2HkJOk.156878/ca3fda3984e764eee4 , 2x" /></a>
</div>

>Check out posts on the [Telegram Blog](https://telegram.org/blog) for working examples of sharing buttons.

### Adding Telegram sharing buttons to your website

#### Widget Constructor

Use this constructor to get embeddable code for your website.

<p><br/></p>

{share-widget-config}

    
#### Custom buttons

Feel free to create your own custom UI for the button. The only thing you need to make it work is to point the user to this URL on click:

	https://t.me/share/url?url={url}&text={text}

where `{url}` is the URL the user will be sharing and `{text}` is an optional description that will be included with the link. Both values should be [URL-encoded](https://en.wikipedia.org/wiki/Percent-encoding).

Here is a sample code for PHP:

    /**
     * @param string $url Absolute URL to share, e.g. "https://example.com/path/to/article?with=params"
     * @param string $text Optional comment to share URL with, e.g. "Check out this article!"
     * @return string Button HTML markup, feel free to modify to your taste
     */
    function telegramForwardButton($url, $text = '') {
      $share_url = 'https://t.me/share/url?url='.rawurlencode($url).'&text='.rawurlencode($text);
      return "<a href=\"{$share_url}\">Share</a>";
    }

You are welcome to use the [Telegram Logos](https://telegram.org/press#telegram-logos) in your custom button design.

#### Integrations and libraries

- [Sharing buttons on WordPress.com blogs](https://en.blog.wordpress.com/2016/04/13/new-on-wordpress-com-sharing-buttons-for-whatsapp-telegram-and-skype/)
- [AddToAny share buttons](https://www.addtoany.com/blog/new-share-buttons-and-icons-sms-telegram-google-classroom-github/)

If you have a library, plugin or integration script for Telegram sharing buttons, please contact [@BotSupport](https://t.me/botsupport) and we'll add you to this list.

