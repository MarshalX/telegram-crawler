# Using self-signed certificates

Upload your certificate using the *certificate* parameter in the [setWebhook](/bots/api/methods/setwebhook.md) method. The certificate supplied should be **PEM encoded** (ASCII BASE64), the pem file should only contain the **public key** (including BEGIN and END portions). When converting from a bundle format, please split the file to only include the public key.

###Generating a self-signed certificate pair (PEM):

####Openssl

>Windows binaries for Openssl are available online

`openssl req -newkey rsa:2048 -sha256 -nodes -keyout YOURPRIVATE.key -x509 -days 365 -out YOURPUBLIC.pem -subj "/C=US/ST=New York/L=Brooklyn/O=Example Brooklyn Company/CN=YOURDOMAIN.EXAMPLE"`

YOURPUBLIC.pem has to be used as input for setting the self-signed webhook.

You can inspect the generated certificate with:
`openssl x509 -text -noout -in YOURPUBLIC.pem`

Converting from a previously generated DER:
`openssl x509 -inform der -in YOURDER.der -out YOURPEM.pem`

Converting from a previously generated PKCS12:
`openssl pkcs12 -in YOURPKCS.p12 -out YOURPEM.pem`

>More information: https://www.openssl.org/

####Java keystore

Generate self-signed JKS:
`keytool -genkey -keyalg RSA -alias YOURDOMAIN.EXAMPLE -keystore YOURJKS.jks -storepass YOURPASSWORD -validity 360 -keysize 2048`

Converting JKS to pkcs12 (intermediate step for conversion to PEM):
`keytool -importkeystore -srckeystore YOURJKS.jks -destkeystore YOURPKCS.p12 -srcstoretype jks -deststoretype pkcs12`

Convert PKCS12 to PEM (requires openssl):
`openssl pkcs12 -in YOURPKCS.p12 -out YOURPEM.pem`

>More information: https://docs.oracle.com

####Windows
Creating a self-signed certificate using Windows native utilities is also possible, although OpenSSL binaries for Windows are available online.

On the commandline:
`certreq -new TEMPLATE.txt RequestFileOut`

TEMPLATE.txt example file:

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

A self-signed certificate will be generated and installed, to view the certificate:
`certutil -store -user my`

To export in DER format (intermediate step for conversion to PEM)
`certutil -user -store -split my SERIALNUMBER YOURDER.crt`

Converting to PEM (used for setting the webhook)
`certutil -encode YOURDER.crt YOURPEM.cer`

To delete a certificate from your store:
`certutil -delstore -user my SERIALNUMBER` (from view)

To export in PFX(PKCS12) format
`certutil -exportpfx -user YOURDOMAIN.EXAMPLE YOURPKCS.pfx NoChain`

>More information: https://technet.microsoft.com

Converting YOURPKCS.pfx to PEM including the private key is best done with OpenSSL:
`openssl pkcs12 -in YOURPKCS.pfx -out YOURPEM.cer`

Remember that only the public key is needed as input for the self-signed webhook certificate parameter. certmgr.msc can also be used as a GUI to export the public part of self-signed certificates to PEM.