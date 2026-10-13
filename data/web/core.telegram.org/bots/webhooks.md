# Marvin&#39;s Marvellous Guide to All Things Webhook


We currently support two ways of processing bot updates, [**getUpdates**](/bots/api.md#getting-updates) and [**setWebhook**](/bots/api/methods/setwebhook.md). **getUpdates** is a pull mechanism, **setwebhook** is push. Although the concept of a webhook is fairly simple, the setup of the individual components has proven to be tricky for many. This guide provides some extra information for those of you brave enough to venture into the art of the webhook.

There are some advantages of using a webhook over getUpdates. As soon as an update arrives, we’ll kindly deliver it to your bot for processing.

**This:**
```
1. Avoids your bot having to ask for updates frequently.
2. Avoids the need for some kind of polling mechanism in your code.
```

Other advantages may include saving some potential CPU cycles and an increase in response time, these things however depend heavily on the usage pattern of your bot.

Setting a webhook means you supplying Telegram with a location in the form of a URL, on which your bot listens for updates. We need to be able to connect and post updates to that URL. 

To ensure that we can do that, there are some basic requirements:

### The short version

You'll need a server that:

* Supports IPv4, IPv6 is currently not supported for webhooks.
* Accepts incoming POSTs from subnets `149.154.160.0/20` and `91.108.4.0/22` on port 443, 80, 88, or 8443. 
* Is able to handle TLS1.2(+) HTTPS-traffic. 
* Provides a supported, verified or self-signed certificate.
* Uses a CN or SAN that matches the domain you’ve supplied on setup.
* Supplies all intermediate certificates to complete a verification chain.

That’s almost all there’s to it.
If you decide to limit traffic to our specific range of addresses, keep an eye on this document whenever you seem to run into trouble. Our IP-range might change in the future. 

  
### The longer version

* #### A domain name
Setting a webhook needs a URL for us to post to. For that you'll need a server with a domain name. If you don't have one, you'll need to obtain one first. Telegram currently doesn't offer hosting or domain name services. There are quite a few VPS/Web hosting providers around the internet, feel free to pick one to your liking.
If you're using a self-signed certificate, you may use the IP as a CN, instead of the domain name.
[How do I get a server with a domain name?](/bots/webhooks.md#how-do-i-get-a-server-with-a-domain-name)

* #### An open port
A webhook needs an open port on your server. We currently support the following ports: **443, 80, 88** and **8443**. Other ports are not supported and will not work. Make sure your bot is running on one of those supported ports, and that the bot is reachable via its public address.
```
If you want to limit access to Telegram only, please allow traffic from 149.154.160.0/20 and 91.108.4.0/22. 
Whenever something stops working in the future, please check this document again as 
the range might expand or change.
```
[How do I check for open ports or limit access to my bot?](/bots/webhooks.md#how-do-i-check-for-open-ports-or-limit-access-to-my-bot)

* #### Always SSL/TLS
A webhook requires SSL/TLS encryption, no matter which port is used. It's not possible to use a plain-text HTTP webhook. You shouldn't want to either, for the sake of your bot and users.
[SSL/TLS, why do I have to handle this for a webhook?](/bots/webhooks.md#ssl-tls-what-is-it-and-why-do-i-have-to-handle-this-for-a-webhoo)

* #### Not all SSL/TLS is equal
We support any SSL/TLS version TLS1.2 and up for your webhook. This means that **SSLV2/3/TLS1.0/TSL1.1 are NOT supported**, due to security issues associated with those older versions.
[How do I check that I’m handling the right version?](/bots/webhooks.md#how-do-i-check-that-im-handling-the-right-version)

* #### SSL needs a certificate
The common name (CN) of your certificate (self-signed or verified) has to match the domain name where your bot is hosted. You may also use a subject alternative name (SAN), that matches the domain for your webhook. Server Name Indication (SNI)-routing is supported. If you're using a self-signed certificate, you may use the IP as a CN, instead of the domain name.
[A certificate, where do I get one, and how?](/bots/webhooks.md#a-certificate-where-do-i-get-one-and-how)

* #### Verified or self-signed
A certificate can either be verified or self-signed. Setting a webhook with a self-signed certificate differs a little from setting a webhook with a verified certificate. Ensure you're using the correct setup for the type of certificate you've chosen for your webhook.
[How do I set a webhook for either type?](/bots/webhooks.md#how-do-i-set-a-webhook-for-either-type)

* #### Supported certificates
Not all verified certificates are supported. Certificates are based on a network of trust and come in a chain. Trusting your verified certificate means we have to trust the provider of that certificate, the Certificate Authority (and hence its root certificate). Before you pick a certificate provider, Check [this list](https://packages.ubuntu.com/jammy/all/ca-certificates/filelist) to make sure that we actually trust their root certificate.
[What if my root certificate isn’t on that list?](/bots/webhooks.md#an-untrusted-root)

* #### An Untrusted root
Ok, so you already had a certificate installed and just discovered it’s not on our list.
Start by ignoring it, and just try to set it. We occasionally add extra root certificates to keep up with popular demand, so the list isn't always exhaustive. Unlucky after all? We'll allow you to supply an unsupported root certificate when setting the webhook. This method is nearly identical to setting a self-signed certificate webhook. Instead of your self-signed certificate you'll be sending us the root certificate as inputFile.
[Setting a verified webhook with an untrusted root](/bots/webhooks.md#setting-a-verified-webhook-with-an-untrusted-root)

* #### Intermediate certificates
Some verified certificates require an intermediate certificate. In this construction the provider of your verified certificate has used their root certificate to sign an intermediate certificate. This intermediate certificate is then used to sign your verified certificate. You'll need to provide the intermediate certificate for us to be able to verify the chain of trust. CA's that use this type of chain supply an intermediate certificate.
[Supplying an intermediate certificate](/bots/webhooks.md#supplying-an-intermediate-certificate)

* #### More information
Since we know webhooks can be a tad overwhelming, we’re working on a little digital assistant that’ll try and help you with the most common problems, it's not nearly perfect, but you may try using @CanOfWormsBot to check if your chain of certificates is installed correctly before contacting support.

* #### Testing your bot
We took the liberty of adding a [set of example updates](/bots/webhooks.md#testing-your-bot-with-updates). They come in handy when testing your bot, no matter which method of getting updates you might be using.

* #### Don't panic.
If by now you're looking for your fishing gear because we've mentioned ports and hooks or you're about to Google what kind of bait URL and TLS exactly are, this guide might not be completely for you. You’re quite likely still a brilliant bot programmer, don’t worry. Perhaps this whole webhook thing is just new to you, not all is lost. If you currently have a working getUpdates situation, it's a good idea to pick up this guide again on a rainy Sunday afternoon and take your time to read up on some subjects around the internet. This [guide](http://www.douglasadams.com/creations/hhgg.html) can only contain a finite amount of information after all.

### The verbose version

##### How do I get a server with a domain name?

If you use a webhook, we have to deliver requests to your bot to a server we can reach. So yes, you need a server we can connect to. It can be anywhere in the galaxy, if you ensure we can reach the server by domain name (or at least via IP for a self-signed certificate), it will work just fine.

There are quite a few ways to get this done, as a novice however it's likely that you're not directly jumping at the chance of crafting this from scratch. Actually, as a novice, we recommend you don't. It's likely to be a complex and long ride.

**If you got stuck here, make a choice:**

* You use getUpdates at the moment and it works, keep it that way. Especially if you're running your bot from a nice machine that does well. There is nothing wrong with using getUpdates.

* Go with a hosted service and let a bunch of professionals worry about things like registering a domain, setting up DNS, a web server, securing it and so on.

```
If you're going with a hosted service, make sure to look for a hosting provider that 
not only supports your code’s needs, for example: support for your PHP version,
but one that also handles SSL and allows you to create/deploy certificates.
```

* Go crazy, dive on the internet and start reading. Once you’re confident that you’ve got all the basic theories down, find yourself a nice hosted VPS or roll your own machine at home and get back to us here.

##### How do I check for open ports or limit access to my bot?

So you have the hosting thing down and all is good so far, however, when you enter the address of your bot in your browser it seems unreachable.

Explaining every firewall or web server solution in detail isn't possible for us, which we hope you understand. If you’re running a hosted solution, you’re more likely to have a nice UI where you configure these settings. Head to your configuration panel and check all of them. If you’re on a Linux based VPS with shell access, we have some tips for you:

* Make sure your bot process is indeed configured to listen on the port you're using.
`netstat –ln | grep portnumber`
Shows you if your bot is actually listening for incoming requests on the port you expect.
`sudo lsof -i | grep process name`
Is a simple way to check if that’s actually being listened on by the process your bot is using.

* Make sure it’s listening  correctly.
Your bot has to listen on the address you’ve exposed to the outside `(your public IP)`, it can also listen on all addresses `(*: or 0.0.0.0)`. 
The `netstat` and `lsof`-commands mentioned above assist in checking this. If nothing shows up, it is time to check your configuration and fix it. Set the correct IP, make sure it’s listening on a supported port and fire away! Just use a Web Browser to check if you’re reachable. The problem can be in the configuration of your bot, your web server virtual host configuration, or the servers binding configuration.

* If you still can’t reach your address, check your firewall.
`sudo iptables –L` 
**OR**
`sudo ufw status verbose` (Ubuntu) 
Gives you some insight in the current firewall settings.

* If it looks like you’re blocking incoming traffic, let’s fix that.
`sudo iptables –A INPUT –p tcp –m tcp –dport portnumber -j ACCEPT`
**OR**
`sudo ufw allow portnumber/tcp` 
Allows incoming traffic on all interfaces to the specified tcp port.
`sudo iptables –A INPUT –i interfacename –p tcp –m tcp –dport portnumber -j ACCEPT`
**OR**
`sudo ufw allow in on interfacename to any port portnumber proto tcp`
Allows incoming traffic to a specific interface and a specific port from everywhere.
`sudo ifconfig`
Helps you find the interface with the public address you’re going to use.

```
If you use iptables, make sure to actually SAVE after changing the configuration.
On a Debian based system the iptables-persistent package is be a good option.
RHEL/CentOS offers a service iptables save -command.
A quick online search for "YOUROPERATINGSYSTEM save iptables" also helps.
```

* If you’re just looking for some hints on how to limit incoming traffic:
`sudo iptables –A INPUT –i interfacename –p tcp –m iprange -s 149.154.160.0/20,91.108.4.0/22 –dport portnumber -j ACCEPT`
**OR**
```
sudo ufw allow in on interfacename to any port portnumber proto tcp from 149.154.160.0/20
sudo ufw allow in on interfacename to any port portnumber proto tcp from 91.108.4.0/22
``` 
Allows incoming traffic to a specific interface and a specific port from a specific range of addresses. (ufw is using a subnet mask in the example, ranging from 192-255)

That’s all for our examples. More information on best practices for setting up your firewall, on whichever operating system you prefer for your bot, is best found on the internet.

##### SSL/TLS, what is it and why do I have to handle this for a webhook?

You’re already familiar with it in some form or another. Whenever you see that (nicely green) lock in your browser bar, you know it’s reasonably safe to assume that you’ve landed on the site you actually wanted to visit. If you see the green lock, that's SSL/TLS in action. If you want to learn more about how SSL/TLS works in general, it's best to search the internet.

The main difference between getUpdates and a webhook is the way the connection takes place. getUpdates means you'll connect to our server, a webhook means we'll be connecting to your server instead. Connecting to your server has to be done secure, we have to know for sure it's you we're talking to after all. This means you'll have to handle all that server side encryption stuff, virtually presenting us with a green lock. If you use a web server for us to post to, you need to support SSL/TLS handling on the port/virtual host of your choice. An online search for "YOURWEBSERVER enable HTTPS" will help you.

Not using a regular web server? Have a look at our [example page](/bots/samples.md), most examples there include code for handling SSL/TLS in a webhook setup.

##### How do I check that I’m handling the right version?

You just read up on the whole SSL/TLS stuff, figured out that it’s not all that bad to setup and we add some more requirements. Here are some tips to check if you’re indeed supporting at least TLS1.2.

* Several online services exist that allow you to check your certificate installation,
They give you an overview of your supported TLS versions/Cipher suites and other details. Search online for **Symantec crypto report** or **Qualys ssl**. Both supply tools to verify your setup.

* Checking locally can also be done, in several ways, here are three options,

  * Go simple:
Using Chrome as a browser? Open up the URL to your bot and inspect the certificate details. If you’re supporting TLS Chrome tells you so in the security overview tab. Other browsers are likely able to give you similar basic information.
  
  * Using curl:
`curl --tlsv1.2 -v -k https://yourbotdomain:yourbotport/`
You can add `--tlsv1.2` to force curl into using TLS1.2 when trying to connect. `-k` is optional and used to check against a self-signed certificate. `yourbotdomain` is the public hostname your webhook is running on. For local testing purposes you can also use the IP. `yourbotport` is the port you’re using.

  * Using OpenSSL
`openssl s_client -tls1_2 -connect yourbotdomain:yourbotport -servername yourbotdomain`
You can add `-tls1_2` to force OpenSSL into using TLS1.2 when trying to connect. `yourbotdomain` is the public hostname your webhook is running on. For local testing purposes you can also use the IP. `yourbotport` is the port you’re using. Note that https:// isn’t used for OpenSSL. `-servername` is optional, and included here for some shared hosters, which use SNI to route traffic to the correct domain. When SNI is used you’ll notice that your server appears to be returning a certificate for a different domain than your own. Adding `-servername yourbotdomain` ensures that SNI negotiation is done, and the correct certificate is returned.

* Some additional configuration pointers
  * Forcing TLS in your virtual host on Apache:
`SSLProtocol -all +TLSv1.2`
  * Forcing TLS in your virtual host on Nginx:
`ssl_protocols TLSv1.2;`
  * Force TLS for your Java virtual machine through system properties:
`-Dhttps.protocols=TLSv1.2 -Djdk.tls.client.protocols=TLSv1.2`
  * Enabling ssl debug for your JVM:
`-Djavax.net.debug=ssl,handshake,record`

* Other tools that may help in debugging issues:
  * **Wireshark**: excellent packet capturing
  * **Tcpdump**: equally excellent and doesn’t need a GUI
  * **Charles**: web debugging proxy
  * **Fiddler**: web debugging proxy

##### A certificate, where do I get one and how?

You need a certificate, pick on of these types;

* [A verified, supported certificate](/bots/webhooks.md#a-verified-supported-certificate)
* [A self-signed certificate](/bots/webhooks.md#a-self-signed-certificate)

* ##### A verified, supported certificate
Using a verified certificate means you already have, or will obtain, a certificate backed by a trusted certificate authority (CA). There are many ways to acquire a verified certificate, paid or free. Two popular examples of free suppliers are **StartSSL** and **Let’s Encrypt**. You’re welcome to pick another. Just make sure first the supplier is likely to be supported.
Check [this list](https://packages.ubuntu.com/jammy/all/ca-certificates/filelist) before selecting a CA.
Once you’ve picked a CA and validated your identity with them, you can craft your certificate. This frequently starts by generating a CSR (Certificate Signing Request). Generating a CSR is done either through your host machine, or online via the tools provided by the CA.

* Here is an example (PEM format output).

  * Using OpenSSL:
`openssl req -newkey rsa:2048 -keyout yourprivatekey.key -out yoursigningrequest.csr`

```
----
Generating a 2048 bit RSA private keywriting new private key to yourprivatekey.key
Enter PEM pass phrase: enter a password for your key here 
Verifying - Enter PEM pass phrase: confirm the entered password
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,If you enter '.',
the field will be left blank.-----
Country Name (2 letter code) [AU]:
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []: yourbotdomainname
Email Address []:
Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
---
```

* Another example:

  * Using Java keytool:
`keytool -genkey -alias yourbotdomainname -keyalg RSA -keystore yourkeystore.jks -keysize 2048`

```
---
Enter keystore password:  
Re-enter new password: 
What is your first and last name?  [Unknown]: yourbotdomainname
What is the name of your organizational unit?  [Unknown]:  
What is the name of your organization?  [Unknown]:  
What is the name of your City or Locality?  [Unknown]:  
What is the name of your State or Province?  [Unknown]:  
What is the two-letter country code for this unit?  [Unknown]:  
Is CN=test.telegram.org, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown correct?  
[no]:  yes
Enter key password for yourbotdomainname   
(RETURN if same as keystore password): 
---
```
This generates the initial keystore, from which you can then create a CSR like this:

`keytool -certreq -alias yourbotdomainname -keystore yourkeystore.jks -file yourbotdomainname.csr`

```
---
Enter keystore password:
---
```

To validate your certificate the Common Name (CN) has to match your webhook domain. Example, if you’re using [https://www.example.com/example.php](https://www.example.com/example.php) as a webhook address, the certificate CN has to be [www.example.com](http://www.example.com). 
So you need an **exact match** of the FQDN you’re setting for the webhook

There is an exception, if you’re using a SAN (Subject Alternative Name) the webhook address can either match the CN of your certificate, **OR** one of the SANs provided in the certificate. In most cases you’ll be using the CN.

Create your CSR and supply the contents of the file to your CA. Most CA’s are kind enough to give you an example command of the input format they expect.

`cat yoursigningrequest.csr` **or** `cat yourbotdomainname.csr`
Lets you have a look at the CSR we just generated:
<div>
  <a href="/file/811140281/1/5le8eVE7mPk.261973/25ba8c07609aef2310" target="_blank"><img src="/file/811140281/1/5le8eVE7mPk.261973/25ba8c07609aef2310" title="csrexample.jpg, 255.83Kb" height="60%" width="60%" class="dev_page_image" /></a>
</div>

That doesn’t seem to informative, but we can deduce that the file is in PEM format (ASCII base64 encoded) and contains a certificate signing request. Luckily it is possible to look at the human readable contents of the CSR. Use the following commands to double check if all fields are set correctly.

* Using OpenSSL
`openssl req -text -noout -verify -in yoursigningrequest.csr`

* Using Java keytool
`keytool -printcertreq -v -file yourbotdomainname.csr`

Verify your CSR and supply it to your CA to get a certificate. We’ll use StartSSL as an example here. StartSSL allows you to set up to 5 names (SAN), Their intermediate certificate is also needed for a webhook to work, which makes for a nice complete example. 

Go to the certificates wizard, enter the required hostname(s) for your SSL certificate (this is the CN you’ve also set in the CSR and an optional SAN).

<div>
  <a href="/file/811140045/1/wtVcG_IghfI.78937/51e72042b1df5f28b5" target="_blank"><img src="/file/811140045/1/wtVcG_IghfI.78937/51e72042b1df5f28b5" title="sslcertwiz.jpg, 77.09Kb" height="75%" width="75%" class="dev_page_image" /></a>
</div>

In the example above we’ve chosen to set a CN `(test.telegram.org)`, but also a SAN `(sanexample.telegram.org)` The CN given has to match the CN used for generating the CSR.
Set your CN (and optional SAN) and copy the contents of the yoursigningrequest.csr file.

<div>
  <a href="/file/811140068/1/5qVIwLYnqd8.116971/87a6da7b70e377f899" target="_blank"><img src="/file/811140068/1/5qVIwLYnqd8.116971/87a6da7b70e377f899" title="sslcertwiz1.jpg, 114.23Kb" height="75%" width="75%" class="dev_page_image" /></a>
</div>

Paste the contents, submit and you’re done.

<div>
  <a href="/file/811140069/2/MVKz66N9t4o.53664/7130b06124c18c9e94" target="_blank"><img src="/file/811140069/2/MVKz66N9t4o.53664/7130b06124c18c9e94" title="sslcertwiz2.jpg, 52.41Kb" height="75%" width="75%" class="dev_page_image" /></a>
</div>

Now you can download the created certificate directly. In the example used above you’ll receive a zip file with several PEM certificates. The root, intermediate and yourdomain certificate. 
You need the `intermediate` and `yourdomain` to set a webhook with a StartSSL certificate.

You can inspect the set of certificates you’ve just downloaded.

* Here are some example commands:
  * Using OpenSSL:
`openssl x509 -in yourdomain.crt -text -noout`

  * Using Java keytool:
`keytool -printcert -v -yourdomain.crt`

  * Using Windows:
StartSSL supplies certificates in PEM format with a .crt extension, on Windows you can view the contents of them with a quick double click. Extract the files or open the "Otherserver.zip" and double click each of the certificates for inspection. The details tab supplies you with extra information.
Make sure you have a correct CN in the `Subject`-field of the `yourdomain`-certificate. If you're using a SAN, make sure that it is listed in the Subject `Alternative Name`-field.

<div>
  <a href="/file/811140010/2/omTlwQW_Wpk.133258/5db0b29d43f5558413" target="_blank"><img src="/file/811140010/2/omTlwQW_Wpk.133258/5db0b29d43f5558413" title="wincert.jpg, 130.13Kb" height="50%" width="50%" class="dev_page_image" /></a>
</div>

With your fresh certificates at hand, you can now continue setting your webhook.

* ##### A self-signed certificate 
Using a self-signed certificate means you’ll forfeit on the chain of trust backed by a CA. Instead you are the CA. For this to work, a slight difference in setup is required. Because Telegram will have no chain of trust to verify your certificate, you have to use the generated public certificate as an input file when setting the webhook. Keep in mind that the certificate file has to be uploaded as **multipart/form** data in **PEM encoded (ASCII BASE64)** format.

* First let’s generate some certificates:
  * Using OpenSSL:
`openssl req -newkey rsa:2048 -sha256 -nodes -keyout YOURPRIVATE.key -x509 -days 365 -out YOURPUBLIC.pem -subj "/C=US/ST=New York/L=Brooklyn/O=Example Brooklyn Company/CN=YOURDOMAIN.EXAMPLE"`
You’ll end up with 2 files, a private key and the public certificate file. Use **YOURPUBLIC.PEM** as input file for setting the webhook.

  * Using Java keytool:
`keytool -genkey -keyalg RSA -alias YOURDOMAIN.EXAMPLE -keystore YOURJKS.jks -storepass YOURPASSWORD -validity 360 -keysize 2048`
```
What is your first and last name?
  [test.telegram.org]:
What is the name of your organizational unit?
  [Unknown]:  
What is the name of your organization?
  [Unknown]:  
What is the name of your City or Locality?
  [Unknown]:  
What is the name of your State or Province?
  [Unknown]:  
What is the two-letter country code for this unit?
  [Unknown]:  
Is CN=test.telegram.org, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown correct?
  [no]: yes
```
Once done you’ll need 2 more commands to export the public certificate file from the generated store (you’ll be using the store for your JVM and the PEM for setting the webhook)

  * Convert the JKS to pkcs12 (intermediate step for conversion to PEM):
`keytool -importkeystore -srckeystore YOURJKS.jks -destkeystore YOURPKCS.p12 -srcstoretype jks -deststoretype pkcs12`

  * Convert PKCS12 to PEM (requires OpenSSL)
`openssl pkcs12 -in YOURPKCS.p12 -out YOURPEM.pem -nokeys`

  * Using Windows:
Creating a self-signed certificate using Windows native utilities is also possible, although OpenSSL binaries for Windows are available online.
`certreq -new TEMPLATE.txt RequestFileOut generates a CSR.`

  * TEMPLATE.txt example file:
```
[NewRequest]
; At least one value must be set in this section
Subject = "CN=DOMAIN.EXAMPLE"
KeyLength = 2048
KeyAlgorithm = RSA
HashAlgorithm = sha256
;MachineKeySet = true
RequestType = Cert
UseExistingKeySet=false ;generates a new private key (for export)
Exportable = true ;makes the private key exportable with the PFX
```

A self-signed certificate is generated and installed, to use the certificate for a self-signed webhook you'll have to export it in PEM format.

* Windows continued:

  + You can have a look at the certificates in your store with:
`certutil -store -user my`

  + To export the installed certificate in DER format (intermediate step for conversion to PEM):
`certutil -user -store -split my SERIALNUMBER YOURDER.der`

  + Now you can convert the certificate to PEM:
`certutil -encode YOURDER.der YOURPEM.pem`
Remember that only the public certificate is needed as input for the self-signed webhook certificate parameter. 
`certmgr.msc` can also be used as a GUI to export the public part of self-signed certificate to PEM.

After following the above you'll end up with a nice self-signed certificate. You’ll still have to set the webhook, and handle SSL correctly.
  

##### How do I set a webhook for either type?
The setWebhook method is needed for both types. For a verified certificate with a trusted root CA, it’s enough to use the setWebhook method with just the URL parameter.

* A curl example for a verified certificate:
`curl -F "url=https://<YOURDOMAIN.EXAMPLE>/<WEBHOOKLOCATION>" https://api.telegram.org/bot<YOURTOKEN>/setWebhook`

For a self-signed certificate an extra parameter is needed, `certificate`, with the public certificate in PEM format as data.

* A curl example for a self-signed certificate:
`curl -F "url=https://<YOURDOMAIN.EXAMPLE>/<WEBHOOKLOCATION>" -F "certificate=@<YOURCERTIFICATE>.pem" https://api.telegram.org/bot<YOURTOKEN>/setWebhook`

The `-F` means we’re using the `multipart/form-data`-type to supply the certificate, the type of the certificate parameter is [inputFile](/bots/api/types/inputfile.md). Make sure that you’re supplying the correct type.

Both parameters for the setWebhook method are classed as optional. Calling the method with an empty URL parameter can be used to clear a previously set webhook.

* A curl example to clear a previous webhook :
`curl -F "url=" https://api.telegram.org/bot<YOURTOKEN>/setWebhook`

Keep in mind that the URL parameter starts with `https://` when setting a webhook. By default that means we’re knocking at your door on port 443. If you want to use another port (80,88 or 8443), you’ll have to specify the port in the URL parameter.

* Example: 
`url=https://<YOURDOMAIN.EXAMPLE>:88/<WEBHOOKLOCATION>`

##### Setting a verified webhook with an untrusted root
If you already have a verified certificate and our servers don’t trust your root CA, we have an alternative way for you to set a webhook. Instead of using the setWebhook method **without** the `certificate` parameter, you can use the self-signed method. Your CA's root certificate has to be used as an inputFile for the `certificate` parameter.

* A curl example to supply an untrusted root certificate:
`curl -F "url=https://<YOURDOMAIN.EXAMPLE>" -F "certificate=@<YOURCAROOTCERTIFICATE>.pem" https://api.telegram.org/bot<YOURTOKEN>/setWebhook
`
Before you can do this, you need the root certificate of your certificate’s CA. Most CA’s supply their root certificates in several different formats (PEM/DER/etc.). Visit your CA’s website, and download the Root certificate indicated for your verified certificate.

You can use these commands to quickly convert a DER formatted root certificate to PEM:

* Using OpenSSL:
`openssl x509 -inform der -in root.cer -out root.pem`

* Using Java keytool:
`keytool -import -alias Root -keystore YOURKEYSTORE.JKS -trustcacerts -file ROOTCERT.CER`
The root certificate needs to be imported in your keystore first:
`keytool -exportcert -alias Root -file <YOURROOTPEMFILE.PEM> -rfc -keystore YOURKEYSTORE.JKS`

Once done, set your webhook with the root-pem-file and you’ll be good to go. If you need more pointers, have a look at the [self-signed](/bots/webhooks.md#a-self-signed-certificate) part of this guide.
 

##### Supplying an intermediate certificate
Once you’ve crafted your certificate, your CA might present you with a nice bundle. Most bundles contain a root certificate, your public certificate and sometimes an **intermediate** certificate. StartSSL is one of many CA’s that’ll supply such an intermediate beast. This certificate has to be supplied in the chain of certificates you’re presenting to us when we connect to your server. If an intermediate was used to sign your certificate but isn’t supplied to our servers, we won’t be able to verify the chain of trust and your webhook will not work.

If your webhook isn’t working and you’re wondering if the chain is complete:

* Check with your certificate provider if you need an intermediate certificate.
* Verify your certificate chain.
```
Search online for Symantec crypto report or Qualys ssl. 
Both supply tools to verify your setup.
```

Here’s an example of a complete chain, note that in this case 2 intermediate certificates have been supplied.

<div>
  <a href="/file/811140157/1/FsbXbc0yPJA.49297/5812f355ecfcda764a" target="_blank"><img src="/file/811140157/1/FsbXbc0yPJA.49297/5812f355ecfcda764a" title="startsslexample.jpg, 48.14Kb" height="75%" width="75%" class="dev_page_image" /></a>
</div>

Even though your browser might not complain when visiting your page, an incomplete chain will not work for your webhook. If your chain is incomplete we have some tips to add them to your current setup:

* Apache:
Add the intermediate certificate to the end of the file configured in the `SSLCertificateFile` directive of your virtual host configuration. If you’re using an older version than Apache 2.4.8, you may use the `SSLCertificateChainFile` directive instead.

* Nginx: 
Add the intermediate certificate to the end of the file configured in the `ssl_certificate_key` directive of your virtual host configuration.

* A quick command for doing this correctly:
`cat your_domain_name.pem intermediate.pem >> bundle.pem`
Make sure the order is correct, expect failure otherwise.

* Java keytool:
`keytool -import -trustcacerts -alias intermediate -file intermediate.pem -keystore YOURKEYSTORE.jks`

The end result of all this is a complete certificate chain, backed by either a root certificate we trust or, in the case of an untrusted root, a root certificate you're supplying to us. Make sure to verify your setup again after adding the intermediate, once done, you're good to go!

##### Testing your bot with updates
* Update examples
A set of example updates, which comes in handy for testing your bot.

  * Message with text using curl:
    ```
    curl --tlsv1.2 -v -k -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
    "update_id":10000,
    "message":{
        "date":1441645532,
        "chat":{
           "last_name":"Test Lastname",
           "id":1111111,
           "first_name":"Test",
           "username":"Test"
        },
        "message_id":1365,
        "from":{
           "last_name":"Test Lastname",
           "id":1111111,
           "first_name":"Test",
           "username":"Test"
        },
        "text":"/start"
    }
}' "https://YOUR.BOT.URL:YOURPORT/"
```
`--tlsv1.2` will force using TLS1.2.

  * Message with text using Postman:
    
    <div>
  <a href="/file/811140789/2/DmiZPh1t6z0.269328/98525b6835f0a91432" target="_blank"><img src="/file/811140789/2/DmiZPh1t6z0.269328/98525b6835f0a91432" title="postmanfakeupdate.jpg, 263.02Kb" class="dev_page_image" /></a>
</div>

* More examples in curl:

  * Message with text:
```
curl -v -k -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
    "update_id":10000,
    "message":{
        "date":1441645532,
        "chat":{
           "last_name":"Test Lastname",
           "id":1111111,
           "type": "private",
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "message_id":1365,
        "from":{
           "last_name":"Test Lastname",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "text":"/start"
    }
}' "https://YOUR.BOT.URL:YOURPORT/"
```
  * Forwarded message:
```
curl -v -k -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
    "update_id":10000,
    "message":{
        "date":1441645532,
        "chat":{
           "last_name":"Test Lastname",
           "id":1111111,
           "type": "private",
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "message_id":1365,
        "from":{
           "last_name":"Test Lastname",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "forward_from": {
           "last_name":"Forward Lastname",
           "id": 222222,
           "first_name":"Forward Firstname"
        },
        "forward_date":1441645550,
        "text":"/start"
    }
}' "https://YOUR.BOT.URL:YOURPORT/"
```
  * Forwarded channel message:
```
curl -v -k -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
    "update_id":10000,
    "message":{
        "date":1441645532,
        "chat":{
           "last_name":"Test Lastname",
           "type": "private",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "message_id":1365,
        "from":{
           "last_name":"Test Lastname",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "forward_from": {
           "id": -10000000000,
           "type": "channel",
           "title": "Test channel"
        },
        "forward_date":1441645550,
        "text":"/start"
    }
}' "https://YOUR.BOT.URL:YOURPORT/"
```
  * Message with a reply:
```
curl -v -k -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
    "update_id":10000,
    "message":{
        "date":1441645532,
        "chat":{
           "last_name":"Test Lastname",
           "type": "private",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "message_id":1365,
        "from":{
           "last_name":"Test Lastname",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "text":"/start",
        "reply_to_message":{
            "date":1441645000,
            "chat":{
                "last_name":"Reply Lastname",
                "type": "private",
                "id":1111112,
                "first_name":"Reply Firstname",
                "username":"Testusername"
            },
            "message_id":1334,
            "text":"Original"
        }
    }
}' "https://YOUR.BOT.URL:YOURPORT/"
```
  * Edited message:
```
curl -v -k -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
    "update_id":10000,
    "edited_message":{
        "date":1441645532,
        "chat":{
           "last_name":"Test Lastname",
           "type": "private",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "message_id":1365,
        "from":{
           "last_name":"Test Lastname",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "text":"Edited text",
        "edit_date": 1441646600
    }
}' "https://YOUR.BOT.URL:YOURPORT/"
```
  * Message with entities:
```
curl -v -k -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
    "update_id":10000,
    "message":{
        "date":1441645532,
        "chat":{
           "last_name":"Test Lastname",
           "type": "private",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "message_id":1365,
        "from":{
           "last_name":"Test Lastname",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "text":"Bold and italics",
        "entities": [
            {
                "type": "italic",
                "offset": 9,
                "length": 7
            },
            {
                "type": "bold",
                "offset": 0,
                "length": 4
            }
            ]
    }
}' "https://YOUR.BOT.URL:YOURPORT/"
```
  * Message with audio:
```
curl -v -k -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
    "update_id":10000,
    "message":{
        "date":1441645532,
        "chat":{
           "last_name":"Test Lastname",
           "type": "private",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "message_id":1365,
        "from":{
           "last_name":"Test Lastname",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "audio": {
            "file_id": "AwADBAADbXXXXXXXXXXXGBdhD2l6_XX",
            "duration": 243,
            "mime_type": "audio/mpeg",
            "file_size": 3897500,
            "title": "Test music file"
        }
    }
}' "https://YOUR.BOT.URL:YOURPORT/"
```
  * Voice message:
```
curl -v -k -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
    "update_id":10000,
    "message":{
        "date":1441645532,
        "chat":{
           "last_name":"Test Lastname",
           "type": "private",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "message_id":1365,
        "from":{
           "last_name":"Test Lastname",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "voice": {
            "file_id": "AwADBAADbXXXXXXXXXXXGBdhD2l6_XX",
            "duration": 5,
            "mime_type": "audio/ogg",
            "file_size": 23000
        }
    }
}' "https://YOUR.BOT.URL:YOURPORT/"
```
  * Message with a document:
```
curl -v -k -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
    "update_id":10000,
    "message":{
        "date":1441645532,
        "chat":{
           "last_name":"Test Lastname",
           "type": "private",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "message_id":1365,
        "from":{
           "last_name":"Test Lastname",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "document": {
            "file_id": "AwADBAADbXXXXXXXXXXXGBdhD2l6_XX",
            "file_name": "Testfile.pdf",
            "mime_type": "application/pdf",
            "file_size": 536392
        }
    }
}' "https://YOUR.BOT.URL:YOURPORT/"
```
  * Inline query:
```
curl -v -k -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
    "update_id":10000,
    "inline_query":{
        "id": 134567890097,
        "from":{
           "last_name":"Test Lastname",
           "type": "private",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "query": "inline query",
        "offset": ""
    }
}' "https://YOUR.BOT.URL:YOURPORT/"
```
  * Chosen inline query:
```
curl -v -k -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
    "update_id":10000,
    "chosen_inline_result":{
        "result_id": "12",
        "from":{
           "last_name":"Test Lastname",
           "type": "private",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "query": "inline query",
        "inline_message_id": "1234csdbsk4839"
    }
}' "https://YOUR.BOT.URL:YOURPORT/"
```
  * Callback query:
```
curl -v -k -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
    "update_id":10000,
    "callback_query":{
        "id": "4382bfdwdsb323b2d9",
        "from":{
           "last_name":"Test Lastname",
           "type": "private",
           "id":1111111,
           "first_name":"Test Firstname",
           "username":"Testusername"
        },
        "data": "Data from button callback",
        "inline_message_id": "1234csdbsk4839"
    }
}' "https://YOUR.BOT.URL:YOURPORT/"
```
That's all we have for now!